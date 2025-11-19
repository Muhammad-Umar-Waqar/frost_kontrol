// import React, { useEffect, useState } from 'react';
// import { Trash2, Edit } from 'lucide-react';
// import Swal from 'sweetalert2';
// import { fetchAllVenues } from '../../slices/VenueSlice';
// import { useDispatch, useSelector } from 'react-redux';

// import "../../styles/pages/management-pages.css"

// const DeviceList = ({ onDeviceSelect, selectedDevice }) => {
//   const [devices, setDevices] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const dispatch=useDispatch()
//   const {Venues}=useSelector((state)=>state.Venue)

//   useEffect(() => {
//     fetchDevices();
//     fetchBrands();
//     dispatch(fetchAllVenues())
//   }, [dispatch]);

//   // TODO: Backend developer will implement device fetching
//   const fetchDevices = async () => {
//     // Static placeholder - Backend developer should replace with API call
//     // const response = await fetch(`${YOUR_API_URL}/device/fetch/all`, {
//     //   method: 'GET',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     'Authorization': `Bearer ${token}`
//     //   }
//     // });
//     // const data = await response.json();
//     // setDevices(data.devices || []);
//     setDevices([]);
//   };

//   // TODO: Backend developer will implement brand fetching
//   const fetchBrands = async () => {
//     // Static placeholder - Backend developer should replace with API call
//     // const response = await fetch(`${YOUR_API_URL}/brand/fetch/all`, {
//     //   method: 'GET',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     'Authorization': `Bearer ${token}`
//     //   }
//     // });
//     // const data = await response.json();
//     // setBrands(data.brands || []);
//     setBrands([]);
//   };

//   const handleDelete = async (deviceId) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (result.isConfirmed) {
//       // TODO: Backend developer will implement delete API call
//       Swal.fire('Info', 'Delete functionality - Backend developer should implement API call here', 'info');
//       // const response = await fetch(`${YOUR_API_URL}/device/delete`, {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //     'Authorization': `Bearer ${token}`
//       //   },
//       //   body: JSON.stringify({ device_id: deviceId })
//       // });
//     }
//   };

//   const handleEdit = (deviceId, deviceBrand, deviceVenue) => {
//     // Generate brand options HTML
//     const brandOptions = brands?.map(brand => 
//       `<option value="${brand.brand_name}" ${brand.brand_name === deviceBrand ? 'selected' : ''}>${brand.brand_name}</option>`
//     ).join('');

//     // Generate venue options HTML
//     const venueOptions = Venues.map(venue => 
//       `<option value="${venue.venue_name}" ${venue.venue_name === deviceVenue ? 'selected' : ''}>${venue.venue_name}</option>`
//     ).join('');

//     Swal.fire({
//       title: 'Edit Device',
//       html: `
//         <div className="space-y-4 text-left">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Device ID</label>
//             <input id="swal-device-id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value="${deviceId}">
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
//             <select id="swal-brand" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <option value="">Select a brand</option>
//               ${brandOptions}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
//             <select id="swal-venue" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <option value="">Select a venue</option>
//               ${venueOptions}
//             </select>
//           </div>
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonText: 'Save Changes',
//       cancelButtonText: 'Cancel',
//       focusConfirm: false,
//       width: '500px',
//       preConfirm: () => {
//         const updatedDeviceId = document.getElementById('swal-device-id').value;
//         const updatedBrand = document.getElementById('swal-brand').value;
//         const updatedVenue = document.getElementById('swal-venue').value;
        
//         if (!updatedDeviceId || !updatedBrand || !updatedVenue) {
//           Swal.showValidationMessage('Please fill all fields');
//           return false;
//         }
        
//         return {
//           deviceId: updatedDeviceId,
//           brand: updatedBrand,
//           venue: updatedVenue
//         };
//       }
//     }).then((result) => {
//       if (result.isConfirmed) {
//         updateDevice(deviceId, result.value.deviceId, result.value.brand, result.value.venue);
//       }
//     });
//   };

//   const updateDevice = async (originalDeviceId, updatedDeviceId, updatedBrand, updatedVenue) => {
//     const token = localStorage.getItem('token')
//     try {
//       const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/device/update`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//             'Authorization':`Bearer ${token}`
//         },
//         body: JSON.stringify({
//           device_id: originalDeviceId,
//           updated_device_id: updatedDeviceId,
//           updated_brand_name: updatedBrand,
//           updated_venue_name: updatedVenue
//         })
//       });

