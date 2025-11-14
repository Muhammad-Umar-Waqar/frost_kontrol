// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllOrganizations } from "../../slices/OrganizationSlice";


// function OrganizatoinSelect() {
//     const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
//     const getToken = () => localStorage.getItem("token");
//     const dispatch = useDispatch();
    
//     const { Organizations = [], isLoading: orgLoading } = useSelector((s) => s.Organization || {});
      
//     // local UI state
//     const [selectedOrgId, setSelectedOrgId] = useState("");

//     useEffect(() => {
//         dispatch(fetchAllOrganizations());
//       }, [dispatch]);

//     // --- when organizations arrive, default-select first organization
//     useEffect(() => {
//         if (!selectedOrgId && Organizations && Organizations.length > 0) {
//         const firstOrg = Organizations[0];
//         setSelectedOrgId(String(firstOrg._id ?? firstOrg.id ?? firstOrg));
//         }
//     }, [Organizations, selectedOrgId]);


//       // UI helpers
//   const onOrgChange = (e) => {
//     setSelectedOrgId(e.target.value);
//     // selectedVenueId will be set by fetchVenuesByOrg's default behavior
//   };

//     // small helper to show messages if no orgs/venues present
//     useEffect(() => {
//       if (!orgLoading && Organizations?.length === 0) {
//         // Not necessarily an error; but show friendly hint once after load
//         // (commented out — uncomment if you want an alert)
//         // Swal.fire("No organizations", "You don't have any organizations yet.", "info");
//       }
//     }, [orgLoading, Organizations]);



//   return (
//     <div>
//            <select
//               value={selectedOrgId}
//               onChange={onOrgChange}
//               className="w-full rounded-md border px-3 py-2"
//             >
//               <option value="">Select organization</option>
//               {Organizations.map((org) => (
//                 <option key={org._id ?? org.id} value={String(org._id ?? org.id)}>
//                   {org.name ?? org.organization_name ?? org._id}
//                 </option>
//               ))}
//             </select>
//     </div>
//   )
// }

// export default OrganizatoinSelect





// src/components/OrganizationSelect.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrganizations } from "../../slices/OrganizationSlice";


export default function OrganizationSelect({ value, onChange, className = "" }) {
  const dispatch = useDispatch();
  const { Organizations = [], isLoading: orgLoading } = useSelector((s) => s.Organization || {});
  const [selected, setSelected] = useState(value ?? "");

  useEffect(() => {
    dispatch(fetchAllOrganizations());
  }, [dispatch]);

  // default to first organization when list loads
  useEffect(() => {
    if ((!selected || selected === "") && Organizations && Organizations.length > 0) {
      const firstOrg = Organizations[0];
      const id = String(firstOrg._id ?? firstOrg.id ?? firstOrg);
      setSelected(id);
      if (typeof onChange === "function") onChange(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Organizations]);

  // if parent controls value, update local state
  useEffect(() => {
    if (value !== undefined && value !== selected) setSelected(value);
  }, [value]);

  const handleChange = (e) => {
    const id = e.target.value;
    setSelected(id);
    if (typeof onChange === "function") onChange(id);
  };

  return (
    <div className={className}>
      <select
        value={selected}
        onChange={handleChange}
        className="w-full rounded-md border px-3 py-2"
        disabled={orgLoading}
      >
        <option value="">{orgLoading ? "Loading organizations..." : "Select organization"}</option>
        {Organizations.map((org) => {
          const id = org._id ?? org.id ?? org;
          const name = org.name ?? org.organization_name ?? String(id);
          return (
            <option key={id} value={String(id)}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

