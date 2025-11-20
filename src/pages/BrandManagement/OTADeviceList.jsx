// import { useState, useEffect } from 'react';
// import { Check } from 'lucide-react';
// import Swal from 'sweetalert2';
// import "../../styles/pages/management-pages.css"

// const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
//   const [devices, setDevices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDevices, setSelectedDevices] = useState(new Set());
//   const [versions, setVersions] = useState(['3.05.10', '3.04.08', '3.03.05']);
//   const [currentVersion, setCurrentVersion] = useState('3.05.10');

//   // Mock device data
//   useEffect(() => {
//     // TODO: Replace with actual API call
//     const mockDevices = [
//       { id: 1, name: 'Freezer 345-554', version: '3.11.32', status: 'pass' },
//       { id: 2, name: 'Freezer 346-555', version: '2.05.21', status: 'fail' },
//       { id: 3, name: 'Freezer 347-556', version: '3.14.12', status: 'pass' },
//       { id: 4, name: 'Freezer 348-557', version: '2.08.15', status: 'pass' },
//       { id: 5, name: 'Freezer 349-558', version: '3.10.09', status: 'fail' },
//       { id: 6, name: 'Freezer 350-559', version: '3.12.20', status: 'pass' },
//       { id: 7, name: 'Freezer 351-560', version: '2.11.18', status: 'pass' },
//       { id: 8, name: 'Freezer 352-561', version: '3.09.14', status: 'fail' },
//       { id: 9, name: 'Freezer 353-562', version: '3.15.08', status: 'pass' },
//     ];
    
//     setDevices(mockDevices);
//     setLoading(false);
//   }, []);

//   const handleDeviceToggle = (deviceId) => {
//     const newSelected = new Set(selectedDevices);
//     if (newSelected.has(deviceId)) {
//       newSelected.delete(deviceId);
//     } else {
//       newSelected.add(deviceId);
//     }
//     setSelectedDevices(newSelected);
//   };

//   const handleSelectAll = () => {
//     if (selectedDevices.size === devices.length) {
//       setSelectedDevices(new Set());
//     } else {
//       setSelectedDevices(new Set(devices.map(d => d.id)));
//     }
//   };

//   const handleOTA = () => {
//     if (selectedDevices.size === 0) {
//       Swal.fire({
//         title: 'Error',
//         text: 'Please select at least one device',
//         icon: 'error'
//       });
//       return;
//     }

//     // TODO: Implement OTA update logic
//     Swal.fire({
//       title: 'Success',
//       text: `OTA update initiated for ${selectedDevices.size} device(s)`,
//       icon: 'success'
//     });
//   };

//   const passCount = devices.filter(d => d.status === 'pass').length;
//   const failCount = devices.filter(d => d.status === 'fail').length;

//   return (
//     <>
//       <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: '#EEF3F9' }}>
//         <div className="flex-shrink-0 px-4 pt-4">
//           <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>
          
//           {/* Version ID Dropdown */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Version ID</label>
//             <select
//               value={currentVersion}
//               onChange={(e) => {
//                 setCurrentVersion(e.target.value);
//                 onVersionSelect && onVersionSelect(e.target.value);
//               }}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//             >
//               {versions.map((version) => (
//                 <option key={version} value={version}>
//                   {version}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
//             <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//           </div>
//         </div>

//         {/* Device List with Scroll - Flexible */}
//         <div className="flex-1 min-h-0 px-4 overflow-hidden">
//           <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
//             {loading ? (
//               <div className="text-center py-4">Loading devices...</div>
//             ) : (
//               <div className="space-y-2 pb-2">
//                 {devices.map((device) => (
//                   <div
//                     key={device.id}
//                     className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-center gap-3 flex-1 min-w-0">
//                       <div className="relative flex-shrink-0">
//                         <input
//                           type="checkbox"
//                           checked={selectedDevices.has(device.id)}
//                           onChange={() => handleDeviceToggle(device.id)}
//                           className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
//                         />
//                       </div>
//                       <span className="text-gray-800 font-medium flex-1 truncate">{device.name}</span>
//                       <span className="text-gray-600 text-sm flex-shrink-0 ml-2">{device.version}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Summary Boxes - Fixed at bottom */}
//         <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
//           {/* No. of Devices */}
//           <div className="bg-gray-200 rounded-lg p-4">
//             <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
//             <p className="text-gray-800 font-bold text-xl">
//               {devices.length < 10 ? `0${devices.length}` : devices.length}
//             </p>
//           </div>

//           {/* PASS */}
//           <div className="bg-green-500 rounded-lg p-4 text-white">
//             <p className="font-semibold mb-1">PASS</p>
//             <p className="text-2xl font-bold">{passCount < 10 ? `0${passCount}` : passCount}</p>
//           </div>

//           {/* FAIL */}
//           <div className="bg-orange-400 rounded-lg p-4 text-white">
//             <p className="font-semibold mb-1">Fail</p>
//             <p className="text-2xl font-bold">{failCount < 10 ? `0${failCount}` : failCount}</p>
//           </div>

//           {/* OTA Button */}
//           <button
//             onClick={handleOTA}
//             className="bg-[#0D5CA4] hover:bg-[#0A4A8A] text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md"
//           >
//             OTA
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OTADeviceList;









// import { useState, useEffect } from 'react';
// import { Check } from 'lucide-react';
// import Swal from 'sweetalert2';
// import "../../styles/pages/management-pages.css"

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
//   const [devices, setDevices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDevices, setSelectedDevices] = useState(new Set());
//   const [versions, setVersions] = useState([]);
//   const [currentVersion, setCurrentVersion] = useState(selectedVersion || '');
//   const [loadingVersions, setLoadingVersions] = useState(false);

//   // Mock device data (you had this before)
//   useEffect(() => {
//     const mockDevices = [
//       { id: 1, name: 'Freezer 345-554', version: '3.11.32', status: 'pass' },
//       { id: 2, name: 'Freezer 346-555', version: '2.05.21', status: 'fail' },
//       { id: 3, name: 'Freezer 347-556', version: '3.14.12', status: 'pass' },
//       { id: 4, name: 'Freezer 348-557', version: '2.08.15', status: 'pass' },
//       { id: 5, name: 'Freezer 349-558', version: '3.10.09', status: 'fail' },
//       { id: 6, name: 'Freezer 350-559', version: '3.12.20', status: 'pass' },
//       { id: 7, name: 'Freezer 351-560', version: '2.11.18', status: 'pass' },
//       { id: 8, name: 'Freezer 352-561', version: '3.09.14', status: 'fail' },
//       { id: 9, name: 'Freezer 353-562', version: '3.15.08', status: 'pass' },
//     ];
//     setDevices(mockDevices);
//     setLoading(false);
//   }, []);

