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





// // src/components/OrganizationSelect.jsx
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllOrganizations } from "../../slices/OrganizationSlice";


// export default function OrganizationSelect({ value, onChange, className = "" }) {
//   const dispatch = useDispatch();
//   const { Organizations = [], isLoading: orgLoading } = useSelector((s) => s.Organization || {});
//   const [selected, setSelected] = useState(value ?? "");

//   useEffect(() => {
//     dispatch(fetchAllOrganizations());
//   }, [dispatch]);

//   // default to first organization when list loads
//   useEffect(() => {
//     if ((!selected || selected === "") && Organizations && Organizations.length > 0) {
//       const firstOrg = Organizations[0];
//       const id = String(firstOrg._id ?? firstOrg.id ?? firstOrg);
//       setSelected(id);
//       if (typeof onChange === "function") onChange(id);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [Organizations]);

//   // if parent controls value, update local state
//   useEffect(() => {
//     if (value !== undefined && value !== selected) setSelected(value);
//   }, [value]);

//   const handleChange = (e) => {
//     const id = e.target.value;
//     setSelected(id);
//     if (typeof onChange === "function") onChange(id);
//   };

//   return (
//     <div className={className}>
//       <select
//         value={selected}
//         onChange={handleChange}
//         className="w-full rounded-md border px-3 py-2"
//         disabled={orgLoading}
//       >
//         <option value="">{orgLoading ? "Loading organizations..." : "Select organization"}</option>
//         {Organizations.map((org) => {
//           const id = org._id ?? org.id ?? org;
//           const name = org.name ?? org.organization_name ?? String(id);
//           return (
//             <option key={id} value={String(id)}>
//               {name}
//             </option>
//           );
//         })}
//       </select>
//     </div>
//   );
// }








import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrganizations } from "../../slices/OrganizationSlice";

export default function OrganizationSelect({ value, onChange, className = "" }) {
  const dispatch = useDispatch();
  const { Organizations = [], isLoading: orgLoading } = useSelector((s) => s.Organization || {});

  const [selected, setSelected] = useState(value ?? "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null);

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

  // close on outside click
  useEffect(() => {
    function handleOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleSelect = (orgId) => {
    setSelected(String(orgId));
    if (typeof onChange === "function") onChange(String(orgId));
    setDropdownOpen(false);
  };

  const selectedOrg = Organizations.find((o) => String(o._id ?? o.id ?? o) === String(selected));
  const selectedLabel = orgLoading
    ? "Loading organizations..."
    : selectedOrg
    ? selectedOrg.name ?? selectedOrg.organization_name ?? String(selected)
    : "Select organization";

  return (
    <div className={`w-full ${className}`} ref={containerRef}>
      <div className="grid grid-cols-3 items-center gap-4 max-w-[65%]">



        <div className="relative col-span-2">
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setDropdownOpen((s) => !s)}
            onClick={() => !orgLoading && setDropdownOpen((s) => !s)}
            className={`sm:rounded-full flex items-center justify-between px-4 py-2 border cursor-pointer bg-white select-none ${
              selectedOrg ? "rounded-full" : "rounded-xl"
            }`}
          >
            <span className="text-gray-600 text-sm truncate max-w-[70%]">{selectedLabel}</span>
            <svg
              className={`w-4 h-4 text-gray-500 ml-2 transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto">
              {orgLoading ? (
                <div className="px-4 py-3 text-sm text-gray-500">Loading organizations...</div>
              ) : Organizations && Organizations.length > 0 ? (
                Organizations.map((org) => {
                  const id = String(org._id ?? org.id ?? org);
                  const name = org.name ?? org.organization_name ?? id;
                  return (
                    <div
                      key={id}
                      onClick={() => handleSelect(id)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm flex items-center justify-between ${
                        String(selected) === id ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className="truncate">{name}</div>
                      {String(selected) === id && (
                        <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">No organizations available</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


