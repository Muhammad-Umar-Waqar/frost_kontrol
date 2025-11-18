// "use client"
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
// import { Download } from 'lucide-react'
// import AlertsChart from './AlertsChart'

// import { useDispatch, useSelector } from "react-redux";
// import { io } from "socket.io-client";
// import { useStore } from "../../contexts/storecontexts";
// import { deviceDataReceived, fetchAlertsByOrg } from "../../slices/alertsSlice";
// import { useEffect, useMemo, useState } from 'react';



// export default function VenueDetailsPanel({ 
//   selectedOrgId = null,
//   venueName = "Karim Korangi Branch",
//   freezerTemperature = -4,
//   ambientTemperature = 25,
//   batteryLow = true,
//   needMaintenance = true,
//   apiKey = "8dbf5d2a37c4178b4b03e6c49ae3f9e7",
//   chartData = [
//     { date: "05", value: 20 },
//     { date: "06", value: 35 },
//     { date: "07", value: 45 },
//     { date: "08", value: 30 },
//     { date: "09", value: 50 },
//     { date: "10", value: 40 },
//   ]
// }) {

//    const dispatch = useDispatch();
//   const { user, token } = useStore();
//   const orgId = selectedOrgId  || user?.organization || null;

//   console.log("ORGID<><><", orgId)
//   const role = user?.role ?? null;

//   // --- Redux selector: get all alerts for this org
//   const orgAlerts = useSelector((s) =>
//     orgId
//       ? s.alerts?.byOrg?.[orgId] ?? { venues: [], loading: false, error: null }
//       : { venues: [], loading: false, error: null }
//   );

// const BACKEND = import.meta.env.VITE_BACKEND_API || "http://localhost:5050"

//   // --- Setup WebSocket (live device updates)
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
//     dispatch(fetchAlertsByOrg(orgId)); // fetch all alerts on mount
//   }, [orgId, dispatch]);

//   useEffect(() => {
//     if (!socket) return;
//     const onDeviceData = (payload) => {
//       dispatch(deviceDataReceived({ organizationId: orgId, device: payload }));
//     };
//     socket.on("deviceData", onDeviceData);
//     socket.on("connect_error", (err) =>
//       console.error("Socket connect error", err)
//     );
//     return () => {
//       socket.off("deviceData", onDeviceData);
//       try {
//         socket.disconnect();
//       } catch (e) {}
//     };
//   }, [socket, dispatch, orgId]);


//   const venues = orgAlerts?.venues || [];
//   const currentVenue =
//     venues.find((v) => v.venueName === venueName) || venues[0] || null;



//   const handleDownload = () => {
//     // TODO: Backend developer will implement download functionality
//     alert(`Downloading report for ${venueName}`)
//   }

//   return (
//     <div className="w-full rounded-lg p-6 shadow-sm space-y-6" style={{backgroundColor: '#07518D12'}}>
//       {/* A. Venue Info Section */}
//       <div className="flex justify-between items-center pb-4 border-b border-[#E5E7EB]/40 mb-6">
//         <div>
//           <p className="text-sm text-[#64748B] font-medium">Venue</p>
//           <h2 className="text-sm text-[#1E293B] font-bold">{venueName}</h2>
//         </div>
//         <button
//           onClick={handleDownload}
//           className="inline-flex items-center gap-2 px-3 py-2 bg-[#2563EB] text-white rounded-full text-xs font-semibold hover:bg-[#1D4ED8] active:scale-[.98] transition shadow-sm"
//           aria-label="Download"
//         >
//           <span className="leading-none">Download</span>
//           <Download className="w-3.5 h-3.5" />
//         </button>
//       </div>

//       {/* B. Refrigerator Image */}
//       <div className="relative w-full overflow-hidden mb-4">
//         <img 
//           src="/refrigerator image.png" 
//           alt="Refrigerator" 
//           className="w-full h-auto object-cover"
//         />
//       </div>

//       {/* C. Freezer Image with Temperature Overlays */}
//       <div className="relative w-full overflow-hidden mb-6 bg-[#07518D]/[0.05] rounded-xl ">
        
//         <div className="flex flex-col-2 justify-start items-center gap-5 ">

//           <div className='flex flex-col-2 items-center justify-center ml-[10px]'>
//           <img src="/freezer-icon.svg" className="h-[60px] w-[30px]"/>
//           <div className='flex flex-col justify-end items-end'>
//           <h1 className='text-sm font-semibold '>Freezer</h1>
//           <h1 className='text-xl font-bold '>{freezerTemperature} <span className='text-xl font-thin'>C</span></h1>
//           </div>
//           </div>
          
          
//           <div className='flex flex-col-2 items-center justify-center ml-[10px]'>
//           <img src="/ambient-icon.svg" className="h-[60px] w-[30px]"/>
//           <div className='flex flex-col  items-end justify-end'>
//           <h1 className='text-sm font-semibold '>Ambient</h1>
//           <h1 className='text-xl font-bold '>{ambientTemperature} <span className='text-xl font-thin'>C</span></h1>
//           </div>
//           </div>
          

//         </div>

//         <img 
//           src="/freezer and ambient combo image.png" 
//           alt="Freezer and Ambient Combo" 
//           className="w-full h-auto object-cover"
//         />
//       </div>


