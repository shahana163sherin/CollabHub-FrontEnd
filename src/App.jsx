import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AOS from 'aos'
import "aos/dist/aos.css";
import './App.css'
import { useEffect } from 'react'

import PublicRoutes from './Routes/PublicRoute';
import Home from './Pages/Home/Home';
import { Toaster } from 'react-hot-toast';
import {ToastContainer} from 'react-toastify'
import { Route, Routes } from 'react-router-dom';
import LeaderProtected from './Routes/ProtectedRoute/LeaderRoute';
import LeaderDashboard from './Pages/Dashboard/TeamLeaderDashBoard';
import Profile from './Pages/Profile/Profile';
import EditMyProfile from './Pages/Profile/EditProfile';
import ChangeMyPassword  from './Pages/Profile/ChangePassword';

function App() {
 
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  return (
    <div>
       <Toaster position="top-center" />
       <ToastContainer/>
       <Routes>
       <Route path="/*" element={<PublicRoutes />} />
       
        <Route path="/leaderdashboard" element={<LeaderProtected>
          <LeaderDashboard/>
        </LeaderProtected>}/>

        <Route path="/leader/profile"element={ <LeaderProtected>
            <Profile />
          </LeaderProtected> }/>

          <Route path="/leader/editProfile" element={<LeaderProtected>
            <EditMyProfile/>
          </LeaderProtected>}/>

          <Route path="/leader/change-password" element={<LeaderProtected>
            <ChangeMyPassword/>
          </LeaderProtected>}/>
        </Routes>


     
       {/* <Home/> */}
    
     </div>
  )
}

export default App
