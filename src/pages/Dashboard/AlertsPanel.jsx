// // src/components/AlertsPanel.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { io } from "socket.io-client";

// import MaintenanceList from "../Dashboard/MaintenanceList";
// import BatteryAlert from "../Dashboard/BatteryAlert";
// import { useStore } from "../../contexts/storecontexts";

// const BACKEND = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// export default function AlertsPanel() {
//   const { user, token } = useStore();
//   const organizationId = user?.organization ?? null;
//   const role = user?.role ?? null;

//   const [venues, setVenues] = useState([]); // raw API transformed venues
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // socket.io client
//   const socket = useMemo(() => {
//     if (!organizationId){
//         console.log("ORG. ID NOT FOUND!")
//          return null
//     };
//     // connect to same backend; credentials token optional (you used credentials: include on fetch)
//     return io(BACKEND, {
//       transports: ["websocket"],
//       auth: token ? { token } : undefined,
//       autoConnect: true,
//     });
//   }, [organizationId, token]);

//   // fetch /alert/:organizationId
//   useEffect(() => {
//     if (!organizationId) return;
//     let aborted = false;
//     (async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(`${BACKEND}/alert/${organizationId}`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message || "Failed to fetch alerts");

//         // data.venues is expected: [{ venueId, venueName, refrigeratorAlertDevices, batteryAlertDevices, totalDevices, ... }]
//         const rawVenues = Array.isArray(data.venues) ? data.venues : [];

//         // If only one venue in backend and you want to show only that venue -> keep single entry
//         // If you want to repeat a single venue 4 times elsewhere, you can do it in the parent — here we show just actual venues.
//         const processed = rawVenues.map((v) => {
//           // normalize ids and nested devices
//           const vid = v.venueId ?? v._id ?? (v.venue && v.venue._id) ?? null;
//           const fridge = Array.isArray(v.refrigeratorAlertDevices) ? v.refrigeratorAlertDevices : [];
//           const battery = Array.isArray(v.batteryAlertDevices) ? v.batteryAlertDevices : [];

//           // nestedItems expected: { id, name, date }
//           const fridgeNested = fridge.map((d) => ({
//             id: d.deviceId ?? d._id ?? d.id,
//             name: d.deviceId ?? "unknown",
//             date: d.timestamp ?? null,
//             ambient: d.ambient ?? (d.AmbientData && d.AmbientData.temperature) ?? null,
//             freezer: d.freezer ?? (d.FreezerData && d.FreezerData.temperature) ?? null,
//           }));

//           const batteryNested = battery.map((d) => ({
//             id: d.deviceId ?? d._id ?? d.id,
//             name: d.deviceId ?? "unknown",
//             date: d.timestamp ?? null,
//             ambient: d.ambient ?? (d.AmbientData && d.AmbientData.temperature) ?? null,
//             freezer: d.freezer ?? (d.FreezerData && d.FreezerData.temperature) ?? null,
//           }));

//           return {
//             venueId: String(vid),
//             venueName: v.venueName ?? v.name ?? `Venue ${vid}`,
//             totalDevices: v.totalDevices ?? 0,
//             totalAlerts: v.totalAlerts ?? (fridge.length + battery.length),
//             refrigeratorAlertCount: fridge.length,
//             refrigeratorAlertDevices: fridgeNested,
//             batteryAlertCount: battery.length,
//             batteryAlertDevices: batteryNested,
//           };
//         });

//         if (!aborted) {
//           setVenues(processed);
//           setLoading(false);
//         }
//       } catch (err) {
//         if (!aborted) {
//           console.error("Alerts fetch error:", err);
//           setError(err.message || "Failed to load alerts");
//           setVenues([]);
//           setLoading(false);
//         }
//       }
//     })();
//     return () => {
//       aborted = true;
//     };
//   }, [organizationId, token]);

//   // socket updates: update matching device in venue lists
//   useEffect(() => {
//     if (!socket) return;
//     const onDeviceData = (payload) => {
//       // payload structure: { deviceId, ambient, freezer, batteryAlert, refrigeratorAlert, timestamp }
//       if (!payload || !payload.deviceId) return;

//       setVenues((prev) => {
//         // create new array reference
//         const updated = prev.map((v) => {
//           // check if device exists in fridge or battery nested arrays
//           const fridgeIndex = v.refrigeratorAlertDevices.findIndex((d) => d.id === payload.deviceId);
//           const batteryIndex = v.batteryAlertDevices.findIndex((d) => d.id === payload.deviceId);

