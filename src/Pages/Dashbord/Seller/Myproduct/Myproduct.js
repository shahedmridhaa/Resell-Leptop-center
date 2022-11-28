import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AiFillDelete } from 'react-icons/ai';
import { authcontext } from '../../../../Authprovider/Authprovider';
import Loading from '../../../Loading/Loading';

const Myproduct = () => {
    const {user}= useContext(authcontext)

    const {data: myproduct , isLoading, refetch} = useQuery({
        queryKey:['myproduct'],
        queryFn: async()=>{
           const res =await fetch(`http://localhost:5000/allproduct?email=${user?.email}`)
           const data = res.json()
           return data
        }
    })




const handleAdvertise = id => {
  fetch(`http://localhost:5000/advertise/${id}`,{
    method:"PATCH",
    headers:{
      'content-type':'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if(data.modifiedCount > 0 ){
      toast.success('Advertise added on Home page')
    }
  })
}



const handleDelete =(product) =>{
 const agree = window.confirm('Do you sure you want to delete your product')
 if(agree){
  fetch(`http://localhost:5000/productdelete?name=${product.ProductName}`,{
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
}



if(isLoading){
  return <Loading></Loading>
}

console.log(myproduct);
    return (
   
       <div>
          <div className="overflow-x-auto">
            <table className="table table-compact w-5/6 mx-auto shadow-xl rounded">
              <thead>
                <tr>
                  <th></th>
                  <th>Image</th> 
                  <th>Categpry Name</th> 
                  <th>Resell Price</th> 
                  <th>Sell Status</th> 
                  <th>Advertised</th>
                  <th>Delete</th>
                </tr>
              </thead> 
              <tbody>
              
                    {
                      myproduct?.map((product, i) => <tr
                      key={product._id}
                      >
                        
                    ;  
                      <td>{i + 1}</td>
                     <td>
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product.img} alt="Avatar Tailwind CSS Component" />
                      </div>
                       </td>
      
                          <td> {product.category_name}</td>
                          <td> {product.resalePrice}</td> 
                          <td> {
                                 product?.paid? 
                                 <>Sold</>:
                                 <>Available</>
                            }
                            </td> 
                            <td>
                              {
                                product?.paid?
                                <></>
                                :
                                <><button onClick={() => handleAdvertise(product._id)} className='btn btn-sm btn-outline'>Advertised</button></>
                              }
                            </td>
                          
                           <td className='text-red-700 text-2xl' onClick={() => handleDelete(product)}><AiFillDelete/></td>
                      </tr>)
                     }  
          
             
                 
              </tbody> 
            </table>
          </div>
                   
          
          
                  </div>
     

 );
};

export default Myproduct;