//       const responseData = await response.json();

//       if (response.ok) {
//         // Fetch the updated list of devices to ensure we have the correct data structure
//        fetchDevices()
//         Swal.fire(
//           'Updated!',
//           'Device has been updated successfully.',
//           'success'
//         );
//       } else {
//         Swal.fire(
//           'Error!',
//           responseData.message || 'Failed to update device.',
//           'error'
//         );
//       }
//     } catch (error) {
//       console.error('Error updating device:', error);
//       Swal.fire(
//         'Error!',
//         'An unexpected error occurred.',
//         'error'
//       );
//     }
//   };

//   const handleRowClick = (device, e) => {
//     e.stopPropagation();
//     onDeviceSelect(device);
//   };



//   return (
//     <>
//     <div 
//       className="ListPage device-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB]"
//     >
//       <h1 className="device-list-title font-semibold text-gray-800 mb-4">Device Management</h1>
//       <div className="mb-4">
//         <h2 className="device-list-header text-center font-semibold text-gray-800">Device List</h2>
//         <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="device-table-header py-2 px-4 font-bold text-gray-800">Device ID</th>
//               <th className="device-table-header py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="device-table-scroll overflow-y-auto pr-1">
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {devices.map((device, index) => (
//                 <tr 
//                   key={device.device_id} 
//                   className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                     selectedDevice?.device_id === device.device_id ? 'bg-blue-50 border-blue-300' : ''
//                   }`}
//                   onClick={(e) => handleRowClick(device, e)}
//                 >
//                   <td className="device-table-cell py-2 sm:py-3 px-2 sm:px-4">{index + 1}. {device.device_id}</td>
//                   <td className="device-table-cell py-2 sm:py-3 px-2 sm:px-4">
//                     <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                       <button className="device-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50" onClick={() => handleEdit(device.device_id, device.brand_name, device.device_venue)}>
//                         <Edit className="text-green-600 device-action-icon" />
//                       </button>
//                       <button className="device-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50" onClick={() => handleDelete(device.device_id)}>
//                         <Trash2 className="text-red-600 device-action-icon" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default DeviceList;















// // src/pages/management/DeviceList.jsx
// import { Pencil, Trash } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { fetchAllDevices, updateDevice, deleteDevice } from "../../slices/DeviceSlice";
// import "../../styles/pages/management-pages.css";

// const DeviceList = ({ onDeviceSelect, selectedDevice }) => {
//   const dispatch = useDispatch();
//   const { DeviceArray = [], isLoading, error } = useSelector((state) => state.Device || {});
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [deviceName, setDeviceName] = useState("");
//   const [deviceId, setDeviceId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchAllDevices());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       console.error("Device error:", error);
//     }
//   }, [error]);

//   const handleDeleteOpen = (name, id) => {
//     setDeleteOpen(true);
//     setDeviceName(name);
//     setDeviceId(id);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setDeviceId(null);
//     setDeviceName("");
//   };

//   const handleEditOpen = (name, id) => {
//     setEditOpen(true);
//     setDeviceId(id);
//     setDeviceName(name);
//   };
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setDeviceId(null);
//     setDeviceName("");
//   };

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteDevice(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Device deleted." });
//       handleDeleteClose();
//     } catch (err) {
//       console.error("Delete device error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
//     }
//   };

//   const handleEdit = async (id, updatedFields = {}) => {
//     // updatedFields can include deviceId, venueId, conditions
//     try {
//       await dispatch(updateDevice({ id, ...updatedFields })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Device updated." });
//       handleEditClose();
//     } catch (err) {
//       console.error("Update device error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
//     }
//   };

//   const displayDevices = DeviceArray || [];

//   return (
//     <div className="ListPage device-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB]">
//       <h1 className="device-list-title font-semibold text-gray-800 mb-4">Device Management</h1>
//       <div className="mb-4">
//         <h2 className="device-list-header text-center font-semibold text-gray-800">Device List</h2>
//         <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 font-bold text-gray-800">#</th>
//               <th className="py-2 px-4 font-bold text-gray-800">Device ID</th>
//               <th className="py-2 px-4 font-bold text-gray-800">Venue</th>
//               <th className="py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="overflow-y-auto pr-1 max-h-[60vh]">
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {isLoading && <tr><td className="p-4">Loading devices...</td></tr>}

//               {!isLoading && displayDevices.map((d, idx) => {
//                 const id = d._id ?? idx;
//                 const deviceIdDisplay = d.deviceId ?? `Device ${idx + 1}`;
//                 const venueName = d.venue?.name ?? d.venue ?? "—";

//                 return (
//                   <tr
//                     key={id}
//                     className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                       selectedDevice?._id === id || selectedDevice?.id === id ? "bg-blue-50 border-blue-300" : ""
//                     }`}
//                     onClick={(e) => { e.stopPropagation(); onDeviceSelect?.(d); }}
//                   >
//                     <td className="py-2 sm:py-3 px-2 sm:px-4">{idx + 1}</td>
//                     <td className="py-2 sm:py-3 px-2 sm:px-4">{deviceIdDisplay}</td>
//                     <td className="py-2 sm:py-3 px-2 sm:px-4">{venueName}</td>
//                     <td className="py-2 sm:py-3 px-2 sm:px-4">
//                       <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                         <button onClick={() => handleEditOpen(deviceIdDisplay, id)} className="rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-2">
//                           <Pencil className="text-green-600" />
//                         </button>
//                         <button onClick={() => handleDeleteOpen(deviceIdDisplay, id)} className="rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-2">
//                           <Trash className="text-red-600" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}

//               {!isLoading && displayDevices.length === 0 && (
//                 <tr><td className="p-4">No devices found.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* If you have modals, wire them here */}
//       {/* Example: pass handleEdit and handleDelete to Edit/Delete modals */}
//     </div>
//   );
// };

// export default DeviceList;











// // src/pages/management/DeviceList.jsx
// import { Pencil, Trash } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { fetchAllDevices, updateDevice, deleteDevice } from "../../slices/DeviceSlice";
// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";

// const DeviceList = ({ onDeviceSelect, selectedDevice }) => {
//   const dispatch = useDispatch();
//   const { DeviceArray = [], isLoading, error } = useSelector((state) => state.Device || {});
//   const { Venues = [] } = useSelector((state) => state.Venue || {});
//   const [working, setWorking] = useState(false);

//   useEffect(() => {
//     dispatch(fetchAllDevices());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       console.error("Device error:", error);
//     }
//   }, [error]);

//   // --- Delete flow with SweetAlert confirm
//   const handleDelete = async (id, displayName) => {
//     const result = await Swal.fire({
//       title: `Delete ${displayName}?`,
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete",
//       cancelButtonText: "Cancel",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       setWorking(true);
//       await dispatch(deleteDevice(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Device deleted." });
//       // refresh list
//       dispatch(fetchAllDevices());
//     } catch (err) {
//       console.error("Delete device error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
//     } finally {
//       setWorking(false);
//     }
//   };

//   // --- Edit flow: opens Swal form with prefilled values
//   const handleEdit = async (device) => {
//     // gather defaults
//     const currentDeviceId = device.deviceId || "";
//     const currentVenueId = device.venue?._id ?? device.venue ?? "";
//     // find ambient & freezer from device.conditions (if exists)
//     const condMap = {};
//     (device.conditions || []).forEach((c) => {
//       condMap[c.type] = c;
//     });

//     const ambient = condMap.ambient || { operator: ">=", value: "" };
//     const freezer = condMap.freezer || { operator: ">=", value: "" };

//     // build venue <option> HTML
//     const venueOptionsHtml = Venues.map((v) => {
//       const id = v._id ?? v.id;
//       const name = v.name ?? id;
//       const selected = id === currentVenueId ? "selected" : "";
//       return `<option value="${id}" ${selected}>${name}</option>`;
//     }).join("");

//     const html = `
//       <div className="flex  gap-2 ">
//       <div>
//         <label className="text-sm">Device ID</label>
//         <input id="swal-deviceId" className="swal2-input" value="${escapeHtml(currentDeviceId)}" />
//       </div>

//       <div>
//         <label className="text-sm">Venue</label>
//         <select id="swal-venue" className="swal2-select" style="width:200px;padding:8px;border-radius:6px;border:1px solid #d1d5db;">
//           <option value="">Select venue</option>
//           ${venueOptionsHtml}
//         </select>
//       </div>

//         <div>
//           <div>
//             <label className="text-sm">Ambient (operator + value)</label>
//             <div style="">
//               <select id="swal-ambient-op" className="swal2-select" style="padding:8px;border-radius:6px;border:1px solid #d1d5db;">
//                 <option value=">=" ${ambient.operator === ">=" ? "selected" : ""}>&ge;</option>
//                 <option value="<=" ${ambient.operator === "<=" ? "selected" : ""}>&le;</option>
//                 <option value=">" ${ambient.operator === ">" ? "selected" : ""}>&gt;</option>
//                 <option value="<" ${ambient.operator === "<" ? "selected" : ""}>&lt;</option>
//                 <option value="==" ${ambient.operator === "==" ? "selected" : ""}>==</option>
//               </select>
//               <input id="swal-ambient-val" type="number" className="swal2-input" placeholder="Ambient value" value="${escapeHtml(ambient.value ?? "")}" />
//             </div>
//           </div>
//         </div>

//           <div>
//             <label className="text-sm">Freezer (operator + value)</label>
//             <div style="">
//               <select id="swal-freezer-op" className="swal2-select" style="padding:8px;border-radius:6px;border:1px solid #d1d5db;">
//                 <option value=">=" ${freezer.operator === ">=" ? "selected" : ""}>&ge;</option>
//                 <option value="<=" ${freezer.operator === "<=" ? "selected" : ""}>&le;</option>
//                 <option value=">" ${freezer.operator === ">" ? "selected" : ""}>&gt;</option>
//                 <option value="<" ${freezer.operator === "<" ? "selected" : ""}>&lt;</option>
//                 <option value="==" ${freezer.operator === "==" ? "selected" : ""}>==</option>
//               </select>
//               <input id="swal-freezer-val" type="number" className="swal2-input" placeholder="Freezer value" value="${escapeHtml(freezer.value ?? "")}" />
//             </div>
//           </div>
        
//       </div>
//     `;

//     const result = await Swal.fire({
//       title: `Edit Device`,
//       html,
//       showCancelButton: true,
//       focusConfirm: false,
//       confirmButtonText: "Save",
//       cancelButtonText: "Cancel",
//       preConfirm: () => {
//         const deviceIdInput = document.getElementById("swal-deviceId")?.value?.trim();
//         const venueId = document.getElementById("swal-venue")?.value;
//         const ambientOp = document.getElementById("swal-ambient-op")?.value;
//         const ambientVal = document.getElementById("swal-ambient-val")?.value;
//         const freezerOp = document.getElementById("swal-freezer-op")?.value;
//         const freezerVal = document.getElementById("swal-freezer-val")?.value;

//         if (!deviceIdInput) {
//           Swal.showValidationMessage("Device ID is required");
//           return false;
//         }
//         if (!venueId) {
//           Swal.showValidationMessage("Venue is required");
//           return false;
//         }

//         // Validate numeric values only if provided
//         const conditions = [];
//         if (ambientVal !== "") {
//           const n = Number(ambientVal);
//           if (Number.isNaN(n)) {
//             Swal.showValidationMessage("Ambient must be a number");
//             return false;
//           }
//           conditions.push({ type: "ambient", operator: ambientOp, value: n });
//         }
//         if (freezerVal !== "") {
//           const n2 = Number(freezerVal);
//           if (Number.isNaN(n2)) {
//             Swal.showValidationMessage("Freezer must be a number");
//             return false;
//           }
//           conditions.push({ type: "freezer", operator: freezerOp, value: n2 });
//         }

//         return { deviceId: deviceIdInput, venueId, conditions };
//       },
//     });

//     if (!result.isConfirmed) return;

//     const { deviceId: newDeviceId, venueId: newVenueId, conditions: newConditions } = result.value;

//     try {
//       setWorking(true);
//       // IMPORTANT: send id in body (backend expects id in body now)
//       await dispatch(
//         updateDevice({
//           id: device._id,
//           deviceId: newDeviceId,
//           venueId: newVenueId,
//           conditions: newConditions,
//         })
//       ).unwrap();

//       Swal.fire({ icon: "success", title: "Updated", text: "Device updated." });
//       // refresh list to ensure latest data
//       dispatch(fetchAllDevices());
//     } catch (err) {
//       console.error("Update device error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
//     } finally {
//       setWorking(false);
//     }
//   };

//   const displayDevices = DeviceArray || [];

//   return (
//     <div className="ListPage device-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB]">
//       <h1 className="device-list-title font-semibold text-gray-800 mb-4">Device Management</h1>
//       <div className="mb-4">
//         <h2 className="device-list-header text-center font-semibold text-gray-800">Device List</h2>
//         <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               {/* <th className="py-2 px-4 font-bold text-gray-800">#</th> */}
//               <th className="py-2 px-4 font-bold text-gray-800">Device ID</th>
//               {/* <th className="py-2 px-4 font-bold text-gray-800">Venue</th> */}
//               <th className="py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="overflow-y-auto pr-1 user-table-scroll h-[60vh] ">
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {/* {isLoading && <tr><td className="p-4">Loading devices...</td></tr>} */}
//               {isLoading && <TableSkeleton/>}

//               {!isLoading && displayDevices.map((d, idx) => {
//                 const id = d._id ?? idx;
//                 const deviceIdDisplay = d.deviceId ?? `Device ${idx + 1}`;
//                 const venueName = d.venue?.name ?? d.venue ?? "—";

//                 return (
//                   <tr
//                     key={id}
//                     className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                       selectedDevice?._id === id || selectedDevice?.id === id ? "bg-blue-50 border-blue-300" : ""
//                     }`}
//                     onClick={(e) => { e.stopPropagation(); onDeviceSelect?.(d); }}
//                   >
//                     {/* <td className="py-2 sm:py-3 px-2 sm:px-4">{idx + 1}</td> */}
//                     <td className="py-2 sm:py-3 px-2 sm:px-4">{deviceIdDisplay}</td>
//                     {/* <td className="py-2 sm:py-3 px-2 sm:px-4">{venueName}</td> */}
//                     <td className="py-2 sm:py-3 px-2 sm:px-4">
//                       <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                         <button
//                           onClick={() => handleEdit(d)}
//                           className="rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-2 cursor-pointer"
//                           disabled={working}
//                         >
//                           <Pencil className="text-green-600" size={16} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(id, deviceIdDisplay)}
//                           className="rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-2 cursor-pointer"
//                           disabled={working}
//                         >
//                           <Trash className="text-red-600" size={16}/>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}

//               {!isLoading && displayDevices.length === 0 && (
//                 <tr><td className="p-4">No devices found.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // small helper to escape values for HTML injection in Swal
// function escapeHtml(unsafe) {
//   if (unsafe === undefined || unsafe === null) return "";
//   return String(unsafe)
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }

// export default DeviceList;










// src/pages/management/DeviceList.jsx
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// removed SweetAlert import
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  FormHelperText,
} from "@mui/material";

import { fetchAllDevices, updateDevice, deleteDevice } from "../../slices/DeviceSlice";
import "../../styles/pages/management-pages.css";
import TableSkeleton from "../../components/skeletons/TableSkeleton";

const DeviceList = ({ onDeviceSelect, selectedDevice }) => {
  const dispatch = useDispatch();
  const { DeviceArray = [], isLoading, error } = useSelector((state) => state.Device || {});
  const { Venues = [] } = useSelector((state) => state.Venue || {});
  const [working, setWorking] = useState(false);

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [editingDeviceId, setEditingDeviceId] = useState(null);
  const [editForm, setEditForm] = useState({
    deviceId: "",
    venueId: "",
    ambientOp: ">=",
    ambientVal: "",
    freezerOp: ">=",
    freezerVal: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Delete confirm dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ id: null, name: "" });

  // Snackbar state
  const [snack, setSnack] = useState({ open: false, severity: "success", message: "" });

  useEffect(() => {
    dispatch(fetchAllDevices());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Device error:", error);
    }
  }, [error]);

  // ---- Delete flow using MUI dialog
  const openDeleteConfirm = (id, displayName) => {
    setDeleteTarget({ id, name: displayName });
    setDeleteOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteOpen(false);
    setDeleteTarget({ id: null, name: "" });
  };

  const handleDeleteConfirm = async () => {
    const id = deleteTarget.id;
    setDeleteOpen(false);
    if (!id) return;
    try {
      setWorking(true);
      await dispatch(deleteDevice(id)).unwrap();
      // setSnack({ open: true, severity: "success", message: "Device deleted." });
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Device deleted.",
    });

      dispatch(fetchAllDevices());
    } catch (err) {
      console.error("Delete device error:", err);
      // setSnack({ open: true, severity: "error", message: err?.toString() || "Delete failed" });
      Swal.fire({
      icon: "error",
      title: "Delete failed",
      text: err?.toString() || "Delete failed",
    });

      } finally {
      setWorking(false);
      setDeleteTarget({ id: null, name: "" });
    }
  };

  // --- Edit flow: opens MUI dialog with prefilled values
  const handleEdit = (device) => {
    const currentDeviceId = device.deviceId || "";
    const currentVenueId = device.venue?._id ?? device.venue ?? "";
    const condMap = {};
    (device.conditions || []).forEach((c) => {
      condMap[c.type] = c;
    });

    const ambient = condMap.ambient || { operator: ">=", value: "" };
    const freezer = condMap.freezer || { operator: ">=", value: "" };

    setEditingDeviceId(device._id ?? device.id ?? null);
    setEditForm({
      deviceId: currentDeviceId,
      venueId: currentVenueId,
      ambientOp: ambient.operator ?? ">=",
      ambientVal:
        ambient.value === undefined || ambient.value === null ? "" : String(ambient.value),
      freezerOp: freezer.operator ?? ">=",
      freezerVal:
        freezer.value === undefined || freezer.value === null ? "" : String(freezer.value),
    });
    setFormErrors({});
    setEditOpen(true);
  };

  const handleEditChange = (field) => (e) => {
    const v = e?.target?.value ?? "";
    setEditForm((s) => ({ ...s, [field]: v }));
    setFormErrors((s) => ({ ...s, [field]: undefined }));
  };

  const handleEditCancel = () => {
    setEditOpen(false);
    setFormErrors({});
    setEditingDeviceId(null);
  };

  const handleEditSave = async () => {
    const { deviceId, venueId, ambientOp, ambientVal, freezerOp, freezerVal } = editForm;
    const errors = {};
    if (!deviceId || !deviceId.trim()) errors.deviceId = "Device ID is required";
    if (!venueId) errors.venueId = "Venue is required";

    if (ambientVal !== "" && Number.isNaN(Number(ambientVal))) errors.ambientVal = "Must be a number";
    if (freezerVal !== "" && Number.isNaN(Number(freezerVal))) errors.freezerVal = "Must be a number";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const conditions = [];
    if (ambientVal !== "") conditions.push({ type: "ambient", operator: ambientOp, value: Number(ambientVal) });
    if (freezerVal !== "") conditions.push({ type: "freezer", operator: freezerOp, value: Number(freezerVal) });

    try {
      setWorking(true);
      await dispatch(
        updateDevice({
          id: editingDeviceId,
          deviceId: deviceId.trim(),
          venueId,
          conditions,
        })
      ).unwrap();

      // setSnack({ open: true, severity: "success", message: "Device updated." });
      Swal.fire({
      icon: "success",
      title: "Success",
      text: "Device updated.",
    });

      setEditOpen(false);
      dispatch(fetchAllDevices());
    } catch (err) {
      console.error("Update device error:", err);
      // setSnack({ open: true, severity: "error", message: err?.toString() || "Update failed" });
      
      Swal.fire({
      icon: "error",
      title: "Update failed",
      text: err?.toString() || "Update failed",
    });

    } finally {
      setWorking(false);
      setEditingDeviceId(null);
    }
  };

  const displayDevices = DeviceArray || [];

  return (
    <div className="ListPage device-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB]">
      <h1 className="device-list-title font-semibold text-gray-800 mb-4">Device Management</h1>
      <div className="mb-4">
        <h2 className="device-list-header text-center font-semibold text-gray-800">Device List</h2>
        <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 font-bold text-gray-800">Device ID</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
        </table>

        <div className="overflow-y-auto pr-1 user-table-scroll h-[60vh] ">
          <table className="w-full table-auto text-left">
            <tbody>
              {isLoading && <TableSkeleton />}

              {!isLoading &&
                displayDevices.map((d, idx) => {
                  const id = d._id ?? idx;
                  const deviceIdDisplay = d.deviceId ?? `Device ${idx + 1}`;
                  const venueName = d.venue?.name ?? d.venue ?? "—";

                  return (
                    <tr
                      key={id}
                      className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
                        selectedDevice?._id === id || selectedDevice?.id === id ? "bg-blue-50 border-blue-300" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeviceSelect?.(d);
                      }}
                    >
                      <td className="py-2 sm:py-3 px-2 sm:px-4">{deviceIdDisplay}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                        <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleEdit(d)}
                            className="rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-2 cursor-pointer"
                            disabled={working}
                          >
                            <Pencil className="text-green-600" size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteConfirm(id, deviceIdDisplay)}
                            className="rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-2 cursor-pointer"
                            disabled={working}
                          >
                            <Trash className="text-red-600" size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

              {!isLoading && displayDevices.length === 0 && <tr><td className="p-4">No devices found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
   {/* Edit Dialog — vertical layout */}
<Dialog open={editOpen} onClose={handleEditCancel} maxWidth="sm" fullWidth>
  <DialogTitle>Edit Device</DialogTitle>
  <DialogContent dividers>
    <Grid container spacing={2}>
      {/* Device ID */}
      <Grid item xs={12}>
        <TextField
          autoFocus
          label="Device ID"
          value={editForm.deviceId}
          onChange={handleEditChange("deviceId")}
          fullWidth
          error={!!formErrors.deviceId}
          helperText={formErrors.deviceId}
        />
      </Grid>

      {/* Venue */}
      <Grid item xs={12}>
        <FormControl fullWidth error={!!formErrors.venueId}>
          <InputLabel id="venue-select-label">Venue</InputLabel>
          <Select
            labelId="venue-select-label"
            label="Venue"
            value={editForm.venueId}
            onChange={handleEditChange("venueId")}
            fullWidth
          >
            <MenuItem value="">Select venue</MenuItem>
            {Venues.map((v) => {
              const id = v._id ?? v.id;
              const name = v.name ?? id;
              return (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
          {formErrors.venueId && <FormHelperText>{formErrors.venueId}</FormHelperText>}
        </FormControl>
      </Grid>

      {/* Ambient operator (full width) */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="ambient-op-label">Ambient operator</InputLabel>
          <Select
            labelId="ambient-op-label"
            value={editForm.ambientOp}
            label="Ambient operator"
            onChange={handleEditChange("ambientOp")}
            fullWidth
          >
            <MenuItem value=">=">&ge;</MenuItem>
            <MenuItem value="<=">&le;</MenuItem>
            <MenuItem value=">">&gt;</MenuItem>
            <MenuItem value="<">&lt;</MenuItem>
            <MenuItem value="==">==</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Ambient value (full width) */}
      <Grid item xs={12}>
        <TextField
          label="Ambient value"
          type="number"
          inputProps={{ step: 0.1 }}
          value={editForm.ambientVal}
          onChange={handleEditChange("ambientVal")}
          fullWidth
          error={!!formErrors.ambientVal}
          helperText={formErrors.ambientVal}
        />
      </Grid>

      {/* Freezer operator (full width) */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="freezer-op-label">Freezer operator</InputLabel>
          <Select
            labelId="freezer-op-label"
            value={editForm.freezerOp}
            label="Freezer operator"
            onChange={handleEditChange("freezerOp")}
            fullWidth
          >
            <MenuItem value=">=">&ge;</MenuItem>
            <MenuItem value="<=">&le;</MenuItem>
            <MenuItem value=">">&gt;</MenuItem>
            <MenuItem value="<">&lt;</MenuItem>
            <MenuItem value="==">==</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Freezer value (full width) */}
      <Grid item xs={12}>
        <TextField
          label="Freezer value"
          type="number"
          inputProps={{ step: 0.1 }}
          value={editForm.freezerVal}
          onChange={handleEditChange("freezerVal")}
          fullWidth
          error={!!formErrors.freezerVal}
          helperText={formErrors.freezerVal}
        />
      </Grid>
    </Grid>
  </DialogContent>

  <DialogActions sx={{ px: 3, py: 2 }}>
    <Button onClick={handleEditCancel} disabled={working}>Cancel</Button>
    <Button
      variant="contained"
      onClick={handleEditSave}
      disabled={working}
      endIcon={working ? <CircularProgress size={18} /> : null}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

      {/* Delete confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete {deleteTarget.name ? `"${deleteTarget.name}"` : "device"}?</DialogTitle>
        <DialogContent dividers>
          This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={working}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
            disabled={working}
            endIcon={working ? <CircularProgress size={18} /> : null}
          >
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DeviceList;
