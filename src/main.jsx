// import React from 'react';
// import './styles/global/index.css';

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { createRoot } from 'react-dom/client';
// import { StrictMode } from 'react';
// import Login from './pages/Authentication/Login';
// import DeviceManagement from './pages/DeviceManagement/page';
// import ManagementLayout from './Layout/management/Layout';
// import ManagerManagement from './pages/ManagerManagement/page';
// import UserManagement from './pages/UserManagement/page';
// import OrganizationManagement from './pages/OrganizationManagement/page';
// import BrandManagement from './pages/BrandManagement/page';
// import VenueManagement from './pages/VenueManagement/page';
// import Dashboard from './pages/Dashboard/page'
// import ProfilePage from './pages/ProfilePage';
// import App from './App';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from './store/store';
// import { StoreContextProvider } from './contexts/storecontexts';
// import Logout from './pages/Authentication/Logout';
// import DashboardRoute from './Routes/DashboardRoute';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <StoreContextProvider>
//         <BrowserRouter>
// <Routes>

//   {/* Login page without layout */}
//   <Route path="/" element={<App />}>
//     <Route index element={<Login />} />

//     {/* Dashboard pages with layout */}
//     <Route element={<DashboardRoute />}>
//       <Route path="management" element={<ManagementLayout />}>
//         <Route index element={<Dashboard />} />
//         <Route path="organization" element={<OrganizationManagement />} />
//         <Route path="device" element={<DeviceManagement />} />
//         <Route path="venue" element={<VenueManagement />} />
//         <Route path="managers" element={<ManagerManagement />} />
//         <Route path="users" element={<UserManagement />} />
//         <Route path="brands" element={<BrandManagement />} />
//         {/* Removed logs route; replaced by users */}
//         <Route path="profile" element={<ProfilePage />} />
//       </Route>
//     </Route>
//   </Route>
//   <Route path='/logout' element={<Logout />} />
// </Routes>
//         </BrowserRouter>
//         </StoreContextProvider>
//        </PersistGate>
//      </Provider>
//    </StrictMode>
//  );



















// import React from 'react';
// import './styles/global/index.css';

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { createRoot } from 'react-dom/client';
// import { StrictMode } from 'react';
// import Login from './pages/Authentication/Login';
// import DeviceManagement from './pages/DeviceManagement/page';
// import ManagementLayout from './Layout/management/Layout';
// import ManagerManagement from './pages/ManagerManagement/page';
// import UserManagement from './pages/UserManagement/page';
// import OrganizationManagement from './pages/OrganizationManagement/page';
// import BrandManagement from './pages/BrandManagement/page';
// import VenueManagement from './pages/VenueManagement/page';
// import Dashboard from './pages/Dashboard/page'
// import ProfilePage from './pages/ProfilePage';
// import App from './App';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from './store/store';
// import { StoreContextProvider } from './contexts/storecontexts';
// import Logout from './pages/Authentication/Logout';
// import DashboardRoute from './Routes/DashboardRoute';
// import UserDashboard from './pages/UserDashboardSingleVenue/page';
// import ProtectedRoute from './Routes/ProtectedRoute';
// import UserRoute from './Routes/UserRoute';
// import AdminRoute from './Routes/AdminRoute';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <StoreContextProvider>
//           <BrowserRouter>
//             <Routes>

//               {/* Public routes */}
//               <Route path="/" element={<App />}>
//                 <Route index element={<Login />} />
//               </Route>

//               {/* Protected routes */}
//               <Route element={<ProtectedRoute />}>

//                 {/* User routes */}
//                 <Route element={<UserRoute />}>
//                   <Route element={<DashboardRoute />}>
//                     <Route path="management" element={<ManagementLayout />}>
//                       <Route index element={<Dashboard />} />
//                       <Route path="singleveneue" element={<UserDashboard />} />
//                     </Route>
//                   </Route>
//                 </Route>


//                 {/* Admin routes */}
//                 {/* Dashboard pages with layout */}
//                 <Route element={<DashboardRoute />}>
//                   <Route path="/admin/management" element={<ManagementLayout />}>
//                     <Route index element={<Dashboard />} />
//                     <Route path="organization" element={<OrganizationManagement />} />
//                     <Route path="device" element={<DeviceManagement />} />
//                     <Route path="venue" element={<VenueManagement />} />
//                     <Route path="managers" element={<ManagerManagement />} />
//                     <Route path="users" element={<UserManagement />} />
//                     <Route path="brands" element={<BrandManagement />} />
//                     {/* Removed logs route; replaced by users */}
//                     <Route path="profile" element={<ProfilePage />} />
//                   </Route>
//                 </Route>
//                 <Route path='/logout' element={<Logout />} />
//               </Route>

//             </Routes>
//           </BrowserRouter>
//         </StoreContextProvider>
//       </PersistGate>
//     </Provider>
//   </StrictMode>
// );








