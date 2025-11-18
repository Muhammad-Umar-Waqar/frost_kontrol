// import { Pencil, Trash } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Swal from 'sweetalert2';
// import { fetchAllOrganizations } from '../../slices/OrganizationSlice';
// import OrganizationDeleteModal from '../../components/Modals/OrganizationManagement/DeleteModal';
// import OrganizationEditModal from '../../components/Modals/OrganizationManagement/EditModal';


// import "../../styles/pages/management-pages.css"
// const OrganizationList = ({ onOrganizationSelect, selectedOrganization }) => {

 
//  const [DeleteOpen, setDeleteOpen] = useState(false)
//  const [EditOpen, setEditOpen] = useState(false)
//   const [organizationName, setOrganizationName] = useState("")
//    const {Organizations}=useSelector((state)=>state.Organization)
//   const [OrganizationId, setOrganizationId] = useState(null)
//   const token=localStorage.getItem('token')

//    const dispatch=useDispatch()
//   useEffect(()=>{
//     if(!token) {
//       console.error('No authentication token found');
//       return;
//     }
//     dispatch(fetchAllOrganizations(token))
//   },[dispatch, token])
// const handleDeleteOpen=(name,id)=>{
//   setDeleteOpen(true)
 
//   setOrganizationName(name)
//   setOrganizationId(id)
  
  


  
// }
// const handleDeleteClose=()=>{
// setDeleteOpen(false)
// }
// const handleEditOpen=(name,id)=>{
//   setEditOpen(true)
//    setOrganizationId(id)
//   setOrganizationName(name)
// }
// const handleEditClose=()=>{
//   setEditOpen(false)
// }
// const handleChange=(e)=>{
//   setOrganizationName(e.target.value)
// }

// const handleDelete = async (id) => {
//   // Delete functionality is handled by the modal component
// }

// const handleEdit = async (orgId, selectedDevices) => {
//   // Edit functionality is handled by the modal component
// }

//   // Dummy data for demonstration
//   const dummyOrganizations = [
//     { id: 1, organization_name: 'Manager 123-123-1' },
//     { id: 2, organization_name: 'Manager 123-123-2' },
//     { id: 3, organization_name: 'Manager 123-123-3' },
//     { id: 4, organization_name: 'Manager 123-123-4' },
//     { id: 5, organization_name: 'Manager 123-123-5' },
//     { id: 6, organization_name: 'Manager 123-123-6' },
//     { id: 7, organization_name: 'Manager 123-123-7' },
//     { id: 8, organization_name: 'Manager 123-123-8' },
//     { id: 9, organization_name: 'Manager 123-123-9' },
//     { id: 10, organization_name: 'Manager 123-123-10' },
//   ];

//   // Use dummy data if no real data is available
//   const displayOrganizations = Organizations?.length > 0 ? Organizations : dummyOrganizations;

//   const handleRowClick = (organization, e) => {
//     e.stopPropagation();
//     onOrganizationSelect(organization);
//   };

//   return (
//     <>
//     <div 
//       className="ListPage organization-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB]"
//     >
//       <h1 className="organization-list-title font-semibold text-gray-800 mb-4">Organization Management</h1>
//       <div className="mb-4">
//         <h2 className="organization-list-header text-center font-semibold text-gray-800">Organization List</h2>
//         <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="organization-table-header py-2 px-4 font-bold text-gray-800">Organization Name</th>
//               <th className="organization-table-header py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="organization-table-scroll overflow-y-auto pr-1">
//           <table className="w-full table-auto text-left">
//             <tbody>
//               {displayOrganizations?.map((org, index) => (
//                 <tr 
//                   key={org.id || index} 
//                   className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                     selectedOrganization?.id === org.id ? 'bg-blue-50 border-blue-300' : ''
//                   }`}
//                   onClick={(e) => handleRowClick(org, e)}
//                 >
//                   <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">{index + 1}. {org.organization_name}</td>
//                   <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
//                     <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                       <button onClick={() => handleEditOpen(org.organization_name, org.id)} className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50">
//                         <Pencil className="text-green-600 organization-action-icon" />
//                       </button>
//                       <button onClick={() => handleDeleteOpen(org.organization_name, org.id)} className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50">
//                         <Trash className="text-red-600 organization-action-icon" />
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
//     {DeleteOpen && <OrganizationDeleteModal open={DeleteOpen} handleClose={handleDeleteClose} handleDelete={handleDelete} organizationId={OrganizationId} organizationName={organizationName}/>}
//     {EditOpen && <OrganizationEditModal open={EditOpen} handleClose={handleEditClose} organizationId={OrganizationId} handleEdit={handleEdit} organizationName={organizationName} handleChange={handleChange}/>}
    
