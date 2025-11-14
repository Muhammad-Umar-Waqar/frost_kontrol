// // src/components/AlertsChart.jsx
// "use client";
// import React, { useMemo, useState } from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";

// /**
//  * Props:
//  *  - venues: normalized venues array from alerts slice
//  *    each item shape: { venueId, venueName, refrigeratorAlertCount, batteryAlertCount, ... }
//  *  - defaultMode: "battery" | "refrigerator"
//  */
// export default function AlertsChart({ venues = [], defaultMode = "battery" }) {
//   const [mode, setMode] = useState(defaultMode);

//   // compute chart data from venues + current mode
//   const data = useMemo(() => {
//     return (venues || []).map((v) => ({
//       name: v.venueName || v.venueId || "Unknown",
//       value:
//         mode === "battery"
//           ? Number(v.batteryAlertCount || 0)
//           : Number(v.refrigeratorAlertCount || 0),
//       venueId: v.venueId,
//     }));
//   }, [venues, mode]);

//   const total = useMemo(() => data.reduce((s, d) => s + (d.value || 0), 0), [data]);

//   return (
//     <div className="w-full bg-white rounded-lg p-4 shadow-sm">
//       <div className="flex items-center justify-between mb-3">
//         <div>
//           <h3 className="text-sm text-gray-600">Alerts chart</h3>
//           <div className="text-sm font-semibold text-gray-800">
//             {mode === "battery" ? "Battery Alerts" : "Refrigerator Alerts"}
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="text-xs text-gray-500 mr-2">Show</div>
//           <select
//             value={mode}
//             onChange={(e) => setMode(e.target.value)}
//             className="border rounded px-2 py-1 text-sm"
//             aria-label="Select alert type"
//           >
//             <option value="battery">Battery Alert</option>
//             <option value="refrigerator">Refrigerator Alert</option>
//           </select>
//         </div>
//       </div>

//       <div className="mb-2 text-xs text-gray-500">Total: {total}</div>

//       <div style={{ width: "100%", height: 200 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
//             <XAxis
//               dataKey="name"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fontSize: 12, fill: "#374151" }}
//               interval={0}
//               angle={-20}
//               textAnchor="end"
//               height={50}
//             />
//             <YAxis hide />
//             <Tooltip
//               cursor={{ fill: "rgba(37,99,235,0.06)" }}
//               formatter={(value) => [value, mode === "battery" ? "Battery" : "Fridge"]}
//             />
//             <defs>
//               <linearGradient id="alertBarGradient" x1="0" x2="0" y1="0" y2="1">
//                 <stop offset="0%" stopColor="#60A5FA" />
//                 <stop offset="100%" stopColor="#2563EB" />
//               </linearGradient>
//             </defs>
//             <Bar
//               dataKey="value"
//               fill="url(#alertBarGradient)"
//               radius={[6, 6, 0, 0]}
//               barSize={36}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }




// src/components/AlertsChart.jsx
"use client";
import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

/**
 * Props:
 *  - venues: normalized venues array from alerts slice
 *    each item shape: { venueId, venueName, refrigeratorAlertCount, batteryAlertCount, ... }
 *  - defaultMode: "battery" | "refrigerator"
 */
export default function AlertsChart({ venues = [], defaultMode = "battery" }) {
  const [mode, setMode] = useState(defaultMode);

  // compute chart data from venues + current mode
  const data = useMemo(() => {
    return (venues || []).map((v) => ({
      name: v.venueName || v.venueId || "Unknown",
      value:
        mode === "battery"
          ? Number(v.batteryAlertCount || 0)
          : Number(v.refrigeratorAlertCount || 0),
      venueId: v.venueId,
    }));
  }, [venues, mode]);

  
  return (
       <div className="w-full bg-white rounded-xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-end mb-3">

        {/* Mode Selector */}
        <div className="flex items-center gap-2">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select alert type"
          >
            <option value="battery">Battery</option>
            <option value="refrigerator">Refrigerator</option>
          </select>
        </div>

      </div>

      {/* E. Analytics Chart (new design) */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "rgba(37, 99, 235, 0.1)" }}
              contentStyle={{
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            <Bar
              dataKey="value"
              radius={[32, 32, 32, 32]}
               barSize={30}
              fill="url(#barGradient)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
