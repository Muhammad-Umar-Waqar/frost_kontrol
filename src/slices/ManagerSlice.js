// import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// const token=localStorage.getItem('Jwt Token')
// // TODO: Backend developer will implement manager fetching
// export const fetchAllManagers = createAsyncThunk(
//     "Manager/fetchAll",
//     async(_,{rejectWithValue})=>{
//         // Static placeholder - Backend developer should replace with API call
//         // const response = await fetch(`${YOUR_API_URL}/user/fetch/all/managers`, {
//         //   method: 'GET',
//         //   headers: {
//         //     'Content-Type': 'application/json',
//         //     'Authorization': `Bearer ${token}`
//         //   }
//         // });
//         // return await response.json();
//         return { managers: [] };
//     }
// )

// // TODO: Backend developer will implement manager deletion
// export const DeleteManager = createAsyncThunk(
//   "User/delete",
//   async ( id , { rejectWithValue }) => {
//     // Static placeholder - Backend developer should replace with API call
//     // const response = await fetch(`${YOUR_API_URL}/user/delete`, {
//     //   method: 'POST',
//     //   body: JSON.stringify({ id }),
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     'Authorization': `Bearer ${token}`
//     //   }
//     // });
//     // return await response.json();
//     return { success: true, message: 'Manager deleted (placeholder)' };
//   }
// );


// const ManagerSlice=createSlice({
//     name:'Manager',
//     initialState:{
//         isLoading:false,
//         error:null,
//         Managers:[],
//         ManagerDeleteModalOpen:false,
//         ManagerEditModalOpen:false

//     },
//     reducers:{
//         setManagers:(state,action)=>{
//             state.Managers=action.payload
//         },
//         setManagerDeleteModalOpen:(state,action)=>{
//           state.ManagerDeleteModalOpen=action.payload
//         },
//         setManagerEditModalOpen:(state,action)=>{
//           state.ManagerEditModalOpen=action.payload
//         }
//     },
//     extraReducers:(builder)=>{
//         builder.addCase(fetchAllManagers.pending,(state)=>{
//             state.isLoading=true
//             state.error=null
//         })
//         builder.addCase(fetchAllManagers.fulfilled,(state,action)=>{
//             state.isLoading=false
//             console.log("action",action.payload);
            
//              state.Managers=action.payload.managers
//         })
//         builder.addCase(fetchAllManagers.rejected,(state,action)=>{
//             state.isLoading=false
//             state.error=action.payload.error.message || "Failed to fetch Managers"
//         })
//         builder.addCase(DeleteManager.pending,(state)=>{
//             state.isLoading=true;
//             state.error=null
//         })
//         builder.addCase(DeleteManager.fulfilled,(state,action)=>{
//             state.isLoading=false;
//             // console.log("manager fulfilled",action.payload);
//             // state.ManagerDeleteModalOpen=false
//             //  Swal.fire(action.payload.message,"success")
            
           
            
            
//         })
//       builder.addCase(DeleteManager.rejected, (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload || "Failed to delete manager";
//   console.log("manager rejected", action.payload); // Now this will be string or message
// });

//     }
// })

// export const {setManagers,setManagerDeleteModalOpen,setManagerEditModalOpen}=ManagerSlice.actions
// export default ManagerSlice.reducer












// src/slices/ManagerSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// /**
//  * Fetch all users (managers)
//  * Endpoint: GET ${BASE}/user/all
//  */
// export const fetchAllManagers = createAsyncThunk(
//   "Manager/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return rejectWithValue("No auth token available");

//       const res = await fetch(`${BASE}/users/all`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       console.log("DATA FROM MANAGER SLICE: ", data )
//       if (!res.ok) return rejectWithValue(data.message || "Failed to fetch users");
//       // Backend returns an array of users
//       return data;
//     } catch (err) {
//       console.error("fetchAllManagers error:", err);
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// /**
//  * Delete manager (user)
//  * Endpoint: DELETE ${BASE}/user/delete/:id
//  */
// export const DeleteManager = createAsyncThunk(
//   "Manager/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return rejectWithValue("No auth token available");

//       const res = await fetch(`${BASE}/user/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       if (!res.ok) return rejectWithValue(data.message || "Failed to delete user");
//       return { id, message: data.message || "Deleted" };
//     } catch (err) {
//       console.error("DeleteManager error:", err);
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );

// const ManagerSlice = createSlice({
//   name: "Manager",
//   initialState: {
//     isLoading: false,
//     error: null,
//     Managers: [],
//     ManagerDeleteModalOpen: false,
//     ManagerEditModalOpen: false,
//   },

//   reducers: {
//     setManagers(state, action) {
//       state.Managers = action.payload;
//     },
//     setManagerDeleteModalOpen(state, action) {
//       state.ManagerDeleteModalOpen = action.payload;
//     },
//     setManagerEditModalOpen(state, action) {
//       state.ManagerEditModalOpen = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // fetchAllManagers
//       .addCase(fetchAllManagers.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllManagers.fulfilled, (state, action) => {
//         state.isLoading = false;
//         // action.payload expected to be array of users
//         state.Managers = Array.isArray(action.payload) ? action.payload : [];
//         state.error = null;
//       })
//       .addCase(fetchAllManagers.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || action.error?.message || "Failed to fetch managers";
//         state.Managers = [];
//       })

//       // DeleteManager
//       .addCase(DeleteManager.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(DeleteManager.fulfilled, (state, action) => {
//         state.isLoading = false;
//         // remove by id
//         state.Managers = state.Managers.filter((m) => m._id !== action.payload.id);
//       })
//       .addCase(DeleteManager.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || action.error?.message || "Failed to delete manager";
//       });
//   },
// });

// export const { setManagers, setManagerDeleteModalOpen, setManagerEditModalOpen } =
//   ManagerSlice.actions;

// export default ManagerSlice.reducer;






// src/slices/ManagerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
const getToken = () => localStorage.getItem("token");

// fetch all managers/users
export const fetchAllManagers = createAsyncThunk(
  "Manager/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/users/all`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch users");
      // backend returns array of users
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// delete manager/user
export const DeleteManager = createAsyncThunk(
  "Manager/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/users/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to delete user");
      return id; // return deleted id to reducer
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// update user profile (name, email, password, organization)
export const UpdateManager = createAsyncThunk(
  "Manager/update",
  async ({ id, name, email, password, organization }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No authentication token found");

      const body = {};
      if (name !== undefined) body.name = name;
      if (email !== undefined) body.email = email;
      if (password !== undefined && password !== "") body.password = password;
      if (organization !== undefined) body.organization = organization;

      const res = await fetch(`${BASE}/users/update/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to update user");
      // backend returns { message, user }
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// update user active status (optional)
export const UpdateManagerStatus = createAsyncThunk(
  "Manager/updateStatus",
  async ({ id, isActive, suspensionReason }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No authentication token found");

      const res = await fetch(`${BASE}/users/update-status/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive, suspensionReason }),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to update status");
      return data.user; // backend returns user in response
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

const ManagerSlice = createSlice({
  name: "Manager",
  initialState: {
    Managers: [],
    isLoading: false,
    error: null,
    ManagerDeleteModalOpen: false,
    ManagerEditModalOpen: false,
  },
  reducers: {
    setManagers(state, action) {
      state.Managers = action.payload;
    },
    setManagerDeleteModalOpen(state, action) {
      state.ManagerDeleteModalOpen = action.payload;
    },
    setManagerEditModalOpen(state, action) {
      state.ManagerEditModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchAllManagers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllManagers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Managers = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllManagers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message || "Failed to fetch users";
        state.Managers = [];
      })

      // delete
      .addCase(DeleteManager.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeleteManager.fulfilled, (state, action) => {
        state.isLoading = false;
        const removedId = action.payload;
        state.Managers = state.Managers.filter((m) => m._id !== removedId);
      })
      .addCase(DeleteManager.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message || "Failed to delete user";
      })

      // update
      .addCase(UpdateManager.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdateManager.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = action.payload;
        if (updated && updated._id) {
          state.Managers = state.Managers.map((m) => (m._id === updated._id ? updated : m));
        }
      })
      .addCase(UpdateManager.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message || "Failed to update user";
      })

      // update status
      .addCase(UpdateManagerStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdateManagerStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = action.payload;
        if (updated && updated._id) {
          state.Managers = state.Managers.map((m) => (m._id === updated._id ? updated : m));
        }
      })
      .addCase(UpdateManagerStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message || "Failed to update status";
      });
  },
});

export const { setManagers, setManagerDeleteModalOpen, setManagerEditModalOpen } = ManagerSlice.actions;
export default ManagerSlice.reducer;
