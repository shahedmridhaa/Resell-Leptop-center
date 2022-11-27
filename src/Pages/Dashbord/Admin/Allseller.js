import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { AiFillDelete } from "react-icons/ai";
import Loading from '../../Loading/Loading';
import { AiFillCheckCircle } from "react-icons/ai";




const Allseller = () => {
  

         const {data: sellers, isLoading, refetch} = useQuery({
             queryKey:["seller"],
             queryFn:async () =>{
                const res = await fetch('http://localhost:5000/allseller?role=Seller')
                const data = res.json()
                return data
             }
         })
         

         if(isLoading){
            return <Loading></Loading>
         }

    //   ====delte seller
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


    //==== verify
    
      const handleverify =(id)=>{
        fetch(`http://localhost:5000/updetuser/${id}`,{
          method:"PUT",
        })
        .then(res => res.json())
        .then(data => {
          if(data.acknowledged){
            toast.success('Seller Account is verifyed')
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
        <th>Status</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
     
     
    
     {
        sellers?.map((seller, i) =><tr
        key = {seller._id} className="hover"
        >
        <th>{i + 1}</th>
        <td>{seller.name}</td>
        <td>{seller.email}</td>
        <td>{seller.role}</td>
        <td>{
                seller?.status === "Verifyed" ?
                <>
                <span className='text-green-600 flex' >verifyed <span className='text-green-700 pl-2 flex items-center'><AiFillCheckCircle/></span></span>
                </>
                :
                <>
                <button onClick={() => handleverify(seller._id)} className='btn btn-ghost btn-sm' >verify</button>
                </>

          }</td>
  
        <td onClick={() => handleDelete(seller._id)} className='text-red-700 text-2xl'><AiFillDelete/></td>
        </tr>)
     }
   
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Allseller;