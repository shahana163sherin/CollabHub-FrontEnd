import AOS from 'aos'
import "aos/dist/aos.css";
import './App.css'
import { useEffect } from 'react'

import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify'
import AppRoutes from './Routes/AppRoutes';

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
      <ToastContainer />
      <AppRoutes />
    </div>
  )
}

export default App
