 import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authcontext } from '../../../../Authprovider/Authprovider';



 const BookingModal = ({setBooking, product}) => {

    const {user} = useContext(authcontext)

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const handleForm =(data) =>{
        const name = data.name
        const email = data.email
        const productName = data.productName
        const productPrice = data.price
        const  number = data.number
        const location = data.location

        const bookingInfo = {
          
            name,
            email,
            productName,
            productImg: product.img,
            producId: product._id,
            productPrice,
            sellerName: product.sellerName,
            sellerEmail: product.sellerEmail,
            number,
            location
        }

        fetch('http://localhost:5000/orders/',{
          method:"POST",
          headers:{
            'content-type': 'application/json'
          },
          body: JSON.stringify(bookingInfo)
        })
        .then(res => res.json())
        .then(data =>{
          console.log(data);
          if(data.acknowledged){
            toast.success('Poduct successfully added my order router')
            setBooking(null)
          }
        })
        
    }
    

     return (
 <div>
 <input type="checkbox" id="booking-modal" className="modal-toggle" />
 <div className="modal">
   <div className="modal-box relative">
   <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
     
     <form onSubmit={handleSubmit(handleForm, product?.img)} className='w-96 mx-auto'>
     <input type="text" name="name" defaultValue={user?.displayName} readOnly className="bg-gray-100 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-96  pl-3 my-2 "
      {...register("name",{
        required:true
      })}
    />
  


     <input type="text" defaultValue={user?.email} readOnly className="bg-gray-100 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-96  pl-3 my-2 "  
     {...register("email",{
            required:true
          })}
        />
     {errors.email && <p className='text-red-600'>Please Provide your valid email</p>}


     <input type="text" defaultValue={product.ProductName} readOnly className="bg-gray-100 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-96  pl-3 my-2 " 
      {...register("productName",{
            required:true
          })}
        />
     

     <input type="number" readOnly defaultValue={product.resalePrice} className="bg-gray-100 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-96  pl-3 my-2 " 
      {...register("price",{
            required:true
          })}
        />
   


     <input type="text" placeholder='Your number' className="bg-gray-100 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-96  pl-3 my-2 " 
      {...register("number",{
            required:true
          })}
        />
     {errors.number && <p className='text-red-600'>Mobile number is required</p>}


     <input type="text" placeholder='Meeting location' className="bg-gray-100 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-96  pl-3 my-2 "  {...register("location",{
            required:true
          })}
        />
     {errors.location && <p className='text-red-600'>Location field is required</p>} 


     <button type="submit" className="py-3 my-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-indigo-100 border border-transparent font-semibold text-indigo-500 hover:text-white hover:bg-indigo-100 focus:outline-none focus:ring-2 ring-offset-white focus:ring-indigo-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
      Add to cart
     </button>
    
     </form>

     
   </div>
 </div>
         </div>
     );
 };
 export default BookingModal;