//     </>
//   );
// };

// export default OrganizationList;














// // src/pages/management/OrganizationList.jsx
// import { Pencil, Trash } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import {
//   fetchAllOrganizations,
//   updateOrganization,
//   deleteOrganization,
// } from "../../slices/OrganizationSlice";
// import OrganizationDeleteModal from "../../components/Modals/OrganizationManagement/DeleteModal";
// import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";

// import "../../styles/pages/management-pages.css";

// const OrganizationList = ({ onOrganizationSelect, selectedOrganization }) => {
//   const dispatch = useDispatch();
//   const { Organizations, isLoading, error } = useSelector((state) => state.Organization);

//   const [DeleteOpen, setDeleteOpen] = useState(false);
//   const [EditOpen, setEditOpen] = useState(false);
//   const [organizationName, setOrganizationName] = useState("");
//   const [OrganizationId, setOrganizationId] = useState(null);

//   useEffect(() => {
//     // fetch organizations on mount
//     dispatch(fetchAllOrganizations());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       console.error("Organization error:", error);
//       // optionally show toast
//     }
//   }, [error]);

//   const handleDeleteOpen = (name, id) => {
//     setDeleteOpen(true);
//     setOrganizationName(name);
//     setOrganizationId(id);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setOrganizationId(null);
//     setOrganizationName("");
//   };
//   const handleEditOpen = (name, id) => {
//     setEditOpen(true);
//     setOrganizationId(id);
//     setOrganizationName(name);
//   };
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setOrganizationId(null);
//     setOrganizationName("");
//   };

//   const handleChange = (e) => {
//     setOrganizationName(e.target.value);
//   };

//   // called by modal confirm
//   const handleDelete = async (id) => {
//     try {
//       const result = await dispatch(deleteOrganization(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Organization deleted." });
//       handleDeleteClose();
//       // no need to refetch because reducer removed it
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
//     }
//   };

//   // called by modal confirm with new name or devices
//   const handleEdit = async (orgId, /* selectedDevices placeholder if needed */) => {
//     try {
//       await dispatch(updateOrganization({ id: orgId, name: organizationName })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Organization updated." });
//       handleEditClose();
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
//     }
//   };

//   // show the Organizations from redux. If backend uses `name` property, use that.
//   const displayOrganizations =
//     Organizations && Organizations.length > 0 ? Organizations : [
//       // fallback dummy if you want (optional)
//     ];

//   const handleRowClick = (organization, e) => {
//     e.stopPropagation();
//     onOrganizationSelect?.(organization);
//   };

//   return (
//     <>
//       <div className="ListPage organization-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB]">
//         <h1 className="organization-list-title font-semibold text-gray-800 mb-4">Organization Management</h1>
//         <div className="mb-4">
//           <h2 className="organization-list-header text-center font-semibold text-gray-800">Organization List</h2>
//           <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full table-auto text-left">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="organization-table-header py-2 px-4 font-bold text-gray-800">Organization Name</th>
//                 <th className="organization-table-header py-2 px-4 text-center">Actions</th>
//               </tr>
//             </thead>
//           </table>

//           <div className="organization-table-scroll overflow-y-auto pr-1">
//             <table className="w-full table-auto text-left">
//               <tbody>
//                 {isLoading && <tr><td>Loading organizations...</td></tr>}

//                 {!isLoading && displayOrganizations.map((org, index) => {
//                   // use _id from mongo document
//                   const id = org._id ?? org.id ?? index;
//                   const displayName = org.name ?? org.organization_name ?? `Organization ${index + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         selectedOrganization?._id === id || selectedOrganization?.id === id ? "bg-blue-50 border-blue-300" : ""
//                       }`}
//                       onClick={(e) => handleRowClick(org, e)}
//                     >
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">{index + 1}. {displayName}</td>
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
//                         <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                           <button onClick={() => handleEditOpen(displayName, id)} className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50">
//                             <Pencil className="text-green-600 organization-action-icon" />
//                           </button>
//                           <button onClick={() => handleDeleteOpen(displayName, id)} className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50">
//                             <Trash className="text-red-600 organization-action-icon" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//                 {!isLoading && displayOrganizations.length === 0 && (
//                   <tr><td className="p-4">No organizations found.</td></tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {DeleteOpen && (
//         <OrganizationDeleteModal
//           open={DeleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={() => handleDelete(OrganizationId)}
//           organizationId={OrganizationId}
//           organizationName={organizationName}
//         />
//       )}

