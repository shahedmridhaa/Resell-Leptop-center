import { useEffect, useState } from 'react';

const useAdmin = (email) => {
    const [isRole, setIsRole] = useState('')
    // const [isAdminLoading, setisAdminLoading] = (true)


     useEffect(() =>{
        fetch(`http://localhost:5000/users/${email}`)
        .then(res => res.json())
        .then(data => {
            setIsRole(data.role)
            console.log(data.role);
        })

     },[email])
     return[isRole]

};

export default useAdmin;