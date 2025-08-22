import Cookies from "js-cookie";
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const isAuthenticated = Cookies.get("token");

    return isAuthenticated ? <Outlet/> : <Navigate to="/"/>
  
}

export default PrivateRoute