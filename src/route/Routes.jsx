import { createBrowserRouter } from "react-router-dom"
import Wrapper from "../layout/Wrapper"
import  Login  from "../pages/Login"
import SignUp from "../pages/Signup"
import Product from"../pages/admin/Product"
import Addproduct from"../pages/admin/Addproduct"
import Productview from"../pages/admin/Productview"
import PrivateRoute from "../components/PrivateRoute"



const Route = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
 {
    path: "/admin",
    element: <PrivateRoute/>,
       children: [
      {
        path: "",
        element: <Wrapper/>,
    children: [
      {
        path: "list",
        element: <Product/>,
      },
      {
        path: "add",
        element: <Addproduct />,
      },
      {
        path: "edit/:id",
        element: <Addproduct/>,
      },
      {
        path: "view/:id",
        element:<Productview/>
      },
    ],
  }
  ]
  },


])
export default Route;