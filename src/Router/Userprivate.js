import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authcontext } from '../Authprovider/Authprovider';
import { PuffLoader } from 'react-spinners';
import useAdmin from '../Hook/useAdmin';

const Userprivate = ({children}) => {

    const {user, loading} = useContext(authcontext)
    const location = useLocation()
    const [isRole] = useAdmin(user?.email)

    if(loading){
        return <div class="h-screen">
        <div className="flex justify-center items-center h-full">
          <PuffLoader color="#36d7b7" />
        </div>
      </div>
      }
  

     if(isRole === "User"){
        return children
     }
     return <Navigate to="/login" state = {{from: location}} replace></Navigate>
};

export default Userprivate;