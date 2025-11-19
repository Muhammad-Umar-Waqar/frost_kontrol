// import * as React from 'react';
// import { Box, Button, Typography, Modal, Stack } from '@mui/material';
// import { Lock, Mail } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import InputField from '../../Inputs/InputField';
// import PasswordField from '../../Inputs/PasswordField';
// import Swal from 'sweetalert2';
// import { fetchAllManagers, setManagerEditModalOpen } from '../../../slices/ManagerSlice';
// import { useStore } from '../../../contexts/storecontexts';
// import { useNavigate } from 'react-router';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 500,
//   bgcolor: 'background.paper',
//   borderRadius: '8px',
//   boxShadow: 24,
//   p: 4,
// };

// export default function UserEditModal({ handleClose,id }) {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = React.useState({id:null,current_email:"",updated_email:"",updated_password:""})
//   const {User}=useStore()
//   const navigate=useNavigate()
//   const token=localStorage.getItem('token')
//   const {ManagerEditModalOpen}=useSelector((state)=>state.Manager)

//   const fetchSpecific = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/user/fetch/specific/${id}`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${token}` },
//       });
//       const data=await res.json()
//       setFormData({...formData,id:data.manager.id,current_email:data.manager.email})
//     } catch (err) {
//       console.error('Failed to fetch specific user', err);
//     }
//   };

//   React.useEffect(()=>{
//     if(ManagerEditModalOpen && id){
//       fetchSpecific()
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[ManagerEditModalOpen, id])

//   const handleChange=(e)=>{
//     const {name,value}=e.target;
//     setFormData({...formData,[name]:value})
//   }

//   const handleEdit=async()=>{
//     try {
//       const response=await fetch(`${import.meta.env.VITE_BACKEND_API}/user/update/`,{
//         method:'POST',
//         body:JSON.stringify(formData),
//         headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${token}` }
//       })
//       const data=await response.json()
//       if(data.status==200){
//         dispatch(setManagerEditModalOpen(false))
//         Swal.fire(data.message,'success')
//         if(formData.current_email==User.email){
//           navigate('/logout')
//         }
//         dispatch(fetchAllManagers())
//       } else {
//         Swal.fire({ title:'Error', text:data.message, icon:'error', customClass:{ popup:'zindex-fix' }})
//       }
//     } catch (error) {
//       Swal.fire({ title:'Error', text:'Internal Server Error', icon:'error', customClass:{ popup:'zindex-fix' }})
//     }
//   }

//   return (
//     <Modal open={ManagerEditModalOpen} onClose={handleClose}>
//       <Box sx={style}>
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Edit User
//         </Typography>

//         <InputField
//           label="Current Email"
//           id="Current_Email"
//           name="current_email"
//           type="email"
//           value={formData.current_email}
//           disabled={true}
//           placeholder="Current Email"
//           icon={<Mail size={18} className="text-gray-400" />}
//         />
//         <InputField
//           label="Updated Email"
//           id="Updated_Email"
//           name="updated_email"
//           type="email"
//           value={formData.updated_email}
//           onchange={handleChange}
//           placeholder="Enter updated email"
//           icon={<Mail size={18} className="text-gray-400" />}
//         />
//         <PasswordField
//           label="password"
//           id="password"
//           name="updated_password"
//           value={formData.updated_password}
//           onchange={handleChange}
//           placeholder=" password"
//           icon={<Lock/>}
//         />

//         <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
//           <Button onClick={handleClose} variant="outlined">Cancel</Button>
//           <Button onClick={handleEdit} variant="contained" color="primary">Update</Button>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// }