//           let newFridge = v.refrigeratorAlertDevices;
//           let newBattery = v.batteryAlertDevices;

//           // if payload indicates refrigeratorAlert true, ensure device present in fridge list
//           if (payload.refrigeratorAlert === "ALERT" || payload.refrigeratorAlert === true) {
//             if (fridgeIndex === -1) {
//               newFridge = [{ id: payload.deviceId, name: payload.deviceId, date: payload.timestamp, ambient: payload.ambient, freezer: payload.freezer }, ...v.refrigeratorAlertDevices];
//             } else {
//               newFridge = v.refrigeratorAlertDevices.map((d) => d.id === payload.deviceId ? { ...d, date: payload.timestamp, ambient: payload.ambient ?? d.ambient, freezer: payload.freezer ?? d.freezer } : d);
//             }
//           } else {
//             // if not alert anymore, remove from fridge array (optional)
//             if (fridgeIndex !== -1 && payload.refrigeratorAlert === false) {
//               newFridge = v.refrigeratorAlertDevices.filter((d) => d.id !== payload.deviceId);
//             } else if (fridgeIndex !== -1) {
//               // update last values
//               newFridge = v.refrigeratorAlertDevices.map((d) => d.id === payload.deviceId ? { ...d, date: payload.timestamp ?? d.date, ambient: payload.ambient ?? d.ambient, freezer: payload.freezer ?? d.freezer } : d);
//             }
//           }

//           // battery list handling
//           if (payload.batteryAlert === "LOW" || payload.batteryAlert === true) {
//             if (batteryIndex === -1) {
//               newBattery = [{ id: payload.deviceId, name: payload.deviceId, date: payload.timestamp, ambient: payload.ambient, freezer: payload.freezer }, ...v.batteryAlertDevices];
//             } else {
//               newBattery = v.batteryAlertDevices.map((d) => d.id === payload.deviceId ? { ...d, date: payload.timestamp, ambient: payload.ambient ?? d.ambient, freezer: payload.freezer ?? d.freezer } : d);
//             }
//           } else {
//             if (batteryIndex !== -1 && payload.batteryAlert === false) {
//               newBattery = v.batteryAlertDevices.filter((d) => d.id !== payload.deviceId);
//             } else if (batteryIndex !== -1) {
//               newBattery = v.batteryAlertDevices.map((d) => d.id === payload.deviceId ? { ...d, date: payload.timestamp ?? d.date, ambient: payload.ambient ?? d.ambient, freezer: payload.freezer ?? d.freezer } : d);
//             }
//           }

//           // compute counts again
//           const newFridgeCount = newFridge.length;
//           const newBatteryCount = newBattery.length;
//           const newTotalAlerts = newFridgeCount + newBatteryCount;

//           return {
//             ...v,
//             refrigeratorAlertDevices: newFridge,
//             batteryAlertDevices: newBattery,
//             refrigeratorAlertCount: newFridgeCount,
//             batteryAlertCount: newBatteryCount,
//             totalAlerts: newTotalAlerts,
//           };
//         });

//         return updated;
//       });
//     };

//     socket.on("deviceData", onDeviceData);
//     socket.on("connect_error", (err) => console.error("socket connect_error", err));

//     return () => {
//       socket.off("deviceData", onDeviceData);
//       try { socket.disconnect(); } catch (e) {}
//     };
//   }, [socket]);

//   // ADMIN: don't render anything (as requested)
//   if (role === "admin") {
//     return null;
//   }

//   // Prepare items arrays for the two components
//   // If single venue only -> only pass that venue's alerts (as the user asked)
//   const effectiveVenues = venues.length === 1 ? [venues[0]] : venues;

//   const maintenanceItems = effectiveVenues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.refrigeratorAlertCount || 0,
//     nestedItems: (v.refrigeratorAlertDevices || []).map((d) => ({
//       id: d.id,
//       name: d.name,
//       date: d.date,
//     })),
//   }));

//   const batteryItems = effectiveVenues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.batteryAlertCount || 0,
//     nestedItems: (v.batteryAlertDevices || []).map((d) => ({
//       id: d.id,
//       name: d.name,
//       date: d.date,
//     })),
//   }));

//   return (
//     <div className="flex-shrink-0">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="p-4" style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//           <MaintenanceList items={maintenanceItems} />
//         </div>

//         <div className="p-4" style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//           <BatteryAlert items={batteryItems} />
//         </div>
//       </div>
//     </div>
//   );
// }









