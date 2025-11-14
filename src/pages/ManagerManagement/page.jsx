import React, { useState } from 'react'
import ManagementList from './ManagementList'
import AddManagement from './AddManagement'
import "../../styles/pages/management-pages.css"

const ManagerManagement = () => {
  const [selectedManager, setSelectedManager] = useState(null);

  const handleManagerSelect = (manager) => {
    setSelectedManager(manager);
  };

  const handleOutsideClick = () => {
    setSelectedManager(null);
  };

  return (
  <div className="MobileBackgroundChange manager-management-container md:h-full bg-white rounded-[20px] w-full h-full" onClick={handleOutsideClick}>
      <div className="MobileResponsivePageLayout shadow-md flex flex-col lg:flex-row gap-2 lg:gap-0 h-full w-full rounded-[20px]">
        <ManagementList className="ListPage manager-list-section"
          onManagerSelect={handleManagerSelect} 
          selectedManager={selectedManager} 
        />
        <div className="hidden lg:block w-px bg-[#E5E7EB]"></div>
        <AddManagement className="AddPage manager-add-section" selectedManager={selectedManager} />
      </div>
      
    </div>
  )
}

export default ManagerManagement
