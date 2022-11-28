import React, { useContext } from 'react';
import { authcontext } from '../Authprovider/Authprovider';
import useAdmin from '../Hook/useAdmin';
import { PuffLoader } from 'react-spinners';


const Sellerprivate = ({children}) => {
     const {user, loading} = useContext(authcontext)
     const [isRole] = useAdmin(user?.email)


     if(loading){
        return <div class="h-screen">
        <div className="flex justify-center items-center h-full">
          <PuffLoader color="#36d7b7" />
        </div>
      </div>
      }
  

     if(isRole === "Seller"){
        return children
     }
     return
   
};

export default Sellerprivate;