//   // Fetch available OTA files / versions from backend
//   useEffect(() => {
//     const fetchVersions = async () => {
//       setLoadingVersions(true);
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(`${BASE}/ota/all`, {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           }
//         });

//         if (!res.ok) {
//           // 404 if no files found - treat as no versions
//           const data = await res.json().catch(() => ({}));
//           console.warn('Failed to fetch OTA versions:', data?.message || res.statusText);
//           setVersions([]);
//           setLoadingVersions(false);
//           return;
//         }

//         const data = await res.json();
//         // backend returns array of ota documents with versionId
//         const arr = Array.isArray(data) ? data : [];
//         const verList = arr.map(f => f.versionId).filter(Boolean);
//         setVersions(verList);
//         // if parent supplied a selectedVersion prop, prioritize it, else use first version
//         if (selectedVersion) {
//           setCurrentVersion(selectedVersion);
//         } else if (verList.length > 0) {
//           setCurrentVersion(verList[0]);
//           onVersionSelect && onVersionSelect(verList[0]);
//         }
//       } catch (err) {
//         console.error('Error fetching OTA versions:', err);
//         setVersions([]);
//       } finally {
//         setLoadingVersions(false);
//       }
//     };

//     fetchVersions();
//     // we intentionally don't depend on selectedVersion so this fetch runs on mount (or remount)
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   // keep currentVersion in sync if parent changes selectedVersion
//   useEffect(() => {
//     if (selectedVersion && selectedVersion !== currentVersion) {
//       setCurrentVersion(selectedVersion);
//     }
//   }, [selectedVersion]);

//   const handleDeviceToggle = (deviceId) => {
//     const newSelected = new Set(selectedDevices);
//     if (newSelected.has(deviceId)) newSelected.delete(deviceId);
//     else newSelected.add(deviceId);
//     setSelectedDevices(newSelected);
//   };

//   const handleSelectAll = () => {
//     if (selectedDevices.size === devices.length) setSelectedDevices(new Set());
//     else setSelectedDevices(new Set(devices.map(d => d.id)));
//   };

//   const handleOTA = () => {
//     if (selectedDevices.size === 0) {
//       Swal.fire({ title: 'Error', text: 'Please select at least one device', icon: 'error' });
//       return;
//     }

//     // TODO: Implement OTA update logic for selected devices and currentVersion
//     Swal.fire({
//       title: 'Success',
//       text: `OTA update initiated for ${selectedDevices.size} device(s) (version: ${currentVersion || 'N/A'})`,
//       icon: 'success'
//     });
//   };

//   const passCount = devices.filter(d => d.status === 'pass').length;
//   const failCount = devices.filter(d => d.status === 'fail').length;

//   return (
//     <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: '#EEF3F9' }}>
//       <div className="flex-shrink-0 px-4 pt-4">
//         <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>

//         {/* Version ID Dropdown */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Version ID</label>
//           <select
//             value={currentVersion}
//             onChange={(e) => {
//               setCurrentVersion(e.target.value);
//               onVersionSelect && onVersionSelect(e.target.value);
//             }}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//           >
//             {loadingVersions ? (
//               <option>Loading versions...</option>
//             ) : versions.length === 0 ? (
//               <option value="">No versions available</option>
//             ) : (
//               versions.map((version) => (
//                 <option key={version} value={version}>
//                   {version}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         <div className="mb-4">
//           <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
//           <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//         </div>
//       </div>

//       {/* Device List with Scroll - Flexible */}
//       <div className="flex-1 min-h-0 px-4 overflow-hidden">
//         <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
//           {loading ? (
//             <div className="text-center py-4">Loading devices...</div>
//           ) : (
//             <div className="space-y-2 pb-2">
//               {devices.map((device) => (
//                 <div key={device.id} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <div className="relative flex-shrink-0">
//                       <input
//                         type="checkbox"
//                         checked={selectedDevices.has(device.id)}
//                         onChange={() => handleDeviceToggle(device.id)}
//                         className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
//                       />
//                     </div>
//                     <span className="text-gray-800 font-medium flex-1 truncate">{device.name}</span>
//                     <span className="text-gray-600 text-sm flex-shrink-0 ml-2">{device.version}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Summary Boxes - Fixed at bottom */}
//       <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
//         <div className="bg-gray-200 rounded-lg p-4">
//           <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
//           <p className="text-gray-800 font-bold text-xl">{devices.length < 10 ? `0${devices.length}` : devices.length}</p>
//         </div>

//         <div className="bg-green-500 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">PASS</p>
//           <p className="text-2xl font-bold">{passCount < 10 ? `0${passCount}` : passCount}</p>
//         </div>

//         <div className="bg-orange-400 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">Fail</p>
//           <p className="text-2xl font-bold">{failCount < 10 ? `0${failCount}` : failCount}</p>
//         </div>

//         <button onClick={handleOTA} className="bg-[#0D5CA4] hover:bg-[#0A4A8A] text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md">
//           OTA
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OTADeviceList;





// GOTO CODE
// import { useState, useEffect } from 'react';
// import { Check } from 'lucide-react';
// import Swal from 'sweetalert2';
// import "../../styles/pages/management-pages.css"

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
//   const [devices, setDevices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDevices, setSelectedDevices] = useState(new Set());
//   const [versions, setVersions] = useState([]);
//   const [currentVersion, setCurrentVersion] = useState(selectedVersion || '');
//   const [loadingVersions, setLoadingVersions] = useState(false);

//   // Mock device data (still mocked until device APIs are integrated)
//   useEffect(() => {
//     const mockDevices = [
//       { id: 1, name: 'Freezer 345-554', version: '3.11.32', status: 'pass' },
//       { id: 2, name: 'Freezer 346-555', version: '2.05.21', status: 'fail' },
//       { id: 3, name: 'Freezer 347-556', version: '3.14.12', status: 'pass' },
//       { id: 4, name: 'Freezer 348-557', version: '2.08.15', status: 'pass' },
//       { id: 5, name: 'Freezer 349-558', version: '3.10.09', status: 'fail' },
//       { id: 6, name: 'Freezer 350-559', version: '3.12.20', status: 'pass' },
//       { id: 7, name: 'Freezer 351-560', version: '2.11.18', status: 'pass' },
//       { id: 8, name: 'Freezer 352-561', version: '3.09.14', status: 'fail' },
//       { id: 9, name: 'Freezer 353-562', version: '3.15.08', status: 'pass' },
//     ];
//     setDevices(mockDevices);
//     setLoading(false);
//   }, []);

//   // Fetch versions from backend and correctly handle 404 (no files)
//   useEffect(() => {
//     const fetchVersions = async () => {
//       setLoadingVersions(true);
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(`${BASE}/ota/all`, {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           }
//         });

//         // Attempt JSON parse only if content-type indicates JSON
//         const ct = res.headers.get?.('content-type') || '';
//         let data = null;
//         if (ct.includes('application/json')) {
//           try { data = await res.json(); } catch (e) { data = null; console.warn('Invalid JSON from /ota/all'); }
//         }

//         if (res.status === 404) {
//           // Backend uses 404 when there are no files
//           setVersions([]);
//           setCurrentVersion('');
//           if (onVersionSelect) onVersionSelect('');
//           setLoadingVersions(false);
//           return;
//         }

//         if (!res.ok) {
//           console.warn('Failed to fetch OTA versions:', data?.message || res.statusText);
//           setVersions([]);
//           setCurrentVersion('');
//           if (onVersionSelect) onVersionSelect('');
//           setLoadingVersions(false);
//           return;
//         }

//         const arr = Array.isArray(data) ? data : [];
//         const verList = arr.map(f => f.versionId).filter(Boolean);
//         setVersions(verList);

//         if (selectedVersion) {
//           setCurrentVersion(selectedVersion);
//         } else if (verList.length > 0) {
//           setCurrentVersion(verList[0]);
//           onVersionSelect && onVersionSelect(verList[0]);
//         } else {
//           setCurrentVersion('');
//           onVersionSelect && onVersionSelect('');
//         }
//       } catch (err) {
//         console.error('Error fetching OTA versions:', err);
//         setVersions([]);
//         setCurrentVersion('');
//         onVersionSelect && onVersionSelect('');
//       } finally {
//         setLoadingVersions(false);
//       }
//     };

//     fetchVersions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // mount-only

//   useEffect(() => {
//     if (selectedVersion && selectedVersion !== currentVersion) {
//       setCurrentVersion(selectedVersion);
//     }
//   }, [selectedVersion]);

//   const handleDeviceToggle = (deviceId) => {
//     const newSelected = new Set(selectedDevices);
//     if (newSelected.has(deviceId)) newSelected.delete(deviceId);
//     else newSelected.add(deviceId);
//     setSelectedDevices(newSelected);
//   };

//   const handleSelectAll = () => {
//     if (selectedDevices.size === devices.length) setSelectedDevices(new Set());
//     else setSelectedDevices(new Set(devices.map(d => d.id)));
//   };

//   const handleOTA = () => {
//     if (selectedDevices.size === 0) {
//       Swal.fire({ title: 'Error', text: 'Please select at least one device', icon: 'error' });
//       return;
//     }

//     // TODO: Implement OTA action for selected devices using currentVersion
//     Swal.fire({
//       title: 'Success',
//       text: `OTA update initiated for ${selectedDevices.size} device(s) (version: ${currentVersion || 'N/A'})`,
//       icon: 'success'
//     });
//   };

//   const passCount = devices.filter(d => d.status === 'pass').length;
//   const failCount = devices.filter(d => d.status === 'fail').length;

//   return (
//     <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: '#EEF3F9' }}>
//       <div className="flex-shrink-0 px-4 pt-4">
//         <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Version ID</label>
//           <select
//             value={currentVersion}
//             onChange={(e) => {
//               setCurrentVersion(e.target.value);
//               onVersionSelect && onVersionSelect(e.target.value);
//             }}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//             disabled={loadingVersions}
//           >
//             {loadingVersions ? (
//               <option>Loading versions...</option>
//             ) : versions.length === 0 ? (
//               <option value="">No versions available</option>
//             ) : (
//               versions.map((version) => (
//                 <option key={version} value={version}>
//                   {version}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         <div className="mb-4">
//           <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
//           <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//         </div>
//       </div>

//       <div className="flex-1 min-h-0 px-4 overflow-hidden">
//         <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
//           {loading ? (
//             <div className="text-center py-4">Loading devices...</div>
//           ) : (
//             <div className="space-y-2 pb-2">
//               {devices.map((device) => (
//                 <div key={device.id} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <div className="relative flex-shrink-0">
//                       <input
//                         type="checkbox"
//                         checked={selectedDevices.has(device.id)}
//                         onChange={() => handleDeviceToggle(device.id)}
//                         className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
//                       />
//                     </div>
//                     <span className="text-gray-800 font-medium flex-1 truncate">{device.name}</span>
//                     <span className="text-gray-600 text-sm flex-shrink-0 ml-2">{device.version}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
//         <div className="bg-gray-200 rounded-lg p-4">
//           <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
//           <p className="text-gray-800 font-bold text-xl">{devices.length < 10 ? `0${devices.length}` : devices.length}</p>
//         </div>

//         <div className="bg-green-500 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">PASS</p>
//           <p className="text-2xl font-bold">{passCount < 10 ? `0${passCount}` : passCount}</p>
//         </div>

//         <div className="bg-orange-400 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">Fail</p>
//           <p className="text-2xl font-bold">{failCount < 10 ? `0${failCount}` : failCount}</p>
//         </div>

//         <button onClick={handleOTA} className="bg-[#0D5CA4] hover:bg-[#0A4A8A] text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md">
//           OTA
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OTADeviceList;















// src/components/OTADeviceList.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import Swal from "sweetalert2";
// import "../../styles/pages/management-pages.css";
// import useOtaSocket from "../../hooks/useOtaSocket";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
//   // websocket hook (change wsPath if needed)
//   const { devices, connected, lastError } = useOtaSocket({
//     wsPath: "/esp-ota", // <--- change to the actual ws path your server uses for initEspOtaSocket
//     adminQuery: "admin=true",
//     token: localStorage.getItem("token") || undefined,
//   });

//   const [loading, setLoading] = useState(false);
//   const [selectedDevices, setSelectedDevices] = useState(new Set());
//   const [versions, setVersions] = useState([]);
//   const [currentVersion, setCurrentVersion] = useState(selectedVersion || "");
//   const [loadingVersions, setLoadingVersions] = useState(false);

//   // fetch /ota/all versions (same logic you had)
//   useEffect(() => {
//     const fetchVersions = async () => {
//       setLoadingVersions(true);
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch(`${BASE}/ota/all`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });

//         if (res.status === 404) {
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           return;
//         }
//         if (!res.ok) {
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           return;
//         }
//         const data = await res.json();
//         const arr = Array.isArray(data) ? data : [];
//         const verList = arr.map(f => f.versionId).filter(Boolean);
//         setVersions(verList);
//         if (selectedVersion) {
//           setCurrentVersion(selectedVersion);
//         } else if (verList.length > 0) {
//           setCurrentVersion(verList[0]);
//           onVersionSelect && onVersionSelect(verList[0]);
//         } else {
//           setCurrentVersion("");
//         }
//       } catch (err) {
//         console.error("Error fetching versions", err);
//         setVersions([]);
//         setCurrentVersion("");
//         if (onVersionSelect) onVersionSelect("");
//       } finally {
//         setLoadingVersions(false);
//       }
//     };
//     fetchVersions();
//   }, []); // mount-only

//   useEffect(() => {
//     if (selectedVersion && selectedVersion !== currentVersion) {
//       setCurrentVersion(selectedVersion);
//     }
//   }, [selectedVersion]);

//   // selected devices set handlers
//   const toggleDevice = (deviceId) => {
//     setSelectedDevices(prev => {
//       const copy = new Set(prev);
//       if (copy.has(deviceId)) copy.delete(deviceId);
//       else copy.add(deviceId);
//       return copy;
//     });
//   };

//   const selectAll = () => {
//     setSelectedDevices(new Set(devices.map(d => d.deviceId)));
//   };
//   const clearAll = () => setSelectedDevices(new Set());

//   // start OTA: call backend start endpoint which will send OTA to connected devices via WS
//   const startOtaBatch = async () => {
//     if (!currentVersion) {
//       Swal.fire("Select version", "Please select an OTA version first", "warning");
//       return;
//     }
//     if (selectedDevices.size === 0) {
//       Swal.fire("Select devices", "Please select at least one device", "warning");
//       return;
//     }

//     const deviceIds = Array.from(selectedDevices);
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`${BASE}/ota/start`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify({ versionId: currentVersion, devices: deviceIds }),
//       });

//       const data = await res.json().catch(() => null);

//       if (!res.ok) {
//         const msg = data?.message || res.statusText || "Failed to start OTA";
//         Swal.fire("Error", msg, "error");
//         return;
//       }

//       // server replies with results [{deviceId, status}] - update user quickly
//       Swal.fire("OTA started", data?.message || "OTA triggered", "success");
//       // optionally clear selection
//       // clearAll();

//       // The hook will pick up ota_batch_start / ota_result messages and update the device list
//       console.log("OTA start response:", data);
//     } catch (err) {
//       console.error("Start OTA error:", err);
//       Swal.fire("Network error", "Could not reach server to start OTA", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // derived stats for UI
//   const passCount = devices.filter(d => d.otaResult?.status === "pass").length;
//   const failCount = devices.filter(d => d.otaResult?.status === "fail").length;
//   const onlineCount = devices.filter(d => d.status === "connected").length;
//   const totalCount = devices.length;

//   return (
//     <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: '#EEF3F9' }}>
//       <div className="flex-shrink-0 px-4 pt-4">
//         <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>

//         <div className="mb-4 flex gap-2 items-center">
//           <div style={{flex:1}}>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Version ID</label>
//             <select
//               value={currentVersion}
//               onChange={(e) => {
//                 setCurrentVersion(e.target.value);
//                 onVersionSelect && onVersionSelect(e.target.value);
//               }}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//               disabled={loadingVersions}
//             >
//               {loadingVersions ? <option>Loading versions...</option>
//                 : versions.length === 0 ? <option value="">No versions available</option>
//                 : versions.map(v => <option key={v} value={v}>{v}</option>)}
//             </select>
//           </div>

//           <div className="text-sm text-gray-600">
//             <div>WS: {connected ? <span style={{color:"green"}}>connected</span> : <span style={{color:"red"}}>disconnected</span>}</div>
//             <div>{totalCount} devices ({onlineCount} online)</div>
//           </div>
//         </div>

//         <div className="mb-4 flex gap-2">
//           <button onClick={selectAll} className="px-3 py-1 bg-gray-100 rounded">Select All</button>
//           <button onClick={clearAll} className="px-3 py-1 bg-gray-100 rounded">Clear</button>
//           <button onClick={startOtaBatch} disabled={loading} className="ml-auto px-4 py-1 bg-blue-600 text-white rounded">
//             {loading ? "Starting..." : "Start OTA"}
//           </button>
//         </div>

//         <div className="mb-4">
//           <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
//           <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//         </div>
//       </div>

//       {/* Device list */}
//       <div className="flex-1 min-h-0 px-4 overflow-hidden">
//         <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
//           {devices.length === 0 ? (
//             <div className="text-center py-6 text-gray-600">No devices connected</div>
//           ) : (
//             <div className="space-y-2 pb-2">
//               {devices.map(device => (
//                 <div key={device.deviceId} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <div className="relative flex-shrink-0">
//                       <input
//                         type="checkbox"
//                         checked={selectedDevices.has(device.deviceId)}
//                         onChange={() => toggleDevice(device.deviceId)}
//                         className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
//                         disabled={device.status !== "connected"}
//                       />
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="text-gray-800 font-medium truncate">{device.deviceId}</div>
//                       <div className="text-xs text-gray-500 truncate">{device.ip || ""} • {device.connectedAt ? new Date(device.connectedAt).toLocaleString() : ""}</div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     {/* OTA status */}
//                     {device.otaResult?.status === "pass" && <div className="text-sm text-green-600 font-semibold">PASS</div>}
//                     {device.otaResult?.status === "fail" && <div className="text-sm text-red-600 font-semibold">FAIL</div>}
//                     {device.otaResult?.status === "in_progress" && <div className="text-sm text-blue-600">IN PROGRESS</div>}
//                     {!device.otaResult && device.status === "connected" && <div className="text-xs text-gray-500">Idle</div>}
//                     {device.status !== "connected" && <div className="text-xs text-gray-400">Offline</div>}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Summary + Action */}
//       <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
//         <div className="bg-gray-200 rounded-lg p-4">
//           <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
//           <p className="text-gray-800 font-bold text-xl">{totalCount < 10 ? `0${totalCount}` : totalCount}</p>
//         </div>

//         <div className="bg-green-500 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">PASS</p>
//           <p className="text-2xl font-bold">{passCount < 10 ? `0${passCount}` : passCount}</p>
//         </div>

//         <div className="bg-orange-400 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">Fail</p>
//           <p className="text-2xl font-bold">{failCount < 10 ? `0${failCount}` : failCount}</p>
//         </div>

//         <div className="flex items-center justify-center">
//           {/* a small indicator if ws had errors */}
//           {lastError && <div className="text-sm text-red-600">WebSocket error</div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OTADeviceList;





// OTADeviceList.jsx
// import { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { useStore } from "../../contexts/storecontexts"; // <- use token if available
// import "../../styles/pages/management-pages.css";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
// const WS_BASE = (import.meta.env.VITE_BACKEND_WS || "ws://localhost:5050") + "/ws/ota";

// const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
//   const { token: ctxToken } = useStore?.() || {};
//   const token = ctxToken || localStorage.getItem("token") || "";

//   const [devices, setDevices] = useState([]); // { deviceId, ip, status, connectedAt, otaStatus }
//   const [loading, setLoading] = useState(true);
//   const [selectedDevices, setSelectedDevices] = useState(new Set());
//   const [versions, setVersions] = useState([]);
//   const [currentVersion, setCurrentVersion] = useState(selectedVersion || "");
//   const [loadingVersions, setLoadingVersions] = useState(false);

//   const wsRef = useRef(null);
//   const reconnectTimeout = useRef(null);
//   const retryCount = useRef(0);

//   const connectWs = useCallback(() => {
//     // build ws url with admin flag and token query param (helps with cross-origin auth)
//     const url = `${WS_BASE}?admin=true${token ? `&token=${encodeURIComponent(token)}` : ""}`;

//     // close existing
//     if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
//       wsRef.current.close();
//     }

//     const ws = new WebSocket(url);
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log("OTA dashboard WebSocket connected");
//       retryCount.current = 0;
//       setLoading(false);
//       setDevices([]);
//     };

//     ws.onmessage = (evt) => {
//       try {
//         const msg = JSON.parse(evt.data);
//         // console.log("WS message:", msg);

//         switch (msg.type) {
//           case "device_list": {
//             // msg.devices => [{ deviceId, ip, status, connectedAt }]
//             const arr = (msg.devices || []).map((d) => ({
//               deviceId: d.deviceId,
//               ip: d.ip,
//               status: d.status || "connected",
//               connectedAt: d.connectedAt ? new Date(d.connectedAt) : null,
//               otaStatus: "idle", // idle|started|pass|fail|offline
//             }));
//             setDevices(arr);
//             setLoading(false);
//             break;
//           }

//           case "device_connected": {
//             const { deviceId, ip } = msg;
//             setDevices((prev) => {
//               const copy = [...prev];
//               const idx = copy.findIndex((x) => x.deviceId === deviceId);
//               const newEntry = {
//                 deviceId,
//                 ip,
//                 status: "connected",
//                 connectedAt: msg.time ? new Date(msg.time) : new Date(),
//                 otaStatus: "idle",
//               };
//               if (idx >= 0) copy[idx] = { ...copy[idx], ...newEntry };
//               else copy.unshift(newEntry);
//               return copy;
//             });
//             break;
//           }

//           case "device_disconnected": {
//             const { deviceId } = msg;
//             setDevices((prev) => prev.map(d => d.deviceId === deviceId ? ({ ...d, status: "disconnected", otaStatus: d.otaStatus === "started" ? "offline" : d.otaStatus }) : d));
//             break;
//           }

//           case "ota_batch_start": {
//             // payload: { versionId, targets: [{ deviceId, status: "started"|"offline" }, ...] }
//             const targets = msg.targets || [];
//             setDevices((prev) => {
//               const copy = prev.map(d => {
//                 const t = targets.find(t => t.deviceId === d.deviceId);
//                 if (t) {
//                   return { ...d, otaStatus: t.status === "started" ? "started" : (t.status === "offline" ? "offline" : d.otaStatus) };
//                 }
//                 return d;
//               });
//               return copy;
//             });
//             break;
//           }

//           case "ota_result": {
//             // payload: { deviceId, status: "pass" | "fail", message? }
//             const { deviceId, status } = msg;
//             if (!deviceId || !status) break;
//             setDevices(prev => prev.map(d => d.deviceId === deviceId ? ({ ...d, otaStatus: status }) : d));
//             break;
//           }

//           case "ota_progress": {
//             // ignore (you said you don't want to show it). keep the data for internal debug if needed.
//             break;
//           }

//           default:
//             // unknown event
//             break;
//         }
//       } catch (err) {
//         console.warn("Invalid WS message", err);
//       }
//     };

//     ws.onclose = (e) => {
//       console.log("OTA WebSocket closed", e?.code, e?.reason);
//       // simple reconnect with backoff
//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       const backoff = Math.min(30000, 1000 * Math.pow(1.5, retryCount.current)); // up to 30s
//       reconnectTimeout.current = setTimeout(() => {
//         retryCount.current += 1;
//         connectWs();
//       }, backoff);
//     };

//     ws.onerror = (err) => {
//       console.error("OTA WebSocket error", err);
//       // ws will close and onclose tries reconnect
//     };
//   }, [token]);

//   // Connect websocket on mount
//   useEffect(() => {
//     connectWs();
//     return () => {
//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       if (wsRef.current) {
//         wsRef.current.onclose = null;
//         wsRef.current.close();
//       }
//     };
//   }, [connectWs]);

//   // Fetch OTA versions (same as your previous code)
//   useEffect(() => {
//     const fetchVersions = async () => {
//       setLoadingVersions(true);
//       try {
//         const res = await fetch(`${BASE}/ota/all`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });

//         if (res.status === 404) {
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         if (!res.ok) {
//           const text = await res.text().catch(() => "");
//           console.warn("Failed to fetch OTA versions:", res.status, text);
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         const data = await res.json();
//         const verList = Array.isArray(data) ? data.map(f => f.versionId).filter(Boolean) : [];
//         setVersions(verList);

//         if (selectedVersion) {
//           setCurrentVersion(selectedVersion);
//         } else if (verList.length > 0) {
//           setCurrentVersion(verList[0]);
//           onVersionSelect && onVersionSelect(verList[0]);
//         } else {
//           setCurrentVersion("");
//           onVersionSelect && onVersionSelect("");
//         }
//       } catch (err) {
//         console.error("Error fetching OTA versions:", err);
//         setVersions([]);
//         setCurrentVersion("");
//         onVersionSelect && onVersionSelect("");
//       } finally {
//         setLoadingVersions(false);
//       }
//     };

//     fetchVersions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // mount-only

//   useEffect(() => {
//     if (selectedVersion && selectedVersion !== currentVersion) {
//       setCurrentVersion(selectedVersion);
//     }
//   }, [selectedVersion]);

//   // Helpers for selecting devices (use device.deviceId)
//   const handleDeviceToggle = (deviceId) => {
//     setSelectedDevices(prev => {
//       const copy = new Set(prev);
//       if (copy.has(deviceId)) copy.delete(deviceId);
//       else copy.add(deviceId);
//       return copy;
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectedDevices.size === devices.length) setSelectedDevices(new Set());
//     else setSelectedDevices(new Set(devices.map(d => d.deviceId)));
//   };

//   // Start OTA via REST endpoint - backend will broadcast results to WS
//   const handleOTA = async () => {
//     if (!currentVersion) {
//       Swal.fire({ icon: "error", title: "Select version", text: "Please choose an OTA version to start." });
//       return;
//     }
//     if (selectedDevices.size === 0) {
//       Swal.fire({ icon: "error", title: "No devices selected", text: "Please select at least 1 device." });
//       return;
//     }

//     const deviceIds = Array.from(selectedDevices);
//     try {
//       const res = await fetch(`${BASE}/ota/start`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify({ versionId: currentVersion, devices: deviceIds }),
//       });

//       const data = await res.json().catch(() => null);

//       if (!res.ok) {
//         Swal.fire({ icon: "error", title: "OTA start failed", text: data?.message || res.statusText || "Failed to start OTA" });
//         return;
//       }

//       // Backend returns results for each target (started/offline) and also broadcasts ota_batch_start
//       Swal.fire({ icon: "success", title: "OTA started", text: `OTA triggered for ${deviceIds.length} device(s).` });

//       // Optionally apply immediate statuses returned in the response
//       if (data?.results && Array.isArray(data.results)) {
//         setDevices(prev => {
//           const copy = prev.map(d => {
//             const t = data.results.find(r => r.deviceId === d.deviceId);
//             if (t) return { ...d, otaStatus: t.status === "started" ? "started" : (t.status === "offline" ? "offline" : d.otaStatus) };
//             return d;
//           });
//           return copy;
//         });
//       }
//     } catch (err) {
//       console.error("startOTA error", err);
//       Swal.fire({ icon: "error", title: "Server error", text: "Unable to start OTA. See console." });
//     }
//   };

//   const passCount = devices.filter(d => d.otaStatus === "pass").length;
//   const failCount = devices.filter(d => d.otaStatus === "fail").length;

//   return (
//     <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: '#EEF3F9' }}>
//       <div className="flex-shrink-0 px-4 pt-4">
//         <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Version ID</label>
//           <select
//             value={currentVersion}
//             onChange={(e) => {
//               setCurrentVersion(e.target.value);
//               onVersionSelect && onVersionSelect(e.target.value);
//             }}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//             disabled={loadingVersions}
//           >
//             {loadingVersions ? (
//               <option>Loading versions...</option>
//             ) : versions.length === 0 ? (
//               <option value="">No versions available</option>
//             ) : (
//               versions.map((version) => (
//                 <option key={version} value={version}>
//                   {version}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         <div className="mb-4">
//           <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
//           <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//         </div>
//       </div>

//       <div className="flex-1 min-h-0 px-4 overflow-hidden">
//         <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
//           {loading ? (
//             <div className="text-center py-4">Loading devices...</div>
//           ) : devices.length === 0 ? (
//             <div className="text-center py-4">No devices connected.</div>
//           ) : (
//             <div className="space-y-2 pb-2">
//               {devices.map((device) => (
//                 <div key={device.deviceId} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <div className="relative flex-shrink-0">
//                       <input
//                         type="checkbox"
//                         checked={selectedDevices.has(device.deviceId)}
//                         onChange={() => handleDeviceToggle(device.deviceId)}
//                         className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
//                       />
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-2">
//                         <span className="text-gray-800 font-medium truncate">{device.deviceId}</span>
//                         <span className="text-gray-600 text-sm ml-2">{device.ip || ""}</span>
//                       </div>
//                       <div className="text-xs text-gray-500 mt-1">
//                         {device.status === "connected" ? "Connected" : "Disconnected"}
//                         {device.connectedAt ? ` • ${new Date(device.connectedAt).toLocaleString()}` : ""}
//                         {device.otaStatus && device.otaStatus !== "idle" ? ` • OTA: ${device.otaStatus}` : ""}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
//         <div className="bg-gray-200 rounded-lg p-4">
//           <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
//           <p className="text-gray-800 font-bold text-xl">{devices.length < 10 ? `0${devices.length}` : devices.length}</p>
//         </div>

//         <div className="bg-green-500 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">PASS</p>
//           <p className="text-2xl font-bold">{passCount < 10 ? `0${passCount}` : passCount}</p>
//         </div>

//         <div className="bg-orange-400 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">Fail</p>
//           <p className="text-2xl font-bold">{failCount < 10 ? `0${failCount}` : failCount}</p>
//         </div>

//         <button onClick={handleOTA} className="bg-[#0D5CA4] hover:bg-[#0A4A8A] text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md">
//           START OTA
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OTADeviceList;









// // src/components/ota/OTADeviceList.jsx
// import { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { useStore } from "../../contexts/storecontexts";
// import "../../styles/pages/management-pages.css";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
// const WS_BASE = (import.meta.env.VITE_BACKEND_WS || "ws://localhost:5050") + "/ws/ota";

// const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
//   const { token: ctxToken } = useStore?.() || {};
//   const token = ctxToken || localStorage.getItem("token") || "";

//   const [devices, setDevices] = useState([]); // { deviceId, ip, status, connectedAt, otaStatus }
//   const [loading, setLoading] = useState(true);
//   const [selectedDevices, setSelectedDevices] = useState(new Set());
//   const [versions, setVersions] = useState([]);
//   const [currentVersion, setCurrentVersion] = useState(selectedVersion || "");
//   const [loadingVersions, setLoadingVersions] = useState(false);

//   const wsRef = useRef(null);
//   const reconnectTimeout = useRef(null);
//   const retryCount = useRef(0);
//   const gotInitialList = useRef(false);
//   const unmountedRef = useRef(false);

//   const connectWs = useCallback(() => {
//     const url = `${WS_BASE}?admin=true${token ? `&token=${encodeURIComponent(token)}` : ""}`;

//     // close existing
//     if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
//       try { wsRef.current.close(); } catch (e) { /* ignore */ }
//     }

//     const ws = new WebSocket(url);
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log("OTA dashboard WebSocket connected (onopen). url:", url, "readyState:", ws.readyState);
//       retryCount.current = 0;
//       // wait for device_list or server_hello before clearing loading state
//     };

//     ws.onmessage = (evt) => {
//       console.log("WS onmessage raw:", evt.data);
//       try {
//         const msg = JSON.parse(evt.data);

//         if (msg.type === "server_hello") {
//           gotInitialList.current = true;
//           setLoading(false);
//           return;
//         }

//         switch (msg.type) {
//           case "device_list": {
//             const arr = (msg.devices || []).map((d) => ({
//               deviceId: d.deviceId,
//               ip: d.ip,
//               status: d.status || "connected",
//               connectedAt: d.connectedAt ? new Date(d.connectedAt) : null,
//               otaStatus: "idle",
//             }));
//             setDevices(arr);
//             gotInitialList.current = true;
//             setLoading(false);
//             break;
//           }

//           case "device_connected": {
//             const { deviceId, ip } = msg;
//             setDevices((prev) => {
//               const copy = [...prev];
//               const idx = copy.findIndex((x) => x.deviceId === deviceId);
//               const newEntry = {
//                 deviceId,
//                 ip,
//                 status: "connected",
//                 connectedAt: msg.time ? new Date(msg.time) : new Date(),
//                 otaStatus: "idle",
//               };
//               if (idx >= 0) copy[idx] = { ...copy[idx], ...newEntry };
//               else copy.unshift(newEntry);
//               return copy;
//             });
//             break;
//           }

//           case "device_disconnected": {
//             const { deviceId } = msg;
//             setDevices((prev) =>
//               prev.map((d) =>
//                 d.deviceId === deviceId
//                   ? { ...d, status: "disconnected", otaStatus: d.otaStatus === "started" ? "offline" : d.otaStatus }
//                   : d
//               )
//             );
//             break;
//           }

//           case "ota_batch_start": {
//             const targets = msg.targets || [];
//             setDevices((prev) =>
//               prev.map((d) => {
//                 const t = targets.find((t) => t.deviceId === d.deviceId);
//                 if (t) return { ...d, otaStatus: t.status === "started" ? "started" : t.status === "offline" ? "offline" : d.otaStatus };
//                 return d;
//               })
//             );
//             break;
//           }

//           case "ota_result": {
//             const { deviceId, status } = msg;
//             if (!deviceId || !status) break;
//             setDevices((prev) => prev.map((d) => (d.deviceId === deviceId ? { ...d, otaStatus: status } : d)));
//             break;
//           }

//           case "ota_progress":
//             // intentionally ignored (backend sends but frontend doesn't show)
//             break;

//           case "error":
//             console.warn("Server error frame:", msg);
//             break;

//           default:
//             console.log("Unknown WS message type:", msg.type);
//             break;
//         }
//       } catch (err) {
//         console.warn("Invalid WS message", err);
//       }
//     };

//     ws.onerror = (errEvent) => {
//       console.error("OTA WebSocket error event:", errEvent, "readyState:", ws.readyState, "url:", url);
//     };

//     ws.onclose = (e) => {
//       console.log("OTA WebSocket closed — code:", e?.code, "reason:", e?.reason, "wasClean:", e?.wasClean);
//       if (!gotInitialList.current) setLoading(false);

//       // cleanup handlers to avoid duplicate reconnects
//       try {
//         ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
//       } catch {}

//       if (unmountedRef.current) return;

//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       const backoff = Math.min(30000, 1000 * Math.pow(1.5, retryCount.current));
//       reconnectTimeout.current = setTimeout(() => {
//         retryCount.current += 1;
//         connectWs();
//       }, backoff);
//     };
//   }, [token]);

//   useEffect(() => {
//     unmountedRef.current = false;
//     connectWs();
//     return () => {
//       unmountedRef.current = true;
//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       if (wsRef.current) {
//         wsRef.current.onclose = null;
//         try { wsRef.current.close(); } catch {}
//       }
//     };
//   }, [connectWs]);

//   // Fetch versions
//   useEffect(() => {
//     const fetchVersions = async () => {
//       setLoadingVersions(true);
//       try {
//         const res = await fetch(`${BASE}/ota/all`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });

//         if (res.status === 404) {
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         if (!res.ok) {
//           const text = await res.text().catch(() => "");
//           console.warn("Failed to fetch OTA versions:", res.status, text);
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         const data = await res.json();
//         const verList = Array.isArray(data) ? data.map((f) => f.versionId).filter(Boolean) : [];
//         setVersions(verList);

//         if (selectedVersion) {
//           setCurrentVersion(selectedVersion);
//         } else if (verList.length > 0) {
//           setCurrentVersion(verList[0]);
//           onVersionSelect && onVersionSelect(verList[0]);
//         } else {
//           setCurrentVersion("");
//           onVersionSelect && onVersionSelect("");
//         }
//       } catch (err) {
//         console.error("Error fetching OTA versions:", err);
//         setVersions([]);
//         setCurrentVersion("");
//         onVersionSelect && onVersionSelect("");
//       } finally {
//         setLoadingVersions(false);
//       }
//     };

//     fetchVersions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // mount-only

//   useEffect(() => {
//     if (selectedVersion && selectedVersion !== currentVersion) {
//       setCurrentVersion(selectedVersion);
//     }
//   }, [selectedVersion]);

//   // selection helpers use device.deviceId
//   const handleDeviceToggle = (deviceId) => {
//     setSelectedDevices((prev) => {
//       const copy = new Set(prev);
//       if (copy.has(deviceId)) copy.delete(deviceId);
//       else copy.add(deviceId);
//       return copy;
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectedDevices.size === devices.length) setSelectedDevices(new Set());
//     else setSelectedDevices(new Set(devices.map((d) => d.deviceId)));
//   };

//   // Start OTA via REST endpoint - backend will broadcast results to WS
//   const handleOTA = async () => {
//     if (!currentVersion) {
//       Swal.fire({ icon: "error", title: "Select version", text: "Please choose an OTA version to start." });
//       return;
//     }
//     if (selectedDevices.size === 0) {
//       Swal.fire({ icon: "error", title: "No devices selected", text: "Please select at least 1 device." });
//       return;
//     }

//     const deviceIds = Array.from(selectedDevices);
//     try {
//       const res = await fetch(`${BASE}/ota/start`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify({ versionId: currentVersion, devices: deviceIds }),
//       });

//       const data = await res.json().catch(() => null);

//       console.log("OTADTARTDATA FROM BACKEND", data)
//       if (!res.ok) {
//         Swal.fire({ icon: "error", title: "OTA start failed", text: data?.message || res.statusText || "Failed to start OTA" });
//         return;
//       }

//       Swal.fire({ icon: "success", title: "OTA started", text: `OTA triggered for ${deviceIds.length} device(s).` });

//       if (data?.results && Array.isArray(data.results)) {
//         setDevices((prev) =>
//           prev.map((d) => {
//             const t = data.results.find((r) => r.deviceId === d.deviceId);
//             if (t) return { ...d, otaStatus: t.status === "started" ? "started" : t.status === "offline" ? "offline" : d.otaStatus };
//             return d;
//           })
//         );
//       }
//     } catch (err) {
//       console.error("startOTA error", err);
//       Swal.fire({ icon: "error", title: "Server error", text: "Unable to start OTA. See console." });
//     }
//   };

//   const passCount = devices.filter((d) => d.otaStatus === "pass").length;
//   const failCount = devices.filter((d) => d.otaStatus === "fail").length;

//   return (
//     <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: "#EEF3F9" }}>
//       <div className="flex-shrink-0 px-4 pt-4">
//         <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Version ID</label>
//           <select
//             value={currentVersion}
//             onChange={(e) => {
//               setCurrentVersion(e.target.value);
//               onVersionSelect && onVersionSelect(e.target.value);
//             }}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//             disabled={loadingVersions}
//           >
//             {loadingVersions ? (
//               <option>Loading versions...</option>
//             ) : versions.length === 0 ? (
//               <option value="">No versions available</option>
//             ) : (
//               versions.map((version) => (
//                 <option key={version} value={version}>
//                   {version}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         <div className="mb-4">
//           <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
//           <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//         </div>
//       </div>

//       <div className="flex-1 min-h-0 px-4 overflow-hidden">
//         <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
//           {loading ? (
//             <div className="text-center py-4">Loading devices...</div>
//           ) : devices.length === 0 ? (
//             <div className="text-center py-4">No devices connected.</div>
//           ) : (
//             <div className="space-y-2 pb-2">
//               {devices.map((device) => (
//                 <div key={device.deviceId} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <div className="relative flex-shrink-0">
//                       <input
//                         type="checkbox"
//                         checked={selectedDevices.has(device.deviceId)}
//                         onChange={() => handleDeviceToggle(device.deviceId)}
//                         className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
//                       />
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-2">
//                         <span className="text-gray-800 font-medium truncate">{device.deviceId}</span>
//                         <span className="text-gray-600 text-sm ml-2">{device.ip || ""}</span>
//                       </div>
//                       <div className="text-xs text-gray-500 mt-1">
//                         {device.status === "connected" ? "Connected" : "Disconnected"}
//                         {device.connectedAt ? ` • ${new Date(device.connectedAt).toLocaleString()}` : ""}
//                         {device.otaStatus && device.otaStatus !== "idle" ? ` • OTA: ${device.otaStatus}` : ""}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
//         <div className="bg-gray-200 rounded-lg p-4">
//           <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
//           <p className="text-gray-800 font-bold text-xl">{devices.length < 10 ? `0${devices.length}` : devices.length}</p>
//         </div>

//         <div className="bg-green-500 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">PASS</p>
//           <p className="text-2xl font-bold">{passCount < 10 ? `0${passCount}` : passCount}</p>
//         </div>

//         <div className="bg-orange-400 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">Fail</p>
//           <p className="text-2xl font-bold">{failCount < 10 ? `0${failCount}` : failCount}</p>
//         </div>

//         <button onClick={handleOTA} className="bg-[#0D5CA4] hover:bg-[#0A4A8A] text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md">
//           START OTA
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OTADeviceList;
















// // src/components/ota/OTADeviceList.jsx
// import { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { useStore } from "../../contexts/storecontexts";
// import "../../styles/pages/management-pages.css";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
// const WS_BASE = (import.meta.env.VITE_BACKEND_WS || "ws://localhost:5050") + "/ws/ota";

// const toast = (title, icon = "success", timer = 2500) =>
//   Swal.fire({ toast: true, position: "top-end", showConfirmButton: false, timer, title, icon });

// const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
//   const { token: ctxToken } = useStore?.() || {};
//   const token = ctxToken || localStorage.getItem("token") || "";

//   const [devices, setDevices] = useState([]); // { deviceId, ip, status, connectedAt, otaStatus, progress }
//   const [loading, setLoading] = useState(true);
//   const [selectedDevices, setSelectedDevices] = useState(new Set());
//   const [versions, setVersions] = useState([]);
//   const [currentVersion, setCurrentVersion] = useState(selectedVersion || "");
//   const [loadingVersions, setLoadingVersions] = useState(false);

//   const wsRef = useRef(null);
//   const reconnectTimeout = useRef(null);
//   const retryCount = useRef(0);
//   const gotInitialList = useRef(false);
//   const unmountedRef = useRef(false);

//   // keep progress map (not required but useful)
//   const deviceProgressRef = useRef(new Map());

//   const connectWs = useCallback(() => {
//     const url = `${WS_BASE}?admin=true${token ? `&token=${encodeURIComponent(token)}` : ""}`;

//     if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
//       try { wsRef.current.close(); } catch (e) { /* ignore */ }
//     }

//     const ws = new WebSocket(url);
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log("OTA dashboard WebSocket connected (onopen). url:", url);
//       retryCount.current = 0;
//     };

//     ws.onmessage = (evt) => {
//       // console.log("WS onmessage raw:", evt.data);
//       try {
//         const msg = JSON.parse(evt.data);

//         if (msg.type === "server_hello") {
//           gotInitialList.current = true;
//           setLoading(false);
//           return;
//         }

//         switch (msg.type) {
//           case "device_list": {
//             const arr = (msg.devices || []).map((d) => ({
//               deviceId: d.deviceId,
//               ip: d.ip,
//               status: d.status || "connected",
//               connectedAt: d.connectedAt ? new Date(d.connectedAt) : null,
//               otaStatus: "idle",
//               progress: 0,
//             }));
//             setDevices(arr);
//             gotInitialList.current = true;
//             setLoading(false);
//             break;
//           }

//           case "device_connected": {
//             const { deviceId, ip } = msg;
//             setDevices((prev) => {
//               const copy = [...prev];
//               const idx = copy.findIndex((x) => x.deviceId === deviceId);
//               const newEntry = {
//                 deviceId,
//                 ip,
//                 status: "connected",
//                 connectedAt: msg.time ? new Date(msg.time) : new Date(),
//                 otaStatus: "idle",
//                 progress: 0,
//               };
//               if (idx >= 0) copy[idx] = { ...copy[idx], ...newEntry };
//               else copy.unshift(newEntry);
//               return copy;
//             });
//             break;
//           }

//           case "device_disconnected": {
//             const { deviceId } = msg;
//             setDevices((prev) =>
//               prev.map((d) =>
//                 d.deviceId === deviceId
//                   ? {
//                       ...d,
//                       status: "disconnected",
//                       otaStatus: d.otaStatus === "started" || d.progress > 0 ? "offline" : d.otaStatus,
//                     }
//                   : d
//               )
//             );
//             // If device was in progress, register fail notification
//             setTimeout(() => {
//               const d = devices.find((x) => x.deviceId === deviceId);
//               if (d && (d.otaStatus === "started" || d.progress > 0)) {
//                 toast(`Device ${deviceId} disconnected during OTA`, "error");
//               }
//             }, 50);
//             break;
//           }

//           case "ota_batch_start": {
//             // server tells which targets started/are offline
//             const targets = msg.targets || [];
//             setDevices((prev) =>
//               prev.map((d) => {
//                 const t = targets.find((t) => t.deviceId === d.deviceId);
//                 if (t) {
//                   return {
//                     ...d,
//                     otaStatus: t.status === "started" ? "started" : t.status === "offline" ? "offline" : d.otaStatus,
//                     progress: t.status === "started" ? 0 : d.progress ?? 0,
//                   };
//                 }
//                 return d;
//               })
//             );
//             break;
//           }

//           case "ota_progress": {
//             // { type: "ota_progress", deviceId, progress }
//             const { deviceId, progress } = msg;
//             if (!deviceId) break;
//             const pct = Number(progress || 0);
//             deviceProgressRef.current.set(deviceId, pct);

//             setDevices((prev) =>
//               prev.map((d) => {
//                 if (d.deviceId !== deviceId) return d;
//                 const prevStatus = d.otaStatus;
//                 const newStatus = pct >= 100 ? "pass" : (prevStatus === "offline" || prevStatus === "fail" ? prevStatus : "started");
//                 return { ...d, progress: pct, otaStatus: newStatus };
//               })
//             );

//             // notify when device reaches 100% (only once)
//             if (pct >= 100) {
//               // small debounce: ensure we only toast once per device
//               const key = `__notified_${deviceId}`;
//               if (!deviceProgressRef.current.get(key)) {
//                 deviceProgressRef.current.set(key, true);
//                 toast(`Device ${deviceId} OTA completed (100%)`, "success", 2500);
//               }
//             }

//             break;
//           }

//           case "ota_result": {
//             // final server-side result: { type: "ota_result", deviceId, status: "pass"|"fail", message? }
//             const { deviceId, status, message } = msg;
//             if (!deviceId || !status) break;
//             setDevices((prev) =>
//               prev.map((d) =>
//                 d.deviceId === deviceId ? { ...d, otaStatus: status, progress: status === "pass" ? 100 : d.progress || 0 } : d
//               )
//             );

//             if (status === "pass") {
//               toast(`Device ${deviceId} OTA success`, "success");
//             } else {
//               toast(`Device ${deviceId} OTA failed: ${message || "error"}`, "error", 4000);
//             }
//             break;
//           }

//           case "error":
//             console.warn("Server error frame:", msg);
//             break;

//           default:
//             console.log("Unknown WS message type:", msg.type);
//             break;
//         }
//       } catch (err) {
//         console.warn("Invalid WS message", err);
//       }
//     };

//     ws.onerror = (errEvent) => {
//       console.error("OTA WebSocket error event:", errEvent, "readyState:", ws.readyState, "url:", url);
//     };

//     ws.onclose = (e) => {
//       console.log("OTA WebSocket closed — code:", e?.code, "reason:", e?.reason, "wasClean:", e?.wasClean);
//       if (!gotInitialList.current) setLoading(false);

//       try {
//         ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
//       } catch {}

//       if (unmountedRef.current) return;

//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       const backoff = Math.min(30000, 1000 * Math.pow(1.5, retryCount.current));
//       reconnectTimeout.current = setTimeout(() => {
//         retryCount.current += 1;
//         connectWs();
//       }, backoff);
//     };
//   }, [token, devices]);

//   useEffect(() => {
//     unmountedRef.current = false;
//     connectWs();
//     return () => {
//       unmountedRef.current = true;
//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       if (wsRef.current) {
//         wsRef.current.onclose = null;
//         try { wsRef.current.close(); } catch {}
//       }
//     };
//   }, [connectWs]);

//   // Fetch versions (unchanged)
//   useEffect(() => {
//     const fetchVersions = async () => {
//       setLoadingVersions(true);
//       try {
//         const res = await fetch(`${BASE}/ota/all`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });

//         if (res.status === 404) {
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         if (!res.ok) {
//           const text = await res.text().catch(() => "");
//           console.warn("Failed to fetch OTA versions:", res.status, text);
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         const data = await res.json();
//         const verList = Array.isArray(data) ? data.map((f) => f.versionId).filter(Boolean) : [];
//         setVersions(verList);

//         if (selectedVersion) {
//           setCurrentVersion(selectedVersion);
//         } else if (verList.length > 0) {
//           setCurrentVersion(verList[0]);
//           onVersionSelect && onVersionSelect(verList[0]);
//         } else {
//           setCurrentVersion("");
//           onVersionSelect && onVersionSelect("");
//         }
//       } catch (err) {
//         console.error("Error fetching OTA versions:", err);
//         setVersions([]);
//         setCurrentVersion("");
//         onVersionSelect && onVersionSelect("");
//       } finally {
//         setLoadingVersions(false);
//       }
//     };

//     fetchVersions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // mount-only

//   useEffect(() => {
//     if (selectedVersion && selectedVersion !== currentVersion) {
//       setCurrentVersion(selectedVersion);
//     }
//   }, [selectedVersion]);

//   // selection helpers use device.deviceId
//   const handleDeviceToggle = (deviceId) => {
//     setSelectedDevices((prev) => {
//       const copy = new Set(prev);
//       if (copy.has(deviceId)) copy.delete(deviceId);
//       else copy.add(deviceId);
//       return copy;
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectedDevices.size === devices.length) setSelectedDevices(new Set());
//     else setSelectedDevices(new Set(devices.map((d) => d.deviceId)));
//   };

//   // Start OTA via REST endpoint - backend will broadcast results to WS
//   const handleOTA = async () => {
//     if (!currentVersion) {
//       Swal.fire({ icon: "error", title: "Select version", text: "Please choose an OTA version to start." });
//       return;
//     }
//     if (selectedDevices.size === 0) {
//       Swal.fire({ icon: "error", title: "No devices selected", text: "Please select at least 1 device." });
//       return;
//     }

//     const deviceIds = Array.from(selectedDevices);

//     try {
//       const res = await fetch(`${BASE}/ota/start`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify({ versionId: currentVersion, devices: deviceIds }),
//       });

//       const data = await res.json().catch(() => null);
//       console.log("OTASTART DATA FROM BACKEND", data);

//       if (!res.ok) {
//         Swal.fire({ icon: "error", title: "OTA start failed", text: data?.message || res.statusText || "Failed to start OTA" });
//         return;
//       }

//       // Do NOT treat API 200 as final success. API confirms trigger only.
//       toast(`OTA triggered for ${deviceIds.length} device(s)`, "info", 1800);

//       // The server returns per-device started/offline; update UI accordingly
//       if (data?.results && Array.isArray(data.results)) {
//         setDevices((prev) =>
//           prev.map((d) => {
//             const t = data.results.find((r) => r.deviceId === d.deviceId);
//             if (t) return { ...d, otaStatus: t.status === "started" ? "started" : t.status === "offline" ? "offline" : d.otaStatus, progress: t.status === "started" ? 0 : d.progress ?? 0 };
//             return d;
//           })
//         );
//       }
//     } catch (err) {
//       console.error("startOTA error", err);
//       Swal.fire({ icon: "error", title: "Server error", text: "Unable to start OTA. See console." });
//     }
//   };

//   const passCount = devices.filter((d) => d.otaStatus === "pass").length;
//   const failCount = devices.filter((d) => d.otaStatus === "fail" || d.otaStatus === "offline").length;

//   // small progress bar renderer
//   const ProgressBar = ({ value = 0 }) => {
//     const pct = Math.max(0, Math.min(100, Number(value || 0)));
//     return (
//       <div className="w-28 h-2 bg-gray-200 rounded overflow-hidden" style={{ minWidth: 112 }}>
//         <div
//           style={{ width: `${pct}%`, transition: "width 300ms linear" }}
//           className={`h-full ${pct >= 100 ? "bg-green-500" : "bg-[#0D5CA4]"}`}
//         />
//       </div>
//     );
//   };

//   return (
//     <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: "#EEF3F9" }}>
//       <div className="flex-shrink-0 px-4 pt-4">
//         <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Version ID</label>
//           <select
//             value={currentVersion}
//             onChange={(e) => {
//               setCurrentVersion(e.target.value);
//               onVersionSelect && onVersionSelect(e.target.value);
//             }}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//             disabled={loadingVersions}
//           >
//             {loadingVersions ? (
//               <option>Loading versions...</option>
//             ) : versions.length === 0 ? (
//               <option value="">No versions available</option>
//             ) : (
//               versions.map((version) => (
//                 <option key={version} value={version}>
//                   {version}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         <div className="mb-4">
//           <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
//           <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//         </div>
//       </div>

//       <div className="flex-1 min-h-0 px-4 overflow-hidden">
//         <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
//           {loading ? (
//             <div className="text-center py-4">Loading devices...</div>
//           ) : devices.length === 0 ? (
//             <div className="text-center py-4">No devices connected.</div>
//           ) : (
//             <div className="space-y-2 pb-2">
//               {/* optional header row with selectAll */}
//               <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 border-b border-gray-200">
//                 <div className="flex items-center gap-2">
//                   <input type="checkbox" checked={selectedDevices.size === devices.length && devices.length > 0} onChange={handleSelectAll} />
//                   <span>Select All</span>
//                 </div>
//                 <div className="text-xs">Status • Progress</div>
//               </div>

//               {devices.map((device) => (
//                 <div key={device.deviceId} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <div className="relative flex-shrink-0">
//                       <input
//                         type="checkbox"
//                         checked={selectedDevices.has(device.deviceId)}
//                         onChange={() => handleDeviceToggle(device.deviceId)}
//                         className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
//                       />
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-2">
//                         <span className="text-gray-800 font-medium truncate">{device.deviceId}</span>
//                         <span className="text-gray-600 text-sm ml-2">{device.ip || ""}</span>
//                       </div>

//                       <div className="flex items-center gap-3 mt-1">
//                         <div className="text-xs text-gray-500">
//                           {device.status === "connected" ? "Connected" : "Disconnected"}
//                           {device.connectedAt ? ` • ${new Date(device.connectedAt).toLocaleString()}` : ""}
//                           {device.otaStatus && device.otaStatus !== "idle" ? ` • OTA: ${device.otaStatus}` : ""}
//                         </div>

//                         {/* progress bar & percent */}
//                         <div className="flex items-center gap-2">
//                           <ProgressBar value={device.progress ?? 0} />
//                           <div className="text-xs text-gray-600 w-10 text-right">{Math.round(device.progress ?? 0)}%</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
//         <div className="bg-gray-200 rounded-lg p-4">
//           <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
//           <p className="text-gray-800 font-bold text-xl">{devices.length < 10 ? `0${devices.length}` : devices.length}</p>
//         </div>

//         <div className="bg-green-500 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">PASS</p>
//           <p className="text-2xl font-bold">{passCount < 10 ? `0${passCount}` : passCount}</p>
//         </div>

//         <div className="bg-orange-400 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">Fail</p>
//           <p className="text-2xl font-bold">{failCount < 10 ? `0${failCount}` : failCount}</p>
//         </div>

//         <button onClick={handleOTA} className="bg-[#0D5CA4] hover:bg-[#0A4A8A] text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md">
//           START OTA
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OTADeviceList;

















// src/components/ota/OTADeviceList.jsx
// import { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { useStore } from "../../contexts/storecontexts";
// import "../../styles/pages/management-pages.css";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
// const WS_BASE = (import.meta.env.VITE_BACKEND_WS || "ws://localhost:5050") + "/ws/ota";

// const toast = (title, icon = "success", timer = 2500) =>
//   Swal.fire({ toast: true, position: "top-end", showConfirmButton: false, timer, title, icon });

// const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
//   const { token: ctxToken } = useStore?.() || {};
//   const token = ctxToken || localStorage.getItem("token") || "";

//   const [devices, setDevices] = useState([]); // { deviceId, ip, status, connectedAt, otaStatus, progress }
//   const [loading, setLoading] = useState(true);
//   const [selectedDevices, setSelectedDevices] = useState(new Set());
//   const [versions, setVersions] = useState([]);
//   const [currentVersion, setCurrentVersion] = useState(selectedVersion || "");
//   const [loadingVersions, setLoadingVersions] = useState(false);

//   const wsRef = useRef(null);
//   const reconnectTimeout = useRef(null);
//   const retryCount = useRef(0);
//   const gotInitialList = useRef(false);
//   const unmountedRef = useRef(false);

//   // keep progress map (not required but useful)
//   const deviceProgressRef = useRef(new Map());

//   // devicesRef lets event handlers read latest devices without recreating ws
//   const devicesRef = useRef([]);
//   useEffect(() => {
//     devicesRef.current = devices;
//   }, [devices]);

//   /**
//    * connectWs:
//    * - stable identity (depends only on token)
//    * - avoids closing a CONNECTING socket (to prevent "closed before established" errors)
//    */
//   const connectWs = useCallback(() => {
//     const url = `${WS_BASE}?admin=true${token ? `&token=${encodeURIComponent(token)}` : ""}`;

//     // Clean up previous socket safely:
//     if (wsRef.current) {
//       try {
//         const prevState = wsRef.current.readyState;
//         if (prevState === WebSocket.OPEN) {
//           // close existing open socket (graceful)
//           wsRef.current.close();
//         } else if (prevState === WebSocket.CONNECTING) {
//           // Avoid closing a connecting socket (some browsers throw "closed before established").
//           // Detach handlers to avoid duplicate events, and return (wait for that socket to open/close).
//           try {
//             wsRef.current.onopen = wsRef.current.onmessage = wsRef.current.onerror = wsRef.current.onclose = null;
//           } catch (err) {
//             // ignore
//           }
//           // don't create a new socket immediately if previous is still connecting
//           // schedule a retry shortly (exponential backoff will handle further reconnects)
//           const shortRetry = setTimeout(() => {
//             // only attempt if not unmounted and previous didn't become open
//             if (!unmountedRef.current && (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)) {
//               connectWs();
//             }
//             clearTimeout(shortRetry);
//           }, 800);
//           return;
//         }
//         // if CLOSED - nothing to do
//       } catch (err) {
//         console.warn("Error while cleaning previous ws:", err);
//       }
//     }

//     const ws = new WebSocket(url);
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log("OTA dashboard WebSocket connected (onopen). url:", url, "readyState:", ws.readyState);
//       retryCount.current = 0;
//     };

//     ws.onmessage = (evt) => {
//       try {
//         const msg = JSON.parse(evt.data);

//         if (msg.type === "server_hello") {
//           gotInitialList.current = true;
//           setLoading(false);
//           return;
//         }

//         switch (msg.type) {
//           case "device_list": {
//             const arr = (msg.devices || []).map((d) => ({
//               deviceId: d.deviceId,
//               ip: d.ip,
//               status: d.status || "connected",
//               connectedAt: d.connectedAt ? new Date(d.connectedAt) : null,
//               otaStatus: "idle",
//               progress: 0,
//             }));
//             setDevices(arr);
//             gotInitialList.current = true;
//             setLoading(false);
//             break;
//           }

//           case "device_connected": {
//             const { deviceId, ip } = msg;
//             setDevices((prev) => {
//               const copy = [...prev];
//               const idx = copy.findIndex((x) => x.deviceId === deviceId);
//               const newEntry = {
//                 deviceId,
//                 ip,
//                 status: "connected",
//                 connectedAt: msg.time ? new Date(msg.time) : new Date(),
//                 otaStatus: "idle",
//                 progress: 0,
//               };
//               if (idx >= 0) copy[idx] = { ...copy[idx], ...newEntry };
//               else copy.unshift(newEntry);
//               return copy;
//             });
//             break;
//           }

//           case "device_disconnected": {
//             const { deviceId } = msg;
//             setDevices((prev) =>
//               prev.map((d) =>
//                 d.deviceId === deviceId
//                   ? {
//                       ...d,
//                       status: "disconnected",
//                       otaStatus: d.otaStatus === "started" || d.progress > 0 ? "offline" : d.otaStatus,
//                     }
//                   : d
//               )
//             );

//             // If device was in progress, register fail notification — read from devicesRef
//             setTimeout(() => {
//               const d = devicesRef.current.find((x) => x.deviceId === deviceId);
//               if (d && (d.otaStatus === "started" || d.progress > 0)) {
//                 toast(`Device ${deviceId} disconnected during OTA`, "error");
//               }
//             }, 50);
//             break;
//           }

//           case "ota_batch_start": {
//             // server tells which targets started/are offline
//             const targets = msg.targets || [];
//             setDevices((prev) =>
//               prev.map((d) => {
//                 const t = targets.find((t) => t.deviceId === d.deviceId);
//                 if (t) {
//                   return {
//                     ...d,
//                     otaStatus: t.status === "started" ? "started" : t.status === "offline" ? "offline" : d.otaStatus,
//                     progress: t.status === "started" ? 0 : d.progress ?? 0,
//                   };
//                 }
//                 return d;
//               })
//             );
//             break;
//           }

//           case "ota_progress": {
//             // { type: "ota_progress", deviceId, progress }
//             const { deviceId, progress } = msg;
//             if (!deviceId) break;
//             const pct = Number(progress || 0);
//             deviceProgressRef.current.set(deviceId, pct);

//             setDevices((prev) =>
//               prev.map((d) => {
//                 if (d.deviceId !== deviceId) return d;
//                 const prevStatus = d.otaStatus;
//                 const newStatus = pct >= 100 ? "pass" : (prevStatus === "offline" || prevStatus === "fail" ? prevStatus : "started");
//                 return { ...d, progress: pct, otaStatus: newStatus };
//               })
//             );

//             // notify when device reaches 100% (only once)
//             if (pct >= 100) {
//               const key = `__notified_${deviceId}`;
//               if (!deviceProgressRef.current.get(key)) {
//                 deviceProgressRef.current.set(key, true);
//                 toast(`Device ${deviceId} OTA completed (100%)`, "success", 2500);
//               }
//             }

//             break;
//           }

//           case "ota_result": {
//             // final server-side result: { type: "ota_result", deviceId, status: "pass"|"fail", message? }
//             const { deviceId, status, message } = msg;
//             if (!deviceId || !status) break;
//             setDevices((prev) =>
//               prev.map((d) =>
//                 d.deviceId === deviceId ? { ...d, otaStatus: status, progress: status === "pass" ? 100 : d.progress || 0 } : d
//               )
//             );

//             if (status === "pass") {
//               toast(`Device ${deviceId} OTA success`, "success");
//             } else {
//               toast(`Device ${deviceId} OTA failed: ${message || "error"}`, "error", 4000);
//             }
//             break;
//           }

//           case "error":
//             console.warn("Server error frame:", msg);
//             break;

//           default:
//             console.log("Unknown WS message type:", msg.type);
//             break;
//         }
//       } catch (err) {
//         console.warn("Invalid WS message", err);
//       }
//     };

//     ws.onerror = (errEvent) => {
//       console.error("OTA WebSocket error event:", errEvent, "readyState:", ws.readyState, "url:", url);
//     };

//     ws.onclose = (e) => {
//       console.log("OTA WebSocket closed — code:", e?.code, "reason:", e?.reason, "wasClean:", e?.wasClean);
//       if (!gotInitialList.current) setLoading(false);

//       // detach handlers
//       try {
//         ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
//       } catch {}

//       if (unmountedRef.current) return;

//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       const backoff = Math.min(30000, 1000 * Math.pow(1.5, retryCount.current || 0));
//       reconnectTimeout.current = setTimeout(() => {
//         retryCount.current += 1;
//         connectWs();
//       }, backoff);
//     };
//   }, [token]); // IMPORTANT: only token here so we don't recreate ws on every devices update

//   // start WS (mount) and cleanup
//   useEffect(() => {
//     unmountedRef.current = false;
//     connectWs();
//     return () => {
//       unmountedRef.current = true;
//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       if (wsRef.current) {
//         try {
//           wsRef.current.onclose = null;
//           wsRef.current.close();
//         } catch (err) {}
//       }
//     };
//   }, [connectWs]);

//   // Fetch versions (unchanged)
//   useEffect(() => {
//     const fetchVersions = async () => {
//       setLoadingVersions(true);
//       try {
//         const res = await fetch(`${BASE}/ota/all`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });

//         if (res.status === 404) {
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         if (!res.ok) {
//           const text = await res.text().catch(() => "");
//           console.warn("Failed to fetch OTA versions:", res.status, text);
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         const data = await res.json();
//         const verList = Array.isArray(data) ? data.map((f) => f.versionId).filter(Boolean) : [];
//         setVersions(verList);

//         if (selectedVersion) {
//           setCurrentVersion(selectedVersion);
//         } else if (verList.length > 0) {
//           setCurrentVersion(verList[0]);
//           onVersionSelect && onVersionSelect(verList[0]);
//         } else {
//           setCurrentVersion("");
//           onVersionSelect && onVersionSelect("");
//         }
//       } catch (err) {
//         console.error("Error fetching OTA versions:", err);
//         setVersions([]);
//         setCurrentVersion("");
//         onVersionSelect && onVersionSelect("");
//       } finally {
//         setLoadingVersions(false);
//       }
//     };

//     fetchVersions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // mount-only

//   useEffect(() => {
//     if (selectedVersion && selectedVersion !== currentVersion) {
//       setCurrentVersion(selectedVersion);
//     }
//   }, [selectedVersion]);

//   // selection helpers use device.deviceId
//   const handleDeviceToggle = (deviceId) => {
//     setSelectedDevices((prev) => {
//       const copy = new Set(prev);
//       if (copy.has(deviceId)) copy.delete(deviceId);
//       else copy.add(deviceId);
//       return copy;
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectedDevices.size === devices.length) setSelectedDevices(new Set());
//     else setSelectedDevices(new Set(devices.map((d) => d.deviceId)));
//   };

//   // Start OTA via REST endpoint - backend will broadcast results to WS
//   const handleOTA = async () => {
//     if (!currentVersion) {
//       Swal.fire({ icon: "error", title: "Select version", text: "Please choose an OTA version to start." });
//       return;
//     }
//     if (selectedDevices.size === 0) {
//       Swal.fire({ icon: "error", title: "No devices selected", text: "Please select at least 1 device." });
//       return;
//     }

//     const deviceIds = Array.from(selectedDevices);

//     try {
//       const res = await fetch(`${BASE}/ota/start`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify({ versionId: currentVersion, devices: deviceIds }),
//       });

//       const data = await res.json().catch(() => null);
//       console.log("OTASTART DATA FROM BACKEND", data);

//       if (!res.ok) {
//         Swal.fire({ icon: "error", title: "OTA start failed", text: data?.message || res.statusText || "Failed to start OTA" });
//         return;
//       }

//       // Do NOT treat API 200 as final success. API confirms trigger only.
//       toast(`OTA triggered for ${deviceIds.length} device(s)`, "info", 1800);

//       // The server returns per-device started/offline; update UI accordingly
//       if (data?.results && Array.isArray(data.results)) {
//         setDevices((prev) =>
//           prev.map((d) => {
//             const t = data.results.find((r) => r.deviceId === d.deviceId);
//             if (t) return { ...d, otaStatus: t.status === "started" ? "started" : t.status === "offline" ? "offline" : d.otaStatus, progress: t.status === "started" ? 0 : d.progress ?? 0 };
//             return d;
//           })
//         );
//       }
//     } catch (err) {
//       console.error("startOTA error", err);
//       Swal.fire({ icon: "error", title: "Server error", text: "Unable to start OTA. See console." });
//     }
//   };

//   const passCount = devices.filter((d) => d.otaStatus === "pass").length;
//   const failCount = devices.filter((d) => d.otaStatus === "fail" || d.otaStatus === "offline").length;

//   // small progress bar renderer
//   const ProgressBar = ({ value = 0 }) => {
//     const pct = Math.max(0, Math.min(100, Number(value || 0)));
//     return (
//       <div className="w-28 h-2 bg-gray-200 rounded overflow-hidden" style={{ minWidth: 112 }}>
//         <div
//           style={{ width: `${pct}%`, transition: "width 300ms linear" }}
//           className={`h-full ${pct >= 100 ? "bg-green-500" : "bg-[#0D5CA4]"}`}
//         />
//       </div>
//     );
//   };

//   return (
//     <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: "#EEF3F9" }}>
//       <div className="flex-shrink-0 px-4 pt-4">
//         <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Version ID</label>
//           <select
//             value={currentVersion}
//             onChange={(e) => {
//               setCurrentVersion(e.target.value);
//               onVersionSelect && onVersionSelect(e.target.value);
//             }}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//             disabled={loadingVersions}
//           >
//             {loadingVersions ? (
//               <option>Loading versions...</option>
//             ) : versions.length === 0 ? (
//               <option value="">No versions available</option>
//             ) : (
//               versions.map((version) => (
//                 <option key={version} value={version}>
//                   {version}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         <div className="mb-4">
//           <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
//           <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//         </div>
//       </div>

//       <div className="flex-1 min-h-0 px-4 overflow-hidden">
//         <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
//           {loading ? (
//             <div className="text-center py-4">Loading devices...</div>
//           ) : devices.length === 0 ? (
//             <div className="text-center py-4">No devices connected.</div>
//           ) : (
//             <div className="space-y-2 pb-2">
//               {/* optional header row with selectAll */}
//               <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 border-b border-gray-200">
//                 <div className="flex items-center gap-2">
//                   <input type="checkbox" checked={selectedDevices.size === devices.length && devices.length > 0} onChange={handleSelectAll} />
//                   <span>Select All</span>
//                 </div>
//                 <div className="text-xs">Status • Progress</div>
//               </div>

//               {devices.map((device) => (
//                 <div key={device.deviceId} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <div className="relative flex-shrink-0">
//                       <input
//                         type="checkbox"
//                         checked={selectedDevices.has(device.deviceId)}
//                         onChange={() => handleDeviceToggle(device.deviceId)}
//                         className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
//                       />
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-2">
//                         <span className="text-gray-800 font-medium truncate">{device.deviceId}</span>
//                         <span className="text-gray-600 text-sm ml-2">{device.ip || ""}</span>
//                       </div>

//                       <div className="flex items-center gap-3 mt-1">
//                         <div className="text-xs text-gray-500">
//                           {device.status === "connected" ? "Connected" : "Disconnected"}
//                           {device.connectedAt ? ` • ${new Date(device.connectedAt).toLocaleString()}` : ""}
//                           {device.otaStatus && device.otaStatus !== "idle" ? ` • OTA: ${device.otaStatus}` : ""}
//                         </div>

//                         {/* progress bar & percent */}
//                         <div className="flex items-center gap-2">
//                           <ProgressBar value={device.progress ?? 0} />
//                           <div className="text-xs text-gray-600 w-10 text-right">{Math.round(device.progress ?? 0)}%</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
//         <div className="bg-gray-200 rounded-lg p-4">
//           <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
//           <p className="text-gray-800 font-bold text-xl">{devices.length < 10 ? `0${devices.length}` : devices.length}</p>
//         </div>

//         <div className="bg-green-500 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">PASS</p>
//           <p className="text-2xl font-bold">{passCount < 10 ? `0${passCount}` : passCount}</p>
//         </div>

//         <div className="bg-orange-400 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">Fail</p>
//           <p className="text-2xl font-bold">{failCount < 10 ? `0${failCount}` : failCount}</p>
//         </div>

//         <button onClick={handleOTA} className="bg-[#0D5CA4] hover:bg-[#0A4A8A] text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md">
//           START OTA
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OTADeviceList;

















// // src/components/ota/OTADeviceList.jsx
// import { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { useStore } from "../../contexts/storecontexts";
// import "../../styles/pages/management-pages.css";
// import VersionsDropdown from "./VersionDropDown";



// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
// const WS_BASE = (import.meta.env.VITE_BACKEND_WS || "ws://localhost:5050") + "/ws/ota";

// const toast = (title, icon = "success", timer = 2500) =>
//   Swal.fire({ toast: true, position: "top-end", showConfirmButton: false, timer, title, icon });

// const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
//   const { token: ctxToken } = useStore?.() || {};
//   const token = ctxToken || localStorage.getItem("token") || "";

//   const [devices, setDevices] = useState([]); // { deviceId, ip, status, connectedAt, otaStatus, progress }
//   const [loading, setLoading] = useState(true);
//   const [selectedDevices, setSelectedDevices] = useState(new Set());
//   const [versions, setVersions] = useState([]);
//   const [currentVersion, setCurrentVersion] = useState(selectedVersion || "");
//   const [loadingVersions, setLoadingVersions] = useState(false);

//   const wsRef = useRef(null);
//   const reconnectTimeout = useRef(null);
//   const retryCount = useRef(0);
//   const gotInitialList = useRef(false);
//   const unmountedRef = useRef(false);

//   // keep progress map (not required but useful)
//   const deviceProgressRef = useRef(new Map());

//   // devicesRef lets event handlers read latest devices without recreating ws
//   const devicesRef = useRef([]);
//   useEffect(() => {
//     devicesRef.current = devices;
//   }, [devices]);

//   /**
//    * connectWs:
//    * - stable identity (depends only on token)
//    * - avoids closing a CONNECTING socket (to prevent "closed before established" errors)
//    */
//   const connectWs = useCallback(() => {
//     const url = `${WS_BASE}?admin=true${token ? `&token=${encodeURIComponent(token)}` : ""}`;

//     // Clean up previous socket safely:
//     if (wsRef.current) {
//       try {
//         const prevState = wsRef.current.readyState;
//         if (prevState === WebSocket.OPEN) {
//           // close existing open socket (graceful)
//           wsRef.current.close();
//         } else if (prevState === WebSocket.CONNECTING) {
//           // Avoid closing a connecting socket (some browsers throw "closed before established").
//           // Detach handlers to avoid duplicate events, and return (wait for that socket to open/close).
//           try {
//             wsRef.current.onopen = wsRef.current.onmessage = wsRef.current.onerror = wsRef.current.onclose = null;
//           } catch (err) {
//             // ignore
//           }
//           // don't create a new socket immediately if previous is still connecting
//           // schedule a retry shortly (exponential backoff will handle further reconnects)
//           const shortRetry = setTimeout(() => {
//             // only attempt if not unmounted and previous didn't become open
//             if (!unmountedRef.current && (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)) {
//               connectWs();
//             }
//             clearTimeout(shortRetry);
//           }, 800);
//           return;
//         }
//         // if CLOSED - nothing to do
//       } catch (err) {
//         console.warn("Error while cleaning previous ws:", err);
//       }
//     }

//     const ws = new WebSocket(url);
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log("OTA dashboard WebSocket connected (onopen). url:", url, "readyState:", ws.readyState);
//       retryCount.current = 0;
//     };

//     ws.onmessage = (evt) => {
//       try {
//         const msg = JSON.parse(evt.data);

//         if (msg.type === "server_hello") {
//           gotInitialList.current = true;
//           setLoading(false);
//           return;
//         }

//         switch (msg.type) {
//           case "device_list": {
//             const arr = (msg.devices || []).map((d) => ({
//               deviceId: d.deviceId,
//               ip: d.ip,
//               status: d.status || "connected",
//               connectedAt: d.connectedAt ? new Date(d.connectedAt) : null,
//               otaStatus: "idle",
//               progress: 0,
//             }));
//             setDevices(arr);
//             gotInitialList.current = true;
//             setLoading(false);
//             break;
//           }

//           case "device_connected": {
//             const { deviceId, ip } = msg;
//             setDevices((prev) => {
//               const copy = [...prev];
//               const idx = copy.findIndex((x) => x.deviceId === deviceId);
//               const newEntry = {
//                 deviceId,
//                 ip,
//                 status: "connected",
//                 connectedAt: msg.time ? new Date(msg.time) : new Date(),
//                 otaStatus: "idle",
//                 progress: 0,
//               };
//               if (idx >= 0) copy[idx] = { ...copy[idx], ...newEntry };
//               else copy.unshift(newEntry);
//               return copy;
//             });
//             break;
//           }

//           case "device_disconnected": {
//             const { deviceId } = msg;
//             setDevices((prev) =>
//               prev.map((d) =>
//                 d.deviceId === deviceId
//                   ? {
//                       ...d,
//                       status: "disconnected",
//                       otaStatus: d.otaStatus === "started" || d.progress > 0 ? "offline" : d.otaStatus,
//                     }
//                   : d
//               )
//             );

//             // If device was in progress, register fail notification — read from devicesRef
//             setTimeout(() => {
//               const d = devicesRef.current.find((x) => x.deviceId === deviceId);
//               if (d && (d.otaStatus === "started" || d.progress > 0)) {
//                 toast(`Device ${deviceId} disconnected during OTA`, "error");
//               }
//             }, 50);
//             break;
//           }

//           case "ota_batch_start": {
//             // server tells which targets started/are offline
//             const targets = msg.targets || [];
//             setDevices((prev) =>
//               prev.map((d) => {
//                 const t = targets.find((t) => t.deviceId === d.deviceId);
//                 if (t) {
//                   return {
//                     ...d,
//                     otaStatus: t.status === "started" ? "started" : t.status === "offline" ? "offline" : d.otaStatus,
//                     progress: t.status === "started" ? 0 : d.progress ?? 0,
//                   };
//                 }
//                 return d;
//               })
//             );
//             break;
//           }

//           case "ota_progress": {
//             // { type: "ota_progress", deviceId, progress }
//             const { deviceId, progress } = msg;
//             if (!deviceId) break;
//             const pct = Number(progress || 0);
//             deviceProgressRef.current.set(deviceId, pct);

//             setDevices((prev) =>
//               prev.map((d) => {
//                 if (d.deviceId !== deviceId) return d;
//                 const prevStatus = d.otaStatus;
//                 const newStatus = pct >= 100 ? "pass" : (prevStatus === "offline" || prevStatus === "fail" ? prevStatus : "started");
//                 return { ...d, progress: pct, otaStatus: newStatus };
//               })
//             );

//             // notify when device reaches 100% (only once)
//             if (pct >= 100) {
//               const key = `__notified_${deviceId}`;
//               if (!deviceProgressRef.current.get(key)) {
//                 deviceProgressRef.current.set(key, true);
//                 toast(`Device ${deviceId} OTA completed (100%)`, "success", 2500);
//               }
//             }

//             break;
//           }

//           case "ota_result": {
//             // final server-side result: { type: "ota_result", deviceId, status: "pass"|"fail", message? }
//             const { deviceId, status, message } = msg;
//             if (!deviceId || !status) break;
//             setDevices((prev) =>
//               prev.map((d) =>
//                 d.deviceId === deviceId ? { ...d, otaStatus: status, progress: status === "pass" ? 100 : d.progress || 0 } : d
//               )
//             );

//             if (status === "pass") {
//               toast(`Device ${deviceId} OTA success`, "success");
//             } else {
//               toast(`Device ${deviceId} OTA failed: ${message || "error"}`, "error", 4000);
//             }
//             break;
//           }

//           case "error":
//             console.warn("Server error frame:", msg);
//             break;

//           default:
//             console.log("Unknown WS message type:", msg.type);
//             break;
//         }
//       } catch (err) {
//         console.warn("Invalid WS message", err);
//       }
//     };

//     ws.onerror = (errEvent) => {
//       console.error("OTA WebSocket error event:", errEvent, "readyState:", ws.readyState, "url:", url);
//     };

//     ws.onclose = (e) => {
//       console.log("OTA WebSocket closed — code:", e?.code, "reason:", e?.reason, "wasClean:", e?.wasClean);
//       if (!gotInitialList.current) setLoading(false);

//       // detach handlers
//       try {
//         ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
//       } catch {}

//       if (unmountedRef.current) return;

//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       const backoff = Math.min(30000, 1000 * Math.pow(1.5, retryCount.current || 0));
//       reconnectTimeout.current = setTimeout(() => {
//         retryCount.current += 1;
//         connectWs();
//       }, backoff);
//     };
//   }, [token]); // IMPORTANT: only token here so we don't recreate ws on every devices update

//   // start WS (mount) and cleanup
//   useEffect(() => {
//     unmountedRef.current = false;
//     connectWs();
//     return () => {
//       unmountedRef.current = true;
//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       if (wsRef.current) {
//         try {
//           wsRef.current.onclose = null;
//           wsRef.current.close();
//         } catch (err) {}
//       }
//     };
//   }, [connectWs]);

//   // Fetch versions (unchanged)
//   useEffect(() => {
//     const fetchVersions = async () => {
//       setLoadingVersions(true);
//       try {
//         const res = await fetch(`${BASE}/ota/all`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });

//         if (res.status === 404) {
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         if (!res.ok) {
//           const text = await res.text().catch(() => "");
//           console.warn("Failed to fetch OTA versions:", res.status, text);
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         const data = await res.json();
//         const verList = Array.isArray(data) ? data.map((f) => f.versionId).filter(Boolean) : [];
//         setVersions(verList);

//         if (selectedVersion) {
//           setCurrentVersion(selectedVersion);
//         } else if (verList.length > 0) {
//           setCurrentVersion(verList[0]);
//           onVersionSelect && onVersionSelect(verList[0]);
//         } else {
//           setCurrentVersion("");
//           onVersionSelect && onVersionSelect("");
//         }
//       } catch (err) {
//         console.error("Error fetching OTA versions:", err);
//         setVersions([]);
//         setCurrentVersion("");
//         onVersionSelect && onVersionSelect("");
//       } finally {
//         setLoadingVersions(false);
//       }
//     };

//     fetchVersions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // mount-only

//   useEffect(() => {
//     if (selectedVersion && selectedVersion !== currentVersion) {
//       setCurrentVersion(selectedVersion);
//     }
//   }, [selectedVersion]);

//   // selection helpers use device.deviceId
//   const handleDeviceToggle = (deviceId) => {
//     setSelectedDevices((prev) => {
//       const copy = new Set(prev);
//       if (copy.has(deviceId)) copy.delete(deviceId);
//       else copy.add(deviceId);
//       return copy;
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectedDevices.size === devices.length) setSelectedDevices(new Set());
//     else setSelectedDevices(new Set(devices.map((d) => d.deviceId)));
//   };

//   // Start OTA via REST endpoint - backend will broadcast results to WS
//   const handleOTA = async () => {
//     if (!currentVersion) {
//       Swal.fire({ icon: "error", title: "Select version", text: "Please choose an OTA version to start." });
//       return;
//     }
//     if (selectedDevices.size === 0) {
//       Swal.fire({ icon: "error", title: "No devices selected", text: "Please select at least 1 device." });
//       return;
//     }

//     const deviceIds = Array.from(selectedDevices);

//     try {
//       const res = await fetch(`${BASE}/ota/start`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify({ versionId: currentVersion, devices: deviceIds }),
//       });

//       const data = await res.json().catch(() => null);
//       console.log("OTASTART DATA FROM BACKEND", data);

//       if (!res.ok) {
//         Swal.fire({ icon: "error", title: "OTA start failed", text: data?.message || res.statusText || "Failed to start OTA" });
//         return;
//       }

//       // Do NOT treat API 200 as final success. API confirms trigger only.
//       toast(`OTA triggered for ${deviceIds.length} device(s)`, "info", 1800);

//       // The server returns per-device started/offline; update UI accordingly
//       if (data?.results && Array.isArray(data.results)) {
//         setDevices((prev) =>
//           prev.map((d) => {
//             const t = data.results.find((r) => r.deviceId === d.deviceId);
//             if (t) return { ...d, otaStatus: t.status === "started" ? "started" : t.status === "offline" ? "offline" : d.otaStatus, progress: t.status === "started" ? 0 : d.progress ?? 0 };
//             return d;
//           })
//         );
//       }
//     } catch (err) {
//       console.error("startOTA error", err);
//       Swal.fire({ icon: "error", title: "Server error", text: "Unable to start OTA. See console." });
//     }
//   };

//   const passCount = devices.filter((d) => d.otaStatus === "pass").length;
//   const failCount = devices.filter((d) => d.otaStatus === "fail" || d.otaStatus === "offline").length;

//   // small progress bar renderer
//   const ProgressBar = ({ value = 0 }) => {
//     const pct = Math.max(0, Math.min(100, Number(value || 0)));
//     return (
//       <div className="w-28 h-2 bg-gray-200 rounded overflow-hidden" style={{ minWidth: 112 }}>
//         <div
//           style={{ width: `${pct}%`, transition: "width 300ms linear" }}
//           className={`h-full ${pct >= 100 ? "bg-green-500" : "bg-[#0D5CA4]"}`}
//         />
//       </div>
//     );
//   };

//   return (
//     <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: "#EEF3F9" }}>
//       <div className="flex-shrink-0 px-4 pt-4">
//         <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>

//         <div className="mb-4">
//           {/* <label className="block text-sm font-medium text-gray-700 mb-2">Version ID</label> */}
//           {/* <select
//             value={currentVersion}
//             onChange={(e) => {
//               setCurrentVersion(e.target.value);
//               onVersionSelect && onVersionSelect(e.target.value);
//             }}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//             disabled={loadingVersions}
//           >
//             {loadingVersions ? (
//               <option>Loading versions...</option>
//             ) : versions.length === 0 ? (
//               <option value="">No versions available</option>
//             ) : (
//               versions.map((version) => (
//                 <option key={version} value={version}>
//                   {version}
//                 </option>
//               ))
//             )}
//           </select> */}

        
//         <VersionsDropdown
//         versions={versions}
//         currentVersion={currentVersion}
//         loadingVersions={loadingVersions}
//         onVersionSelect={(v) => {
//           setCurrentVersion(v);                 // keep the component controlled
//           onVersionSelect && onVersionSelect(v); // forward prop from OTADeviceList props
//         }}
//         />

//         </div>

//         <div className="mb-4">
//           <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
//           <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//         </div>
//       </div>

//       <div className="flex-1 min-h-0 px-4 overflow-hidden">
//         <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
//           {loading ? (
//             <div className="text-center py-4">Loading devices...</div>
//           ) : devices.length === 0 ? (
//             <div className="text-center py-4">No devices connected.</div>
//           ) : (
//             <div className="space-y-2 pb-2">
//               {/* optional header row with selectAll */}
//               <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 border-b border-gray-200">
//                 <div className="flex items-center gap-2">
//                   <input type="checkbox" checked={selectedDevices.size === devices.length && devices.length > 0} onChange={handleSelectAll} />
//                   <span>Select All</span>
//                 </div>
//                 <div className="text-xs">Status • Progress</div>
//               </div>

//               {devices.map((device) => (
//                 <div key={device.deviceId} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <div className="relative flex-shrink-0">
//                       <input
//                         type="checkbox"
//                         checked={selectedDevices.has(device.deviceId)}
//                         onChange={() => handleDeviceToggle(device.deviceId)}
//                         className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
//                       />
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-2">
//                         <span className="text-gray-800 font-medium truncate">{device.deviceId}</span>
//                         <span className="text-gray-600 text-sm ml-2">{device.ip || ""}</span>
//                       </div>

//                       <div className="flex items-center gap-3 mt-1">
//                         <div className="text-xs text-gray-500">
//                           {device.status === "connected" ? "Connected" : "Disconnected"}
//                           {device.connectedAt ? ` • ${new Date(device.connectedAt).toLocaleString()}` : ""}
//                           {device.otaStatus && device.otaStatus !== "idle" ? ` • OTA: ${device.otaStatus}` : ""}
//                         </div>

//                         {/* progress bar & percent */}
//                         <div className="flex items-center gap-2">
//                           <ProgressBar value={device.progress ?? 0} />
//                           <div className="text-xs text-gray-600 w-10 text-right">{Math.round(device.progress ?? 0)}%</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
//         <div className="bg-gray-200 rounded-lg p-4">
//           <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
//           <p className="text-gray-800 font-bold text-xl">{devices.length < 10 ? `0${devices.length}` : devices.length}</p>
//         </div>

//         <div className="bg-green-500 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">PASS</p>
//           <p className="text-2xl font-bold">{passCount < 10 ? `0${passCount}` : passCount}</p>
//         </div>

//         <div className="bg-orange-400 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">Fail</p>
//           <p className="text-2xl font-bold">{failCount < 10 ? `0${failCount}` : failCount}</p>
//         </div>

//         <button onClick={handleOTA} className="cursor-pointer bg-[#0D5CA4] hover:bg-[#0A4A8A] text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md">
//           START OTA
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OTADeviceList;








// BEFORE THE BEST CODE:

















// // src/components/ota/OTADeviceList.jsx
// import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import Swal from "sweetalert2";
// import { useStore } from "../../contexts/storecontexts";
// import "../../styles/pages/management-pages.css";
// import VersionsDropdown from "./VersionDropDown";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
// const WS_BASE = (import.meta.env.VITE_BACKEND_WS || "ws://localhost:5050") + "/ws/ota";

// const toast = (title, icon = "success", timer = 2500) =>
//   Swal.fire({ toast: true, position: "top-end", showConfirmButton: false, timer, title, icon });

// const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
//   const { token: ctxToken } = useStore?.() || {};
//   const token = ctxToken || localStorage.getItem("token") || "";

//   const [devices, setDevices] = useState([]); // { deviceId, ip, status, connectedAt, otaStatus, progress }
//   const [loading, setLoading] = useState(true);
//   const [selectedDevices, setSelectedDevices] = useState(new Set());
//   const [versions, setVersions] = useState([]);
//   const [currentVersion, setCurrentVersion] = useState(selectedVersion || "");
//   const [loadingVersions, setLoadingVersions] = useState(false);

//   const [passCount, setPassCount] = useState(0);
//   const [failCount, setFailCount] = useState(0);

//   const wsRef = useRef(null);
//   const reconnectTimeout = useRef(null);
//   const retryCount = useRef(0);
//   const gotInitialList = useRef(false);
//   const unmountedRef = useRef(false);

//   // keep progress map (not required but useful)
//   const deviceProgressRef = useRef(new Map());

//   // devicesRef lets event handlers read latest devices without recreating ws
//   const devicesRef = useRef([]);
//   useEffect(() => {
//     devicesRef.current = devices;
//   }, [devices]);

//   // track deviceIds we've already finalized (counted + maybe removed)
//   const finalizedRef = useRef(new Set());

//   // helper: finalize (count + mark final) and remove device from list + selection
//   const finalizeDevice = useCallback((deviceId, status) => {
//     if (!deviceId) return;
//     if (finalizedRef.current.has(deviceId)) return; // avoid double count

//     finalizedRef.current.add(deviceId);

//     if (status === "pass") setPassCount((s) => s + 1);
//     else if (status === "fail") setFailCount((s) => s + 1);

//     // remove from device list and selection
//     setDevices((prev) => prev.filter((d) => d.deviceId !== deviceId));
//     setSelectedDevices((prev) => {
//       const copy = new Set(prev);
//       copy.delete(deviceId);
//       return copy;
//     });
//   }, []);

//   /**
//    * connectWs:
//    * - stable identity (depends only on token)
//    * - avoids closing a CONNECTING socket (to prevent "closed before established" errors)
//    */
//   const connectWs = useCallback(() => {
//     const url = `${WS_BASE}?admin=true${token ? `&token=${encodeURIComponent(token)}` : ""}`;

//     // Clean up previous socket safely:
//     if (wsRef.current) {
//       try {
//         const prevState = wsRef.current.readyState;
//         if (prevState === WebSocket.OPEN) {
//           // close existing open socket (graceful)
//           wsRef.current.close();
//         } else if (prevState === WebSocket.CONNECTING) {
//           try {
//             wsRef.current.onopen = wsRef.current.onmessage = wsRef.current.onerror = wsRef.current.onclose = null;
//           } catch (err) {}
//           const shortRetry = setTimeout(() => {
//             if (!unmountedRef.current && (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)) {
//               connectWs();
//             }
//             clearTimeout(shortRetry);
//           }, 800);
//           return;
//         }
//       } catch (err) {
//         console.warn("Error while cleaning previous ws:", err);
//       }
//     }

//     const ws = new WebSocket(url);
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log("OTA dashboard WebSocket connected (onopen). url:", url, "readyState:", ws.readyState);
//       retryCount.current = 0;
//     };

//     ws.onmessage = (evt) => {
//        console.log("OTA WS MSG:", evt.data);
//       try {
//         const msg = JSON.parse(evt.data);

//         if (msg.type === "server_hello") {
//           gotInitialList.current = true;
//           setLoading(false);
//           return;
//         }
//         console.log("Message from Server WS<><>", msg)

//         switch (msg.type) {
//           case "device_list": {
//             // Merge incoming list into current devices to avoid wiping otaStatus/progress
//             const incoming = msg.devices || [];
//             setDevices((prev) => {
//               const map = new Map(prev.map((d) => [d.deviceId, { ...d }]));

//               for (const d of incoming) {
//                 const existing = map.get(d.deviceId);
//                 if (existing) {
//                   map.set(d.deviceId, {
//                     ...existing,
//                     ip: d.ip ?? existing.ip,
//                     status: d.status ?? existing.status ?? "connected",
//                     connectedAt: d.connectedAt ? new Date(d.connectedAt) : existing.connectedAt,
//                   });
//                 } else {
//                   map.set(d.deviceId, {
//                     deviceId: d.deviceId,
//                     ip: d.ip,
//                     status: d.status ?? "connected",
//                     connectedAt: d.connectedAt ? new Date(d.connectedAt) : null,
//                     otaStatus: "idle",
//                     progress: 0,
//                   });
//                 }
//               }

//               return Array.from(map.values());
//             });

//             gotInitialList.current = true;
//             setLoading(false);
//             break;
//           }

//           case "device_connected": {
//             const { deviceId, ip } = msg;
//             setDevices((prev) => {
//               const copy = [...prev];
//               const idx = copy.findIndex((x) => x.deviceId === deviceId);
//               const newEntry = {
//                 deviceId,
//                 ip,
//                 status: "connected",
//                 connectedAt: msg.time ? new Date(msg.time) : new Date(),
//                 otaStatus: "idle",
//                 progress: 0,
//               };
//               if (idx >= 0) copy[idx] = { ...copy[idx], ...newEntry };
//               else copy.unshift(newEntry);
//               return copy;
//             });
//             break;
//           }

//           // case "device_disconnected": {
//           //   // Server may include otaFinalStatus when disconnect occurs during OTA:
//           //   // { type: "device_disconnected", deviceId, otaFinalStatus?: "fail", message? }
//           //   const { deviceId, otaFinalStatus } = msg;

//           //   setDevices((prev) => {
//           //     const idx = prev.findIndex((d) => d.deviceId === deviceId);
//           //     if (idx === -1) {
//           //       // not found in list — still check finalization via msg
//           //       if (otaFinalStatus === "fail") {
//           //         // finalize even if not present
//           //         finalizeDevice(deviceId, "fail");
//           //       }
//           //       return prev;
//           //     }

//           //     const found = prev[idx];

//           //     // If server says otaFinalStatus === 'fail' => disconnected DURING OTA
//           //     if (otaFinalStatus === "fail") {
//           //       // show toast, finalize (inc fail), remove device
//           //       toast(`Device ${deviceId} disconnected during OTA`, "error");
//           //       setTimeout(() => finalizeDevice(deviceId, "fail"), 10);
//           //       return prev.filter((d) => d.deviceId !== deviceId);
//           //     }

//           //     // else treat as simple disconnect (likely before OTA) -> remove device (no fail increment)
//           //     return prev.filter((d) => d.deviceId !== deviceId);
//           //   });

//           //   // Also remove from selection immediately (safeguard)
//           //   setSelectedDevices((prev) => {
//           //     const copy = new Set(prev);
//           //     copy.delete(msg.deviceId);
//           //     return copy;
//           //   });

//           //   break;
//           // }
//           case "device_disconnected": {
//   // Server may include otaFinalStatus when disconnect occurs during OTA and lastProgress
//   // { type: "device_disconnected", deviceId, otaFinalStatus?: "fail", message?, lastProgress?: number }
//   const { deviceId, otaFinalStatus, lastProgress } = msg;
//   console.log("device_disconnected received:", msg);

//   setDevices((prev) => {
//     const idx = prev.findIndex((d) => d.deviceId === deviceId);

//     // Helper to decide if this disconnect should count as OTA failure:
//     const shouldCountAsOtaFail = (foundDevice) => {
//       // 1) server explicitly said it failed during OTA
//       if (otaFinalStatus === "fail") return true;

//       // 2) if server provided lastProgress and it's < 100
//       if (typeof lastProgress === "number" && lastProgress < 100) return true;

//       // 3) else if frontend knows device had started OTA and progress < 100
//       if (foundDevice && (foundDevice.otaStatus === "started" || (foundDevice.progress ?? 0) < 100)) {
//         return true;
//       }

//       return false;
//     };

//     if (idx === -1) {
//       // device not found in UI list (maybe already removed by ota_result).
//       // if we were given lastProgress and it indicates partial progress, finalize fail.
//       if (!finalizedRef.current.has(deviceId)) {
//         if (shouldCountAsOtaFail(null)) {
//           // finalize and ensure removal (idempotent)
//           toast(`Device ${deviceId} disconnected during OTA`, "error");
//           setTimeout(() => finalizeDevice(deviceId, "fail"), 10);
//         }
//       }
//       return prev;
//     }

//     // device exists in list — decide how to treat it
//     const found = prev[idx];

//     if (shouldCountAsOtaFail(found)) {
//       // show toast, finalize (inc fail), remove device
//       toast(`Device ${deviceId} disconnected during OTA`, "error");
//       setTimeout(() => finalizeDevice(deviceId, "fail"), 10);
//       return prev.filter((d) => d.deviceId !== deviceId);
//     }

//     // otherwise it's a normal disconnect (not during OTA) -> remove device but don't increment fail
//     return prev.filter((d) => d.deviceId !== deviceId);
//   });

//   // Also remove from selection immediately (safeguard)
//   setSelectedDevices((prev) => {
//     const copy = new Set(prev);
//     copy.delete(msg.deviceId);
//     return copy;
//   });

//   break;
// }


//           case "ota_batch_start": {
//             // server tells which targets started/are offline
//             const targets = msg.targets || [];

//             // For 'offline' entries (device was offline at start) remove from list.
//             // For 'started' mark as started.
//             setDevices((prev) => {
//               const byId = new Map(prev.map((d) => [d.deviceId, { ...d }]));
//               for (const t of targets) {
//                 const entry = byId.get(t.deviceId);
//                 if (!entry) continue;
//                 if (t.status === "started") {
//                   entry.otaStatus = "started";
//                   entry.progress = 0;
//                   byId.set(t.deviceId, entry);
//                 } else if (t.status === "offline") {
//                   // removed from list (offline before OTA)
//                   byId.delete(t.deviceId);
//                   // ensure selection cleared (done below too)
//                 }
//               }
//               // clear selections for any removed devices
//               setSelectedDevices((prevSel) => {
//                 const copy = new Set(prevSel);
//                 for (const t of targets) {
//                   if (t.status === "offline") copy.delete(t.deviceId);
//                 }
//                 return copy;
//               });
//               return Array.from(byId.values());
//             });

//             break;
//           }

//           case "ota_progress": {
//             // { type: "ota_progress", deviceId, progress }
//             const { deviceId, progress } = msg;
//             if (!deviceId) break;
//             const pct = Number(progress || 0);
//             deviceProgressRef.current.set(deviceId, pct);

//             setDevices((prev) =>
//               prev.map((d) => {
//                 if (d.deviceId !== deviceId) return d;
//                 const prevStatus = d.otaStatus;
//                 const newStatus = pct >= 100 ? "pass" : prevStatus === "offline" || prevStatus === "fail" ? prevStatus : "started";
//                 return { ...d, progress: pct, otaStatus: newStatus };
//               })
//             );

//             // notify when device reaches 100% (only once)
//             if (pct >= 100) {
//               const key = `__notified_${deviceId}`;
//               if (!deviceProgressRef.current.get(key)) {
//                 deviceProgressRef.current.set(key, true);
//                 toast(`Device ${deviceId} OTA completed (100%)`, "success", 2500);
//               }
//             }

//             break;
//           }

//           case "ota_result": {
//             // final server-side result: { type: "ota_result", deviceId, status: "pass"|"fail", message? }
//             const { deviceId, status, message } = msg;
//             if (!deviceId || !status) break;

//             console.log("OTA RESULT<><>FROM<><>WS", msg);

//             // increment counters only once and remove from list
//             if (!finalizedRef.current.has(deviceId)) {
//               // show toast
//               if (status === "pass") toast(`Device ${deviceId} OTA success`, "success");
//               else toast(`Device ${deviceId} OTA failed: ${message || "error"}`, "error", 4000);

//               finalizeDevice(deviceId, status);
//               deviceProgressRef.current.delete(deviceId);
//             } else {
//               // already finalized (ignore)
//               console.debug("Duplicate final event ignored for", deviceId, status);
//             }

//             break;
//           }

//           case "error":
//             console.warn("Server error frame:", msg);
//             break;

//           default:
//             console.log("Unknown WS message type:", msg.type);
//             break;
//         }
//       } catch (err) {
//         console.warn("Invalid WS message", err);
//       }
//     };

//     ws.onerror = (errEvent) => {
//       console.error("OTA WebSocket error event:", errEvent, "readyState:", ws.readyState, "url:", url);
//     };

//     ws.onclose = (e) => {
//       console.log("OTA WebSocket closed — code:", e?.code, "reason:", e?.reason, "wasClean:", e?.wasClean);
//       if (!gotInitialList.current) setLoading(false);

//       // detach handlers
//       try {
//         ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
//       } catch {}

//       if (unmountedRef.current) return;

//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       const backoff = Math.min(30000, 1000 * Math.pow(1.5, retryCount.current || 0));
//       reconnectTimeout.current = setTimeout(() => {
//         retryCount.current += 1;
//         connectWs();
//       }, backoff);
//     };
//   }, [token, finalizeDevice]); // include finalizeDevice so closure is valid

//   // start WS (mount) and cleanup
//   useEffect(() => {
//     unmountedRef.current = false;
//     connectWs();
//     return () => {
//       unmountedRef.current = true;
//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       if (wsRef.current) {
//         try {
//           wsRef.current.onclose = null;
//           wsRef.current.close();
//         } catch (err) {}
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [connectWs]);