//       {/* D. Status Indicators */}
//       {/* <div className="flex justify-center mb-6">
//         <div className="flex flex-col gap-2">
//           {batteryLow && (
//             <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
//               <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="m6 9 6 6 6-6"/>
//                 </svg>
//               </div>
//               <span className="text-sm font-medium text-[#1E293B]">Battery Low</span>
//             </div>
//           )}
//           {needMaintenance && (
//             <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
//               <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="m6 9 6 6 6-6"/>
//                 </svg>
//               </div>
//               <span className="text-sm font-medium text-[#1E293B]">Need maintenance</span>
//             </div>
//           )}
//         </div>
//       </div> */}

//       <div className="mb-6">
//         {venues.length > 0 ? (
//           <AlertsChart 
//             venues={venues}
//             defaultMode="battery"
//           />
//         ) : (
//           <p className="text-sm text-gray-500 text-center">No alert data available</p>
//         )}
//       </div>
//       </div>
//   )
// }









"use client";
import { Download } from "lucide-react";
import AlertsChart from "./AlertsChart";
import { useDispatch, useSelector } from "react-redux";
import { useStore } from "../../contexts/storecontexts";
import { fetchAlertsByOrg } from "../../slices/alertsSlice";
import { useEffect } from "react";

export default function VenueDetailsPanel({
  organizationId = null,
  venueName = "Karim Korangi Branch",
  freezerTemperature = -4,
  ambientTemperature = 25,
  batteryLow = true,
  needMaintenance = true,
  apiKey = "8dbf5d2a37c4178b4b03e6c49ae3f9e7",
}) {
  const dispatch = useDispatch();
  const { user } = useStore();
  const orgId = organizationId || user?.organization || null;

  console.log("ORGID", orgId)
  // --- Redux selector: get all alerts for this org
  const orgAlerts = useSelector((s) =>
    orgId
      ? s.alerts?.byOrg?.[orgId] ?? { venues: [], loading: false, error: null }
      : { venues: [], loading: false, error: null }
  );

  // --- Fetch alerts on mount
  useEffect(() => {
    if (orgId) dispatch(fetchAlertsByOrg(orgId));
  }, [orgId, dispatch]);

  const venues = orgAlerts?.venues || [];
  const currentVenue =
    venues.find((v) => v.venueName === venueName) || venues[0] || null;

  const handleDownload = () => {
    alert(`Downloading report for ${venueName}`);
  };

  return (
    <div
      className="w-full rounded-lg p-6 shadow-sm space-y-6"
      style={{ backgroundColor: "#07518D12" }}
    >
      {/* A. Venue Info Section */}
      <div className="flex justify-between items-center pb-4 border-b border-[#E5E7EB]/40 mb-6">
        <div>
          <p className="text-sm text-[#64748B] font-medium">Venue</p>
          <h2 className="text-sm text-[#1E293B] font-bold">{venueName}</h2>
        </div>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-3 py-2 bg-[#2563EB] text-white rounded-full text-xs font-semibold hover:bg-[#1D4ED8] active:scale-[.98] transition shadow-sm"
          aria-label="Download"
        >
          <span className="leading-none">Download</span>
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* B. Refrigerator Image */}
      <div className="relative w-full overflow-hidden mb-4">
        <img
          src="/ambient_freezer.svg"
          alt="Refrigerator"
          className="w-full h-auto object-cover"
        />
        <div className="flex flex-col items-center justify-center absolute top-[30%] left-[8%] ">
      <h1 className="font-bold text-white text-lg">Freezer</h1>
      <h1 className="font-bold text-white text-lg">{freezerTemperature}<span className="font-thin text-white">°C</span></h1>
        </div>
        <div className="flex flex-col items-center justify-center absolute top-[30%] right-[15%]">
      <h1 className="font-bold text-[#07518D] text-lg">Ambient</h1>
      <h1 className="font-bold text-[#07518D]  text-lg">{ambientTemperature}<span className="text-lg font-thin">°C</span></h1>
        </div>
      </div>

      {/* C. Temperature Section */}
      <div className="relative w-full overflow-hidden mb-6 bg-[#07518D]/[0.05] rounded-xl">
        <div className="flex flex-col-2 justify-start items-center gap-5">
          <div className="flex flex-col-2 items-center justify-center ml-[10px]">
            <img src="/freezer-icon.svg" className="h-[60px] w-[30px]" />
            <div className="flex flex-col justify-end items-end">
              <h1 className="text-sm font-semibold">Freezer</h1>
              <h1 className="text-xl font-bold">
                {freezerTemperature}
                <span className="text-xl font-thin">°C</span>
              </h1>
            </div>
          </div>

          <div className="flex flex-col-2 items-center justify-center ml-[10px]">
            <img src="/ambient-icon.svg" className="h-[60px] w-[30px]" />
            <div className="flex flex-col items-end justify-end">
              <h1 className="text-sm font-semibold">Ambient</h1>
              <h1 className="text-xl font-bold">
                {ambientTemperature}
                <span className="text-xl font-thin">°C</span>
              </h1>
            </div>
          </div>
        </div>

        {/* <img
          src="red-alert-icon"
          alt="Freezer and Ambient Combo"
          className="w-full h-auto object-cover"
        /> */}
      </div>

      {/* D. Alerts Chart */}
      <div className="mb-6">
        {venues.length > 0 ? (
          <AlertsChart venues={venues} defaultMode="battery" />
        ) : (
          <p className="text-sm text-gray-500 text-center">
            No alert data available
          </p>
        )}
      </div>
      <div>
        
      </div>
    </div>
  );
}