// main.jsx
// import './styles/global/index.css';

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { createRoot } from 'react-dom/client';
// import { StrictMode } from 'react';
// import Login from './pages/Authentication/Login';
// import DeviceManagement from './pages/DeviceManagement/page';
// import ManagementLayout from './Layout/management/Layout';
// import ManagerManagement from './pages/ManagerManagement/page';
// import UserManagement from './pages/UserManagement/page';
// import OrganizationManagement from './pages/OrganizationManagement/page';
// import BrandManagement from './pages/BrandManagement/page';
// import VenueManagement from './pages/VenueManagement/page';
// import Dashboard from './pages/Dashboard/page'
// import ProfilePage from './pages/ProfilePage';
// import App from './App';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from './store/store';
// import { StoreProvider } from './contexts/storecontexts';
// import Logout from './pages/Authentication/Logout';
// import DashboardRoute from './Routes/DashboardRoute';
// import UserDashboard from './pages/UserDashboardSingleVenue/page';
// import ProtectedRoute from './Routes/ProtectedRoute';
// import UserRoute from './Routes/UserRoute';
// import AdminRoute from './Routes/AdminRoute';
// import VerifyOtp from './pages/Authentication/VerifyOtp';
// import SetupPassword from './pages/Authentication/SetupPassword';
// import ForgotPassword from './pages/Authentication/ForgotPassword';
// import ResetPassword from './pages/Authentication/ResetPassword';
// import PublicRoute from './Routes/PublicRoute';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <StoreProvider  >
//           <BrowserRouter>
//             <Routes>

//               {/* Public routes */}
              
              
//               <Route path="/" element={ <App />}>
                
//                 <Route index element={<Login />} />
//                 <Route path="/forgot-password" element={<ForgotPassword/>} />
//                 <Route path="/reset-password/:token" element={<ResetPassword/>} />
//                 <Route path="/setup-password/:token" element={<SetupPassword />} />
//                 <Route path="/verify-otp/:token" element={<VerifyOtp />} />
                
//               </Route>

//               {/* Protected routes */}
//               <Route element={<ProtectedRoute />}>

//                 {/* User routes */}
//                 <Route element={<UserRoute />}>
//                   <Route element={<DashboardRoute />}>
//                     <Route path="management" element={<ManagementLayout />}>
//                       <Route index element={<Dashboard />} />
//                       <Route path="singleveneue" element={<UserDashboard />} />
//                     </Route>
//                   </Route>
//                 </Route>


//                 {/* Admin routes */}
//                 {/* Dashboard pages with layout */}
//               <Route element={<AdminRoute />}>
//                 <Route element={<DashboardRoute />}>
//                   <Route path="/admin/management" element={<ManagementLayout />}>
//                     <Route index element={<Dashboard />} />
//                     <Route path="organization" element={<OrganizationManagement />} />
//                     <Route path="device" element={<DeviceManagement />} />
//                     <Route path="venue" element={<VenueManagement />} />
//                     <Route path="managers" element={<ManagerManagement />} />
//                     <Route path="users" element={<UserManagement />} />
//                     <Route path="brands" element={<BrandManagement />} />
//                     {/* Removed logs route; replaced by users */}
//                     <Route path="profile" element={<ProfilePage />} />
//                   </Route>
//                 </Route>
//               </Route>

//                 <Route path='/logout' element={<Logout />} />
//               </Route>

//             </Routes>
//           </BrowserRouter>
//         </StoreProvider >
//       </PersistGate>
//     </Provider>
//   </StrictMode>
// );













import './styles/global/index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Login from './pages/Authentication/Login';
import DeviceManagement from './pages/DeviceManagement/page';
import ManagementLayout from './Layout/management/Layout';
import ManagerManagement from './pages/ManagerManagement/page';
import UserManagement from './pages/UserManagement/page';
import OrganizationManagement from './pages/OrganizationManagement/page';
import BrandManagement from './pages/BrandManagement/page';
import VenueManagement from './pages/VenueManagement/page';
import Dashboard from './pages/Dashboard/page'
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';
import { StoreProvider } from './contexts/storecontexts';
import Logout from './pages/Authentication/Logout';
import DashboardRoute from './Routes/DashboardRoute';
import UserDashboard from './pages/UserDashboardSingleVenue/page';
import ProtectedRoute from './Routes/ProtectedRoute';
import UserRoute from './Routes/UserRoute';
import AdminRoute from './Routes/AdminRoute';
import VerifyOtp from './pages/Authentication/VerifyOtp';
import SetupPassword from './pages/Authentication/SetupPassword';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import PublicRoute from './Routes/PublicRoute';
import NotFound from './pages/Notfound';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StoreProvider>
          <BrowserRouter>
            <Routes>

              {/* --------------------------
                  Public routes (wrapped)
                 -------------------------- */}
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <App />
                  </PublicRoute>
                }
              >
                {/* NOTE: child paths are relative (no leading "/") */}
                <Route index element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password/:token" element={<ResetPassword />} />
                <Route path="setup-password/:token" element={<SetupPassword />} />
                <Route path="verify-otp/:token" element={<VerifyOtp />} />
              </Route>

              {/* --------------------------
                  Protected (authenticated)
                 -------------------------- */}
              <Route element={<ProtectedRoute />}>
                {/* User-only routes */}
                <Route element={<UserRoute />}>
                  <Route element={<DashboardRoute />}>
                    <Route path="management" element={<ManagementLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="singlevenue" element={<UserDashboard />} />
                    </Route>
                  </Route>
                </Route>

                {/* Admin-only routes */}
                <Route element={<AdminRoute />}>
                  <Route element={<DashboardRoute />}>
                    {/* note: top-level admin path */}
                    <Route path="admin/management" element={<ManagementLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="organization" element={<OrganizationManagement />} />
                      <Route path="device" element={<DeviceManagement />} />
                      <Route path="venue" element={<VenueManagement />} />
                      <Route path="managers" element={<ManagerManagement />} />
                      <Route path="users" element={<UserManagement />} />
                      <Route path="brands" element={<BrandManagement />} />
                       {/* <Route path="profile" element={<ProfilePage />} /> */}
                    </Route>
                  
                  </Route>
                </Route>
                {/* Shared authenticated routes */}
                {/* <Route path="logout" element={<Logout />} /> */}
              </Route>



              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </StoreProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);


