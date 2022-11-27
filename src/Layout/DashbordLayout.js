import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { authcontext } from '../Authprovider/Authprovider';
import useAdmin from '../Hook/useAdmin';
import Footer from '../Pages/SharedPages/Footer/Footer';
import Header from '../Pages/SharedPages/Header/Header';

const DashbordLayout = () => {

  const {user} = useContext(authcontext)
  const [isRole] =  useAdmin(user?.email)
  


    const admin = (
      <>
       <li ><Link className='font-xl font-semibold hover:text-green-700' to="/dashbord/allbuyer">All Buyer</Link></li>
       <li ><Link className='font-xl font-semibold hover:text-green-700' to="/dashbord/allseller">All Seller</Link></li>
       <li ><Link className='font-xl font-semibold hover:text-green-700' to="/dashbord/repoarted">Reported Item</Link></li>
      </>
    )


    const seller =(
          <>
           <li ><Link className='font-xl font-semibold hover:text-green-700' to={`/dashbord/addProduct/${user?.email}`}>Add Product</Link></li>
      <li ><Link className='font-xl font-semibold hover:text-green-700' to="/dashbord/myproduct">My Product</Link></li>
          </>
    )



    const buyer =(
      <>
      <li ><Link className='font-xl font-semibold hover:text-green-700' to="/dashbord/userorder">My Order</Link></li>
      </>
    )




    return (
       <div>
        <Header></Header>
       <div className='container mx-auto'>
       <div className="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex-col items-center justify-center">
        <Outlet></Outlet>
  
  </div> 
  <div className="drawer-side ">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 bg-base-200 text-base-content">
      
    

     {isRole === "Seller" && <>{seller}</>}
     {isRole === "User" && <>{buyer}</>}
     {isRole === "Admin" && <>{admin}</>}


    </ul>
  
  </div>
</div>

 </div>
<Footer></Footer>
       </div>
    );
};

export default DashbordLayout;