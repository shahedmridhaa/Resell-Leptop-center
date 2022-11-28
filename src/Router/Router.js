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
import Dashbord from "../Pages/Dashbord/Dashbord";
import Userprivate from "./Userprivate";
import Adminprivate from "./Adminprivate";
import Sellerprivate from "./Sellerprivate";
import Blog from "../Pages/Blog/Blog";


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
               element:<PrivateRoute><CategoriesProduct></CategoriesProduct></PrivateRoute>,
               loader: ({params}) => fetch(`http://localhost:5000/category_product/${params.id}`)
            },
            {
                path:'/blog',
                element:<Blog></Blog>
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
          path:"/dashbord",
          element:<Dashbord></Dashbord> 
        },
        {
           path:"/dashbord/userorder",
           element:<Userprivate><Userorder></Userorder></Userprivate>
        },
        {
            path:"/dashbord/allbuyer",
            element:<Adminprivate><Allbuyer></Allbuyer></Adminprivate>
        },
        {
            path:"/dashbord/allseller",
            element:<Adminprivate><Allseller></Allseller></Adminprivate>
        },
        {
            path:"/dashbord/repoarted",
            element: <Adminprivate><ReportedItem></ReportedItem></Adminprivate>
        },
        {
           path:"/dashbord/addProduct/:email",
           element:<Sellerprivate><Addproduct></Addproduct></Sellerprivate>,
           loader: ({params}) => fetch(`http://localhost:5000/seller/${params.email}`)

        },
        {
            path:"/dashbord/myproduct",
            element:<Sellerprivate><Myproduct></Myproduct></Sellerprivate>
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