//   // Fetch versions (unchanged)
//   useEffect(() => {
//     const fetchVersions = async () => {
//       setLoadingVersions(true);
//       try {
//         const res = await fetch(`${BASE}/ota/all`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });

//         if (res.status === 404) {
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         if (!res.ok) {
//           const text = await res.text().catch(() => "");
//           console.warn("Failed to fetch OTA versions:", res.status, text);
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         const data = await res.json();
//         const verList = Array.isArray(data) ? data.map((f) => f.versionId).filter(Boolean) : [];
//         setVersions(verList);

//         if (selectedVersion) {
//           setCurrentVersion(selectedVersion);
//         } else if (verList.length > 0) {
//           setCurrentVersion(verList[0]);
//           onVersionSelect && onVersionSelect(verList[0]);
//         } else {
//           setCurrentVersion("");
//           onVersionSelect && onVersionSelect("");
//         }
//       } catch (err) {
//         console.error("Error fetching OTA versions:", err);
//         setVersions([]);
//         setCurrentVersion("");
//         onVersionSelect && onVersionSelect("");
//       } finally {
//         setLoadingVersions(false);
//       }
//     };

//     fetchVersions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // mount-only

//   useEffect(() => {
//     if (selectedVersion && selectedVersion !== currentVersion) {
//       setCurrentVersion(selectedVersion);
//     }
//   }, [selectedVersion]);

//   // selection helpers use device.deviceId
//   const handleDeviceToggle = (deviceId) => {
//     setSelectedDevices((prev) => {
//       const copy = new Set(prev);
//       if (copy.has(deviceId)) copy.delete(deviceId);
//       else copy.add(deviceId);
//       return copy;
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectedDevices.size === devices.length) setSelectedDevices(new Set());
//     else setSelectedDevices(new Set(devices.map((d) => d.deviceId)));
//   };

