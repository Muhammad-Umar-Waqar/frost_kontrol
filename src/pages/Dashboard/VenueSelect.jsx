// // src/components/VenueSelect.jsx
// import React, { useEffect, useState } from "react";
// import { useStore } from "../../contexts/storecontexts";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
// const getToken = () => localStorage.getItem("token");

// /**
//  * Props:
//  * - organizationId (required) : selected organization id to fetch venues for
//  * - value : currently selected venue id (optional, controlled)
//  * - onChange : function(venueId) => void
//  * - className : optional styling
//  */
// export default function VenueSelect({ organizationId, value, onChange, className = "" }) {
//   const [venues, setVenues] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selected, setSelected] = useState(value ?? "");

//   const {user} = useStore();


//   useEffect(() => {
//     setSelected(value ?? "");
//   }, [value]);

//   useEffect(() => {
//     if (!organizationId) {
//       setVenues([]);
//       setSelected("");
//       setError(null);
//       return;
//     }

//     const abortCtrl = new AbortController();
//     const fetchVenues = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const token = getToken();
//         const res = await fetch(`${BASE}/venue/venue-by-org/${organizationId}`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//           signal: abortCtrl.signal,
//         });

//         const data = await res.json();

//         console.log("DATA>><<", data)
//         if (!res.ok) {
//           const message = data?.message || "Failed to fetch venues";
//           setVenues([]);
//           setSelected("");
//           setError(message);
//           setLoading(false);
//           return;
//         }

//         // support both shapes: array or { venues: [...] }
//         const arr = Array.isArray(data) ? data : Array.isArray(data?.venues) ? data.venues : [];

//         setVenues(arr);

//         console.log("VENUESSS>>", arr.length)
//         // default-select first venue if parent didn't pass one
//         if ((!value || value === "") && arr.length > 0) {
//           const firstId = String(arr[0]._id ?? arr[0].id ?? arr[0]);
//           setSelected(firstId);
//           if (typeof onChange === "function") onChange(firstId);
//         } else if (value) {
//           setSelected(value);
//         }
//       } catch (err) {
//         if (err.name === "AbortError") return;
//         console.error("Venue fetch error:", err);
//         setError(err.message || "Network error");
//         setVenues([]);
//         setSelected("");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVenues();
//     return () => abortCtrl.abort();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [organizationId]);

//   const handleChange = (e) => {
//     const id = e.target.value;
//     setSelected(id);
//     if (typeof onChange === "function") onChange(id);
//   };


//   if (user?.role === "user" && venues?.length <= 4) {
//     return null; // Do not render anything
//   }

//   return (
//     <div className={className}>
//       <select value={selected} onChange={handleChange} className="w-full rounded-md border px-3 py-2" disabled={loading || !organizationId}>
//         <option value="">
          
//           {loading ? "Loading venues..." : ((user?.role === "admin") && !organizationId ? "Select an organization first" : "Select venue")}
//         </option>
//         {venues.map((v) => {
//           const id = v._id ?? v.id ?? v;
//           const name = v.name ?? v.venue_name ?? String(id);
//           return (
//             <option key={id} value={String(id)}>
//               {name}
//             </option>
//           );
//         })}
//       </select>
//       {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
//     </div>
//   );
// }











// src/components/VenueSelect.jsx
import React, { useEffect, useState } from "react";
import { useStore } from "../../contexts/storecontexts";

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
const getToken = () => localStorage.getItem("token");

/**
 * Props:
 * - organizationId (required)
 * - value : selected venue id
 * - onChange : fn(id)
 * - className
 * - excludeFirstN : number of first venues to exclude from the select (default 0)
 */
export default function VenueSelect({ organizationId, value, onChange, className = "", excludeFirstN = 0 }) {
  const [venues, setVenues] = useState([]);
  const [visibleVenues, setVisibleVenues] = useState([]); // after excluding
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(value ?? "");

  const { user } = useStore();

  useEffect(() => {
    setSelected(value ?? "");
  }, [value]);

  useEffect(() => {
    if (!organizationId) {
      setVenues([]);
      setVisibleVenues([]);
      setSelected("");
      setError(null);
      return;
    }

    const abortCtrl = new AbortController();
    const fetchVenues = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = getToken();
        const res = await fetch(`${BASE}/venue/venue-by-org/${organizationId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: abortCtrl.signal,
        });

        const data = await res.json();
        if (!res.ok) {
          const message = data?.message || "Failed to fetch venues";
          setVenues([]);
          setVisibleVenues([]);
          setSelected("");
          setError(message);
          setLoading(false);
          return;
        }

        const arr = Array.isArray(data) ? data : Array.isArray(data?.venues) ? data.venues : [];
        setVenues(arr);

        // compute visible venues after excluding first N (only when requested)
        const filtered = excludeFirstN > 0 ? arr.slice(excludeFirstN) : arr;
        setVisibleVenues(filtered);

        // default-select first visible venue if parent didn't pass one and visible list exists
        if ((!value || value === "") && filtered.length > 0) {
          const firstId = String(filtered[0]._id ?? filtered[0].id ?? filtered[0]);
          setSelected(firstId);
          if (typeof onChange === "function") onChange(firstId);
        } else if (value) {
          setSelected(value);
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Venue fetch error:", err);
        setError(err.message || "Network error");
        setVenues([]);
        setVisibleVenues([]);
        setSelected("");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
    return () => abortCtrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId, excludeFirstN]);

  const handleChange = (e) => {
    const id = e.target.value;
    setSelected(id);
    if (typeof onChange === "function") onChange(id);
  };

  // keep hiding behavior: if user and total venues <= 4 => don't show select
  if (user?.role === "user" && venues?.length <= 4) {
    return null;
  }

  // Render the select using visibleVenues (which may exclude first N)
  return (
    <div className={className}>
      <select value={selected} onChange={handleChange} className="w-full rounded-md border px-3 py-2" disabled={loading || !organizationId}>
        <option value="">
          {loading ? "Loading venues..." : ((user?.role === "admin") && !organizationId ? "Select an organization first" : "Select venue")}
        </option>
        {visibleVenues.map((v) => {
          const id = v._id ?? v.id ?? v;
          const name = v.name ?? v.venue_name ?? String(id);
          return (
            <option key={id} value={String(id)}>
              {name}
            </option>
          );
        })}
      </select>
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </div>
  );
}
