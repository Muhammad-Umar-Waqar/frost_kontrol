// import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

// // TODO: Backend developer will implement organization fetching
// export const fetchAllOrganizations = createAsyncThunk(
//   "Organizations/fetchAll",
//   async (token, { rejectWithValue }) => {
//     // Static placeholder - Backend developer should replace with API call
//     // Example:
//     // const response = await fetch(`${YOUR_API_URL}/organization/fetch/all`, {
//     //   method: 'GET',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     'Authorization': `Bearer ${token}`
//     //   }
//     // });
//     // return await response.json();
//     return { organizations: [] };
//   }
// );


// const OrganizationSlice=createSlice(
//     {
//         name:'Organization',
//         initialState:{
//             Organizations:[],
//             isLoading:false,
//             error:null
//         },
//         reducers:{
//             setOrganizations:(state,action)=>{
//                 state.Organizations=action.payload
//             }
//         },
//         extraReducers:(builder)=>{
//             builder.addCase(fetchAllOrganizations.pending,(state)=>{
                
//                 state.isLoading=true;
//                 state.error=null
//             })
//             builder.addCase(fetchAllOrganizations.fulfilled,(state,action)=>{
//                 console.log("fetch all organization",action.payload);
                
//                 state.isLoading=false;
//                 // Handle different response structures
//                 if (action.payload && action.payload.organizations) {
//                     state.Organizations = action.payload.organizations;
//                 } else if (Array.isArray(action.payload)) {
//                     state.Organizations = action.payload;
//                 } else {
//                     state.Organizations = [];
//                 }
//                 state.error = null;
//             })
//             builder.addCase(fetchAllOrganizations.rejected,(state,action)=>{
//                 console.log("error organization",action.payload);
                
//                 state.isLoading=false;
//                 state.error=action.payload || "Some Error Occur"
//                 state.Organizations=[]
//             })

//         }
//     }
// )
// export const {setOrganizations}=OrganizationSlice.actions
// export default OrganizationSlice.reducer
















// // OrganizationSlice
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Fetch all organizations with token from StoreContext or localStorage
// export const fetchAllOrganizations = createAsyncThunk(
//   "Organizations/fetchAll",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       // Get token from Redux state (if stored) or fallback to localStorage
//       const tokenFromState = getState().auth?.token; // Optional: if you store token in Redux
//       const token = tokenFromState || localStorage.getItem("token");

//       console.log("TOKEN FRP< ORGANIZATION SLICE", token)


//       if (!token) {
//         console.log("TOKEN NOT PRESENT")
//         return rejectWithValue("No authentication token found");
//       }

//       const response = await fetch(`http://localhost:5050/organization/all-org`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(data.message || "Failed to fetch organizations");
//       }

//       return data;
//     } catch (error) {
//       console.error("Fetch Organizations Error:", error);
//       return rejectWithValue(error.message || "Something went wrong");
//     }
//   }
// );

