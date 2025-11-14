import { Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteManager, fetchAllManagers } from '../../slices/ManagerSlice';
import ManagerDeleteModal from '../../components/Modals/ManagerManagement/DeleteModal';
import { setManagerDeleteModalOpen,setManagerEditModalOpen } from '../../slices/ManagerSlice';
import Swal from 'sweetalert2';
import ManagerEditModal from '../../components/Modals/ManagerManagement/EditModal';
import "../../styles/pages/management-pages.css"

const ManagementList = ({ onManagerSelect, selectedManager }) => {

  const [ManagerEmail, setManagerEmail] = useState("")
 const [ManagerID, setManagerID] = useState(null)
 
  const handleDeleteOpen=(ManagerEmail,id)=>{
    dispatch(setManagerDeleteModalOpen(true))
    setManagerEmail(ManagerEmail)
    setManagerID(id)
  }
  const handleDeleteClose=()=>{
    dispatch(setManagerDeleteModalOpen(false))
    setManagerEmail("")
  }

  const handleEditOpen=(id)=>{
    dispatch(setManagerEditModalOpen(true))
    setManagerID(id)
    
  }
  const handleEditClose=()=>{
    dispatch(setManagerEditModalOpen(false))
    setManagerID(null)

  }
const dispatch=useDispatch()  
 const {Managers,ManagerDeleteModalOpen,ManagerEditModalOpen}=useSelector((state)=>state.Manager)

useEffect(()=>{
  dispatch(fetchAllManagers())
},[dispatch])

 const handleDelete=()=>{
   dispatch(DeleteManager(ManagerID)).unwrap().then((res)=>{
    if(res.success){
       dispatch(setManagerDeleteModalOpen(false))
      Swal.fire(res.message,"success")
      dispatch(fetchAllManagers())
     
    }
    
    
    
   })

 

 }
   const handleEdit=()=>{
     // Edit functionality is handled by the modal component
   }

  const handleRowClick = (manager, e) => {
    e.stopPropagation();
    onManagerSelect && onManagerSelect(manager);
  };

  return (
    <>
    <div 
      className="ListPage manager-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB]"
    >
      <h1 className="manager-list-title font-semibold text-gray-800 mb-4">Manager Management</h1>
      <div className="mb-4">
        <h2 className="manager-list-header text-center font-semibold text-gray-800">Manager List</h2>
        <div className="mx-auto mt-2 h-px w-4/5 bg-[#2563EB]/40"></div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="manager-table-header py-2 px-4 font-bold text-gray-800">Email</th>
              <th className="manager-table-header py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
        </table>

        <div className="manager-table-scroll overflow-y-auto pr-1">
          <table className="w-full table-auto text-left">
            <tbody>
              {Managers.map((manager, index) => (
                <tr 
                  key={manager.id || index} 
                  className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
                    selectedManager?.id === manager.id ? 'bg-blue-50 border-blue-300' : ''
                  }`}
                  onClick={(e) => handleRowClick(manager, e)}
                >
                  <td className="manager-table-cell py-2 sm:py-3 px-2 sm:px-4">{index + 1}. {manager.email}</td>
                  <td className="manager-table-cell py-2 sm:py-3 px-2 sm:px-4">
                    <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => handleEditOpen(manager.id)} className="manager-action-btn rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50">
                        <Pencil className="text-green-600 manager-action-icon" />
                      </button>
                      <button onClick={() => handleDeleteOpen(manager.email, manager.id)} className="manager-action-btn rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50">
                        <Trash className="text-red-600 manager-action-icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {ManagerDeleteModalOpen && <ManagerDeleteModal ManagerEmail={ManagerEmail} handleClose={handleDeleteClose} handleDelete={handleDelete} />}
    {ManagerEditModalOpen && <ManagerEditModal handleClose={handleEditClose} id={ManagerID} />}
    </>
  );
};

export default ManagementList;
