import { useQuery } from '@tanstack/react-query';
import { all } from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { authcontext } from '../../../../Authprovider/Authprovider';
import Loading from '../../../Loading/Loading';

const Userorder = () => {
    const {user} = useContext(authcontext)

    const {data: allOrders, isLoading, refetch} = useQuery({
        queryKey:['allOrders'],
        queryFn:async()=>{
            const res = await fetch(`http://localhost:5000/allorder?email=${user?.email}`)
            const data = res.json()
            return data
            
        }      
    })

   

    if(isLoading){
        return <Loading> </Loading>
    }
        

    const handleDelete = order =>{

      const agree = window.confirm ('Do You to sure you want to delete your product')
      if(agree){
        fetch(`http://localhost:5000/deleteBookingProduct/${order._id}`,{
          method:"DELETE",
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if(data.deletedCount > 0){
            toast.success(`${order.productName} delete successfully`)
            refetch()
          }
        })
      }
    

    }
      
     



    return (
  <div>
  <div className="overflow-x-auto w-full">
  <table className="table w-full">
   
    <thead>
      <tr>  
        <th>Product Info</th>
        <th>Seller Name</th>
        <th>Product Price</th>
        <th>payment</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
     

     {
      allOrders?.length >0?
      <>
       {
        allOrders?.map(order => <tr key={order._id}>
           
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={order.productImg} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{
                order.productName && order.productName.slice(0, 20) + "..."
              }</div>
             
            </div>
          </div>
        </td>

        <td>
          {order.sellerName}
        </td>
        <td>{order.productPrice}</td>
        <td>
        {
          order.productPrice && !order.paid && 
          <>
          <Link to={`/dashbord/payment/${order._id}`}>
          <button  className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Pay</button>
          </Link>
        
          </>
        }
        {
          order.productPrice && order.paid && <button className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-green-200 font-semibold text-white bg-green-500 focus:ring-green-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Paid</button>
        }

          </td>
        <th>
          <button onClick={() =>handleDelete(order)} className="text-2xl text-red-800"><AiFillDelete/></button>
        </th>    
        </tr>)
      }
      </>:
      <>
      <div className='flex justify-center items-center h-screen'>
            <h1 className='text-2xl font-bold p-10'>You don't have any order</h1>
        </div>
      </>
     }
     
    
    </tbody>
   
    
    
  </table>
</div>




  </div>
    );
};

export default Userorder;