import { createBrowserRouter } from "react-router-dom";
import DashbordLayout from "../Layout/DashbordLayout";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login"
import Regester from "../Pages/Regester/Regester";
import Allbuyer from "../Pages/Dashbord/Admin/Allbuyer";
import Allseller from "../Pages/Dashbord/Admin/Allseller";
import ReportedItem from "../Pages/Dashbord/Admin/ReportedItem";
import Addproduct from "../Pages/Dashbord/Seller/Addproduct/Addproduct";
import Myproduct from "../Pages/Dashbord/Seller/Myproduct/Myproduct";
import CategoriesProduct from "../Pages/Home/Categories/CategoriesProduct/CategoriesProduct";
import PrivateRoute from "./PrivateRoute";
import Userorder from "../Pages/Dashbord/Userorder/MyOrder/Userorder";
import Payment from "../Pages/Dashbord/Userorder/Payment/Payment";


const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout></Layout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
               path: "/category_product/:id",
               element:<CategoriesProduct></CategoriesProduct>,
               loader: ({params}) => fetch(`http://localhost:5000/category_product/${params.id}`)
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:"/regester",
                element:<Regester></Regester>
            }
        ]
    },

    {
       path:"/dashbord",
       element:<PrivateRoute><DashbordLayout></DashbordLayout></PrivateRoute>,
       children:[
      
        {
           path:"/dashbord/userorder",
           element:<Userorder></Userorder>
        },
        {
            path:"/dashbord/allbuyer",
            element:<Allbuyer></Allbuyer>
        },
        {
            path:"/dashbord/allseller",
            element:<Allseller></Allseller>
        },
        {
            path:"/dashbord/repoarted",
            element: <ReportedItem></ReportedItem>
        },
        {
           path:"/dashbord/addProduct/:email",
           element:<Addproduct></Addproduct>,
           loader: ({params}) => fetch(`http://localhost:5000/seller/${params.email}`)

        },
        {
            path:"/dashbord/myproduct",
            element:<Myproduct></Myproduct>
        },
        {
            path:"/dashbord/payment/:id",
            element:<Payment></Payment>,
            loader: ({params}) => fetch(`http://localhost:5000/orderpayment/${params.id}`)
        }

       ]
    }
    
])


export default router;