//   // Start OTA via REST endpoint - backend will broadcast results to WS
//   const handleOTA = async () => {
//     if (!currentVersion) {
//       Swal.fire({ icon: "error", title: "Select version", text: "Please choose an OTA version to start." });
//       return;
//     }
//     if (selectedDevices.size === 0) {
//       Swal.fire({ icon: "error", title: "No devices selected", text: "Please select at least 1 device." });
//       return;
//     }

//     // Build deviceIds but filter out devices that are not connected (they will never start)
//     const allSelected = Array.from(selectedDevices);
//     const connectedSelected = [];
//     const disconnectedRemoved = [];
//     for (const id of allSelected) {
//       const d = devices.find((x) => x.deviceId === id);
//       if (d && d.status === "connected") connectedSelected.push(id);
//       else disconnectedRemoved.push(id);
//     }

//     if (disconnectedRemoved.length > 0) {
//       // remove them from the UI list and selection so counts and list are correct
//       setSelectedDevices((prev) => {
//         const copy = new Set(prev);
//         disconnectedRemoved.forEach((id) => copy.delete(id));
//         return copy;
//       });

//       // remove them from device list (disconnected before OTA)
//       setDevices((prev) => prev.filter((d) => d.status === "connected" || !disconnectedRemoved.includes(d.deviceId)));

