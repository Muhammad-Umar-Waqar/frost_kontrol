// import React, { useEffect } from 'react'
// import { useStore } from '../../contexts/storecontexts'
// import { Navigate } from 'react-router'

// export const Logout = () => {
//     const {LogoutTrue}=useStore()
//     useEffect(()=>{
//         LogoutTrue()
//         window.location.reload()
//     },[LogoutTrue])
    
//   return <Navigate to={'/'} />
   
// }

// export default Logout


// src/pages/Authentication/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../contexts/storecontexts";

const Logout = () => {
  const { LogoutTrue } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await LogoutTrue(true);
      navigate("/");
    })();
  }, []);

  return null;
};

export default Logout;