// const OrganizationSlice = createSlice({
//   name: "Organization",
//   initialState: {
//     Organizations: [],
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     setOrganizations: (state, action) => {
//       state.Organizations = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllOrganizations.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllOrganizations.fulfilled, (state, action) => {
//         state.isLoading = false;
//         // Support multiple backend response formats
//         if (action.payload && action.payload.organizations) {
//           state.Organizations = action.payload.organizations;
//         } else if (Array.isArray(action.payload)) {
//           state.Organizations = action.payload;
//         } else {
//           state.Organizations = [];
//         }
//         state.error = null;
//       })
//       .addCase(fetchAllOrganizations.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || "Some error occurred";
//         state.Organizations = [];
//       });
//   },
// });

// export const { setOrganizations } = OrganizationSlice.actions;
// export default OrganizationSlice.reducer;









// src/slices/OrganizationSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// // fetch all orgs (unchanged)
// export const fetchAllOrganizations = createAsyncThunk(
//   "Organizations/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return rejectWithValue("No authentication token found");

//       const res = await fetch(`${BASE}/organization/all-org`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       if (!res.ok) return rejectWithValue(data.message || "Failed to fetch organizations");
//       // backend returns array of orgs
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// // create organization
// export const createOrganization = createAsyncThunk(
//   "Organizations/create",
//   async (name, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return rejectWithValue("No authentication token found");

//       const res = await fetch(`${BASE}/organization/new-org`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ name }),
//       });

//       const data = await res.json();
//       if (!res.ok) return rejectWithValue(data.message || "Failed to create organization");

//       // backend returns { message, organization }
//       return data.organization;
//     } catch (err) {
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// const OrganizationSlice = createSlice({
//   name: "Organization",
//   initialState: {
//     Organizations: [],
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     setOrganizations(state, action) {
//       state.Organizations = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // fetch
//       .addCase(fetchAllOrganizations.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllOrganizations.fulfilled, (state, action) => {
//         state.isLoading = false;
//         // action.payload expected to be array
//         state.Organizations = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(fetchAllOrganizations.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || action.error?.message || "Some error occurred";
//         state.Organizations = [];
//       })

//       // create
//       .addCase(createOrganization.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(createOrganization.fulfilled, (state, action) => {
//         state.isLoading = false;
//         // add the created org at the top (or push)
//         state.Organizations = [action.payload, ...state.Organizations];
//       })
//       .addCase(createOrganization.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || action.error?.message || "Failed to create organization";
//       });
//   },
// });

// export const { setOrganizations } = OrganizationSlice.actions;
// export default OrganizationSlice.reducer;





// src/slices/OrganizationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// fetch all orgs
export const fetchAllOrganizations = createAsyncThunk(
  "Organizations/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/organization/all-org`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch organizations");
      // backend returns array of orgs
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// create organization
export const createOrganization = createAsyncThunk(
  "Organizations/create",
  async (name, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/organization/new-org`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to create organization");

      // backend returns { message, organization }
      return data.organization;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// update organization
export const updateOrganization = createAsyncThunk(
  "Organizations/update",
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/organization/update/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to update organization");
      // backend returns updated organization
      return data.organization;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// delete organization
export const deleteOrganization = createAsyncThunk(
  "Organizations/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/organization/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to delete organization");
      // backend returns { message, organizationId } or something similar
      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);


export const fetchOrganizationsByUser = createAsyncThunk(
  "Organizations/fetchByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/organization/user/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("DATA FROM ORGNAIZATION SLICE>>", data)
      
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch organizations for user");

      // expected: array of orgs (or whatever your backend returns)
      console.log("Orgs>>", data.organizations);
      return Array.isArray(data) ? data : data.organizations || [];
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);




const OrganizationSlice = createSlice({
  name: "Organization",
  initialState: {
    Organizations: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setOrganizations(state, action) {
      state.Organizations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchAllOrganizations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllOrganizations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Organizations = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllOrganizations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message || "Some error occurred";
        state.Organizations = [];
      })

      // create
      .addCase(createOrganization.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.isLoading = false;
        // push created org at the top
        state.Organizations = [action.payload, ...state.Organizations];
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message || "Failed to create organization";
      })

      // update
      .addCase(updateOrganization.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = action.payload;
           if (updated && updated._id) {
          state.Organizations = state.Organizations.map((org) =>
            String(org._id) === String(updated._id) ? updated : org
          );
        }
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message || "Failed to update organization";
      })

      // delete
      .addCase(deleteOrganization.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.isLoading = false;
        const removedId = action.payload;
        state.Organizations = state.Organizations.filter((org) => org._id !== removedId);
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message || "Failed to delete organization";
      })
      .addCase(fetchOrganizationsByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrganizationsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Organizations = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchOrganizationsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message || "Failed to fetch user organizations";
        state.Organizations = [];
      });
      
  },
});

export const { setOrganizations } = OrganizationSlice.actions;
export default OrganizationSlice.reducer;



