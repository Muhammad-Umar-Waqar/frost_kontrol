// import { Tag } from 'lucide-react';
// import { useState } from 'react';
// import { Box } from 'lucide-react';
// import InputField from '../../components/Inputs/InputField';

// import "../../styles/pages/management-pages.css"

// const AddOrganization = () => {
//   const [FormData, setFormData] = useState({
//     organization_name: "",
//     organization_devices: ""
//   });


//     const devices = [  "Freezer Temperature",
//       "Smart Thermostat",
//       "Refrigerator Sensor",
//       "Power Meter",
//       "Humidity Controller",
//       "Smart Lock",
//       "Smoke Detector"]

//   const onchange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...FormData, [name]: value });
//   };

//   const handleSubmit=(e)=>{
//     e.preventDefault();
//     // Backend developer will implement logic here
//   }


//   return (
//     <div className="AddingPage organization-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]"> 
//       <h2 className="organization-add-title font-semibold mb-1 text-center">Add Organization</h2>
//       <p className="organization-add-subtitle text-gray-500 mb-6 text-center">Welcome back! Select method to add organization</p>

//       <div className="organization-add-form space-y-4 max-w-sm mx-auto w-full">
//         {/* Organization Name Input */}
//         <InputField
//           id="organization_name"
//           name="organization_name"
//           label="Organization Name"
//           type="text"
//           value={FormData.organization_name}
//           onchange={onchange}
//           placeholder="Organization Name"
//           icon={<Box size={20} />}
//         />

//         {/* Device Select */}
//         <div className="relative">
//           <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//           {/* <select
//             name="organization_devices"
//             className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${FormData.organization_devices ? 'text-black' : 'text-gray-500'}`}
//             value={FormData.organization_devices}
//             onChange={(e) => {
//               const { value } = e.target;
//               setFormData({
//                 ...FormData,
//                 organization_devices: value,
//               });
//             }}
//           >
//             <option value="">Add Devices</option>
//             <option value="device1">Device 1</option>
//             <option value="device2">Device 2</option>
//             <option value="device3">Device 3</option>
//           </select> */}

           

//  <select
//         name="organization_devices"
//         className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${FormData.organization_devices ? 'text-black' : 'text-gray-500'}`}
//         value={FormData.organization_devices}
//         onChange={(e) =>
//           setFormData({
//             ...FormData,
//             organization_devices: e.target.value,
//           })
//         }
//       >
//         <option value="">Add Devices</option>
//         {devices.map((device, index) => (
//           <option key={index} value={device}>
//             {device}
//           </option>
//         ))}
//       </select>
          
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           onClick={handleSubmit}
//           className="w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddOrganization;












// src/pages/Organization/AddOrganization.jsx
import { Tag, Box } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/Inputs/InputField";
import Swal from "sweetalert2";
import { createOrganization, fetchAllOrganizations } from "../../slices/OrganizationSlice";
import "../../styles/pages/management-pages.css";
import { useStore } from "../../contexts/storecontexts";

const AddOrganization = () => {
  const {user}  = useStore()
  const [formData, setFormData] = useState({
    organization_name: ""
  });
  const dispatch = useDispatch();
  const { isLoading } = useSelector((s) => s.Organization || { isLoading: false });



  const onchange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = (formData.organization_name || "").trim();
    if (!name) {
      Swal.fire({ icon: "warning", title: "Missing field", text: "Organization name is required." });
      return;
    }

    try {
      // create organization via thunk (thunk reads token from localStorage)
      const created = await dispatch(createOrganization(name)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Organization created",
        text: `Organization "${created?.name || name}" added successfully.`,
      });

      // Clear form
      setFormData({ organization_name: ""});

      // Optional: refresh full list to ensure consistent state
      dispatch(fetchAllOrganizations());
      
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Create failed",
        text: err || "Unable to create organization.",
      });
      console.error("create organization error:", err);
    }
  };

  return (
    <div className="AddingPage organization-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
      <h2 className="organization-add-title font-semibold mb-1 text-center">Add Organization</h2>
      <p className="organization-add-subtitle text-gray-500 mb-6 text-center">
        Welcome back! Select method to add organization
      </p>

      <div className="organization-add-form space-y-4 max-w-sm mx-auto w-full">
        <InputField
          id="organization_name"
          name="organization_name"
          label="Organization Name"
          type="text"
          value={formData.organization_name}
          onchange={onchange}
          placeholder="Organization Name"
          icon={<Box size={20} />}
        />

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddOrganization;