// // src/components/AlertsPanel.jsx
// import React, { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import MaintenanceList from "../Dashboard/MaintenanceList";
// import BatteryAlert from "../Dashboard/BatteryAlert";
// import { useStore } from "../../contexts/storecontexts";

// import { deviceDataReceived, fetchAlertsByOrg } from "../../slices/alertsSlice";

// const BACKEND = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// export default function AlertsPanel({organizationId=null}) {
//     const dispatch = useDispatch();
//     const { user, token } = useStore();
//     const orgId = organizationId ?? user?.organization ??  null;
//     const role = user?.role ?? null;
//     console.log("organizationId>>", organizationId)
    
//   const orgAlerts = useSelector((s) => (orgId ? s.alerts?.byOrg?.[orgId] ?? { venues: [], loading: false, error: null } : { venues: [], loading: false, error: null }));
//  console.log("OOORG ALERTS>>", orgAlerts)
//   // connect socket once per orgId
//   const socket = useMemo(() => {
//     if (!orgId) return null;
//     return io(BACKEND, {
//       transports: ["websocket"],
//       auth: token ? { token } : undefined,
//       autoConnect: true,
//     });
//   }, [orgId, token]);

//   useEffect(() => {
//     if (!orgId) return;
//     dispatch(fetchAlertsByOrg(orgId));
//   }, [orgId, dispatch]);

//   useEffect(() => {
//     if (!socket) return;
//     const onDeviceData = (payload) => {
//       // socket payload from esp: assume { deviceId, ambient, freezer, batteryAlert, refrigeratorAlert, timestamp, venueId? }
//       dispatch(deviceDataReceived({ organizationId: orgId, device: payload }));
//     };
//     socket.on("deviceData", onDeviceData);
//     socket.on("connect_error", (err) => console.error("Socket connect error", err));
//     return () => {
//       socket.off("deviceData", onDeviceData);
//       try { socket.disconnect(); } catch (e) {}
//     };
//   }, [socket, dispatch, orgId]);



//   const venues = orgAlerts?.venues || [];

//   const maintenanceItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.refrigeratorAlertCount || 0,
//     nestedItems: (v.refrigeratorAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));
//   const batteryItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.batteryAlertCount || 0,
//     nestedItems: (v.batteryAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   // Chart data: each bar is a venue; value = batteryAlertCount + refrigeratorAlertCount
//   const chartData = venues.map((v) => ({
//     date: v.venueName,
//     value: (v.batteryAlertCount || 0) + (v.refrigeratorAlertCount || 0),
//   }));

//   // if you want the single-venue behavior (only show one venue) you can choose:
//   // const effectiveVenues = venues.length === 1 ? [venues[0]] : venues;

//   return (
//     <div className="flex-shrink-0">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="p-4" style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//           <MaintenanceList items={maintenanceItems} />
//         </div>
//         <div className="p-4" style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//           <BatteryAlert items={batteryItems} />
//         </div>
//       </div>

//       {/* Example: where to place chart - small snippet. You can move/replace VenueDetailsPanel's chartData */}
//       {/* <div className="mt-4 p-4 bg-white rounded shadow"> 
//            <MiniAlertsChart data={chartData} /> 
//          </div> */}
//     </div>
//   );
// }





// src/components/AlertsPanel.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MaintenanceList from "../Dashboard/MaintenanceList";
import BatteryAlert from "../Dashboard/BatteryAlert";
import { useStore } from "../../contexts/storecontexts";
import { fetchAlertsByOrg } from "../../slices/alertsSlice";