//       {EditOpen && (
//         <OrganizationEditModal
//           open={EditOpen}
//           handleClose={handleEditClose}
//           handleEdit={() => handleEdit(OrganizationId)}
//           organizationId={OrganizationId}
//           organizationName={organizationName}
//           handleChange={handleChange}
//         />
//       )}
//     </>
//   );
// };

// export default OrganizationList;



















// // src/pages/management/OrganizationList.jsx
// import { Pencil, Trash } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import {
//   fetchAllOrganizations,
//   updateOrganization,
//   deleteOrganization,
// } from "../../slices/OrganizationSlice";
// import OrganizationDeleteModal from "../../components/Modals/OrganizationManagement/DeleteModal";
// import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";

// import "../../styles/pages/management-pages.css";

// const OrganizationList = ({ onOrganizationSelect, selectedOrganization }) => {
//   const dispatch = useDispatch();
//   const { Organizations, isLoading, error } = useSelector((state) => state.Organization || {});

//   const [DeleteOpen, setDeleteOpen] = useState(false);
//   const [EditOpen, setEditOpen] = useState(false);
//   const [organizationName, setOrganizationName] = useState("");
//   const [OrganizationId, setOrganizationId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchAllOrganizations());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) console.error("Organization error:", error);
//   }, [error]);

//   const handleDeleteOpen = (name, id) => {
//     setDeleteOpen(true);
//     setOrganizationName(name);
//     setOrganizationId(id);
//   };
//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setOrganizationId(null);
//     setOrganizationName("");
//   };
//   const handleEditOpen = (name, id) => {
//     setEditOpen(true);
//     setOrganizationId(id);
//     setOrganizationName(name);
//   };
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setOrganizationId(null);
//     setOrganizationName("");
//   };

//   const handleChange = (e) => {
//     setOrganizationName(e.target.value);
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteOrganization(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Organization deleted." });
//       handleDeleteClose();
//     } catch (err) {
//       console.error("Delete error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
//     }
//   };

//   // Update receives (orgId, newName)
//   const handleEdit = async (orgId, newName) => {
//     try {
//       await dispatch(updateOrganization({ id: orgId, name: newName })).unwrap();
//       Swal.fire({ icon: "success", title: "Updated", text: "Organization updated." });
//       handleEditClose();
//     } catch (err) {
//       console.error("Update error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
//     }
//   };

//   const displayOrganizations = Array.isArray(Organizations) ? Organizations : [];

//   const handleRowClick = (organization, e) => {
//     e.stopPropagation();
//     onOrganizationSelect?.(organization);
//   };

//   return (
//     <>
//       <div className="ListPage organization-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB]">
//         <h1 className="organization-list-title font-semibold text-gray-800 mb-4">Organization Management</h1>
//         <div className="mb-4">
//           <h2 className="organization-list-header text-center font-semibold text-gray-800">Organization List</h2>
//           <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full table-auto text-left">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="organization-table-header py-2 px-4 font-bold text-gray-800">Organization Name</th>
//                 <th className="organization-table-header py-2 px-4 text-center">Actions</th>
//               </tr>
//             </thead>
//           </table>

//           <div className="organization-table-scroll overflow-y-auto pr-1 h-[58vh]">
//             <table className="w-full table-auto text-left">
//               <tbody>
//                 {isLoading && <tr><td>Loading organizations...</td></tr>}

//                 {!isLoading && displayOrganizations.map((org, index) => {
//                   const id = org._id ?? org.id ?? index;
//                   const displayName = org.name ?? org.organization_name ?? `Organization ${index + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         (selectedOrganization?._id === id || selectedOrganization?.id === id) ? "bg-blue-50 border-blue-300" : ""
//                       }`}
//                       onClick={(e) => handleRowClick(org, e)}
//                     >
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">{index + 1}. {displayName}</td>
//                       <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
//                         <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                           <button onClick={() => handleEditOpen(displayName, id)} className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50">
//                             <Pencil className="text-green-600 organization-action-icon" />
//                           </button>
//                           <button onClick={() => handleDeleteOpen(displayName, id)} className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50">
//                             <Trash className="text-red-600 organization-action-icon" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//                 {!isLoading && displayOrganizations.length === 0 && (
//                   <tr><td className="p-4">No organizations found.</td></tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {DeleteOpen && (
//         <OrganizationDeleteModal
//           open={DeleteOpen}
//           handleClose={handleDeleteClose}
//           handleDelete={() => handleDelete(OrganizationId)}
//           organizationId={OrganizationId}
//           organizationName={organizationName}
//         />
//       )}

//       {EditOpen && (
//         <OrganizationEditModal
//           open={EditOpen}
//           handleClose={handleEditClose}
//           handleEdit={handleEdit}                      // <-- pass full handler
//           organizationId={OrganizationId}
//           organizationName={organizationName}
//         />
//       )}
//     </>
//   );
// };

// export default OrganizationList;






// src/pages/management/OrganizationList.jsx
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  fetchAllOrganizations,
  updateOrganization,
  deleteOrganization,
} from "../../slices/OrganizationSlice";
import OrganizationDeleteModal from "../../components/Modals/OrganizationManagement/DeleteModal";
import OrganizationEditModal from "../../components/Modals/OrganizationManagement/EditModal";