// src/components/Modals/UserManagement/EditModal.jsx
import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Stack,
  MenuItem,
  TextField,
} from "@mui/material";
import { Lock, Mail, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../Inputs/InputField";
import PasswordField from "../../Inputs/PasswordField";
import Swal from "sweetalert2";
import {
  fetchAllManagers,
  UpdateManager,
  setManagerEditModalOpen,
} from "../../../slices/ManagerSlice";
import { fetchAllOrganizations } from "../../../slices/OrganizationSlice";
import { useStore } from "../../../contexts/storecontexts";
import { useNavigate } from "react-router";
import './EditModalStyle.css'
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function UserEditModal({ handleClose, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { User } = useStore();

  const { ManagerEditModalOpen, Managers, isLoading } = useSelector(
    (s) => s.Manager || {}
  );
  const { Organizations = [] } = useSelector(
    (s) => s.Organization || {}
  );

  const [formData, setFormData] = React.useState({
    id: null,
    name: "",
    current_email: "",
    updated_email: "",
    updated_password: "",
    organizationId: "",
  });

  // Ensure organizations are loaded
  React.useEffect(() => {
    dispatch(fetchAllOrganizations());
  }, [dispatch]);

  // Populate form from Managers redux state. If manager not found, fetch managers.
  React.useEffect(() => {
    if (!ManagerEditModalOpen || !id) return;

    const mgr = (Managers || []).find((m) => String(m._id) === String(id));
    if (mgr) {
      // organization might be populated object or id
      const orgId =
        mgr.organization && typeof mgr.organization === "object"
          ? mgr.organization._id || mgr.organization.id
          : mgr.organization || "";

          console.log("orgId>", orgId, "MGR_ID>>", mgr.organization._id)

      setFormData({
        id: mgr._id,
        name: mgr.name || "",
        current_email: mgr.email || "",
        updated_email: "",
        updated_password: "",
        organizationId: orgId,
      });
    } else {
      // fallback: fetch managers and let the effect re-run when Managers updates
      dispatch(fetchAllManagers()).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ManagerEditModalOpen, id, Managers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const closeModal = () => {
    dispatch(setManagerEditModalOpen(false));
    handleClose && handleClose();
  };

  const handleUpdate = async () => {
    // basic validation
    if (!formData.name || !formData.organizationId) {
      return Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Name and Organization are required.",
      });
    }

    // If password provided, you may optionally add more validation here (length/complexity).
    try {
      const payload = {
        id: formData.id,
        name: formData.name,
        // only include optional fields if they were filled
        email: formData.updated_email !== "" ? formData.updated_email : undefined,
        password:
          formData.updated_password && formData.updated_password.length > 0
            ? formData.updated_password
            : undefined,
        organization: formData.organizationId,
      };

      const updated = await dispatch(UpdateManager(payload)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "User updated successfully.",
      });

      // close modal
      closeModal();

      // If admin updated themself (by id or current_email), force logout so tokens/session refresh
      if (User && (String(User._id) === String(updated._id) || User.email === formData.current_email)) {
        navigate("/logout");
        return;
      }

      // No manual page refresh required — reducer replaced the user in Managers.
      // If you want to be extra safe, you may re-fetch:
      // dispatch(fetchAllManagers());
    } catch (err) {
      const message = err || "Failed to update user";
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: message,
        customClass: { container: "swal2-topmost" },
      });
    }
  };

  return (
    <Modal
      open={!!ManagerEditModalOpen}
      onClose={() => { closeModal(); }}
    >
      <Box sx={style}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Edit User
        </Typography>

        <InputField
          label="Current Email"
          id="Current_Email"
          name="current_email"
          type="email"
          value={formData.current_email}
          disabled={true}
          placeholder="Current Email"
          icon={<Mail size={18} className="text-gray-400" />}
        />

        <InputField
          label="Name"
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onchange={handleChange}
          placeholder="Full name"
          icon={<User2 size={18} className="text-gray-400" />}
        />

        <InputField
          label="Updated Email (optional)"
          id="Updated_Email"
          name="updated_email"
          type="email"
          value={formData.updated_email}
          onchange={handleChange}
          placeholder="Enter updated email (leave blank to keep)"
          icon={<Mail size={18} className="text-gray-400" />}
        />

        <PasswordField
          label="New Password (optional)"
          id="password"
          name="updated_password"
          value={formData.updated_password}
          onchange={handleChange}
          placeholder="Enter new password (leave blank to keep)"
          icon={<Lock size={18} className="text-gray-400"/>}
        />

        <TextField
          select
          fullWidth
          label="Organization"
          name="organizationId"
          value={formData.organizationId || ""}
          onChange={handleChange}
          sx={{ mt: 2 }}
        >
          <MenuItem value="">Select Organization</MenuItem>
          {(Organizations || []).map((org) => (
            <MenuItem key={org._id || org.id} value={org._id || org.id}>
              {org.name}
            </MenuItem>
          ))}
        </TextField>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button onClick={closeModal} variant="outlined" disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}








// // src/components/Modals/UserManagement/EditModal.jsx
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import InputField from "../../Inputs/InputField";
// import { fetchAllOrganizations } from "../../../slices/OrganizationSlice";
// import {  fetchAllManagers } from "../../../slices/ManagerSlice";
// import { User, Mail } from "lucide-react";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// const UserEditModal = ({ id, handleClose }) => {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("token");
//   const { Managers } = useSelector((state) => state.Manager);
//   const { Organizations = [] } = useSelector((state) => state.Organization || { Organizations: [] });

//   const existingUser = Managers.find((u) => u._id === id);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     organizationId: "",
//   });

//   useEffect(() => {
//     dispatch(fetchAllOrganizations());
//   }, [dispatch]);

//   useEffect(() => {
//     if (existingUser) {
//       setFormData({
//         name: existingUser.name || "",
//         email: existingUser.email || "",
//         organizationId: existingUser.organizationId?._id || "",
//       });
//     }
//   }, [existingUser]);

//   const onchange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${BASE}/users/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           organizationId: formData.organizationId,
//         }),
//       });

//       const data = await res.json().catch(() => ({}));

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Updated",
//           text: data.message || "User updated successfully",
//         });
//         dispatch(fetchAllManagers());
//         handleClose();
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: data.message || "Failed to update user",
//         });
//       }
//     } catch (err) {
//       console.error("Update user error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Something went wrong while updating user",
//       });
//     }
//   };

//   return (


 


//     <div className="modal-overlay fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="modal-content bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
//         <h2 className="text-lg font-semibold mb-4">Edit User</h2>
//         <form onSubmit={handleUpdate} className="space-y-4">
//           <InputField
//             label="Name"
//             name="name"
//             type="text"
//             value={formData.name}
//             onchange={onchange}
//             icon={<User />}
//           />
//           <InputField
//             label="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onchange={onchange}
//             icon={<Mail />}
//           />

//           <div className="relative">
//             <label className="block text-sm font-medium mb-1">Select Organization</label>
//             <select
//               name="organizationId"
//               value={formData.organizationId}
//               onChange={onchange}
//               className={`w-full border rounded-md px-3 py-2 ${
//                 formData.organizationId ? "text-black" : "text-gray-500"
//               }`}
//             >
//               <option value="">Select Organization</option>
//               {(Organizations || []).map((o) => (
//                 <option key={o._id || o.id} value={o._id || o.id}>
//                   {o.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex justify-end gap-3 pt-3">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserEditModal;









// // src/components/Modals/UserManagement/EditModal.jsx
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import {
//   Modal,
//   Box,
//   Typography,
//   Button,
//   Stack,
//   MenuItem,
//   TextField,
// } from "@mui/material";
// import InputField from "../../Inputs/InputField";
// import { Mail, User } from "lucide-react";
// import { fetchAllOrganizations } from "../../../slices/OrganizationSlice";
// import { fetchAllManagers } from "../../../slices/ManagerSlice";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   borderRadius: "12px",
//   boxShadow: 24,
//   p: 4,
// };

// const UserEditModal = ({ id, ManagerEditModalOpen, handleClose }) => {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("token");
//   const { Managers } = useSelector((state) => state.Manager);
//   const { Organizations = [] } = useSelector((state) => state.Organization || { Organizations: [] });

//   console.log("USER EDIT MODAL:")
//   const existingUser = Managers.find((u) => u._id === id);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     organizationId: "",
//   });

//   useEffect(() => {
//     dispatch(fetchAllOrganizations());
//   }, [dispatch]);

//   useEffect(() => {
//     if (existingUser) {
//       setFormData({
//         name: existingUser.name || "",
//         email: existingUser.email || "",
//         organizationId: existingUser.organizationId?._id || "",
//       });
//     }
//   }, [existingUser]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${BASE}/users/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           organizationId: formData.organizationId,
//         }),
//       });

//       const data = await res.json().catch(() => ({}));

//       if (res.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Updated",
//           text: data.message || "User updated successfully",
//         });
//         dispatch(fetchAllManagers());
//         handleClose();
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: data.message || "Failed to update user",
//         });
//       }
//     } catch (err) {
//       console.error("Update user error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Something went wrong while updating user",
//       });
//     }
//   };

//   return (
//     <Modal open={ManagerEditModalOpen} onClose={handleClose}>
//       <Box sx={style}>
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Edit User
//         </Typography>

//         <form onSubmit={handleUpdate}>
//           <InputField
//             label="Name"
//             id="name"
//             name="name"
//             type="text"
//             value={formData.name}
//             onchange={handleChange}
//             placeholder="Enter user name"
//             icon={<User size={18} className="text-gray-400" />}
//           />

//           <InputField
//             label="Email"
//             id="email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onchange={handleChange}
//             placeholder="Enter user email"
//             icon={<Mail size={18} className="text-gray-400" />}
//           />

//           <TextField
//             select
//             fullWidth
//             label="Select Organization"
//             name="organizationId"
//             value={formData.organizationId}
//             onChange={handleChange}
//             sx={{ mt: 2 }}
//           >
//             <MenuItem value="">Select Organization</MenuItem>
//             {(Organizations || []).map((o) => (
//               <MenuItem key={o._id || o.id} value={o._id || o.id}>
//                 {o.name}
//               </MenuItem>
//             ))}
//           </TextField>

//           <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
//             <Button onClick={handleClose} variant="outlined">
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" color="primary">
//               Update
//             </Button>
//           </Stack>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default UserEditModal;