//       toast(`${disconnectedRemoved.length} device(s) removed (already disconnected).`, "info", 2000);
//     }

//     if (connectedSelected.length === 0) {
//       Swal.fire({ icon: "error", title: "No connected devices", text: "No selected devices are connected." });
//       return;
//     }

//     const deviceIds = connectedSelected;

//     try {
//       const res = await fetch(`${BASE}/ota/start`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify({ versionId: currentVersion, devices: deviceIds }),
//       });

//       const data = await res.json().catch(() => null);
//       console.log("OTASTART DATA FROM BACKEND", data);

//       if (!res.ok) {
//         Swal.fire({ icon: "error", title: "OTA start failed", text: data?.message || res.statusText || "Failed to start OTA" });
//         return;
//       }

//       // Do NOT treat API 200 as final success. API confirms trigger only.
//       toast(`OTA triggered for ${deviceIds.length} device(s)`, "info", 1800);

//       // The server returns per-device started/offline; update UI accordingly
//       if (data?.results && Array.isArray(data.results)) {
//         setDevices((prev) =>
//           prev
//             .map((d) => {
//               const t = data.results.find((r) => r.deviceId === d.deviceId);
//               if (t) {
//                 // if offline at start -> remove (handled below)
//                 return { ...d, otaStatus: t.status === "started" ? "started" : t.status === "offline" ? "offline" : d.otaStatus, progress: t.status === "started" ? 0 : d.progress ?? 0 };
//               }
//               return d;
//             })
//             .filter((d) => d.otaStatus !== "offline") // remove offline targets (not available at start)
//         );
//       }
//     } catch (err) {
//       console.error("startOTA error", err);
//       Swal.fire({ icon: "error", title: "Server error", text: "Unable to start OTA. See console." });
//     }
//   };

//   // compute counts from state
//   const passCountMemo = useMemo(() => passCount, [passCount]);
//   const failCountMemo = useMemo(() => failCount, [failCount]);

//   // small progress bar renderer
//   const ProgressBar = ({ value = 0 }) => {
//     const pct = Math.max(0, Math.min(100, Number(value || 0)));
//     return (
//       <div className="w-28 h-2 bg-gray-200 rounded overflow-hidden" style={{ minWidth: 112 }}>
//         <div style={{ width: `${pct}%`, transition: "width 300ms linear" }} className={`h-full ${pct >= 100 ? "bg-green-500" : "bg-[#0D5CA4]"}`} />
//       </div>
//     );
//   };

//   return (
//     <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: "#EEF3F9" }}>
//       <div className="flex-shrink-0 px-4 pt-4">
//         <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>

//         <div className="mb-4">
//           <VersionsDropdown
//             versions={versions}
//             currentVersion={currentVersion}
//             loadingVersions={loadingVersions}
//             onVersionSelect={(v) => {
//               setCurrentVersion(v); // keep the component controlled
//               onVersionSelect && onVersionSelect(v); // forward prop from OTADeviceList props
//             }}
//           />
//         </div>

//         <div className="mb-4">
//           <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
//           <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//         </div>
//       </div>

//       <div className="flex-1 min-h-0 px-4 overflow-hidden">
//         <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
//           {loading ? (
//             <div className="text-center py-4">Loading devices...</div>
//           ) : devices.length === 0 ? (
//             <div className="text-center py-4">No devices connected.</div>
//           ) : (
//             <div className="space-y-2 pb-2">
//               {/* optional header row with selectAll */}
//               <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 border-b border-gray-200">
//                 <div className="flex items-center gap-2">
//                   <input type="checkbox" checked={selectedDevices.size === devices.length && devices.length > 0} onChange={handleSelectAll} />
//                   <span>Select All</span>
//                 </div>
//                 <div className="text-xs">Status • Progress</div>
//               </div>

//               {devices.map((device) => (
//                 <div key={device.deviceId} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <div className="relative flex-shrink-0">
//                       <input type="checkbox" checked={selectedDevices.has(device.deviceId)} onChange={() => handleDeviceToggle(device.deviceId)} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-2">
//                         <span className="text-gray-800 font-medium truncate">{device.deviceId}</span>
//                         <span className="text-gray-600 text-sm ml-2">{device.ip || ""}</span>
//                       </div>

//                       <div className="flex items-center gap-3 mt-1">
//                         <div className="text-xs text-gray-500">
//                           {device.status === "connected" ? "Connected" : "Disconnected"}
//                           {device.connectedAt ? ` • ${new Date(device.connectedAt).toLocaleString()}` : ""}
//                           {device.otaStatus && device.otaStatus !== "idle" ? ` • OTA: ${device.otaStatus}` : ""}
//                         </div>

//                         {/* progress bar & percent */}
//                         <div className="flex items-center gap-2">
//                           <ProgressBar value={device.progress ?? 0} />
//                           <div className="text-xs text-gray-600 w-10 text-right">{Math.round(device.progress ?? 0)}%</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
//         <div className="bg-gray-200 rounded-lg p-4">
//           <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
//           <p className="text-gray-800 font-bold text-xl">{devices.length < 10 ? `0${devices.length}` : devices.length}</p>
//         </div>

//         <div className="bg-green-500 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">PASS</p>
//           <p className="text-2xl font-bold">{passCountMemo < 10 ? `0${passCountMemo}` : passCountMemo}</p>
//         </div>

//         <div className="bg-orange-400 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">Fail</p>
//           <p className="text-2xl font-bold">{failCountMemo < 10 ? `0${failCountMemo}` : failCountMemo}</p>
//         </div>

//         <button onClick={handleOTA} className="cursor-pointer bg-[#0D5CA4] hover:bg-[#0A4A8A] text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md">
//           START OTA
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OTADeviceList;













// // src/components/ota/OTADeviceList.jsx
// import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import Swal from "sweetalert2";
// import { useStore } from "../../contexts/storecontexts";
// import "../../styles/pages/management-pages.css";
// import VersionsDropdown from "./VersionDropDown";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
// const WS_BASE = (import.meta.env.VITE_BACKEND_WS || "ws://localhost:5050") + "/ws/ota";

// const toast = (title, icon = "success", timer = 2500) =>
//   Swal.fire({ toast: true, position: "top-end", showConfirmButton: false, timer, title, icon });

// const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
//   const { token: ctxToken } = useStore?.() || {};
//   const token = ctxToken || localStorage.getItem("token") || "";

//   const [devices, setDevices] = useState([]); // { deviceId, ip, status, connectedAt, otaStatus, progress }
//   const [loading, setLoading] = useState(true);
//   const [selectedDevices, setSelectedDevices] = useState(new Set());
//   const [versions, setVersions] = useState([]);
//   const [currentVersion, setCurrentVersion] = useState(selectedVersion || "");
//   const [loadingVersions, setLoadingVersions] = useState(false);

//   const [passCount, setPassCount] = useState(0);
//   const [failCount, setFailCount] = useState(0);

//   const wsRef = useRef(null);
//   const reconnectTimeout = useRef(null);
//   const retryCount = useRef(0);
//   const gotInitialList = useRef(false);
//   const unmountedRef = useRef(false);

//   // keep progress map (not required but useful)
//   const deviceProgressRef = useRef(new Map());
// // near top of component (add this ref)
// const heartbeatIntervalRef = useRef(null);

//   // devicesRef lets event handlers read latest devices without recreating ws
//   const devicesRef = useRef([]);
//   useEffect(() => {
//     devicesRef.current = devices;
//   }, [devices]);

//   // track deviceIds we've already finalized (counted + maybe removed)
//   const finalizedRef = useRef(new Set());

//   // helper: finalize (count + mark final) and remove device from list + selection
//   const finalizeDevice = useCallback((deviceId, status) => {
//     if (!deviceId) return;
//     if (finalizedRef.current.has(deviceId)) return; // avoid double count

//     finalizedRef.current.add(deviceId);

//     if (status === "pass") setPassCount((s) => s + 1);
//     else if (status === "fail") setFailCount((s) => s + 1);

//     // remove from device list and selection
//     setDevices((prev) => prev.filter((d) => d.deviceId !== deviceId));
//     setSelectedDevices((prev) => {
//       const copy = new Set(prev);
//       copy.delete(deviceId);
//       return copy;
//     });
//     // cleanup progress cache
//     deviceProgressRef.current.delete(deviceId);
//   }, []);

//   /**
//    * connectWs:
//    * - stable identity (depends only on token)
//    * - avoids closing a CONNECTING socket (to prevent "closed before established" errors)
//    */
//   const connectWs = useCallback(() => {
//     const url = `${WS_BASE}?admin=true${token ? `&token=${encodeURIComponent(token)}` : ""}`;

//     // Clean up previous socket safely:
//     if (wsRef.current) {
//       try {
//         const prevState = wsRef.current.readyState;
//         if (prevState === WebSocket.OPEN) {
//           // close existing open socket (graceful)
//           wsRef.current.close();
//         } else if (prevState === WebSocket.CONNECTING) {
//           try {
//             wsRef.current.onopen = wsRef.current.onmessage = wsRef.current.onerror = wsRef.current.onclose = null;
//           } catch (err) {}
//           const shortRetry = setTimeout(() => {
//             if (!unmountedRef.current && (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)) {
//               connectWs();
//             }
//             clearTimeout(shortRetry);
//           }, 800);
//           return;
//         }
//       } catch (err) {
//         console.warn("Error while cleaning previous ws:", err);
//       }
//     }

//     const ws = new WebSocket(url);
//     wsRef.current = ws;

// ws.onopen = () => {
//   console.log("OTA dashboard WebSocket connected (onopen). url:", url, "readyState:", ws.readyState);
//   retryCount.current = 0;

//   // start sending application-level heartbeats every 10s so server can mark us alive
//   try {
//     if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
//     heartbeatIntervalRef.current = setInterval(() => {
//       try {
//         if (ws && ws.readyState === WebSocket.OPEN) {
//           ws.send(JSON.stringify({ type: "heartbeat" }));
//         }
//       } catch (err) {
//         console.warn("Failed to send heartbeat:", err);
//       }
//     }, 10000);
//   } catch (err) {
//     console.warn("heartbeat setup error:", err);
//   }

//   // fallback to clear "Loading..." if no server initial message arrives fast
//   const fallback = setTimeout(() => {
//     if (!gotInitialList.current) {
//       gotInitialList.current = true;
//       setLoading(false);
//       console.warn("Cleared loading (fallback) because no server initial message arrived yet.");
//     }
//     clearTimeout(fallback);
//   }, 2000);
// };


//     ws.onmessage = (evt) => {

//       // at top of onmessage, after parsing `msg`:
// if (msg && msg.type === "ping") {
//   // server asked an application-level ping — reply with pong
//   try {
//     if (ws && ws.readyState === WebSocket.OPEN) {
//       ws.send(JSON.stringify({ type: "pong" }));
//     }
//   } catch (err) {
//     console.warn("Failed to send pong:", err);
//   }
//   // treat ping as useful message so loading is cleared below
//   if (!gotInitialList.current) { gotInitialList.current = true; setLoading(false); }
//   return; // no further handling for ping frames
// }


//       // mark that we got something from server — stop showing stuck "Loading devices..."
//       try {
//         const raw = typeof evt.data === "string" ? evt.data : evt.data.toString?.() || evt.data;
//         // small debug line
//         // console.debug("OTA WS MSG RAW:", raw);
//         const msg = JSON.parse(raw);

//         // In case server didn't send a dedicated "server_hello", treat first useful message as handshake.
//         const usefulTypes = new Set(["device_list","device_connected","device_disconnected","ota_progress","ota_result","ota_batch_start","server_hello"]);
//         if (usefulTypes.has(msg.type)) {
//           if (!gotInitialList.current) {
//             gotInitialList.current = true;
//             setLoading(false);
//           }
//         }

//         // console.log("Message from Server WS<><>", msg);

//         switch (msg.type) {
//           case "server_hello": {
//             // explicit handshake from server (debug)
//             gotInitialList.current = true;
//             setLoading(false);
//             break;
//           }

//           case "device_list": {
//             // Merge incoming list into current devices to avoid wiping otaStatus/progress
//             const incoming = msg.devices || [];
//             setDevices((prev) => {
//               const map = new Map(prev.map((d) => [d.deviceId, { ...d }]));

//               for (const d of incoming) {
//                 const existing = map.get(d.deviceId);
//                 if (existing) {
//                   map.set(d.deviceId, {
//                     ...existing,
//                     ip: d.ip ?? existing.ip,
//                     status: d.status ?? existing.status ?? "connected",
//                     connectedAt: d.connectedAt ? new Date(d.connectedAt) : existing.connectedAt,
//                   });
//                 } else {
//                   map.set(d.deviceId, {
//                     deviceId: d.deviceId,
//                     ip: d.ip,
//                     status: d.status ?? "connected",
//                     connectedAt: d.connectedAt ? new Date(d.connectedAt) : null,
//                     otaStatus: "idle",
//                     progress: 0,
//                   });
//                 }
//               }

//               return Array.from(map.values());
//             });

//             gotInitialList.current = true;
//             setLoading(false);
//             break;
//           }

//           case "device_connected": {
//             const { deviceId, ip } = msg;
//             setDevices((prev) => {
//               const copy = [...prev];
//               const idx = copy.findIndex((x) => x.deviceId === deviceId);
//               const newEntry = {
//                 deviceId,
//                 ip,
//                 status: "connected",
//                 connectedAt: msg.time ? new Date(msg.time) : new Date(),
//                 otaStatus: "idle",
//                 progress: 0,
//               };
//               if (idx >= 0) copy[idx] = { ...copy[idx], ...newEntry };
//               else copy.unshift(newEntry);
//               return copy;
//             });
//             break;
//           }

//           case "device_disconnected": {
//             // Server may include otaFinalStatus when disconnect occurs during OTA and lastProgress
//             // { type: "device_disconnected", deviceId, otaFinalStatus?: "fail", message?, lastProgress?: number }
//             const { deviceId, otaFinalStatus, lastProgress } = msg;
//             console.log("device_disconnected received:", msg);

//             setDevices((prev) => {
//               const idx = prev.findIndex((d) => d.deviceId === deviceId);

//               // Helper to decide if this disconnect should count as OTA failure:
//               const shouldCountAsOtaFail = (foundDevice) => {
//                 // 1) server explicitly said it failed during OTA
//                 if (otaFinalStatus === "fail") return true;

//                 // 2) if server provided lastProgress and it's < 100
//                 if (typeof lastProgress === "number" && lastProgress < 100) return true;

//                 // 3) else if frontend knows device had started OTA and progress < 100
//                 if (foundDevice && (foundDevice.otaStatus === "started" || (foundDevice.progress ?? 0) < 100)) {
//                   return true;
//                 }

//                 return false;
//               };

//               if (idx === -1) {
//                 // device not found in UI list (maybe already removed by ota_result).
//                 // if we were given lastProgress and it indicates partial progress, finalize fail.
//                 if (!finalizedRef.current.has(deviceId)) {
//                   if (shouldCountAsOtaFail(null)) {
//                     // finalize and ensure removal (idempotent)
//                     toast(`Device ${deviceId} disconnected during OTA`, "error");
//                     setTimeout(() => finalizeDevice(deviceId, "fail"), 10);
//                   }
//                 }
//                 return prev;
//               }

//               // device exists in list — decide how to treat it
//               const found = prev[idx];

//               if (shouldCountAsOtaFail(found)) {
//                 // show toast, finalize (inc fail), remove device
//                 toast(`Device ${deviceId} disconnected during OTA`, "error");
//                 setTimeout(() => finalizeDevice(deviceId, "fail"), 10);
//                 return prev.filter((d) => d.deviceId !== deviceId);
//               }

//               // otherwise it's a normal disconnect (not during OTA) -> remove device but don't increment fail
//               return prev.filter((d) => d.deviceId !== deviceId);
//             });

//             // Also remove from selection immediately (safeguard)
//             setSelectedDevices((prev) => {
//               const copy = new Set(prev);
//               copy.delete(deviceId);
//               return copy;
//             });

//             break;
//           }

//           case "ota_batch_start": {
//             // server tells which targets started/are offline
//             const targets = msg.targets || [];

