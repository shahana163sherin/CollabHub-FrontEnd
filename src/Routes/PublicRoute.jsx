
import Home from "../Pages/Home/Home";
import { Routes,Route } from "react-router-dom";
import RegisterMember from "../Pages/Auth/TeamMember";



const PublicRoutes = () =>{

    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/registerMember" element={<RegisterMember/>}/>
            
        </Routes>
    );
}
export default PublicRoutes