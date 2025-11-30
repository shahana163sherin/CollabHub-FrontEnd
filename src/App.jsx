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
       <PublicRoutes/>
       {/* <Home/> */}
    
     </div>
  )
}

export default App
