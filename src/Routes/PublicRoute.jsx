
import Home from "../Pages/Home/Home";
import { Routes,Route } from "react-router-dom";
import RegisterMember from "../Pages/Auth/TeamMember";
import RegisterLeader from "../Pages/Auth/TeamLead";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgetPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";



const PublicRoutes = () =>{

    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/registerMember" element={<RegisterMember/>}/>
            <Route path="/registerLeader" element={<RegisterLeader/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/forgot_password" element={<ForgotPassword/>}/>
            <Route path="/reset_password" element={<ResetPassword/>}/>

            
        </Routes>
    );
}
export default PublicRoutes