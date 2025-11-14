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
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import "../../styles/pages/management-pages.css";
import useOtaSocket from "../../hooks/useOtaSocket";

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

const OTADeviceList = ({ selectedVersion, onVersionSelect }) => {
  // websocket hook (change wsPath if needed)
  const { devices, connected, lastError } = useOtaSocket({
    wsPath: "/esp-ota", // <--- change to the actual ws path your server uses for initEspOtaSocket
    adminQuery: "admin=true",
    token: localStorage.getItem("token") || undefined,
  });

  const [loading, setLoading] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState(new Set());
  const [versions, setVersions] = useState([]);
  const [currentVersion, setCurrentVersion] = useState(selectedVersion || "");
  const [loadingVersions, setLoadingVersions] = useState(false);

  // fetch /ota/all versions (same logic you had)
  useEffect(() => {
    const fetchVersions = async () => {
      setLoadingVersions(true);
      try {
        const token = localStorage.getItem("token");
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
          return;
        }
        if (!res.ok) {
          setVersions([]);
          setCurrentVersion("");
          if (onVersionSelect) onVersionSelect("");
          return;
        }
        const data = await res.json();
        const arr = Array.isArray(data) ? data : [];
        const verList = arr.map(f => f.versionId).filter(Boolean);
        setVersions(verList);
        if (selectedVersion) {
          setCurrentVersion(selectedVersion);
        } else if (verList.length > 0) {
          setCurrentVersion(verList[0]);
          onVersionSelect && onVersionSelect(verList[0]);
        } else {
          setCurrentVersion("");
        }
      } catch (err) {
        console.error("Error fetching versions", err);
        setVersions([]);
        setCurrentVersion("");
        if (onVersionSelect) onVersionSelect("");
      } finally {
        setLoadingVersions(false);
      }
    };
    fetchVersions();
  }, []); // mount-only

  useEffect(() => {
    if (selectedVersion && selectedVersion !== currentVersion) {
      setCurrentVersion(selectedVersion);
    }
  }, [selectedVersion]);

  // selected devices set handlers
  const toggleDevice = (deviceId) => {
    setSelectedDevices(prev => {
      const copy = new Set(prev);
      if (copy.has(deviceId)) copy.delete(deviceId);
      else copy.add(deviceId);
      return copy;
    });
  };

  const selectAll = () => {
    setSelectedDevices(new Set(devices.map(d => d.deviceId)));
  };
  const clearAll = () => setSelectedDevices(new Set());

  // start OTA: call backend start endpoint which will send OTA to connected devices via WS
  const startOtaBatch = async () => {
    if (!currentVersion) {
      Swal.fire("Select version", "Please select an OTA version first", "warning");
      return;
    }
    if (selectedDevices.size === 0) {
      Swal.fire("Select devices", "Please select at least one device", "warning");
      return;
    }

    const deviceIds = Array.from(selectedDevices);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
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

      if (!res.ok) {
        const msg = data?.message || res.statusText || "Failed to start OTA";
        Swal.fire("Error", msg, "error");
        return;
      }

      // server replies with results [{deviceId, status}] - update user quickly
      Swal.fire("OTA started", data?.message || "OTA triggered", "success");
      // optionally clear selection
      // clearAll();

      // The hook will pick up ota_batch_start / ota_result messages and update the device list
      console.log("OTA start response:", data);
    } catch (err) {
      console.error("Start OTA error:", err);
      Swal.fire("Network error", "Could not reach server to start OTA", "error");
    } finally {
      setLoading(false);
    }
  };

  // derived stats for UI
  const passCount = devices.filter(d => d.otaResult?.status === "pass").length;
  const failCount = devices.filter(d => d.otaResult?.status === "fail").length;
  const onlineCount = devices.filter(d => d.status === "connected").length;
  const totalCount = devices.length;

  return (
    <div className="ListPage brand-list-container ota-device-list rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] flex flex-col overflow-hidden" style={{ backgroundColor: '#EEF3F9' }}>
      <div className="flex-shrink-0 px-4 pt-4">
        <h1 className="brand-list-title font-semibold text-gray-800 mb-4">OTA Management</h1>

        <div className="mb-4 flex gap-2 items-center">
          <div style={{flex:1}}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Version ID</label>
            <select
              value={currentVersion}
              onChange={(e) => {
                setCurrentVersion(e.target.value);
                onVersionSelect && onVersionSelect(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              disabled={loadingVersions}
            >
              {loadingVersions ? <option>Loading versions...</option>
                : versions.length === 0 ? <option value="">No versions available</option>
                : versions.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div className="text-sm text-gray-600">
            <div>WS: {connected ? <span style={{color:"green"}}>connected</span> : <span style={{color:"red"}}>disconnected</span>}</div>
            <div>{totalCount} devices ({onlineCount} online)</div>
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          <button onClick={selectAll} className="px-3 py-1 bg-gray-100 rounded">Select All</button>
          <button onClick={clearAll} className="px-3 py-1 bg-gray-100 rounded">Clear</button>
          <button onClick={startOtaBatch} disabled={loading} className="ml-auto px-4 py-1 bg-blue-600 text-white rounded">
            {loading ? "Starting..." : "Start OTA"}
          </button>
        </div>

        <div className="mb-4">
          <h2 className="brand-list-header text-center font-semibold text-gray-800">Device List</h2>
          <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
        </div>
      </div>

      {/* Device list */}
      <div className="flex-1 min-h-0 px-4 overflow-hidden">
        <div className="brand-table-scroll overflow-y-auto pr-1 h-full">
          {devices.length === 0 ? (
            <div className="text-center py-6 text-gray-600">No devices connected</div>
          ) : (
            <div className="space-y-2 pb-2">
              {devices.map(device => (
                <div key={device.deviceId} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={selectedDevices.has(device.deviceId)}
                        onChange={() => toggleDevice(device.deviceId)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        disabled={device.status !== "connected"}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-gray-800 font-medium truncate">{device.deviceId}</div>
                      <div className="text-xs text-gray-500 truncate">{device.ip || ""} • {device.connectedAt ? new Date(device.connectedAt).toLocaleString() : ""}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* OTA status */}
                    {device.otaResult?.status === "pass" && <div className="text-sm text-green-600 font-semibold">PASS</div>}
                    {device.otaResult?.status === "fail" && <div className="text-sm text-red-600 font-semibold">FAIL</div>}
                    {device.otaResult?.status === "in_progress" && <div className="text-sm text-blue-600">IN PROGRESS</div>}
                    {!device.otaResult && device.status === "connected" && <div className="text-xs text-gray-500">Idle</div>}
                    {device.status !== "connected" && <div className="text-xs text-gray-400">Offline</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary + Action */}
      <div className="flex-shrink-0 grid grid-cols-2 gap-3 px-4 pb-4">
        <div className="bg-gray-200 rounded-lg p-4">
          <p className="text-gray-700 text-sm mb-1">No. of Device :</p>
          <p className="text-gray-800 font-bold text-xl">{totalCount < 10 ? `0${totalCount}` : totalCount}</p>
        </div>

        <div className="bg-green-500 rounded-lg p-4 text-white">
          <p className="font-semibold mb-1">PASS</p>
          <p className="text-2xl font-bold">{passCount < 10 ? `0${passCount}` : passCount}</p>
        </div>

        <div className="bg-orange-400 rounded-lg p-4 text-white">
          <p className="font-semibold mb-1">Fail</p>
          <p className="text-2xl font-bold">{failCount < 10 ? `0${failCount}` : failCount}</p>
        </div>

        <div className="flex items-center justify-center">
          {/* a small indicator if ws had errors */}
          {lastError && <div className="text-sm text-red-600">WebSocket error</div>}
        </div>
      </div>
    </div>
  );
};

export default OTADeviceList;