//             // For 'offline' entries (device was offline at start) remove from list.
//             // For 'started' mark as started.
//             setDevices((prev) => {
//               const byId = new Map(prev.map((d) => [d.deviceId, { ...d }]));
//               for (const t of targets) {
//                 const entry = byId.get(t.deviceId);
//                 if (!entry) continue;
//                 if (t.status === "started") {
//                   entry.otaStatus = "started";
//                   entry.progress = 0;
//                   byId.set(t.deviceId, entry);
//                 } else if (t.status === "offline") {
//                   // removed from list (offline before OTA)
//                   byId.delete(t.deviceId);
//                   // ensure selection cleared (done below too)
//                 }
//               }
//               // clear selections for any removed devices
//               setSelectedDevices((prevSel) => {
//                 const copy = new Set(prevSel);
//                 for (const t of targets) {
//                   if (t.status === "offline") copy.delete(t.deviceId);
//                 }
//                 return copy;
//               });
//               return Array.from(byId.values());
//             });

//             break;
//           }

//           case "ota_progress": {
//             // { type: "ota_progress", deviceId, progress }
//             const { deviceId, progress } = msg;
//             if (!deviceId) break;
//             const pct = Number(progress || 0);
//             deviceProgressRef.current.set(deviceId, pct);

//             setDevices((prev) =>
//               prev.map((d) => {
//                 if (d.deviceId !== deviceId) return d;
//                 const prevStatus = d.otaStatus;
//                 const newStatus = pct >= 100 ? "pass" : prevStatus === "offline" || prevStatus === "fail" ? prevStatus : "started";
//                 return { ...d, progress: pct, otaStatus: newStatus };
//               })
//             );

//             // notify when device reaches 100% (only once)
//             if (pct >= 100) {
//               const key = `__notified_${deviceId}`;
//               if (!deviceProgressRef.current.get(key)) {
//                 deviceProgressRef.current.set(key, true);
//                 toast(`Device ${deviceId} OTA completed (100%)`, "success", 2500);
//               }
//             }

//             break;
//           }

//           case "ota_result": {
//             // final server-side result: { type: "ota_result", deviceId, status: "pass"|"fail", message? }
//             const { deviceId, status, message } = msg;
//             if (!deviceId || !status) break;

//             console.log("OTA RESULT<><>FROM<><>WS", msg);

//             // increment counters only once and remove from list
//             if (!finalizedRef.current.has(deviceId)) {
//               // show toast
//               if (status === "pass") toast(`Device ${deviceId} OTA success`, "success");
//               else toast(`Device ${deviceId} OTA failed: ${message || "error"}`, "error", 4000);

//               finalizeDevice(deviceId, status);
//               deviceProgressRef.current.delete(deviceId);
//             } else {
//               // already finalized (ignore)
//               console.debug("Duplicate final event ignored for", deviceId, status);
//             }

//             break;
//           }

//           case "error":
//             console.warn("Server error frame:", msg);
//             break;

//           default:
//             console.log("Unknown WS message type:", msg.type);
//             break;
//         }
//       } catch (err) {
//         console.warn("Invalid WS message", err);
//       }
//     };

//     ws.onerror = (errEvent) => {
//       console.error("OTA WebSocket error event:", errEvent, "readyState:", ws.readyState, "url:", url);
//     };

//     ws.onclose = (e) => {
//       console.log("OTA WebSocket closed — code:", e?.code, "reason:", e?.reason, "wasClean:", e?.wasClean);
//       if (heartbeatIntervalRef.current) {
//     clearInterval(heartbeatIntervalRef.current);
//     heartbeatIntervalRef.current = null;
//   }
//   if (!gotInitialList.current) setLoading(false);
//       if (!gotInitialList.current) setLoading(false);

//       // detach handlers
//       try {
//         ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
//       } catch {}

//       if (unmountedRef.current) return;

//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       const backoff = Math.min(30000, 1000 * Math.pow(1.5, retryCount.current || 0));
//       reconnectTimeout.current = setTimeout(() => {
//         retryCount.current += 1;
//         connectWs();
//       }, backoff);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token, finalizeDevice]); // include finalizeDevice so closure is valid

//   // start WS (mount) and cleanup
//   useEffect(() => {
//     unmountedRef.current = false;
//     connectWs();
//     return () => {
//       unmountedRef.current = true;
//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       if (wsRef.current) {
//         try {
//           wsRef.current.onclose = null;
//           wsRef.current.close();
//         } catch (err) {}
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [connectWs]);

//   // Fetch versions (unchanged)
//   useEffect(() => {
//     const fetchVersions = async () => {
//       setLoadingVersions(true);
//       try {
//         const res = await fetch(`${BASE}/ota/all`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });

//         if (res.status === 404) {
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         if (!res.ok) {
//           const text = await res.text().catch(() => "");
//           console.warn("Failed to fetch OTA versions:", res.status, text);
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         const data = await res.json();
//         const verList = Array.isArray(data) ? data.map((f) => f.versionId).filter(Boolean) : [];
//         setVersions(verList);

//         if (selectedVersion) {
//           setCurrentVersion(selectedVersion);
//         } else if (verList.length > 0) {
//           setCurrentVersion(verList[0]);
//           onVersionSelect && onVersionSelect(verList[0]);
//         } else {
//           setCurrentVersion("");
//           onVersionSelect && onVersionSelect("");
//         }
//       } catch (err) {
//         console.error("Error fetching OTA versions:", err);
//         setVersions([]);
//         setCurrentVersion("");
//         onVersionSelect && onVersionSelect("");
//       } finally {
//         setLoadingVersions(false);
//       }
//     };

//     fetchVersions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // mount-only

//   useEffect(() => {
//     if (selectedVersion && selectedVersion !== currentVersion) {
//       setCurrentVersion(selectedVersion);
//     }
//   }, [selectedVersion, currentVersion]);

//   // selection helpers use device.deviceId
//   const handleDeviceToggle = (deviceId) => {
//     setSelectedDevices((prev) => {
//       const copy = new Set(prev);
//       if (copy.has(deviceId)) copy.delete(deviceId);
//       else copy.add(deviceId);
//       return copy;
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectedDevices.size === devices.length) setSelectedDevices(new Set());
//     else setSelectedDevices(new Set(devices.map((d) => d.deviceId)));
//   };

//   // Start OTA via REST endpoint - backend will broadcast results to WS
//   const handleOTA = async () => {
//     if (!currentVersion) {
//       Swal.fire({ icon: "error", title: "Select version", text: "Please choose an OTA version to start." });
//       return;
//     }
//     if (selectedDevices.size === 0) {
//       Swal.fire({ icon: "error", title: "No devices selected", text: "Please select at least 1 device." });
//       return;
//     }

//     // Build deviceIds but filter out devices that are not connected (they will never start)
//     const allSelected = Array.from(selectedDevices);
//     const connectedSelected = [];
//     const disconnectedRemoved = [];
//     for (const id of allSelected) {
//       const d = devices.find((x) => x.deviceId === id);
//       if (d && d.status === "connected") connectedSelected.push(id);
//       else disconnectedRemoved.push(id);
//     }

//     if (disconnectedRemoved.length > 0) {
//       // remove them from the UI list and selection so counts and list are correct
//       setSelectedDevices((prev) => {
//         const copy = new Set(prev);
//         disconnectedRemoved.forEach((id) => copy.delete(id));
//         return copy;
//       });

//       // remove them from device list (disconnected before OTA)
//       setDevices((prev) => prev.filter((d) => d.status === "connected" || !disconnectedRemoved.includes(d.deviceId)));

//       toast(`${disconnectedRemoved.length} device(s) removed (already disconnected).`, "info", 2000);
//     }

//     if (connectedSelected.length === 0) {
//       Swal.fire({ icon: "error", title: "No connected devices", text: "No selected devices are connected." });
//       return;
//     }

//     const deviceIds = connectedSelected;

//     try {
//       const res = await fetch(`${BASE}/ota/start`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify({ versionId: currentVersion, devices: deviceIds }),
//       });

//       const data = await res.json().catch(() => null);
//       console.log("OTASTART DATA FROM BACKEND", data);

//       if (!res.ok) {
//         Swal.fire({ icon: "error", title: "OTA start failed", text: data?.message || res.statusText || "Failed to start OTA" });
//         return;
//       }

//       // Do NOT treat API 200 as final success. API confirms trigger only.
//       toast(`OTA triggered for ${deviceIds.length} device(s)`, "info", 1800);

//       // The server returns per-device started/offline; update UI accordingly
//       if (data?.results && Array.isArray(data.results)) {
//         setDevices((prev) =>
//           prev
//             .map((d) => {
//               const t = data.results.find((r) => r.deviceId === d.deviceId);
//               if (t) {
//                 // if offline at start -> remove (handled below)
//                 return { ...d, otaStatus: t.status === "started" ? "started" : t.status === "offline" ? "offline" : d.otaStatus, progress: t.status === "started" ? 0 : d.progress ?? 0 };
//               }
//               return d;
//             })
//             .filter((d) => d.otaStatus !== "offline") // remove offline targets (not available at start)
//         );
//       }
//     } catch (err) {
//       console.error("startOTA error", err);
//       Swal.fire({ icon: "error", title: "Server error", text: "Unable to start OTA. See console." });
//     }
//   };

//   // compute counts from state
//   const passCountMemo = useMemo(() => passCount, [passCount]);
//   const failCountMemo = useMemo(() => failCount, [failCount]);

//   // small progress bar renderer
//   const ProgressBar = ({ value = 0 }) => {
//     const pct = Math.max(0, Math.min(100, Number(value || 0)));
//     return (
//       <div className="w-28 h-2 bg-gray-200 rounded overflow-hidden" style={{ minWidth: 112 }}>
//         <div style={{ width: `${pct}%`, transition: "width 300ms linear" }} className={`h-full ${pct >= 100 ? "bg-green-500" : "bg-[#0D5CA4]"}`} />
//       </div>
//     );
//   };

//   return (
//     <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: "#EEF3F9" }}>
//       <div className="flex-shrink-0 px-4 pt-4">
//         <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>

//         <div className="mb-4">
//           <VersionsDropdown
//             versions={versions}
//             currentVersion={currentVersion}
//             loadingVersions={loadingVersions}
//             onVersionSelect={(v) => {
//               setCurrentVersion(v); // keep the component controlled
//               onVersionSelect && onVersionSelect(v); // forward prop from OTADeviceList props
//             }}
//           />
//         </div>

//         <div className="mb-4">
//           <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
//           <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//         </div>
//       </div>

//       <div className="flex-1 min-h-0 px-4 overflow-hidden">
//         <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
//           {loading ? (
//             <div className="text-center py-4">Loading devices...</div>
//           ) : devices.length === 0 ? (
//             <div className="text-center py-4">No devices connected.</div>
//           ) : (
//             <div className="space-y-2 pb-2">
//               {/* optional header row with selectAll */}
//               <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 border-b border-gray-200">
//                 <div className="flex items-center gap-2">
//                   <input type="checkbox" checked={selectedDevices.size === devices.length && devices.length > 0} onChange={handleSelectAll} />
//                   <span>Select All</span>
//                 </div>
//                 <div className="text-xs">Status • Progress</div>
//               </div>

//               {devices.map((device) => (
//                 <div key={device.deviceId} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <div className="relative flex-shrink-0">
//                       <input type="checkbox" checked={selectedDevices.has(device.deviceId)} onChange={() => handleDeviceToggle(device.deviceId)} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-2">
//                         <span className="text-gray-800 font-medium truncate">{device.deviceId}</span>
//                         <span className="text-gray-600 text-sm ml-2">{device.ip || ""}</span>
//                       </div>

//                       <div className="flex items-center gap-3 mt-1">
//                         <div className="text-xs text-gray-500">
//                           {device.status === "connected" ? "Connected" : "Disconnected"}
//                           {device.connectedAt ? ` • ${new Date(device.connectedAt).toLocaleString()}` : ""}
//                           {device.otaStatus && device.otaStatus !== "idle" ? ` • OTA: ${device.otaStatus}` : ""}
//                         </div>

//                         {/* progress bar & percent */}
//                         <div className="flex items-center gap-2">
//                           <ProgressBar value={device.progress ?? 0} />
//                           <div className="text-xs text-gray-600 w-10 text-right">{Math.round(device.progress ?? 0)}%</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
//         <div className="bg-gray-200 rounded-lg p-4">
//           <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
//           <p className="text-gray-800 font-bold text-xl">{devices.length < 10 ? `0${devices.length}` : devices.length}</p>
//         </div>

//         <div className="bg-green-500 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">PASS</p>
//           <p className="text-2xl font-bold">{passCountMemo < 10 ? `0${passCountMemo}` : passCountMemo}</p>
//         </div>

//         <div className="bg-orange-400 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">Fail</p>
//           <p className="text-2xl font-bold">{failCountMemo < 10 ? `0${failCountMemo}` : failCountMemo}</p>
//         </div>

//         <button onClick={handleOTA} className="cursor-pointer bg-[#0D5CA4] hover:bg-[#0A4A8A] text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md">
//           START OTA
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OTADeviceList;





















// // src/components/ota/OTADeviceList.jsx
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import Swal from "sweetalert2";
// import { useStore } from "../../contexts/storecontexts";
// import "../../styles/pages/management-pages.css";
// import VersionsDropdown from "./VersionDropDown";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
// const WS_BASE = (import.meta.env.VITE_BACKEND_WS || "ws://localhost:5050") + "/ws/ota";

// const toast = (title, icon = "success", timer = 2500) =>
//   Swal.fire({ toast: true, position: "top-end", showConfirmButton: false, timer, title, icon });

// const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
//   const { token: ctxToken } = useStore?.() || {};
//   const token = ctxToken || localStorage.getItem("token") || "";

//   const [devices, setDevices] = useState([]); // { deviceId, ip, status, connectedAt, otaStatus, progress }
//   const [loading, setLoading] = useState(true);
//   const [selectedDevices, setSelectedDevices] = useState(new Set());
//   const [versions, setVersions] = useState([]);
//   const [currentVersion, setCurrentVersion] = useState(selectedVersion || "");
//   const [loadingVersions, setLoadingVersions] = useState(false);

//   const [passCount, setPassCount] = useState(0);
//   const [failCount, setFailCount] = useState(0);

//   const wsRef = useRef(null);
//   const reconnectTimeout = useRef(null);
//   const retryCount = useRef(0);
//   const gotInitialList = useRef(false);
//   const unmountedRef = useRef(false);

//   // keep progress map (not required but useful)
//   const deviceProgressRef = useRef(new Map());
//   // near top of component (add this ref)
//   const heartbeatIntervalRef = useRef(null);

//   // devicesRef lets event handlers read latest devices without recreating ws
//   const devicesRef = useRef([]);
//   useEffect(() => {
//     devicesRef.current = devices;
//   }, [devices]);

//   // track deviceIds we've already finalized (counted + maybe removed)
//   const finalizedRef = useRef(new Set());

//   // helper: finalize (count + mark final) and remove device from list + selection
//  const finalizeDevice = useCallback((deviceId, status) => {
//   if (!deviceId || finalizedRef.current.has(deviceId)) return;
//   finalizedRef.current.add(deviceId);

//   if (status === "pass") setPassCount((s) => s + 1);
//   else if (status === "fail") setFailCount((s) => s + 1);

//   setDevices((prev) => prev.filter((d) => d.deviceId !== deviceId));
//   setSelectedDevices((prev) => {
//     const copy = new Set(prev);
//     copy.delete(deviceId);
//     return copy;
//   });
//   deviceProgressRef.current.delete(deviceId);
// }, []);


//   // helper: remove device from UI without counting it as pass/fail
// const removeDeviceOnly = useCallback((deviceId) => {
//   if (!deviceId) return;
//   if (!finalizedRef.current.has(deviceId)) finalizedRef.current.add(deviceId);

//   setDevices((prev) => prev.filter((d) => d.deviceId !== deviceId));
//   setSelectedDevices((prev) => {
//     const copy = new Set(prev);
//     copy.delete(deviceId);
//     return copy;
//   });
//   deviceProgressRef.current.delete(deviceId);
// }, []);


//   /**
//    * connectWs:
//    * - stable identity (depends only on token)
//    * - avoids closing a CONNECTING socket (to prevent "closed before established" errors)
//    */
//   const connectWs = useCallback(() => {
//     const url = `${WS_BASE}?admin=true${token ? `&token=${encodeURIComponent(token)}` : ""}`;

//     // Clean up previous socket safely:
//     if (wsRef.current) {
//       try {
//         const prevState = wsRef.current.readyState;
//         if (prevState === WebSocket.OPEN) {
//           // close existing open socket (graceful)
//           wsRef.current.close();
//         } else if (prevState === WebSocket.CONNECTING) {
//           try {
//             wsRef.current.onopen = wsRef.current.onmessage = wsRef.current.onerror = wsRef.current.onclose = null;
//           } catch (err) {}
//           const shortRetry = setTimeout(() => {
//             if (!unmountedRef.current && (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)) {
//               connectWs();
//             }
//             clearTimeout(shortRetry);
//           }, 800);
//           return;
//         }
//       } catch (err) {
//         console.warn("Error while cleaning previous ws:", err);
//       }
//     }

//     const ws = new WebSocket(url);
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log("OTA dashboard WebSocket connected (onopen). url:", url, "readyState:", ws.readyState);
//       retryCount.current = 0;

//       // start sending application-level heartbeats every 10s so server can mark us alive
//       try {
//         if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
//         heartbeatIntervalRef.current = setInterval(() => {
//           try {
//             if (ws && ws.readyState === WebSocket.OPEN) {
//               ws.send(JSON.stringify({ type: "heartbeat" }));
//             }
//           } catch (err) {
//             console.warn("Failed to send heartbeat:", err);
//           }
//         }, 10000);
//       } catch (err) {
//         console.warn("heartbeat setup error:", err);
//       }

//       // fallback to clear "Loading..." if no server initial message arrives fast
//       const fallback = setTimeout(() => {
//         if (!gotInitialList.current) {
//           gotInitialList.current = true;
//           setLoading(false);
//           console.warn("Cleared loading (fallback) because no server initial message arrived yet.");
//         }
//         clearTimeout(fallback);
//       }, 2000);
//     };

//     ws.onmessage = (evt) => {
//       try {
//         const raw = typeof evt.data === "string" ? evt.data : evt.data.toString?.() || evt.data;
//         const msg = JSON.parse(raw);

//         // handle application-level ping/pong if present
//         if (msg && msg.type === "ping") {
//           try {
//             if (ws && ws.readyState === WebSocket.OPEN) {
//               ws.send(JSON.stringify({ type: "pong" }));
//             }
//           } catch (err) {
//             console.warn("Failed to send pong:", err);
//           }
//           if (!gotInitialList.current) { gotInitialList.current = true; setLoading(false); }
//           return;
//         }

//         // treat first useful message as handshake
//         const usefulTypes = new Set(["device_list","device_connected","device_disconnected","ota_progress","ota_result","ota_batch_start","server_hello"]);
//         if (usefulTypes.has(msg.type)) {
//           if (!gotInitialList.current) {
//             gotInitialList.current = true;
//             setLoading(false);
//           }
//         }

//         switch (msg.type) {
//           case "server_hello": {
//             gotInitialList.current = true;
//             setLoading(false);
//             break;
//           }

//           case "device_list": {
//             const incoming = msg.devices || [];
//             setDevices((prev) => {
//               const map = new Map(prev.map((d) => [d.deviceId, { ...d }]));

//               for (const d of incoming) {
//                 const existing = map.get(d.deviceId);
//                 if (existing) {
//                   map.set(d.deviceId, {
//                     ...existing,
//                     ip: d.ip ?? existing.ip,
//                     status: d.status ?? existing.status ?? "connected",
//                     connectedAt: d.connectedAt ? new Date(d.connectedAt) : existing.connectedAt,
//                   });
//                 } else {
//                   map.set(d.deviceId, {
//                     deviceId: d.deviceId,
//                     ip: d.ip,
//                     status: d.status ?? "connected",
//                     connectedAt: d.connectedAt ? new Date(d.connectedAt) : null,
//                     otaStatus: "idle",
//                     progress: 0,
//                   });
//                 }
//               }

//               return Array.from(map.values());
//             });

//             gotInitialList.current = true;
//             setLoading(false);
//             break;
//           }

//           case "device_connected": {
//             const { deviceId, ip } = msg;
//             setDevices((prev) => {
//               const copy = [...prev];
//               const idx = copy.findIndex((x) => x.deviceId === deviceId);
//               const newEntry = {
//                 deviceId,
//                 ip,
//                 status: "connected",
//                 connectedAt: msg.time ? new Date(msg.time) : new Date(),
//                 otaStatus: "idle",
//                 progress: 0,
//               };
//               if (idx >= 0) copy[idx] = { ...copy[idx], ...newEntry };
//               else copy.unshift(newEntry);
//               return copy;
//             });
//             break;
//           }

//           case "device_disconnected": {
//             removeDeviceOnly(msg.deviceId);
//             break;
//           }

//           case "ota_batch_start": {
//             // server tells which targets started/are offline
//             const targets = msg.targets || [];

//             // For 'offline' entries (device was offline at start) remove from list.
//             // For 'started' mark as started.
//             setDevices((prev) => {
//               const byId = new Map(prev.map((d) => [d.deviceId, { ...d }]));
//               for (const t of targets) {
//                 const entry = byId.get(t.deviceId);
//                 if (!entry) continue;
//                 if (t.status === "started") {
//                   entry.otaStatus = "started";
//                   entry.progress = 0;
//                   byId.set(t.deviceId, entry);
//                 } else if (t.status === "offline") {
//                   // removed from list (offline before OTA)
//                   byId.delete(t.deviceId);
//                 }
//               }
//               // clear selections for any removed devices
//               setSelectedDevices((prevSel) => {
//                 const copy = new Set(prevSel);
//                 for (const t of targets) {
//                   if (t.status === "offline") copy.delete(t.deviceId);
//                 }
//                 return copy;
//               });
//               return Array.from(byId.values());
//             });

//             break;
//           }

//           case "ota_progress": {
//             // { type: "ota_progress", deviceId, progress }
//             const { deviceId, progress } = msg;
//             if (!deviceId) break;
//             const pct = Number(progress || 0);
//             deviceProgressRef.current.set(deviceId, pct);

//             setDevices((prev) =>
//               prev.map((d) => {
//                 if (d.deviceId !== deviceId) return d;
//                 const prevStatus = d.otaStatus;
//                 const newStatus = pct >= 100 ? "pass" : prevStatus === "offline" || prevStatus === "fail" ? prevStatus : "started";
//                 return { ...d, progress: pct, otaStatus: newStatus };
//               })
//             );

//             // notify when device reaches 100% (only once)
//             if (pct >= 100) {
//               const key = `__notified_${deviceId}`;
//               if (!deviceProgressRef.current.get(key)) {
//                 deviceProgressRef.current.set(key, true);
//                 toast(`Device ${deviceId} OTA completed (100%)`, "success", 2500);
//               }
//             }

//             break;
//           }

//           case "ota_result": {
//             // final server-side result: { type: "ota_result", deviceId, status: "pass"|"fail", message?, reason? }
//             const { deviceId, status, message, reason } = msg;
//             if (!deviceId || !status) break;

//             console.log("OTA RESULT<><>FROM<><>WS", msg);

//             // Important: backend can emit failures with reason: "offline" when device was offline at start.
//             // Per your requested logic: devices disconnected BEFORE otaStart should be removed but NOT counted as a fail.
//             // So: if reason === "offline" treat as remove-only (no fail count).
//             if (status === "fail" && reason === "offline") {
//               // remove from UI silently (or notify as info) but DO NOT increment fail count
//               toast(`Device ${deviceId} was offline — removed`, "info", 1800);
//               removeDeviceOnly(deviceId);
//               break;
//             }

//             // normal finalization: pass or fail should be counted once
//             if (!finalizedRef.current.has(deviceId)) {
//               if (status === "pass") toast(`Device ${deviceId} OTA success`, "success");
//               else toast(`Device ${deviceId} OTA failed: ${message || "error"}`, "error", 4000);

//               finalizeDevice(deviceId, status === "pass" ? "pass" : "fail");
//               deviceProgressRef.current.delete(deviceId);
//             } else {
//               console.debug("Duplicate final event ignored for", deviceId, status);
//             }
            

//             break;
//           }

//           case "error":
//             console.warn("Server error frame:", msg);
//             break;

//           default:
//             console.log("Unknown WS message type:", msg.type);
//             break;
//         }
//       } catch (err) {
//         console.warn("Invalid WS message", err);
//       }
//     };

//     ws.onerror = (errEvent) => {
//       console.error("OTA WebSocket error event:", errEvent, "readyState:", ws.readyState, "url:", url);
//     };

//     ws.onclose = (e) => {
//       console.log("OTA WebSocket closed — code:", e?.code, "reason:", e?.reason, "wasClean:", e?.wasClean);
//       if (heartbeatIntervalRef.current) {
//         clearInterval(heartbeatIntervalRef.current);
//         heartbeatIntervalRef.current = null;
//       }
//       if (!gotInitialList.current) setLoading(false);

//       // detach handlers
//       try {
//         ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
//       } catch {}

//       if (unmountedRef.current) return;

//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       const backoff = Math.min(30000, 1000 * Math.pow(1.5, retryCount.current || 0));
//       reconnectTimeout.current = setTimeout(() => {
//         retryCount.current += 1;
//         connectWs();
//       }, backoff);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token, finalizeDevice, removeDeviceOnly]); // include helpers so closure updates

//   // start WS (mount) and cleanup
//   useEffect(() => {
//     unmountedRef.current = false;
//     connectWs();
//     return () => {
//       unmountedRef.current = true;
//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       if (wsRef.current) {
//         try {
//           wsRef.current.onclose = null;
//           wsRef.current.close();
//         } catch (err) {}
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [connectWs]);

//   // Fetch versions (unchanged)
//   useEffect(() => {
//     const fetchVersions = async () => {
//       setLoadingVersions(true);
//       try {
//         const res = await fetch(`${BASE}/ota/all`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });

//         if (res.status === 404) {
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         if (!res.ok) {
//           const text = await res.text().catch(() => "");
//           console.warn("Failed to fetch OTA versions:", res.status, text);
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         const data = await res.json();
//         const verList = Array.isArray(data) ? data.map((f) => f.versionId).filter(Boolean) : [];
//         setVersions(verList);

//         if (selectedVersion) {
//           setCurrentVersion(selectedVersion);
//         } else if (verList.length > 0) {
//           setCurrentVersion(verList[0]);
//           onVersionSelect && onVersionSelect(verList[0]);
//         } else {
//           setCurrentVersion("");
//           onVersionSelect && onVersionSelect("");
//         }
//       } catch (err) {
//         console.error("Error fetching OTA versions:", err);
//         setVersions([]);
//         setCurrentVersion("");
//         onVersionSelect && onVersionSelect("");
//       } finally {
//         setLoadingVersions(false);
//       }
//     };

//     fetchVersions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // mount-only

//   useEffect(() => {
//     if (selectedVersion && selectedVersion !== currentVersion) {
//       setCurrentVersion(selectedVersion);
//     }
//   }, [selectedVersion, currentVersion]);

//   // selection helpers use device.deviceId
//   const handleDeviceToggle = (deviceId) => {
//     setSelectedDevices((prev) => {
//       const copy = new Set(prev);
//       if (copy.has(deviceId)) copy.delete(deviceId);
//       else copy.add(deviceId);
//       return copy;
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectedDevices.size === devices.length) setSelectedDevices(new Set());
//     else setSelectedDevices(new Set(devices.map((d) => d.deviceId)));
//   };

//   // Start OTA via REST endpoint - backend will broadcast results to WS
//   const handleOTA = async () => {

//     if (!currentVersion) {
//       Swal.fire({ icon: "error", title: "Select version", text: "Please choose an OTA version to start." });
//       return;
//     }
//     if (selectedDevices.size === 0) {
//       Swal.fire({ icon: "error", title: "No devices selected", text: "Please select at least 1 device." });
//       return;
//     }

//     // Build deviceIds but filter out devices that are not connected (they will never start)
//     const allSelected = Array.from(selectedDevices);
//     const connectedSelected = [];
//     const disconnectedRemoved = [];
//     for (const id of allSelected) {
//       const d = devices.find((x) => x.deviceId === id);
//       if (d && d.status === "connected") connectedSelected.push(id);
//       else disconnectedRemoved.push(id);
//     }

//     if (disconnectedRemoved.length > 0) {
//       // remove them from the UI list and selection so counts and list are correct
//       setSelectedDevices((prev) => {
//         const copy = new Set(prev);
//         disconnectedRemoved.forEach((id) => copy.delete(id));
//         return copy;
//       });

//       // remove them from device list (disconnected before OTA)
//       setDevices((prev) => prev.filter((d) => d.status === "connected" || !disconnectedRemoved.includes(d.deviceId)));

//       toast(`${disconnectedRemoved.length} device(s) removed (already disconnected).`, "info", 2000);
//     }

//     if (connectedSelected.length === 0) {
//       Swal.fire({ icon: "error", title: "No connected devices", text: "No selected devices are connected." });
//       return;
//     }

//     const deviceIds = connectedSelected;

//     try {
//       const res = await fetch(`${BASE}/ota/start`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify({ versionId: currentVersion, devices: deviceIds }),
//       });

//       const data = await res.json().catch(() => null);
//       console.log("OTASTART DATA FROM BACKEND", data);

//       if (!res.ok) {
//         Swal.fire({ icon: "error", title: "OTA start failed", text: data?.message || res.statusText || "Failed to start OTA" });
//         return;
//       }

//       // Do NOT treat API 200 as final success. API confirms trigger only.
//       toast(`OTA triggered for ${deviceIds.length} device(s)`, "info", 1800);

//       // The server returns per-device started/offline; update UI accordingly
//       if (data?.results && Array.isArray(data.results)) {
//         setDevices((prev) =>
//           prev
//             .map((d) => {
//               const t = data.results.find((r) => r.deviceId === d.deviceId);
//               if (t) {
//                 // if offline at start -> remove (handled below)
//                 return { ...d, otaStatus: t.status === "started" ? "started" : t.status === "offline" ? "offline" : d.otaStatus, progress: t.status === "started" ? 0 : d.progress ?? 0 };
//               }
//               return d;
//             })
//             .filter((d) => d.otaStatus !== "offline") // remove offline targets (not available at start)
//         );
//       }
//     } catch (err) {
//       console.error("startOTA error", err);
//       Swal.fire({ icon: "error", title: "Server error", text: "Unable to start OTA. See console." });
//     }
//   };

//   // compute counts from state
//   const passCountMemo = useMemo(() => passCount, [passCount]);
//   const failCountMemo = useMemo(() => failCount, [failCount]);

//   // small progress bar renderer
//   const ProgressBar = ({ value = 0 }) => {
//     const pct = Math.max(0, Math.min(100, Number(value || 0)));
//     return (
//       <div className="w-28 h-2 bg-gray-200 rounded overflow-hidden" style={{ minWidth: 112 }}>
//         <div style={{ width: `${pct}%`, transition: "width 300ms linear" }} className={`h-full ${pct >= 100 ? "bg-green-500" : "bg-[#0D5CA4]"}`} />
//       </div>
//     );
//   };

//   return (
//     <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: "#EEF3F9" }}>
//       <div className="flex-shrink-0 px-4 pt-4">
//         <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>

//         <div className="mb-4">
//           <VersionsDropdown
//             versions={versions}
//             currentVersion={currentVersion}
//             loadingVersions={loadingVersions}
//             onVersionSelect={(v) => {
//               setCurrentVersion(v); // keep the component controlled
//               onVersionSelect && onVersionSelect(v); // forward prop from OTADeviceList props
//             }}
//           />
//         </div>

//         <div className="mb-4">
//           <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
//           <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//         </div>
//       </div>

//       <div className="flex-1 min-h-0 px-4 overflow-hidden">
//         <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
//           {loading ? (
//             <div className="text-center py-4">Loading devices...</div>
//           ) : devices.length === 0 ? (
//             <div className="text-center py-4">No devices connected.</div>
//           ) : (
//             <div className="space-y-2 pb-2">
//               {/* optional header row with selectAll */}
//               <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 border-b border-gray-200">
//                 <div className="flex items-center gap-2">
//                   <input type="checkbox" checked={selectedDevices.size === devices.length && devices.length > 0} onChange={handleSelectAll} />
//                   <span>Select All</span>
//                 </div>
//                 <div className="text-xs">Status • Progress</div>
//               </div>

//               {devices.map((device) => (
//                 <div key={device.deviceId} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <div className="relative flex-shrink-0">
//                       <input type="checkbox" checked={selectedDevices.has(device.deviceId)} onChange={() => handleDeviceToggle(device.deviceId)} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-2">
//                         <span className="text-gray-800 font-medium truncate">{device.deviceId}</span>
//                         <span className="text-gray-600 text-sm ml-2">{device.ip || ""}</span>
//                       </div>

//                       <div className="flex items-center gap-3 mt-1">
//                         <div className="text-xs text-gray-500">
//                           {device.status === "connected" ? "Connected" : "Disconnected"}
//                           {device.connectedAt ? ` • ${new Date(device.connectedAt).toLocaleString()}` : ""}
//                           {device.otaStatus && device.otaStatus !== "idle" ? ` • OTA: ${device.otaStatus}` : ""}
//                         </div>

//                         {/* progress bar & percent */}
//                         <div className="flex items-center gap-2">
//                           <ProgressBar value={device.progress ?? 0} />
//                           <div className="text-xs text-gray-600 w-10 text-right">{Math.round(device.progress ?? 0)}%</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
//         <div className="bg-gray-200 rounded-lg p-4">
//           <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
//           <p className="text-gray-800 font-bold text-xl">{devices.length < 10 ? `0${devices.length}` : devices.length}</p>
//         </div>

//         <div className="bg-green-500 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">PASS</p>
//           <p className="text-2xl font-bold">{passCountMemo < 10 ? `0${passCountMemo}` : passCountMemo}</p>
//         </div>

//         <div className="bg-orange-400 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">Fail</p>
//           <p className="text-2xl font-bold">{failCountMemo < 10 ? `0${failCountMemo}` : failCountMemo}</p>
//         </div>

//         <button onClick={handleOTA} className="cursor-pointer bg-[#0D5CA4] hover:bg-[#0A4A8A] text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md">
//           START OTA
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OTADeviceList;


// // src/components/ota/OTADeviceList.jsx
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import Swal from "sweetalert2";
// import { useStore } from "../../contexts/storecontexts";
// import "../../styles/pages/management-pages.css";
// import VersionsDropdown from "./VersionDropDown";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
// const WS_BASE = (import.meta.env.VITE_BACKEND_WS || "ws://localhost:5050") + "/ws/ota";

// const toast = (title, icon = "success", timer = 2500) =>
//   Swal.fire({ toast: true, position: "top-end", showConfirmButton: false, timer, title, icon });

// const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
//   const { token: ctxToken } = useStore?.() || {};
//   const token = ctxToken || localStorage.getItem("token") || "";

//   const [devices, setDevices] = useState([]); // { deviceId, ip, status, connectedAt, otaStatus, progress }
//   const [loading, setLoading] = useState(true);
//   const [selectedDevices, setSelectedDevices] = useState(new Set());
//   const [versions, setVersions] = useState([]);
//   const [currentVersion, setCurrentVersion] = useState(selectedVersion || "");
//   const [loadingVersions, setLoadingVersions] = useState(false);

//   const [passCount, setPassCount] = useState(0);
//   const [failCount, setFailCount] = useState(0);
//   const [otaInProgress, setOtaInProgress] = useState(false);

//   const wsRef = useRef(null);
//   const reconnectTimeout = useRef(null);
//   const retryCount = useRef(0);
//   const gotInitialList = useRef(false);
//   const unmountedRef = useRef(false);
//   const navigate = useNavigate();
  
//   // keep progress map (not required but useful)
//   const deviceProgressRef = useRef(new Map());
//   // near top of component (add this ref)
//   const heartbeatIntervalRef = useRef(null);

//   // devicesRef lets event handlers read latest devices without recreating ws
//   const devicesRef = useRef([]);
//   useEffect(() => {
//     devicesRef.current = devices;
//   }, [devices]);

//   // track deviceIds we've already finalized (counted + maybe removed)
//   const finalizedRef = useRef(new Set());

//   // helper: finalize (count + mark final) and remove device from list + selection
//  const finalizeDevice = useCallback((deviceId, status) => {
//   if (!deviceId || finalizedRef.current.has(deviceId)) return;
//   finalizedRef.current.add(deviceId);

//   if (status === "pass") setPassCount((s) => s + 1);
//   else if (status === "fail") setFailCount((s) => s + 1);

//   setDevices((prev) => prev.filter((d) => d.deviceId !== deviceId));
//   setSelectedDevices((prev) => {
//     const copy = new Set(prev);
//     copy.delete(deviceId);
//     return copy;
//   });
//   deviceProgressRef.current.delete(deviceId);
// }, []);


//   // helper: remove device from UI without counting it as pass/fail
// const removeDeviceOnly = useCallback((deviceId) => {
//   if (!deviceId) return;
//   if (!finalizedRef.current.has(deviceId)) finalizedRef.current.add(deviceId);

//   setDevices((prev) => prev.filter((d) => d.deviceId !== deviceId));
//   setSelectedDevices((prev) => {
//     const copy = new Set(prev);
//     copy.delete(deviceId);
//     return copy;
//   });
//   deviceProgressRef.current.delete(deviceId);
// }, []);


//   /**
//    * connectWs:
//    * - stable identity (depends only on token)
//    * - avoids closing a CONNECTING socket (to prevent "closed before established" errors)
//    */
//   const connectWs = useCallback(() => {
//     const url = `${WS_BASE}?admin=true${token ? `&token=${encodeURIComponent(token)}` : ""}`;

//     // Clean up previous socket safely:
//     if (wsRef.current) {
//       try {
//         const prevState = wsRef.current.readyState;
//         if (prevState === WebSocket.OPEN) {
//           // close existing open socket (graceful)
//           wsRef.current.close();
//         } else if (prevState === WebSocket.CONNECTING) {
//           try {
//             wsRef.current.onopen = wsRef.current.onmessage = wsRef.current.onerror = wsRef.current.onclose = null;
//           } catch (err) {}
//           const shortRetry = setTimeout(() => {
//             if (!unmountedRef.current && (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)) {
//               connectWs();
//             }
//             clearTimeout(shortRetry);
//           }, 800);
//           return;
//         }
//       } catch (err) {
//         console.warn("Error while cleaning previous ws:", err);
//       }
//     }

//     const ws = new WebSocket(url);
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log("OTA dashboard WebSocket connected (onopen). url:", url, "readyState:", ws.readyState);
//       retryCount.current = 0;

//       // start sending application-level heartbeats every 10s so server can mark us alive
//       try {
//         if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
//         heartbeatIntervalRef.current = setInterval(() => {
//           try {
//             if (ws && ws.readyState === WebSocket.OPEN) {
//               ws.send(JSON.stringify({ type: "heartbeat" }));
//             }
//           } catch (err) {
//             console.warn("Failed to send heartbeat:", err);
//           }
//         }, 10000);
//       } catch (err) {
//         console.warn("heartbeat setup error:", err);
//       }

//       // fallback to clear "Loading..." if no server initial message arrives fast
//       const fallback = setTimeout(() => {
//         if (!gotInitialList.current) {
//           gotInitialList.current = true;
//           setLoading(false);
//           console.warn("Cleared loading (fallback) because no server initial message arrived yet.");
//         }
//         clearTimeout(fallback);
//       }, 2000);
//     };

//     ws.onmessage = (evt) => {
//       try {
//         const raw = typeof evt.data === "string" ? evt.data : evt.data.toString?.() || evt.data;
//         const msg = JSON.parse(raw);

//         // handle application-level ping/pong if present
//         if (msg && msg.type === "ping") {
//           try {
//             if (ws && ws.readyState === WebSocket.OPEN) {
//               ws.send(JSON.stringify({ type: "pong" }));
//             }
//           } catch (err) {
//             console.warn("Failed to send pong:", err);
//           }
//           if (!gotInitialList.current) { gotInitialList.current = true; setLoading(false); }
//           return;
//         }

//         // treat first useful message as handshake
//         const usefulTypes = new Set(["device_list","device_connected","device_disconnected","ota_progress","ota_result","ota_batch_start","server_hello"]);
//         if (usefulTypes.has(msg.type)) {
//           if (!gotInitialList.current) {
//             gotInitialList.current = true;
//             setLoading(false);
//           }
//         }

//         switch (msg.type) {
//           case "server_hello": {
//             gotInitialList.current = true;
//             setLoading(false);
//             break;
//           }

//           case "device_list": {
//             const incoming = msg.devices || [];
//             setDevices((prev) => {
//               const map = new Map(prev.map((d) => [d.deviceId, { ...d }]));

//               for (const d of incoming) {
//                 const existing = map.get(d.deviceId);
//                 if (existing) {
//                   map.set(d.deviceId, {
//                     ...existing,
//                     ip: d.ip ?? existing.ip,
//                     status: d.status ?? existing.status ?? "connected",
//                     connectedAt: d.connectedAt ? new Date(d.connectedAt) : existing.connectedAt,
//                   });
//                 } else {
//                   map.set(d.deviceId, {
//                     deviceId: d.deviceId,
//                     ip: d.ip,
//                     status: d.status ?? "connected",
//                     connectedAt: d.connectedAt ? new Date(d.connectedAt) : null,
//                     otaStatus: "idle",
//                     progress: 0,
//                   });
//                 }
//               }

//               return Array.from(map.values());
//             });

//             gotInitialList.current = true;
//             setLoading(false);
//             break;
//           }

//           case "device_connected": {
//             const { deviceId, ip } = msg;
//             setDevices((prev) => {
//               const copy = [...prev];
//               const idx = copy.findIndex((x) => x.deviceId === deviceId);
//               const newEntry = {
//                 deviceId,
//                 ip,
//                 status: "connected",
//                 connectedAt: msg.time ? new Date(msg.time) : new Date(),
//                 otaStatus: "idle",
//                 progress: 0,
//               };
//               if (idx >= 0) copy[idx] = { ...copy[idx], ...newEntry };
//               else copy.unshift(newEntry);
//               return copy;
//             });
//             break;
//           }

//           case "device_disconnected": {
//             removeDeviceOnly(msg.deviceId);
//             break;
//           }

//           case "ota_batch_start": {
//             // server tells which targets started/are offline
//             const targets = msg.targets || [];

//             // For 'offline' entries (device was offline at start) remove from list.
//             // For 'started' mark as started.
//             setDevices((prev) => {
//               const byId = new Map(prev.map((d) => [d.deviceId, { ...d }]));
//               for (const t of targets) {
//                 const entry = byId.get(t.deviceId);
//                 if (!entry) continue;
//                 if (t.status === "started") {
//                   entry.otaStatus = "started";
//                   entry.progress = 0;
//                   byId.set(t.deviceId, entry);
//                 } else if (t.status === "offline") {
//                   // removed from list (offline before OTA)
//                   byId.delete(t.deviceId);
//                 }
//               }
//               // clear selections for any removed devices
//               setSelectedDevices((prevSel) => {
//                 const copy = new Set(prevSel);
//                 for (const t of targets) {
//                   if (t.status === "offline") copy.delete(t.deviceId);
//                 }
//                 return copy;
//               });
//               return Array.from(byId.values());
//             });

//             break;
//           }

//           case "ota_progress": {
//             // { type: "ota_progress", deviceId, progress }
//             const { deviceId, progress } = msg;
//             if (!deviceId) break;
//             const pct = Number(progress || 0);
//             deviceProgressRef.current.set(deviceId, pct);

//             setDevices((prev) =>
//               prev.map((d) => {
//                 if (d.deviceId !== deviceId) return d;
//                 const prevStatus = d.otaStatus;
//                 const newStatus = pct >= 100 ? "pass" : prevStatus === "offline" || prevStatus === "fail" ? prevStatus : "started";
//                 return { ...d, progress: pct, otaStatus: newStatus };
//               })
//             );

//             // notify when device reaches 100% (only once)
//             if (pct >= 100) {
//               const key = `__notified_${deviceId}`;
//               if (!deviceProgressRef.current.get(key)) {
//                 deviceProgressRef.current.set(key, true);
//                 toast(`Device ${deviceId} OTA completed (100%)`, "success", 2500);
//               }
//             }

//             break;
//           }

//          case "ota_result": {
//   const { deviceId, status, message, reason } = msg;
//   if (!deviceId || !status) break;

//   if (status === "fail" && reason === "offline") {
//     toast(`Device ${deviceId} was offline — removed`, "info", 1800);
//     removeDeviceOnly(deviceId);
//     break;
//   }

//   if (!finalizedRef.current.has(deviceId)) {
//     if (status === "pass") toast(`Device ${deviceId} OTA success`, "success");
//     else toast(`Device ${deviceId} OTA failed: ${message || "error"}`, "error", 4000);

//     finalizeDevice(deviceId, status === "pass" ? "pass" : "fail");
//     deviceProgressRef.current.delete(deviceId);
//   }

//   // Check if all devices are finalized
//   if (devicesRef.current.every(d => finalizedRef.current.has(d.deviceId))) {
//     setOtaInProgress(false); // OTA is fully done
//     toast("All OTA results received. Page will reload in 10s", "info", 2500);

//     setTimeout(() => {
//       navigate(0); // reload the page
//     }, 10000);
//   }

//   break;
// }


//           case "error":
//             console.warn("Server error frame:", msg);
//             break;

//           default:
//             console.log("Unknown WS message type:", msg.type);
//             break;
//         }
//       } catch (err) {
//         console.warn("Invalid WS message", err);
//       }
//     };

//     ws.onerror = (errEvent) => {
//       console.error("OTA WebSocket error event:", errEvent, "readyState:", ws.readyState, "url:", url);
//     };

//     ws.onclose = (e) => {
//       console.log("OTA WebSocket closed — code:", e?.code, "reason:", e?.reason, "wasClean:", e?.wasClean);
//       if (heartbeatIntervalRef.current) {
//         clearInterval(heartbeatIntervalRef.current);
//         heartbeatIntervalRef.current = null;
//       }
//       if (!gotInitialList.current) setLoading(false);

//       // detach handlers
//       try {
//         ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
//       } catch {}

//       if (unmountedRef.current) return;

//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       const backoff = Math.min(30000, 1000 * Math.pow(1.5, retryCount.current || 0));
//       reconnectTimeout.current = setTimeout(() => {
//         retryCount.current += 1;
//         connectWs();
//       }, backoff);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token, finalizeDevice, removeDeviceOnly]); // include helpers so closure updates

//   // start WS (mount) and cleanup
//   useEffect(() => {
//     unmountedRef.current = false;
//     connectWs();
//     return () => {
//       unmountedRef.current = true;
//       if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//       if (wsRef.current) {
//         try {
//           wsRef.current.onclose = null;
//           wsRef.current.close();
//         } catch (err) {}
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [connectWs]);

//   // Fetch versions (unchanged)
//   useEffect(() => {
//     const fetchVersions = async () => {
//       setLoadingVersions(true);
//       try {
//         const res = await fetch(`${BASE}/ota/all`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });

//         if (res.status === 404) {
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         if (!res.ok) {
//           const text = await res.text().catch(() => "");
//           console.warn("Failed to fetch OTA versions:", res.status, text);
//           setVersions([]);
//           setCurrentVersion("");
//           if (onVersionSelect) onVersionSelect("");
//           setLoadingVersions(false);
//           return;
//         }

//         const data = await res.json();
//         const verList = Array.isArray(data) ? data.map((f) => f.versionId).filter(Boolean) : [];
//         setVersions(verList);

//         if (selectedVersion) {
//           setCurrentVersion(selectedVersion);
//         } else if (verList.length > 0) {
//           setCurrentVersion(verList[0]);
//           onVersionSelect && onVersionSelect(verList[0]);
//         } else {
//           setCurrentVersion("");
//           onVersionSelect && onVersionSelect("");
//         }
//       } catch (err) {
//         console.error("Error fetching OTA versions:", err);
//         setVersions([]);
//         setCurrentVersion("");
//         onVersionSelect && onVersionSelect("");
//       } finally {
//         setLoadingVersions(false);
//       }
//     };

//     fetchVersions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // mount-only

//   useEffect(() => {
//     if (selectedVersion && selectedVersion !== currentVersion) {
//       setCurrentVersion(selectedVersion);
//     }
//   }, [selectedVersion, currentVersion]);

//   // selection helpers use device.deviceId
//   const handleDeviceToggle = (deviceId) => {
//     setSelectedDevices((prev) => {
//       const copy = new Set(prev);
//       if (copy.has(deviceId)) copy.delete(deviceId);
//       else copy.add(deviceId);
//       return copy;
//     });
//   };

//   const handleSelectAll = () => {
//     if (selectedDevices.size === devices.length) setSelectedDevices(new Set());
//     else setSelectedDevices(new Set(devices.map((d) => d.deviceId)));
//   };

//   // Start OTA via REST endpoint - backend will broadcast results to WS
//   const handleOTA = async () => {
//     setFailCount(0);
//     setPassCount(0)
//     if (!currentVersion) {
//       Swal.fire({ icon: "error", title: "Select version", text: "Please choose an OTA version to start." });
//       return;
//     }
//     if (selectedDevices.size === 0) {
//       Swal.fire({ icon: "error", title: "No devices selected", text: "Please select at least 1 device." });
//       return;
//     }

//     // Build deviceIds but filter out devices that are not connected (they will never start)
//     const allSelected = Array.from(selectedDevices);
//     const connectedSelected = [];
//     const disconnectedRemoved = [];
//     for (const id of allSelected) {
//       const d = devices.find((x) => x.deviceId === id);
//       if (d && d.status === "connected") connectedSelected.push(id);
//       else disconnectedRemoved.push(id);
//     }

//     if (disconnectedRemoved.length > 0) {
//       // remove them from the UI list and selection so counts and list are correct
//       setSelectedDevices((prev) => {
//         const copy = new Set(prev);
//         disconnectedRemoved.forEach((id) => copy.delete(id));
//         return copy;
//       });

//       // remove them from device list (disconnected before OTA)
//       setDevices((prev) => prev.filter((d) => d.status === "connected" || !disconnectedRemoved.includes(d.deviceId)));

//       toast(`${disconnectedRemoved.length} device(s) removed (already disconnected).`, "info", 2000);
//     }

//     if (connectedSelected.length === 0) {
//       Swal.fire({ icon: "error", title: "No connected devices", text: "No selected devices are connected." });
//       return;
//     }

//     const deviceIds = connectedSelected;

//     try {
//       const res = await fetch(`${BASE}/ota/start`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify({ versionId: currentVersion, devices: deviceIds }),
//       });

//       const data = await res.json().catch(() => null);
//       console.log("OTASTART DATA FROM BACKEND", data);

//       if (!res.ok) {
//         Swal.fire({ icon: "error", title: "OTA start failed", text: data?.message || res.statusText || "Failed to start OTA" });
//         return;
//       }

//       // Do NOT treat API 200 as final success. API confirms trigger only.
//       toast(`OTA triggered for ${deviceIds.length} device(s)`, "info", 1800);

//       // The server returns per-device started/offline; update UI accordingly
//       if (data?.results && Array.isArray(data.results)) {
//         setDevices((prev) =>
//           prev
//             .map((d) => {
//               const t = data.results.find((r) => r.deviceId === d.deviceId);
//               if (t) {
//                 // if offline at start -> remove (handled below)
//                 return { ...d, otaStatus: t.status === "started" ? "started" : t.status === "offline" ? "offline" : d.otaStatus, progress: t.status === "started" ? 0 : d.progress ?? 0 };
//               }
//               return d;
//             })
//             .filter((d) => d.otaStatus !== "offline") // remove offline targets (not available at start)
//         );
//       }
//     } catch (err) {
//       console.error("startOTA error", err);
//       Swal.fire({ icon: "error", title: "Server error", text: "Unable to start OTA. See console." });
//     }
//   };

//   // compute counts from state
//   const passCountMemo = useMemo(() => passCount, [passCount]);
//   const failCountMemo = useMemo(() => failCount, [failCount]);

//   // small progress bar renderer
//   const ProgressBar = ({ value = 0 }) => {
//     const pct = Math.max(0, Math.min(100, Number(value || 0)));
//     return (
//       <div className="w-28 h-2 bg-gray-200 rounded overflow-hidden" style={{ minWidth: 112 }}>
//         <div style={{ width: `${pct}%`, transition: "width 300ms linear" }} className={`h-full ${pct >= 100 ? "bg-green-500" : "bg-[#0D5CA4]"}`} />
//       </div>
//     );
//   };

//   return (
//     <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: "#EEF3F9" }}>
//       <div className="flex-shrink-0 px-4 pt-4">
//         <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>

//         <div className="mb-4">
//           <VersionsDropdown
//             versions={versions}
//             currentVersion={currentVersion}
//             loadingVersions={loadingVersions}
//             onVersionSelect={(v) => {
//               setCurrentVersion(v); // keep the component controlled
//               onVersionSelect && onVersionSelect(v); // forward prop from OTADeviceList props
//             }}
//           />
//         </div>

//         <div className="mb-4">
//           <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
//           <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//         </div>
//       </div>

//       <div className="flex-1 min-h-0 px-4 overflow-hidden">
//         <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
//           {loading ? (
//             <div className="text-center py-4">Loading devices...</div>
//           ) : devices.length === 0 ? (
//             <div className="text-center py-4">No devices connected.</div>
//           ) : (
//             <div className="space-y-2 pb-2">
//               {/* optional header row with selectAll */}
//               <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 border-b border-gray-200">
//                 <div className="flex items-center gap-2">
//                   <input type="checkbox" checked={selectedDevices.size === devices.length && devices.length > 0} onChange={handleSelectAll} />
//                   <span>Select All</span>
//                 </div>
//                 <div className="text-xs">Status • Progress</div>
//               </div>

//               {devices.map((device) => (
//                 <div key={device.deviceId} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <div className="relative flex-shrink-0">
//                       <input type="checkbox" checked={selectedDevices.has(device.deviceId)} onChange={() => handleDeviceToggle(device.deviceId)} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between gap-2">
//                         <span className="text-gray-800 font-medium truncate">{device.deviceId}</span>
//                         <span className="text-gray-600 text-sm ml-2">{device.ip || ""}</span>
//                       </div>

//                       <div className="flex items-center gap-3 mt-1">
//                         <div className="text-xs text-gray-500">
//                           {device.status === "connected" ? "Connected" : "Disconnected"}
//                           {device.connectedAt ? ` • ${new Date(device.connectedAt).toLocaleString()}` : ""}
//                           {device.otaStatus && device.otaStatus !== "idle" ? ` • OTA: ${device.otaStatus}` : ""}
//                         </div>

//                         {/* progress bar & percent */}
//                         <div className="flex items-center gap-2">
//                           <ProgressBar value={device.progress ?? 0} />
//                           <div className="text-xs text-gray-600 w-10 text-right">{Math.round(device.progress ?? 0)}%</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
//         <div className="bg-gray-200 rounded-lg p-4">
//           <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
//           <p className="text-gray-800 font-bold text-xl">{devices.length < 10 ? `0${devices.length}` : devices.length}</p>
//         </div>

//         <div className="bg-green-500 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">PASS</p>
//           <p className="text-2xl font-bold">{passCountMemo < 10 ? `0${passCountMemo}` : passCountMemo}</p>
//         </div>

//         <div className="bg-orange-400 rounded-lg p-4 text-white">
//           <p className="font-semibold mb-1">Fail</p>
//           <p className="text-2xl font-bold">{failCountMemo < 10 ? `0${failCountMemo}` : failCountMemo}</p>
//         </div>

//         <button
//         onClick={handleOTA}
//         disabled={otaInProgress || devices.length === 0}
//         className={`cursor-pointer text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md 
//           ${otaInProgress ? "bg-gray-400 cursor-not-allowed" : "bg-[#0D5CA4] hover:bg-[#0A4A8A]"}`}
//       >
//         {otaInProgress ? "OTA in Progress..." : "START OTA"}
//       </button>

//       </div>
//     </div>
//   );
// };

// export default OTADeviceList;

















// src/components/ota/OTADeviceList.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import { useStore } from "../../contexts/storecontexts";
import "../../styles/pages/management-pages.css";
import VersionsDropdown from "./VersionDropDown";

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
const WS_BASE = (import.meta.env.VITE_BACKEND_WS || "ws://localhost:5050") + "/ws/ota";

const toast = (title, icon = "success", timer = 2500) =>
  Swal.fire({ toast: true, position: "top-end", showConfirmButton: false, timer, title, icon });

const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
  const { token: ctxToken } = useStore?.() || {};
  const token = ctxToken || localStorage.getItem("token") || "";

  const [devices, setDevices] = useState([]); // { deviceId, ip, status, connectedAt, otaStatus, progress }
  const [loading, setLoading] = useState(true);
  const [selectedDevices, setSelectedDevices] = useState(new Set());
  const [versions, setVersions] = useState([]);
  const [currentVersion, setCurrentVersion] = useState(selectedVersion || "");
  const [loadingVersions, setLoadingVersions] = useState(false);
  const otaTargetsRef = useRef(new Set());
  const [passCount, setPassCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [otaInProgress, setOtaInProgress] = useState(false);

  const wsRef = useRef(null);
  const reconnectTimeout = useRef(null);
  const retryCount = useRef(0);
  const gotInitialList = useRef(false);
  const unmountedRef = useRef(false);
  const navigate = useNavigate();
  
  // keep progress map (not required but useful)
  const deviceProgressRef = useRef(new Map());
  // near top of component (add this ref)
  const heartbeatIntervalRef = useRef(null);

  // devicesRef lets event handlers read latest devices without recreating ws
  const devicesRef = useRef([]);
  useEffect(() => {
    devicesRef.current = devices;
  }, [devices]);

  // track deviceIds we've already finalized (counted + maybe removed)
  const finalizedRef = useRef(new Set());

  // helper: finalize (count + mark final) and remove device from list + selection
 const finalizeDevice = useCallback((deviceId, status) => {
  if (!deviceId || finalizedRef.current.has(deviceId)) return;
  finalizedRef.current.add(deviceId);

  if (status === "pass") setPassCount((s) => s + 1);
  else if (status === "fail") setFailCount((s) => s + 1);

  setDevices((prev) => prev.filter((d) => d.deviceId !== deviceId));
  setSelectedDevices((prev) => {
    const copy = new Set(prev);
    copy.delete(deviceId);
    return copy;
  });
  deviceProgressRef.current.delete(deviceId);
}, []);


  // helper: remove device from UI without counting it as pass/fail
const removeDeviceOnly = useCallback((deviceId) => {
  if (!deviceId) return;
  if (!finalizedRef.current.has(deviceId)) finalizedRef.current.add(deviceId);

  setDevices((prev) => prev.filter((d) => d.deviceId !== deviceId));
  setSelectedDevices((prev) => {
    const copy = new Set(prev);
    copy.delete(deviceId);
    return copy;
  });
  deviceProgressRef.current.delete(deviceId);
}, []);


  /**
   * connectWs:
   * - stable identity (depends only on token)
   * - avoids closing a CONNECTING socket (to prevent "closed before established" errors)
   */
  const connectWs = useCallback(() => {
    const url = `${WS_BASE}?admin=true${token ? `&token=${encodeURIComponent(token)}` : ""}`;

    // Clean up previous socket safely:
    if (wsRef.current) {
      try {
        const prevState = wsRef.current.readyState;
        if (prevState === WebSocket.OPEN) {
          // close existing open socket (graceful)
          wsRef.current.close();
        } else if (prevState === WebSocket.CONNECTING) {
          try {
            wsRef.current.onopen = wsRef.current.onmessage = wsRef.current.onerror = wsRef.current.onclose = null;
          } catch (err) {}
          const shortRetry = setTimeout(() => {
            if (!unmountedRef.current && (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)) {
              connectWs();
            }
            clearTimeout(shortRetry);
          }, 800);
          return;
        }
      } catch (err) {
        console.warn("Error while cleaning previous ws:", err);
      }
    }

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("OTA dashboard WebSocket connected (onopen). url:", url, "readyState:", ws.readyState);
      retryCount.current = 0;

      // start sending application-level heartbeats every 10s so server can mark us alive
      try {
        if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
        heartbeatIntervalRef.current = setInterval(() => {
          try {
            if (ws && ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: "heartbeat" }));
            }
          } catch (err) {
            console.warn("Failed to send heartbeat:", err);
          }
        }, 10000);
      } catch (err) {
        console.warn("heartbeat setup error:", err);
      }

      // fallback to clear "Loading..." if no server initial message arrives fast
      const fallback = setTimeout(() => {
        if (!gotInitialList.current) {
          gotInitialList.current = true;
          setLoading(false);
          console.warn("Cleared loading (fallback) because no server initial message arrived yet.");
        }
        clearTimeout(fallback);
      }, 2000);
    };

    ws.onmessage = (evt) => {
      try {
        const raw = typeof evt.data === "string" ? evt.data : evt.data.toString?.() || evt.data;
        const msg = JSON.parse(raw);

        // handle application-level ping/pong if present
        if (msg && msg.type === "ping") {
          try {
            if (ws && ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: "pong" }));
            }
          } catch (err) {
            console.warn("Failed to send pong:", err);
          }
          if (!gotInitialList.current) { gotInitialList.current = true; setLoading(false); }
          return;
        }

        // treat first useful message as handshake
        const usefulTypes = new Set(["device_list","device_connected","device_disconnected","ota_progress","ota_result","ota_batch_start","server_hello"]);
        if (usefulTypes.has(msg.type)) {
          if (!gotInitialList.current) {
            gotInitialList.current = true;
            setLoading(false);
          }
        }

        switch (msg.type) {
          case "server_hello": {
            gotInitialList.current = true;
            setLoading(false);
            break;
          }

          case "device_list": {
            const incoming = msg.devices || [];
            setDevices((prev) => {
              const map = new Map(prev.map((d) => [d.deviceId, { ...d }]));

              for (const d of incoming) {
                const existing = map.get(d.deviceId);
                if (existing) {
                  map.set(d.deviceId, {
                    ...existing,
                    ip: d.ip ?? existing.ip,
                    status: d.status ?? existing.status ?? "connected",
                    connectedAt: d.connectedAt ? new Date(d.connectedAt) : existing.connectedAt,
                  });
                } else {
                  map.set(d.deviceId, {
                    deviceId: d.deviceId,
                    ip: d.ip,
                    status: d.status ?? "connected",
                    connectedAt: d.connectedAt ? new Date(d.connectedAt) : null,
                    otaStatus: "idle",
                    progress: 0,
                  });
                }
              }

              return Array.from(map.values());
            });

            gotInitialList.current = true;
            setLoading(false);
            break;
          }

          case "device_connected": {
            const { deviceId, ip } = msg;
            setDevices((prev) => {
              const copy = [...prev];
              const idx = copy.findIndex((x) => x.deviceId === deviceId);
              const newEntry = {
                deviceId,
                ip,
                status: "connected",
                connectedAt: msg.time ? new Date(msg.time) : new Date(),
                otaStatus: "idle",
                progress: 0,
              };
              if (idx >= 0) copy[idx] = { ...copy[idx], ...newEntry };
              else copy.unshift(newEntry);
              return copy;
            });
            break;
          }

          case "device_disconnected": {
            removeDeviceOnly(msg.deviceId);
            break;
          }

          case "ota_batch_start": {
            // server tells which targets started/are offline
            const targets = msg.targets || [];

            // For 'offline' entries (device was offline at start) remove from list.
            // For 'started' mark as started.
            setDevices((prev) => {
              const byId = new Map(prev.map((d) => [d.deviceId, { ...d }]));
              for (const t of targets) {
                const entry = byId.get(t.deviceId);
                if (!entry) continue;
                if (t.status === "started") {
                  entry.otaStatus = "started";
                  entry.progress = 0;
                  byId.set(t.deviceId, entry);
                } else if (t.status === "offline") {
                  // removed from list (offline before OTA)
                  byId.delete(t.deviceId);
                }
              }
              // clear selections for any removed devices
              setSelectedDevices((prevSel) => {
                const copy = new Set(prevSel);
                for (const t of targets) {
                  if (t.status === "offline") copy.delete(t.deviceId);
                }
                return copy;
              });
              return Array.from(byId.values());
            });

            break;
          }

          case "ota_progress": {
            // { type: "ota_progress", deviceId, progress }
            const { deviceId, progress } = msg;
            if (!deviceId) break;
            const pct = Number(progress || 0);
            deviceProgressRef.current.set(deviceId, pct);

            setDevices((prev) =>
              prev.map((d) => {
                if (d.deviceId !== deviceId) return d;
                const prevStatus = d.otaStatus;
                const newStatus = pct >= 100 ? "pass" : prevStatus === "offline" || prevStatus === "fail" ? prevStatus : "started";
                return { ...d, progress: pct, otaStatus: newStatus };
              })
            );

            // notify when device reaches 100% (only once)
            if (pct >= 100) {
              const key = `__notified_${deviceId}`;
              if (!deviceProgressRef.current.get(key)) {
                deviceProgressRef.current.set(key, true);
                toast(`Device ${deviceId} OTA completed (100%)`, "success", 2500);
              }
            }

            break;
          }

      case "ota_result": {
  const { deviceId, status, message, reason } = msg;
  if (!deviceId || !status) break;

  // if server says offline at start -> removed earlier, ignore counting
  if (status === "fail" && reason === "offline") {
    toast(`Device ${deviceId} was offline — removed`, "info", 1800);
    removeDeviceOnly(deviceId);
    break;
  }

  // Only treat results for the devices that are part of the current OTA run
  if (!otaTargetsRef.current.has(deviceId)) {
    // Not part of current run — ignore (or log)
    console.debug("Result for device not in current OTA targets:", deviceId, status);
    break;
  }

  // Only finalize once (guarded by finalizedRef)
  if (!finalizedRef.current.has(deviceId)) {
    if (status === "pass") toast(`Device ${deviceId} OTA success`, "success");
    else toast(`Device ${deviceId} OTA failed: ${message || "error"}`, "error", 4000);

    // increment counts and remove from UI
    finalizeDevice(deviceId, status === "pass" ? "pass" : "fail");
    deviceProgressRef.current.delete(deviceId);
  } else {
    console.debug("Duplicate final event ignored for", deviceId, status);
  }

  // Check if ALL targets of this OTA run are finalized
  let allDone = true;
  otaTargetsRef.current.forEach((id) => {
    if (!finalizedRef.current.has(id)) allDone = false;
  });

  if (allDone) {
    setOtaInProgress(false);
    toast("All OTA results received. Page will reload in 10s", "info", 2500);
    // optional: clear otaTargetsRef now or after reload
    // otaTargetsRef.current = new Set();

    setTimeout(() => {
      // reload the page — prefer a full reload when you're showing refreshed device list
      // navigate(0) sometimes is non-standard — you can use:
      // window.location.reload();
      // or if you prefer react-router:
      navigate(0);
    }, 10000);
  }

  break;
}



          case "error":
            console.warn("Server error frame:", msg);
            break;

          default:
            console.log("Unknown WS message type:", msg.type);
            break;
        }
      } catch (err) {
        console.warn("Invalid WS message", err);
      }
    };

    ws.onerror = (errEvent) => {
      console.error("OTA WebSocket error event:", errEvent, "readyState:", ws.readyState, "url:", url);
    };

    ws.onclose = (e) => {
      console.log("OTA WebSocket closed — code:", e?.code, "reason:", e?.reason, "wasClean:", e?.wasClean);
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
        heartbeatIntervalRef.current = null;
      }
      if (!gotInitialList.current) setLoading(false);

      // detach handlers
      try {
        ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
      } catch {}

      if (unmountedRef.current) return;

      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      const backoff = Math.min(30000, 1000 * Math.pow(1.5, retryCount.current || 0));
      reconnectTimeout.current = setTimeout(() => {
        retryCount.current += 1;
        connectWs();
      }, backoff);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, finalizeDevice, removeDeviceOnly]); // include helpers so closure updates

  // start WS (mount) and cleanup
  useEffect(() => {
    unmountedRef.current = false;
    connectWs();
    return () => {
      unmountedRef.current = true;
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      if (wsRef.current) {
        try {
          wsRef.current.onclose = null;
          wsRef.current.close();
        } catch (err) {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectWs]);

  // Fetch versions (unchanged)
  useEffect(() => {
    const fetchVersions = async () => {
      setLoadingVersions(true);
      try {
        const res = await fetch(`${BASE}/ota/all`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (res.status === 404) {
          setVersions([]);
          setCurrentVersion("");
          if (onVersionSelect) onVersionSelect("");
          setLoadingVersions(false);
          return;
        }

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          console.warn("Failed to fetch OTA versions:", res.status, text);
          setVersions([]);
          setCurrentVersion("");
          if (onVersionSelect) onVersionSelect("");
          setLoadingVersions(false);
          return;
        }

        const data = await res.json();
        const verList = Array.isArray(data) ? data.map((f) => f.versionId).filter(Boolean) : [];
        setVersions(verList);

        if (selectedVersion) {
          setCurrentVersion(selectedVersion);
        } else if (verList.length > 0) {
          setCurrentVersion(verList[0]);
          onVersionSelect && onVersionSelect(verList[0]);
        } else {
          setCurrentVersion("");
          onVersionSelect && onVersionSelect("");
        }
      } catch (err) {
        console.error("Error fetching OTA versions:", err);
        setVersions([]);
        setCurrentVersion("");
        onVersionSelect && onVersionSelect("");
      } finally {
        setLoadingVersions(false);
      }
    };

    fetchVersions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount-only

  useEffect(() => {
    if (selectedVersion && selectedVersion !== currentVersion) {
      setCurrentVersion(selectedVersion);
    }
  }, [selectedVersion, currentVersion]);

  // selection helpers use device.deviceId
  const handleDeviceToggle = (deviceId) => {
    setSelectedDevices((prev) => {
      const copy = new Set(prev);
      if (copy.has(deviceId)) copy.delete(deviceId);
      else copy.add(deviceId);
      return copy;
    });
  };

  const handleSelectAll = () => {
    if (selectedDevices.size === devices.length) setSelectedDevices(new Set());
    else setSelectedDevices(new Set(devices.map((d) => d.deviceId)));
  };

  // Start OTA via REST endpoint - backend will broadcast results to WS
  const handleOTA = async () => {
    setFailCount(0);
    setPassCount(0)

     finalizedRef.current = new Set();        // <<< CLEAR previous finalized ids
  deviceProgressRef.current.clear();      // <<< CLEAR progress/notification flags
  otaTargetsRef.current = new Set();      // <<< new empty set for this run
  setOtaInProgress(true);                 // <<< mark OTA in progress


    if (!currentVersion) {
      Swal.fire({ icon: "error", title: "Select version", text: "Please choose an OTA version to start." });
      return;
    }
    if (selectedDevices.size === 0) {
      Swal.fire({ icon: "error", title: "No devices selected", text: "Please select at least 1 device." });
      return;
    }

    // Build deviceIds but filter out devices that are not connected (they will never start)
    const allSelected = Array.from(selectedDevices);
    const connectedSelected = [];
    const disconnectedRemoved = [];
    for (const id of allSelected) {
      const d = devices.find((x) => x.deviceId === id);
      if (d && d.status === "connected") connectedSelected.push(id);
      else disconnectedRemoved.push(id);
    }

    if (disconnectedRemoved.length > 0) {
      // remove them from the UI list and selection so counts and list are correct
      setSelectedDevices((prev) => {
        const copy = new Set(prev);
        disconnectedRemoved.forEach((id) => copy.delete(id));
        return copy;
      });

      // remove them from device list (disconnected before OTA)
      setDevices((prev) => prev.filter((d) => d.status === "connected" || !disconnectedRemoved.includes(d.deviceId)));

      toast(`${disconnectedRemoved.length} device(s) removed (already disconnected).`, "info", 2000);
    }

    if (connectedSelected.length === 0) {
      Swal.fire({ icon: "error", title: "No connected devices", text: "No selected devices are connected." });
      return;
    }

    const deviceIds = connectedSelected;

      deviceIds.forEach((id) => otaTargetsRef.current.add(id));

    try {
      const res = await fetch(`${BASE}/ota/start`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ versionId: currentVersion, devices: deviceIds }),
      });

      const data = await res.json().catch(() => null);
      console.log("OTASTART DATA FROM BACKEND", data);



      if (!res.ok) {
        Swal.fire({ icon: "error", title: "OTA start failed", text: data?.message || res.statusText || "Failed to start OTA" });
        return;
      }

      // Do NOT treat API 200 as final success. API confirms trigger only.
      toast(`OTA triggered for ${deviceIds.length} device(s)`, "info", 1800);

      // The server returns per-device started/offline; update UI accordingly
      if (data?.results && Array.isArray(data.results)) {
      setDevices((prev) =>
        prev
          .map((d) => {
            const t = data.results.find((r) => r.deviceId === d.deviceId);
            if (t) {
              return {
                ...d,
                otaStatus: t.status === "started" ? "started" : t.status === "offline" ? "offline" : d.otaStatus,
                progress: t.status === "started" ? 0 : d.progress ?? 0,
              };
            }
            return d;
          })
          .filter((d) => d.otaStatus !== "offline") // remove offline targets
      );
    }
    } catch (err) {
      console.error("startOTA error", err);
      Swal.fire({ icon: "error", title: "Server error", text: "Unable to start OTA. See console." });
    }
  };

  // compute counts from state
  const passCountMemo = useMemo(() => passCount, [passCount]);
  const failCountMemo = useMemo(() => failCount, [failCount]);

  // small progress bar renderer
  const ProgressBar = ({ value = 0 }) => {
    const pct = Math.max(0, Math.min(100, Number(value || 0)));
    return (
      <div className="w-28 h-2 bg-gray-200 rounded overflow-hidden" style={{ minWidth: 112 }}>
        <div style={{ width: `${pct}%`, transition: "width 300ms linear" }} className={`h-full ${pct >= 100 ? "bg-green-500" : "bg-[#0D5CA4]"}`} />
      </div>
    );
  };

  return (
    <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: "#EEF3F9" }}>
      <div className="flex-shrink-0 px-4 pt-4">
        <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>

        <div className="mb-4">
          <VersionsDropdown
            versions={versions}
            currentVersion={currentVersion}
            loadingVersions={loadingVersions}
            onVersionSelect={(v) => {
              setCurrentVersion(v); // keep the component controlled
              onVersionSelect && onVersionSelect(v); // forward prop from OTADeviceList props
            }}
          />
        </div>

        <div className="mb-4">
          <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
          <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
        </div>
      </div>

      <div className="flex-1 min-h-0 px-4 overflow-hidden">
        <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
          {loading ? (
            <div className="text-center py-4">Loading devices...</div>
          ) : devices.length === 0 ? (
            <div className="text-center py-4">No devices connected.</div>
          ) : (
            <div className="space-y-2 pb-2">
              {/* optional header row with selectAll */}
              <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={selectedDevices.size === devices.length && devices.length > 0} onChange={handleSelectAll} />
                  <span>Select All</span>
                </div>
                <div className="text-xs">Status • Progress</div>
              </div>

              {devices.map((device) => (
                <div key={device.deviceId} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative flex-shrink-0">
                      <input type="checkbox" checked={selectedDevices.has(device.deviceId)} onChange={() => handleDeviceToggle(device.deviceId)} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-gray-800 font-medium truncate">{device.deviceId}</span>
                        <span className="text-gray-600 text-sm ml-2">{device.ip || ""}</span>
                      </div>

                      <div className="flex items-center gap-3 mt-1">
                        <div className="text-xs text-gray-500">
                          {device.status === "connected" ? "Connected" : "Disconnected"}
                          {device.connectedAt ? ` • ${new Date(device.connectedAt).toLocaleString()}` : ""}
                          {device.otaStatus && device.otaStatus !== "idle" ? ` • OTA: ${device.otaStatus}` : ""}
                        </div>

                        {/* progress bar & percent */}
                        <div className="flex items-center gap-2">
                          <ProgressBar value={device.progress ?? 0} />
                          <div className="text-xs text-gray-600 w-10 text-right">{Math.round(device.progress ?? 0)}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
        <div className="bg-gray-200 rounded-lg p-4">
          <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
          <p className="text-gray-800 font-bold text-xl">{devices.length < 10 ? `0${devices.length}` : devices.length}</p>
        </div>

        <div className="bg-green-500 rounded-lg p-4 text-white">
          <p className="font-semibold mb-1">PASS</p>
          <p className="text-2xl font-bold">{passCountMemo < 10 ? `0${passCountMemo}` : passCountMemo}</p>
        </div>

        <div className="bg-orange-400 rounded-lg p-4 text-white">
          <p className="font-semibold mb-1">Fail</p>
          <p className="text-2xl font-bold">{failCountMemo < 10 ? `0${failCountMemo}` : failCountMemo}</p>
        </div>

        <button
        onClick={handleOTA}
        disabled={otaInProgress || devices.length === 0}
        className={`cursor-pointer text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md 
          ${otaInProgress ? "bg-gray-400 cursor-not-allowed" : "bg-[#0D5CA4] hover:bg-[#0A4A8A]"}`}
      >
        {otaInProgress ? "OTA in Progress..." : "START OTA"}
      </button>

      </div>
    </div>
  );
};

export default OTADeviceList;
