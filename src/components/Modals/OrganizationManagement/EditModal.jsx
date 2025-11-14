// import * as React from 'react';
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   FormControl,
//   InputLabel,
//   Select,
//   OutlinedInput,
//   MenuItem,
//   Checkbox,
//   ListItemText,
//   Stack,
// } from '@mui/material';
// import { Tag } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchALlDevices } from '../../../slices/DeviceSlice';
// import InputField from '../../Inputs/InputField';
// import { useStore } from '../../../contexts/storecontexts';

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

// export default function OrganizationEditModal({ open, handleClose, organizationName,handleEdit ,organizationId}) {
//   const dispatch = useDispatch();
//   const { DeviceArray } = useSelector((state) => state.Device);
//   const [selectedDevices, setSelectedDevices] = React.useState([]);
//   const [orgName, setOrgName] = React.useState(organizationName || '');
// const token=localStorage.getItem('token')

//   // Fetch all devices once
//   React.useEffect(() => {
//     dispatch(fetchALlDevices());
//   }, [dispatch]);

//   // Fetch specific organization when modal opens
//   React.useEffect(() => {
//     if (open) {
//       fetchSpecificOrganization();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open, organizationId]);

//   const fetchSpecificOrganization = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/organization/fetch/specific`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' ,
//            'Authorization':`Bearer ${token}`
//         },
//         body: JSON.stringify({ id: organizationId }),
//       });
//       const data = await res.json();
//       const existingDeviceIds = data.organizationDevices?.map((od) => od.device.device_id) || [];
//       setSelectedDevices(existingDeviceIds);
//     } catch (err) {
//       console.error('Failed to fetch specific org', err);
//     }
//   };

//   const handleDeviceChange = (e) => {
//     const {
//       target: { value },
//     } = e;
//     setSelectedDevices(typeof value === 'string' ? value.split(',') : value);
//   };

 
//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={style}>
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Edit Organization Devices
//         </Typography>

//         <InputField
//           label="Organization Name"
//           id="organization_name"
//           name="organization_name"
//           type="text"
//           value={orgName}
//           onchange={(e) => setOrgName(e.target.value)}
//           placeholder="Organization Name"
//           icon={<Box size={18} className="text-gray-400" />}
//         />

//         {/* Device Select */}
//         <FormControl fullWidth sx={{ mt: 2 }}>
//           <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 mr-4" size={20} />
//           <InputLabel id="device-select-label">Select Devices</InputLabel>
//           <Select
//             labelId="device-select-label"
//             multiple
//             value={selectedDevices}
//             onChange={handleDeviceChange}
//             input={<OutlinedInput label="Select Devices" />}
//             renderValue={(selected) => selected.join(', ')}
//           >
//             {DeviceArray.map((device) => (
//               <MenuItem key={device.device_id} value={device.device_id}>
//                 <Checkbox checked={selectedDevices.includes(device.device_id)} />
//                 <ListItemText primary={`(${device.device_id}) ${device.device_brand} (${device.device_venue})`} />
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Buttons */}
//         <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
//           <Button onClick={handleClose} variant="outlined">
//             Cancel
//           </Button>
//         <Button
//   onClick={() => handleEdit(organizationId, selectedDevices)}
//   variant="contained"
//   color="primary"
// >
//   Update
// </Button>

//         </Stack>
//       </Box>
//     </Modal>
//   );
// }



















// // EditModal.jsx
// import * as React from 'react';
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   FormControl,
//   InputLabel,
//   Select,
//   OutlinedInput,
//   MenuItem,
//   Checkbox,
//   ListItemText,
//   Stack,
// } from '@mui/material';
// import { Tag } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchALlDevices } from '../../../slices/DeviceSlice';
// import InputField from '../../Inputs/InputField';
// import { useStore } from '../../../contexts/storecontexts';

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

// export default function OrganizationEditModal({ open, handleClose, organizationName,handleEdit ,organizationId}) {
//   const dispatch = useDispatch();
//   // const { DeviceArray } = useSelector((state) => state.Device);
//   // const [selectedDevices, setSelectedDevices] = React.useState([]);
//   const [orgName, setOrgName] = React.useState(organizationName || '');
//   const token=localStorage.getItem('token')

//   // Fetch all devices once
//   React.useEffect(() => {
//     dispatch(fetchALlDevices());
//   }, [dispatch]);

//   // Fetch specific organization when modal opens
//   React.useEffect(() => {
//     if (open) {
//       fetchSpecificOrganization();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open, organizationId]);

 
//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={style}>
//         <Typography variant="h6" fontWeight="bold" mb={2}>
//           Edit Organization Devices
//         </Typography>

//         <InputField
//           label="Organization Name"
//           id="organization_name"
//           name="organization_name"
//           type="text"
//           value={orgName}
//           onchange={(e) => setOrgName(e.target.value)}
//           placeholder="Organization Name"
//           icon={<Box size={18} className="text-gray-400" />}
//         />


//         {/* Buttons */}
//         <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
//           <Button onClick={handleClose} variant="outlined">
//             Cancel
//           </Button>
//         <Button
//   onClick={() => handleEdit(organizationId)}
//   variant="contained"
//   color="primary"
// >
//   Update
// </Button>

//         </Stack>
//       </Box>
//     </Modal>
//   );
// }





// src/components/Modals/OrganizationManagement/EditModal.jsx
import React from "react";
import { Box, Button, Typography, Modal, Stack } from "@mui/material";
import InputField from "../../Inputs/InputField";

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

export default function OrganizationEditModal({
  open,
  handleClose,
  organizationName = "",
  handleEdit,
  organizationId,
}) {
  const [orgName, setOrgName] = React.useState(organizationName || "");

  // Sync when modal opens or organizationName changes
  React.useEffect(() => {
    if (open) setOrgName(organizationName || "");
  }, [open, organizationName]);

  const onUpdate = () => {
    const trimmed = (orgName || "").trim();
    if (!trimmed) {
      // optionally show a nicer toast
      return;
    }
    handleEdit && handleEdit(organizationId, trimmed);
  };

  return (
    <Modal open={!!open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Edit Organization
        </Typography>

        <InputField
          label="Organization Name"
          id="organization_name"
          name="organization_name"
          type="text"
          value={orgName}
          onchange={(e) => setOrgName(e.target.value)}
          placeholder="Organization Name"
          icon={<Box size={18} className="text-gray-400" />}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={onUpdate} variant="contained" color="primary">
            Update
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}


