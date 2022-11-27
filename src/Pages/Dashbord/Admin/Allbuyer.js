import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { AiFillDelete } from 'react-icons/ai';
import Loading from '../../Loading/Loading';

const Allbuyer = () => {
  
        const {data: users, isLoading, refetch} = useQuery({
            queryKey:["User"],
            queryFn:async () =>{
               const res = await fetch('http://localhost:5000/allseller?role=User')
               const data = res.json()
               return data
            }
        })
        

        if(isLoading){
           return <Loading></Loading>
        }

   //   ====delte user
        const handleDelete =(id) =>{
           fetch(`http://localhost:5000/userdelete/${id}`,{
               method: "DELETE",     
           })
           .then(res => res.json())
           .then(data =>{
               console.log(data);
               if (data.deletedCount > 0) {
                   toast.success("successFully deleted user")
                   refetch()
               }
           })
           
        }

   return (
       <div>
 <div className="overflow-x-auto ">
 <table className="table w-11/12 mx-auto">
  
   <thead>
     <tr>
       <th></th>
       <th>Name</th>
       <th>Email</th>
       <th>role</th>
       <th>Delete</th>
     </tr>
   </thead>
   <tbody>
    
    
   
    {
       users?.map((user, i) =><tr
       key = {user._id} className="hover"
       >
       <th>{i + 1}</th>
       <td>{user.name}</td>
       <td>{user.email}</td>
       <td>{user.role}</td>
       <td onClick={() => handleDelete(user._id)} className='text-red-700 text-2xl'><AiFillDelete/></td>
       </tr>)
    }
  
   </tbody>
 </table>
</div>
       </div>
   );
};

    
export default Allbuyer;