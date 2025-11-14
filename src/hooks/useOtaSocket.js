// src/hooks/useOtaSocket.js
import { useEffect, useRef, useState, useCallback } from "react";

const DEFAULT_RECONNECT_BASE = 1000; // ms

export default function useOtaSocket({
  wsPath = "/esp-ota",        // <--- change if your server listens on different WS path
  adminQuery = "admin=true",
  startReconnectMs = DEFAULT_RECONNECT_BASE,
  maxReconnectMs = 30000,
  autoConnect = true,
  token // optional bearer token to send as query param (if your backend expects it)
} = {}) {
  const [devicesMap, setDevicesMap] = useState(new Map()); // Map<deviceId, deviceObj>
  const [connected, setConnected] = useState(false);
  const [lastError, setLastError] = useState(null);
  const wsRef = useRef(null);
  const reconnectRef = useRef({ tries: 0, timeoutId: null });

  const makeWsUrl = useCallback(() => {
    const proto = window.location.protocol === "https:" ? "wss" : "ws";
    const host = window.location.hostname;
    // Use explicit port if running dev backend at different port
    const port = (window.location.port && window.location.port !== "") ? `:${window.location.port}` : "";
    // If you use a different backend host/port, set it here e.g. `${proto}://localhost:5050`
    // Default uses current host:port (works for same origin). If backend at different origin, replace.
    let base = `${proto}://${host}${port}${wsPath}`;
    // append admin + optional token
    base += base.includes("?") ? "&" : "?";
    base += adminQuery;
    if (token) base += `&token=${encodeURIComponent(token)}`;
    return base;
  }, [wsPath, adminQuery, token]);

  // helper: safely set device into map
  const upsertDevice = useCallback((deviceId, partial = {}) => {
    setDevicesMap(prev => {
      const next = new Map(prev);
      const old = next.get(deviceId) || {};
      const merged = { ...old, deviceId, ...partial };
      next.set(deviceId, merged);
      return next;
    });
  }, []);

  const removeDevice = useCallback((deviceId) => {
    setDevicesMap(prev => {
      const next = new Map(prev);
      next.delete(deviceId);
      return next;
    });
  }, []);

  const handleWsMessage = useCallback((raw) => {
    let data = null;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.warn("OTA WS: invalid JSON", err);
      return;
    }
    const type = data.type;
    switch (type) {
      case "device_list": {
        // expected data.devices = [{ deviceId, ip, status, connectedAt }]
        const list = Array.isArray(data.devices) ? data.devices : [];
        const map = new Map();
        list.forEach(d => {
          map.set(String(d.deviceId), {
            deviceId: String(d.deviceId),
            ip: d.ip,
            status: d.status || "connected",
            connectedAt: d.connectedAt ? new Date(d.connectedAt).toISOString() : new Date().toISOString(),
            otaResult: null, // { status: 'pass'|'fail', message }
          });
        });
        setDevicesMap(map);
        break;
      }

      case "device_connected": {
        const id = String(data.deviceId);
        upsertDevice(id, {
          ip: data.ip || undefined,
          status: "connected",
          connectedAt: data.time ? new Date(data.time).toISOString() : new Date().toISOString(),
        });
        break;
      }

      case "device_disconnected": {
        const id = String(data.deviceId);
        // mark offline but keep device entry (so user can still see it)
        upsertDevice(id, { status: "offline", lastSeen: new Date().toISOString() });
        break;
      }

      case "ota_batch_start": {
        // payload: versionId, targets: [{deviceId, status:'started'|'offline'}]
        const targets = Array.isArray(data.targets) ? data.targets : [];
        targets.forEach(t => {
          upsertDevice(String(t.deviceId), { otaResult: { status: t.status === "started" ? "in_progress" : "offline" } });
        });
        break;
      }

      case "ota_result": {
        // payload: deviceId, status: "pass"|"fail", message?
        const id = String(data.deviceId);
        upsertDevice(id, {
          otaResult: { status: data.status, message: data.message || null },
          // Keep status connected/disconnected as is
        });
        break;
      }

      case "ota_progress": {
        // ignore or store progress transiently if you want; we intentionally ignore per your request
        // could upsert progress if needed
        break;
      }

      default:
        console.debug("OTA WS unknown type:", type);
    }
  }, [upsertDevice]);

  const connect = useCallback(() => {
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }
    setLastError(null);
    const url = makeWsUrl();
    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        reconnectRef.current.tries = 0;
        setConnected(true);
        console.info("OTA WS connected", url);
      };

      ws.onmessage = (event) => {
        handleWsMessage(event.data);
      };

      ws.onclose = (ev) => {
        setConnected(false);
        console.warn("OTA WS closed", ev.reason || ev.code);
        // schedule reconnect
        if (reconnectRef.current.timeoutId) clearTimeout(reconnectRef.current.timeoutId);
        reconnectRef.current.tries += 1;
        const wait = Math.min(startReconnectMs * (2 ** (reconnectRef.current.tries - 1)), maxReconnectMs);
        reconnectRef.current.timeoutId = setTimeout(() => connect(), wait);
      };

      ws.onerror = (err) => {
        setLastError(err);
        console.error("OTA WS error", err);
      };
    } catch (err) {
      setLastError(err);
      console.error("OTA WS failed to create", err);
    }
  }, [makeWsUrl, handleWsMessage, startReconnectMs, maxReconnectMs]);

  const disconnect = useCallback(() => {
    if (reconnectRef.current.timeoutId) {
      clearTimeout(reconnectRef.current.timeoutId);
      reconnectRef.current.timeoutId = null;
    }
    if (wsRef.current) {
      try { wsRef.current.close(); } catch (e) {}
      wsRef.current = null;
    }
    setConnected(false);
  }, []);

  useEffect(() => {
    if (autoConnect) connect();
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect, disconnect, autoConnect]);

  // helpers to expose devices as array (sorted by status/connectedAt)
  const devices = Array.from(devicesMap.values()).sort((a,b) => {
    // connected first, then offline, then by connectedAt desc
    const weight = s => s === "connected" ? 1 : s === "offline" ? 0 : -1;
    const wa = weight(a.status), wb = weight(b.status);
    if (wa !== wb) return wb - wa;
    return (new Date(b.connectedAt || 0)) - (new Date(a.connectedAt || 0));
  });

  return {
    devices,
    devicesMap,
    connected,
    lastError,
    connect,
    disconnect,
    upsertDevice,
    removeDevice,
    // raw ws (rarely needed)
    ws: wsRef.current,
  };
}
