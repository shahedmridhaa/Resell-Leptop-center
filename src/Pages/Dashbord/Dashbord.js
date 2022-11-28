import React, { useContext } from 'react';
import { authcontext } from '../../Authprovider/Authprovider';

const Dashbord = () => {
    const {user} = useContext(authcontext)
    return (
        <div className='flex justify-center items-center h-full'>
            <h1 className='text-2xl font-bold shadow-lg p-10'>Welcome To Your Dahsbord {user.displayName}</h1>
        </div>
    );
};

export default Dashbord;