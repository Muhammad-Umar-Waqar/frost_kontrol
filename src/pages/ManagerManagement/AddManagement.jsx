import { Lock, Mail, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import InputField from '../../components/Inputs/InputField';
import PasswordField from '../../components/Inputs/PasswordField';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrganizations } from '../../slices/OrganizationSlice';

import "../../styles/pages/management-pages.css"


export const AddManagement = () => {
  const [FormData, setFormData] = useState({email:"",password:"",organization:"",ChangePassword:false})
  const dispatch=useDispatch()
const token=localStorage.getItem('token')
  const {Organizations}=useSelector((state)=>state.Organization)
  useEffect(()=>{
    dispatch(fetchAllOrganizations(token))
  },[dispatch, token])
  const onchange=(e)=>{
    const {name,value}=e.target
    setFormData({...FormData,[name]:value})

  }
 
  const onsubmit = (e) => {
    e.preventDefault();
    // Backend developer will implement logic here
  }
  
  return (
    <div className="AddingPage manager-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">

      <h2 className="manager-add-title font-semibold mb-1 text-center">Add Manager</h2>
      <p className="manager-add-subtitle text-gray-500 mb-6 text-center">Welcome back! Select method to add manager</p>
         <form onSubmit={onsubmit}>
      <div className="manager-add-form space-y-4 max-w-sm mx-auto w-full">
        
         
            <InputField type="email" name="email" placeholder="Email" onchange={onchange} value={FormData.email} label={"Email"} icon={<Mail/>}/>
                 <PasswordField
  label="password"
  id="password"
  name="password"
  value={FormData.password}
  onchange={onchange}
  placeholder=" password"
  icon={<Lock/>}
/>
                <div className="flex items-center">
  <input
    id="ChangePassword"
    name="ChangePassword"
    type="checkbox"
    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
    checked={FormData.ChangePassword}
    onChange={(e) => {
      const { name, checked } = e.target;
      setFormData({ ...FormData, [name]: checked });
    }}
  />
  <label
    htmlFor="ChangePassword"
    className="ml-3 block text-sm text-slate-500"
  >
    Change Password
  </label>
</div>


        <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                className="w-full pl-10 pr-4 py-2  rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={FormData.organization}
                 onChange={onchange}
                 name='organization'
              >
                {Organizations.map((value)=>(
 <option key={value.organization_name} value={value.organization_name} >{value.organization_name}</option>
                ))}
               
              
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
       <button
             type='submit'
             className="w-full bg-blue-600 mt-16 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded-md transition duration-300 shadow-md"
            >
              Save
            </button>
          
      </div>
        </form>
    </div>
  );
};

export default AddManagement;
