
import Home from "../Pages/Home/Home";
import { Routes,Route } from "react-router-dom";


const PublicRoutes = () =>{

    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            
        </Routes>
    );
}
export default PublicRoutes