export default function AlertsPanel({ organizationId = null, pollInterval = null }) {
  const dispatch = useDispatch();
  const { user } = useStore();
  const orgId = organizationId || user?.organization || null;
  const role = user?.role ?? null;

  // select alerts for org (stable fallback)
  const orgAlerts = useSelector((s) =>
    orgId ? s.alerts?.byOrg?.[orgId] ?? { venues: [], loading: false, error: null } : { venues: [], loading: false, error: null }
  );

  // initial fetch + when orgId changes
  useEffect(() => {
    if (!orgId) return;
    dispatch(fetchAlertsByOrg(orgId));
  }, [orgId, dispatch]);

  // optional polling (pass pollInterval in ms to enable)
  useEffect(() => {
    if (!orgId || !pollInterval) return;
    const id = setInterval(() => {
      dispatch(fetchAlertsByOrg(orgId));
    }, pollInterval);
    return () => clearInterval(id);
  }, [orgId, pollInterval, dispatch]);

  const venues = orgAlerts?.venues || [];

  const maintenanceItems = venues.map((v) => ({
    id: v.venueId,
    name: v.venueName,
    devices: v.refrigeratorAlertCount || 0,
    nestedItems: (v.refrigeratorAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
  }));
  const batteryItems = venues.map((v) => ({
    id: v.venueId,
    name: v.venueName,
    devices: v.batteryAlertCount || 0,
    nestedItems: (v.batteryAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
  }));

  return (
    <div className="flex-shrink-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4" style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
          <MaintenanceList items={maintenanceItems} />
        </div>
        <div className="p-4" style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
          <BatteryAlert items={batteryItems} />
        </div>
      </div>
    </div>
  );
}







// // src/components/AlertsPanel.jsx
// import React, { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { io } from "socket.io-client";

// import MaintenanceList from "../Dashboard/MaintenanceList";
// import BatteryAlert from "../Dashboard/BatteryAlert";
// import { useStore } from "../../contexts/storecontexts";
// import { deviceDataReceived, fetchAlertsByOrg } from "../../slices/alertsSlice";

// const BACKEND = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// export default function AlertsPanel() {
//   const dispatch = useDispatch();
//   const { user, token } = useStore();
//   const orgId = user?.organization ?? null;
//   const role = user?.role ?? null;

//   const orgAlerts = useSelector(
//     (s) =>
//       orgId
//         ? s.alerts?.byOrg?.[orgId] ?? { venues: [], loading: false, error: null }
//         : { venues: [], loading: false, error: null }
//   );

//   // ✅ Connect socket only once per orgId
//   const socket = useMemo(() => {
//     if (!orgId) return null;
//     const sock = io(BACKEND, {
//       transports: ["websocket"],
//       auth: token ? { token } : undefined,
//       autoConnect: true,
//     });
//     sock.on("connect", () => console.log("✅ Socket connected:", sock.id));
//     sock.on("connect_error", (err) => console.error("❌ Socket connect error:", err));
//     return sock;
//   }, [orgId, token]);

//   // ✅ Fetch alerts on org change
//   useEffect(() => {
//     if (orgId) dispatch(fetchAlertsByOrg(orgId));
//   }, [orgId, dispatch]);

//   // ✅ Listen for real-time device data
//   useEffect(() => {
//     if (!socket) return;
//     const onDeviceData = (payload) => {
//       console.log("📡 Device Data Received:", payload);
//       dispatch(deviceDataReceived({ organizationId: orgId, device: payload }));
//     };
//     socket.on("deviceData", onDeviceData);

//     return () => {
//       socket.off("deviceData", onDeviceData);
//       try {
//         socket.disconnect();
//       } catch (e) {
//         console.warn("Socket disconnect error:", e);
//       }
//     };
//   }, [socket, dispatch, orgId]);

//   // Hide for admin as requested
//   if (role === "admin") return null;

//   const venues = orgAlerts?.venues || [];

//   // ✅ Memoized derived data
//   const maintenanceItems = useMemo(
//     () =>
//       venues.map((v) => ({
//         id: v.venueId,
//         name: v.venueName,
//         devices: v.refrigeratorAlertCount || 0,
//         nestedItems: (v.refrigeratorAlertDevices || []).map((d) => ({
//           id: d.id,
//           name: d.name,
//           date: d.date,
//         })),
//       })),
//     [venues]
//   );

//   const batteryItems = useMemo(
//     () =>
//       venues.map((v) => ({
//         id: v.venueId,
//         name: v.venueName,
//         devices: v.batteryAlertCount || 0,
//         nestedItems: (v.batteryAlertDevices || []).map((d) => ({
//           id: d.id,
//           name: d.name,
//           date: d.date,
//         })),
//       })),
//     [venues]
//   );

//   const chartData = useMemo(
//     () =>
//       venues.map((v) => ({
//         date: v.venueName,
//         value:
//           (v.batteryAlertCount || 0) + (v.refrigeratorAlertCount || 0),
//       })),
//     [venues]
//   );

//   return (
//     <div className="flex-shrink-0">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div
//           className="p-4"
//           style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}
//         >
//           <MaintenanceList items={maintenanceItems} />
//         </div>
//         <div
//           className="p-4"
//           style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}
//         >
//           <BatteryAlert items={batteryItems} />
//         </div>
//       </div>

//       {/* Optional: chart preview section */}
//       {/* <div className="mt-4 p-4 bg-white rounded shadow">
//           <MiniAlertsChart data={chartData} />
//         </div> */}
//     </div>
//   );
// }
