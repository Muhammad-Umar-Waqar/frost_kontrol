// import React, { useEffect, useState } from 'react';
// import { Box, Building, Tag, Thermometer } from 'lucide-react';
// import InputField from '../../components/Inputs/InputField';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllVenues } from '../../slices/VenueSlice';

// import "../../styles/pages/management-pages.css"

// const AddDevice = () => {
//   const [formData, setFormData] = useState({
//     deviceId: '',
//     venue: '',
//     brand: '',
//   });
//   const [brands, setBrands] = useState([]);
//   const {Venues}=useSelector((state)=>state.Venue)
//   const dispatch=useDispatch()

//   useEffect(() => {
//     // TODO: Backend developer will implement brand fetching
//     const fetchBrands = async () => {
//       // Static placeholder - Backend developer should replace with API call
//       setBrands([]);
//     };

//     fetchBrands();
//     dispatch(fetchAllVenues())
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     setFormData((prev) => {
//       const newData = {
//         ...prev,
//         [name]: value,
//       };
//       return newData;
//     });
//   };

//   const handleSaveDevice = () => {
//     // Backend developer will implement logic here
//   };

//   return (
//     <div className="AddingPage device-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]"> 
//       <h2 className="device-add-title font-semibold mb-1 text-center">Add Devices</h2>
//       <p className="device-add-subtitle text-gray-500 mb-6 text-center">Welcome back! Select method to add device</p>

//       <div className="device-add-form space-y-4 max-w-sm mx-auto w-full">
//         {/* Device ID Input */}
//        <InputField
//           id="deviceId"
//           name="deviceId"
//           label="Device ID"
//           type="text"
//           value={formData.deviceId}
//           onchange={handleChange}
//           placeholder="Device ID"
//           icon={<Box size={20} />}
//         />

//         {/* Condition Section */}
//         <div className="mt-2">
//           <p className="text-[12px] font-semibold text-gray-600 mb-2">Condition</p>
//           <div className="space-y-3">
//             {/* Ambient Temperature */}
//             <div className="flex items-center gap-2">
//               <div className="relative flex-1">
//                 <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   readOnly
//                   value="Ambient Temperature"
//                   className="w-full pl-9 pr-4 py-2 rounded-md bg-white border border-gray-300 text-gray-600 text-sm"
//                 />
//               </div>
//               <button type="button" className="w-8 h-8 rounded-full bg-[#1E64D9] text-white text-sm flex items-center justify-center">▶</button>
//               <div className="relative flex-[0.9]">
//                 <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder=">=25"
//                   className="w-full pl-9 pr-10 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                 />
//                 <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">°C</span>
//               </div>
//               <button type="button" className="w-8 h-8 rounded-full bg-[#1E64D9] text-white text-sm flex items-center justify-center">●</button>
//             </div>

//             {/* Freezer Temperature */}
//             <div className="flex items-center gap-2">
//               <div className="relative flex-1">
//                 <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   readOnly
//                   value="Freezer Temperature"
//                   className="w-full pl-9 pr-4 py-2 rounded-md bg-white border border-gray-300 text-gray-600 text-sm"
//                 />
//               </div>
//               <button type="button" className="w-8 h-8 rounded-full bg-[#1E64D9] text-white text-sm flex items-center justify-center">▶</button>
//               <div className="relative flex-[0.9]">
//                 <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder="8"
//                   className="w-full pl-9 pr-10 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                 />
//                 <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">°C</span>
//               </div>
//               <button type="button" className="w-8 h-8 rounded-full bg-[#1E64D9] text-white text-sm flex items-center justify-center">●</button>
//             </div>
//           </div>
//         </div>

//         {/* Venue Select */}
//         <div className="relative">
//           <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
         
//           <select
//             name="venue"
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={formData.venue}
//             onChange={handleChange}
//           >
//             <option value="">Select a venue</option>
//           {Venues.map((venue) => (
//                   <option key={venue.venue_name} value={venue.venue_name}>
//                     {venue.venue_name}
//                   </option>
//           ))}
//           </select>
//         </div>

//         {/* Brand Select */}
//         <div className="relative">
//           <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} placeholder="Device ID"/>
//           <select
//             name="brand"
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={formData.brand}
//             onChange={handleChange}
//           >
//             <option value="">Select a brand</option>
//           {brands?.map((brand) => (
//                   <option key={brand.brand_name} value={brand.brand_name}>
//                     {brand.brand_name}
//                   </option>
//           ))}
//           </select>
//         </div>

//         {/* Save Button Only */}
//         <div className="mt-6">
//           <button
//             onClick={handleSaveDevice}
//             className="bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md w-full"
//           >
//             Save
//           </button>
//         </div>

//         {/* API Key area intentionally removed per client request */}
//       </div>
//     </div>
//   );
// };

// export default AddDevice;
















// import React, { useEffect, useState } from 'react';
// import { Box, Building, Tag, Thermometer } from 'lucide-react';
// import InputField from '../../components/Inputs/InputField';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllVenues } from '../../slices/VenueSlice';

// import "../../styles/pages/management-pages.css"

// const AddDevice = () => {
//   const [formData, setFormData] = useState({
//     deviceId: '',
//     venue: '',
//     brand: '',
//   });
//   const [brands, setBrands] = useState([]);
//   const {Venues}=useSelector((state)=>state.Venue)
//   const dispatch=useDispatch()

//   useEffect(() => {
//     // TODO: Backend developer will implement brand fetching
//     const fetchBrands = async () => {
//       // Static placeholder - Backend developer should replace with API call
//       setBrands([]);
//     };

//     fetchBrands();
//     dispatch(fetchAllVenues())
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     setFormData((prev) => {
//       const newData = {
//         ...prev,
//         [name]: value,
//       };
//       return newData;
//     });
//   };

//   const handleSaveDevice = () => {
//     // Backend developer will implement logic here
//   };

//   return (
//     <div className="AddingPage device-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]"> 
//       <h2 className="device-add-title font-semibold mb-1 text-center">Add Devices</h2>
//       <p className="device-add-subtitle text-gray-500 mb-6 text-center">Welcome back! Select method to add device</p>

//       <div className="device-add-form space-y-4 max-w-sm mx-auto w-full">
//         {/* Device ID Input */}
//        <InputField
//           id="deviceId"
//           name="deviceId"
//           label="Device ID"
//           type="text"
//           value={formData.deviceId}
//           onchange={handleChange}
//           placeholder="Device ID"
//           icon={<Box size={20} />}
//         />

//         {/* Condition Section */}
//         <div className="mt-2">
//           <p className="text-[12px] font-semibold text-gray-600 mb-2">Condition</p>
//           <div className="space-y-3">
//             {/* Ambient Temperature */}
//             <div className="flex items-center gap-2">
//               <div className="relative flex-1">
//                 <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   value="Ambient Temperature"
//                   readOnly
//                   className="w-full pl-9 pr-4 py-2 rounded-md bg-transparent outline-none border border-none text-gray-600 text-sm"
//                 />
//               </div>
              
//               <div className="relative flex-[0.9]">
//                 <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder=">=25"
//                   className="w-full pl-9 pr-10 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                 />
//                 <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">°C</span>
//               </div>
              
//             </div>

//             {/* Freezer Temperature */}
//             <div className="flex items-center gap-2">
//               <div className="relative flex-1">
//                 <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   value="Freezer Temperature"
//                   readOnly
//                   className="w-full pl-9 pr-4 py-2 rounded-md bg-transparent border border-none outline-none text-gray-600 text-sm"
//                 />
//               </div>
              
//               <div className="relative flex-[0.9]">
//                 <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder="8"
//                   className="w-full pl-9 pr-10 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                 />
//                 <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">°C</span>
//               </div>
              
//             </div>
//           </div>
//         </div>

//         {/* Venue Select */}
//         <div className="relative">
//           <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
         
//           <select
//             name="venue"
//             className={`text-gray-500 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//     formData.venue ? 'text-black' : 'text-gray-500'
//   }`}
//             value={formData.venue}
//             onChange={handleChange}
//           >
//             <option value="" >Select a venue</option>
//           {Venues.map((venue) => (
//                   <option key={venue.venue_name} value={venue.venue_name}>
//                     {venue.venue_name}
//                   </option>
//           ))}
//           </select>
//         </div>

//         {/* Brand Select */}
//         <div className="relative">
//           <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} placeholder="Device ID"/>
//           <select
//             name="brand"
//             className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//     formData.brand ? 'text-black' : 'text-gray-500'
//   }`}
//             value={formData.brand}
//             onChange={handleChange}
//           >
            
//             <option value="">Select a brand</option>
//           {brands?.map((brand) => (
//                   <option key={brand.brand_name} value={brand.brand_name}>
//                     {brand.brand_name}
//                   </option>
//           ))}
//           </select>
//         </div>

//         {/* Save Button Only */}
//         <div className="mt-6">
//           <button
//             onClick={handleSaveDevice}
//             className="bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md w-full"
//           >
//             Save
//           </button>
//         </div>

//         {/* API Key area intentionally removed per client request */}
//       </div>
//     </div>
//   );
// };

// export default AddDevice;










// import React, { useEffect, useState } from 'react';
// import { Box, Building, Tag, Thermometer } from 'lucide-react';
// import InputField from '../../components/Inputs/InputField';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllVenues } from '../../slices/VenueSlice';

// import "../../styles/pages/management-pages.css"

// const AddDevice = () => {
//   const [formData, setFormData] = useState({
//     deviceId: '',
//     venue: '',
//     brand: '',
//   });


  
//     const dispatch = useDispatch();
//     const { Venues, loading, error } = useSelector((state) => state.Venue || { Venues: [], loading: false, error: null });
  
//     useEffect(() => {
//       dispatch(fetchAllVenues());
//     }, [dispatch]);


//   useEffect(() => {
//     dispatch(fetchAllVenues())
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     setFormData((prev) => {
//       const newData = {
//         ...prev,
//         [name]: value,
//       };
//       return newData;
//     });
//   };

//   const handleSaveDevice = () => {
//     // Backend developer will implement logic here
//   };

//   return (
//     <div className="AddingPage device-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]"> 
//       <h2 className="device-add-title font-semibold mb-1 text-center">Add Devices</h2>
//       <p className="device-add-subtitle text-gray-500 mb-6 text-center">Welcome back! Select method to add device</p>

//       <div className="device-add-form space-y-4 max-w-sm mx-auto w-full">
//         {/* Device ID Input */}
//        <InputField
//           id="deviceId"
//           name="deviceId"
//           label="Device ID"
//           type="text"
//           value={formData.deviceId}
//           onchange={handleChange}
//           placeholder="Device ID"
//           icon={<Box size={20} />}
//         />

//         {/* Condition Section */}
//         <div className="mt-2">
//           <p className="text-[12px] font-semibold text-gray-600 mb-2">Condition</p>
//           <div className="space-y-3">
//             {/* Ambient Temperature */}
//             <div className="flex items-center gap-2">
//               <div className="relative flex-1">
//                 <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   value="Ambient Temperature"
//                   readOnly
//                   className="w-full pl-9 pr-4 py-2 rounded-md bg-transparent outline-none border border-none text-gray-600 text-sm"
//                 />
//               </div>
              
//               <div className="relative flex-[0.9]">
//                 <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder=">=25"
//                   className="w-full pl-9 pr-10 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                 />
//                 <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">°C</span>
//               </div>
              
//             </div>

//             {/* Freezer Temperature */}
//             <div className="flex items-center gap-2">
//               <div className="relative flex-1">
//                 <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   value="Freezer Temperature"
//                   readOnly
//                   className="w-full pl-9 pr-4 py-2 rounded-md bg-transparent border border-none outline-none text-gray-600 text-sm"
//                 />
//               </div>
              
//               <div className="relative flex-[0.9]">
//                 <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder="8"
//                   className="w-full pl-9 pr-10 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                 />
//                 <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">°C</span>
//               </div>
              
//             </div>
//           </div>
//         </div>

//         {/* Venue Select */}
//         <div className="relative">
//           <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  
//           <select
//             name="venue"
//             className={`text-gray-500 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//     formData.venue ? 'text-black' : 'text-gray-500'
//   }`}
//             value={formData.venue}
//             onChange={handleChange}
//           >
//             <option value="" >Select a venue</option>
//             {loading ? (
//             <option value="">Loading venues...</option>
//           ) : error ? (
//             <option value="">{error && "Error "}</option>
//           ) : Venues.length === 0 ? (
//             <option value="">Select a venue</option>
//           ) : (
//           Venues.map((venue, index) => {
//                   const id = venue._id ?? venue.id ?? index;
//                   const displayName = venue.name ?? `Venue ${index + 1}`;
//                   return(
//                   <option key={id} value={displayName}>
//                     {displayName}
//                   </option>
//                   )
//           }))}
//           </select>
//         </div>

//    {/* Brand Select */}
//         {/* <div className="relative">
//           <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} placeholder="Device ID"/>
//           <select
//             name="brand"
//             className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//     formData.brand ? 'text-black' : 'text-gray-500'
//   }`}
//             value={formData.brand}
//             onChange={handleChange}
//           >
            
//             <option value="">Select a brand</option>
//           {brands?.map((brand) => (
//                   <option key={brand.brand_name} value={brand.brand_name}>
//                     {brand.brand_name}
//                   </option>
//           ))}
//           </select>
//         </div>  */}

//         {/* Save Button Only */}
//         <div className="mt-6">
//           <button
//             onClick={handleSaveDevice}
//             className="bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md w-full"
//           >
//             Save
//           </button>
//         </div>

//         {/* API Key area intentionally removed per client request */}
//       </div>
//     </div>
//   );
// };

// export default AddDevice;











// // src/pages/management/AddDevice.jsx
// import React, { useEffect, useState } from "react";
// import { Box, Building, Thermometer } from "lucide-react";
// import InputField from "../../components/Inputs/InputField";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllVenues } from "../../slices/VenueSlice";
// import { createDevice } from "../../slices/DeviceSlice";
// import Swal from "sweetalert2";

// import "../../styles/pages/management-pages.css";

// const AddDevice = () => {
//   const [formData, setFormData] = useState({
//     deviceId: "",
//     venue: "", // will hold venueId
//     brand: "",
//   });

//   const dispatch = useDispatch();
//   const { Venues = [], loading = false, error = null } = useSelector((state) => state.Venue || {});

//   useEffect(() => {
//     dispatch(fetchAllVenues());
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveDevice = async () => {
//     // validation
//     if (!formData.deviceId || !formData.venue) {
//       return Swal.fire({ icon: "warning", title: "Please provide Device ID and Venue" });
//     }

//     try {
//       // send venueId (formData.venue) and deviceId; conditions empty for now
//       await dispatch(
//         createDevice({
//           deviceId: formData.deviceId,
//           venueId: formData.venue,
//           conditions: [],
//         })
//       ).unwrap();

//       Swal.fire({ icon: "success", title: "Device created" });
//       // reset form
//       setFormData({ deviceId: "", venue: "", brand: "" });
//       // Optionally you could dispatch(fetchAllDevices()) elsewhere if needed
//     } catch (err) {
//       console.error("Create device error:", err);
//       Swal.fire({ icon: "error", title: "Create failed", text: err || "Something went wrong" });
//     }
//   };

//   return (
//     <div className="AddingPage device-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
//       <h2 className="device-add-title font-semibold mb-1 text-center">Add Devices</h2>
//       <p className="device-add-subtitle text-gray-500 mb-6 text-center">Welcome back! Select method to add device</p>

//       <div className="device-add-form space-y-4 max-w-sm mx-auto w-full">
//         <InputField
//           id="deviceId"
//           name="deviceId"
//           label="Device ID"
//           type="text"
//           value={formData.deviceId}
//           onchange={handleChange}
//           placeholder="Device ID"
//           icon={<Box size={20} />}
//         />

//         {/* Condition section (UI unchanged) */}
//         <div className="mt-2"> ... {/* keep your current condition UI as-is */} </div>

//         {/* Venue Select (value is venueId now) */}
//         <div className="relative">
//           <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

//           <select
//             name="venue"
//             className={`text-gray-500 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               formData.venue ? "text-black" : "text-gray-500"
//             }`}
//             value={formData.venue}
//             onChange={handleChange}
//           >
//             <option value="">Select a venue</option>
//             {loading ? (
//               <option value="">Loading venues...</option>
//             ) : error ? (
//               <option value="">{error && "Error"}</option>
//             ) : Venues.length === 0 ? (
//               <option value="">No venues</option>
//             ) : (
//               Venues.map((venue, index) => {
//                 const id = venue._id ?? venue.id ?? index;
//                 const displayName = venue.name ?? `Venue ${index + 1}`;
//                 return (
//                   <option key={id} value={id}>
//                     {displayName}
//                   </option>
//                 );
//               })
//             )}
//           </select>
//         </div>

//         {/* Save Button */}
//         <div className="mt-6">
//           <button onClick={handleSaveDevice} className="bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md w-full">
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDevice;














// // src/pages/management/AddDevice.jsx
// import React, { useEffect, useState } from "react";
// import { Box, Building, Thermometer, Trash2, Plus } from "lucide-react";
// import InputField from "../../components/Inputs/InputField";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllVenues } from "../../slices/VenueSlice";
// import { createDevice } from "../../slices/DeviceSlice";
// import Swal from "sweetalert2";

// import "../../styles/pages/management-pages.css";

// const defaultConditions = [
//   { id: "ambient", type: "ambient", operator: ">=", value: "" },
//   { id: "freezer", type: "freezer", operator: ">=", value: "" },
// ];

// const AddDevice = () => {
//   const [formData, setFormData] = useState({
//     deviceId: "",
//     venue: "", // holds venueId (DB _id)
//     brand: "",
//   });

//   // conditions state: start with ambient & freezer rows (keeps your UI)
//   const [conditions, setConditions] = useState(defaultConditions);

//   // optional: store last created device (to show apiKey if needed)
//   const [createdDevice, setCreatedDevice] = useState(null);

//   const dispatch = useDispatch();
//   const { Venues = [], loading = false, error = null } =
//     useSelector((state) => state.Venue || {});

//   useEffect(() => {
//     dispatch(fetchAllVenues());
//   }, [dispatch]);

//   // handle simple form fields + select
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // condition row handlers
//   const handleConditionChange = (index, key, value) => {
//     setConditions((prev) => {
//       const next = [...prev];
//       next[index] = { ...next[index], [key]: value };
//       return next;
//     });
//   };

//   const handleAddCondition = () => {
//     // generate a simple unique id for UI
//     const id = `c_${Date.now()}`;
//     setConditions((prev) => [...prev, { id, type: "", operator: ">=", value: "" }]);
//   };

//   const handleRemoveCondition = (index) => {
//     // keep ambient/freezer if you want them always present. Here we allow removal of custom rows only.
//     const cond = conditions[index];
//     if (cond.id === "ambient" || cond.id === "freezer") {
//       // Prevent removing default rows — if you prefer to allow removal, remove this guard.
//       return;
//     }
//     setConditions((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Save device: validate and dispatch createDevice thunk
//   const handleSaveDevice = async () => {
//     // Basic validations
//     if (!formData.deviceId?.trim()) {
//       return Swal.fire({ icon: "warning", title: "Enter Device ID" });
//     }
//     if (!formData.venue) {
//       return Swal.fire({ icon: "warning", title: "Select Venue" });
//     }

//     // Prepare conditions payload: filter out empty rows
//     const payloadConditions = conditions
//       .map((c) => ({
//         type: (c.type || "").toString().trim(),
//         operator: c.operator,
//         value: (c.value || "").toString().trim(),
//       }))
//       .filter((c) => c.type && c.operator && c.value !== ""); // require type & value

//     // Validate numeric values (backend expects values but doesn't enforce type; we enforce number here)
//     for (const c of payloadConditions) {
//       const num = Number(c.value);
//       if (Number.isNaN(num)) {
//         return Swal.fire({
//           icon: "warning",
//           title: "Invalid condition value",
//           text: `Condition "${c.type}" requires a numeric value.`,
//         });
//       }
//       // convert to number
//       c.value = num;
//     }

//     try {
//       // dispatch createDevice thunk (thunk reads token from localStorage)
//       const device = await dispatch(
//         createDevice({
//           deviceId: formData.deviceId.trim(),
//           venueId: formData.venue,
//           conditions: payloadConditions,
//         })
//       ).unwrap();

//       // device returned from backend (contains apiKey etc)
//       setCreatedDevice(device);

//       Swal.fire({
//         icon: "success",
//         title: "Device Created",
//         html: device?.apiKey
//           ? `<div>Device created successfully.<br/><small>API Key (base64):</small><pre style="word-break:break-all">${device.apiKey}</pre></div>`
//           : "Device created successfully",
//         width: 600,
//       });

//       // Reset form (keep default ambient/freezer rows empty)
//       setFormData({ deviceId: "", venue: "", brand: "" });
//       setConditions(defaultConditions.map((c) => ({ ...c, value: "" })));
//     } catch (err) {
//       console.error("Create device error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Create failed",
//         text: err || "Something went wrong while creating device",
//       });
//     }
//   };

//   return (
//     <div className="AddingPage device-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
//       <h2 className="device-add-title font-semibold mb-1 text-center">Add Devices</h2>
//       <p className="device-add-subtitle text-gray-500 mb-6 text-center">Welcome back! Select method to add device</p>

//       <div className="device-add-form space-y-4 max-w-sm mx-auto w-full">
//         {/* Device ID Input */}
//         <InputField
//           id="deviceId"
//           name="deviceId"
//           label="Device ID"
//           type="text"
//           value={formData.deviceId}
//           onchange={handleChange}
//           placeholder="Device ID"
//           icon={<Box size={20} />}
//         />

//         {/* Conditions Section (Ambient & Freezer + extra rows) */}
//         <div className="mt-2">
//           <div className="flex items-center justify-between mb-2">
//             <p className="text-[12px] font-semibold text-gray-600">Condition</p>
//             <button
//               type="button"
//               onClick={handleAddCondition}
//               className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
//             >
//               <Plus size={14} /> Add condition
//             </button>
//           </div>

//           <div className="space-y-3">
//             {conditions.map((cond, idx) => (
//               <div key={cond.id} className="flex items-center gap-2">
//                 {/* Left label or type input */}
//                 <div className="relative flex-1">
//                   <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                   {/* For default rows show readOnly labels; for custom rows show editable type input */}
//                   {cond.id === "ambient" || cond.id === "freezer" ? (
//                     <input
//                       type="text"
//                       value={cond.type === "ambient" ? "Ambient Temperature" : "Freezer Temperature"}
//                       readOnly
//                       className="w-full pl-9 pr-4 py-2 rounded-md bg-transparent outline-none border-none text-gray-600 text-sm"
//                     />
//                   ) : (
//                     <input
//                       type="text"
//                       placeholder="Condition name (e.g. humidity)"
//                       value={cond.type}
//                       onChange={(e) => handleConditionChange(idx, "type", e.target.value)}
//                       className="w-full pl-9 pr-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                     />
//                   )}
//                 </div>

//                 {/* Operator select */}
//                 <div className="relative flex-[0.55]">
//                   <select
//                     value={cond.operator}
//                     onChange={(e) => handleConditionChange(idx, "operator", e.target.value)}
//                     className="w-full pl-3 pr-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                     aria-label={`operator-${idx}`}
//                   >
//                     <option value=">=">&ge;</option>
//                     <option value="<=">&le;</option>
//                     <option value=">">&gt;</option>
//                     <option value="<">&lt;</option>
//                     <option value="==">==</option>
//                   </select>
//                 </div>

//                 {/* Value input */}
//                 <div className="relative flex-[0.9]">
//                   <input
//                     type="number"
//                     placeholder={cond.id === "ambient" ? ">=25" : cond.id === "freezer" ? "8" : "Value"}
//                     value={cond.value}
//                     onChange={(e) => handleConditionChange(idx, "value", e.target.value)}
//                     className="w-full pl-3 pr-10 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                   />
//                   <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">°C</span>
//                 </div>

//                 {/* Remove button for custom rows */}
//                 {cond.id !== "ambient" && cond.id !== "freezer" && (
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveCondition(idx)}
//                     className="ml-2 p-1 rounded-full border border-red-200 text-red-500 bg-white hover:bg-red-50"
//                     aria-label="remove-condition"
//                     title="Remove condition"
//                   >
//                     <Trash2 size={14} />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Venue Select */}
//         <div className="relative">
//           <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

//           <select
//             name="venue"
//             className={`text-gray-500 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               formData.venue ? "text-black" : "text-gray-500"
//             }`}
//             value={formData.venue}
//             onChange={handleChange}
//           >
//             <option value="">Select a venue</option>
//             {loading ? (
//               <option value="">Loading venues...</option>
//             ) : error ? (
//               <option value="">{error && "Error"}</option>
//             ) : Venues.length === 0 ? (
//               <option value="">No venues</option>
//             ) : (
//               Venues.map((venue, index) => {
//                 const id = venue._id ?? venue.id ?? index;
//                 const displayName = venue.name ?? `Venue ${index + 1}`;
//                 return (
//                   <option key={id} value={id}>
//                     {displayName}
//                   </option>
//                 );
//               })
//             )}
//           </select>
//         </div>

//         {/* Brand Select (kept but not required) */}
//         {/* If you want brand stored, update backend or extend createDevice to accept brand */}
//         {/* <div className="relative">
//           <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//           <select name="brand" value={formData.brand} onChange={handleChange} className="...">
//             <option value="">Select a brand</option>
//           </select>
//         </div> */}

//         {/* Save Button */}
//         <div className="mt-6">
//           <button
//             onClick={handleSaveDevice}
//             className="bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md w-full"
//           >
//             Save
//           </button>
//         </div>

//         {/* Optionally show API key of last created device */}
//         {createdDevice?.apiKey && (
//           <div className="mt-3 p-3 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words">
//             <strong>Last device API Key:</strong>
//             <div className="mt-2 text-xs">{createdDevice.apiKey}</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddDevice;






// src/pages/management/AddDevice.jsx
import React, { useEffect, useState } from "react";
import { Box, Building, Thermometer } from "lucide-react";
import InputField from "../../components/Inputs/InputField";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVenues } from "../../slices/VenueSlice";
import { createDevice } from "../../slices/DeviceSlice";
import Swal from "sweetalert2";

import "../../styles/pages/management-pages.css";

const defaultConditions = [
  { id: "ambient", type: "ambient", operator: ">=", value: "" },
  { id: "freezer", type: "freezer", operator: ">=", value: "" },
];

const AddDevice = () => {
  const [formData, setFormData] = useState({
    deviceId: "",
    venue: "",
    brand: "",
  });

  // fixed two conditions: ambient & freezer
  const [conditions, setConditions] = useState(defaultConditions);

  const [createdDevice, setCreatedDevice] = useState(null);

  const dispatch = useDispatch();
  const { Venues = [], loading = false, error = null } =
    useSelector((state) => state.Venue || {});

  useEffect(() => {
    dispatch(fetchAllVenues());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConditionChange = (index, key, value) => {
    setConditions((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  const handleSaveDevice = async () => {
    if (!formData.deviceId?.trim()) {
      return Swal.fire({ icon: "warning", title: "Enter Device ID" });
    }
    if (!formData.venue) {
      return Swal.fire({ icon: "warning", title: "Select Venue" });
    }

    // Prepare conditions payload: require type, operator, numeric value
    const payloadConditions = conditions
      .map((c) => ({
        type: c.type,
        operator: c.operator,
        value: (c.value || "").toString().trim(),
      }))
      .filter((c) => c.type && c.operator && c.value !== "");

    for (const c of payloadConditions) {
      const num = Number(c.value);
      if (Number.isNaN(num)) {
        return Swal.fire({
          icon: "warning",
          title: "Invalid condition value",
          text: `Condition "${c.type}" requires a numeric value.`,
        });
      }
      c.value = num;
    }

    try {
      const device = await dispatch(
        createDevice({
          deviceId: formData.deviceId.trim(),
          venueId: formData.venue,
          conditions: payloadConditions,
        })
      ).unwrap();

      setCreatedDevice(device);

      Swal.fire({
        icon: "success",
        title: "Device Created",
        html: device?.apiKey
          ? `<div>Device created successfully.<br/><small>API Key (base64):</small><pre style="word-break:break-all">${device.apiKey}</pre></div>`
          : "Device created successfully",
        width: 600,
      });

      setFormData({ deviceId: "", venue: "", brand: "" });
      setConditions(defaultConditions.map((c) => ({ ...c, value: "" })));
    } catch (err) {
      console.error("Create device error:", err);
      Swal.fire({
        icon: "error",
        title: "Create failed",
        text: err || "Something went wrong while creating device",
      });
    }
  };

  return (
    <div className="AddingPage device-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
      <h2 className="device-add-title font-semibold mb-1 text-center">Add Devices</h2>
      <p className="device-add-subtitle text-gray-500 mb-6 text-center">Welcome back! Select method to add device</p>

      <div className="device-add-form space-y-4 max-w-sm mx-auto w-full">
        {/* Device ID Input */}
        <InputField
          id="deviceId"
          name="deviceId"
          label="Device ID"
          type="text"
          value={formData.deviceId}
          onchange={handleChange}
          placeholder="Device ID"
          icon={<Box size={20} />}
        />

        {/* Conditions Section (only ambient & freezer, no add/remove) */}
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[12px] font-semibold text-gray-600">Condition</p>
          </div>

          <div className="space-y-3">
            {conditions.map((cond, idx) => (
              <div key={cond.id} className="flex items-center gap-2">
                {/* Left label */}
                <div className="relative flex-1">
                  <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={cond.type === "ambient" ? "Ambient Temperature" : "Freezer Temperature"}
                    readOnly
                    className="w-full pl-9 pr-4 py-2 rounded-md bg-transparent outline-none border-none text-gray-600 text-sm"
                  />
                </div>

                {/* Operator select */}
                <div className="relative flex-[0.55]">
                  <select
                    value={cond.operator}
                    onChange={(e) => handleConditionChange(idx, "operator", e.target.value)}
                    className="w-full pl-3 pr-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
                    aria-label={`operator-${idx}`}
                  >
                    <option value=">=">&ge;</option>
                    <option value="<=">&le;</option>
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value="==">==</option>
                  </select>
                </div>

                {/* Value input */}
                <div className="relative flex-[0.9]">
                  <input
                    type="number"
                    placeholder={cond.id === "ambient" ? ">=25" : "8"}
                    value={cond.value}
                    onChange={(e) => handleConditionChange(idx, "value", e.target.value)}
                    className="w-full pl-3 pr-10 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">°C</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Venue Select */}
        <div className="relative">
          <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

          <select
            name="venue"
            className={`text-gray-500 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formData.venue ? "text-black" : "text-gray-500"
            }`}
            value={formData.venue}
            onChange={handleChange}
          >
            <option value="">Select a venue</option>
            {loading ? (
              <option value="">Loading venues...</option>
            ) : error ? (
              <option value="">{error && "Error"}</option>
            ) : Venues.length === 0 ? (
              <option value="">No venues</option>
            ) : (
              Venues.map((venue, index) => {
                const id = venue._id ?? venue.id ?? index;
                const displayName = venue.name ?? `Venue ${index + 1}`;
                return (
                  <option key={id} value={id}>
                    {displayName}
                  </option>
                );
              })
            )}
          </select>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={handleSaveDevice}
            className="bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md w-full"
          >
            Save
          </button>
        </div>

        {/* Optionally show API key of last created device */}
        {createdDevice?.apiKey && (
          <div className="mt-3 p-3 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words">
            <strong>API Key:</strong>
            <div className="mt-2 text-xs">{createdDevice.apiKey}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddDevice;