import "../../styles/pages/management-pages.css";
import TableSkeleton from "../../components/skeletons/TableSkeleton";

const OrganizationList = ({ onOrganizationSelect, selectedOrganization }) => {
  const dispatch = useDispatch();
  const { Organizations, isLoading, error } = useSelector((state) => state.Organization || {});

  const [DeleteOpen, setDeleteOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [OrganizationId, setOrganizationId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (error) console.error("Organization error:", error);
  }, [error]);

  const handleDeleteOpen = (name, id) => {
    setDeleteOpen(true);
    setOrganizationName(name);
    setOrganizationId(id);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setOrganizationId(null);
    setOrganizationName("");
  };
  const handleEditOpen = (name, id) => {
    setEditOpen(true);
    setOrganizationId(id);
    setOrganizationName(name);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setOrganizationId(null);
    setOrganizationName("");
  };

  const handleChange = (e) => {
    setOrganizationName(e.target.value);
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteOrganization(id)).unwrap();
      Swal.fire({ icon: "success", title: "Deleted", text: "Organization deleted." });
      handleDeleteClose();
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire({ icon: "error", title: "Delete failed", text: err || "Something went wrong" });
    }
  };

  // Update receives (orgId, newName)
  const handleEdit = async (orgId, newName) => {
    try {
      await dispatch(updateOrganization({ id: orgId, name: newName })).unwrap();
      Swal.fire({ icon: "success", title: "Updated", text: "Organization updated." });
      handleEditClose();
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire({ icon: "error", title: "Update failed", text: err || "Something went wrong" });
    }
  };

  const displayOrganizations = Array.isArray(Organizations) ? Organizations : [];

  const handleRowClick = (organization, e) => {
    e.stopPropagation();
    onOrganizationSelect?.(organization);
  };

  return (
    <>
      <div className="ListPage organization-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB]">
        <h1 className="organization-list-title font-semibold text-gray-800 mb-4">Organization Management</h1>
        <div className="mb-4">
          <h2 className="organization-list-header text-center font-semibold text-gray-800">Organization List</h2>
          <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="organization-table-header py-2 px-4 font-bold text-gray-800">Organization Name</th>
                <th className="organization-table-header py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
          </table>

          <div className="organization-table-scroll overflow-y-auto pr-1 h-[58vh]">
            <table className="w-full table-auto text-left">
              <tbody>
                  {isLoading && <TableSkeleton rows={6} />}


            {!isLoading && displayOrganizations.length === 0 && (
              <tr><td className="p-4">No organizations found.</td></tr>
            )}

                {!isLoading && displayOrganizations.map((org, index) => {
                  const id = org._id ?? org.id ?? index;
                  const displayName = org.name ?? org.organization_name ?? `Organization ${index + 1}`;

                  return (
                    <tr
                      key={id}
                      className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
                        (selectedOrganization?._id === id || selectedOrganization?.id === id) ? "bg-blue-50 border-blue-300" : ""
                      }`}
                      onClick={(e) => handleRowClick(org, e)}
                    >
                      <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">{index + 1}. {displayName}</td>
                      <td className="organization-table-cell py-2 sm:py-3 px-2 sm:px-4">
                        <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => handleEditOpen(displayName, id)} className="organization-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 cursor-pointer">
                            <Pencil className="text-green-600 organization-action-icon" />
                          </button>
                          <button onClick={() => handleDeleteOpen(displayName, id)} className="organization-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 cursor-pointer">
                            <Trash className="text-red-600 organization-action-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!isLoading && displayOrganizations.length === 0 && (
                  <tr><td className="p-4">No organizations found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {DeleteOpen && (
        <OrganizationDeleteModal
          open={DeleteOpen}
          handleClose={handleDeleteClose}
          handleDelete={() => handleDelete(OrganizationId)}
          organizationId={OrganizationId}
          organizationName={organizationName}
        />
      )}

      {EditOpen && (
        <OrganizationEditModal
          open={EditOpen}
          handleClose={handleEditClose}
          handleEdit={handleEdit}                      // <-- pass full handler
          organizationId={OrganizationId}
          organizationName={organizationName}
        />
      )}
    </>
  );
};

export default OrganizationList;

