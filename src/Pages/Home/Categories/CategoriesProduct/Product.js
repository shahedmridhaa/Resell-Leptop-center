import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsFillCartFill, BsFillExclamationTriangleFill } from "react-icons/bs";
import BookingModal from './BookingModal';


const Product = ({ product }) => {
  
  const [booking, setBooking] = useState(null)

  const {
    img,
    description,
    location,
    sellerName,
    date,
    use,
    resalePrice,
    OrginalPrice,
    condition,
    ProductName,
    report,
    sellerStatus

  } = product
console.log(product);


  const handleReport=id=>{
    
     fetch(`http://localhost:5000/setreport/${id}`,{
      method:"PATCH",
      headers:{
        'content-type':'application/json'
      },
     })
     .then(res => res.json())
     .then(data => {
      if(data.modifiedCount > 0){
        toast.success('Sucessfully Reported Product')
      }
     })
  }





  return (
    <div>
      <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg ">
        <img
          class="object-cover object-center w-full h-72 p-5"
          src={img}
          alt="avatar"
        />

        {
          product?.paid?
          <>
          <div class=" px-6 py-3 bg-gray-900">
            <button className='btn btn-outline text-red-700 btn-sm'>Sold Out</button>
        </div>
        </>
          :
          <>
            <div class=" px-6 py-3 bg-gray-900">
            <button className='btn btn-outline text-white btn-sm'>New Arrivals</button>
        </div>
        </>
        }


        <div class="px-6 py-4">
          <p class="py-2 text-gray-800 font-semibold">{ProductName}</p>

          <div class=" mt-4 text-gray-800 ">
            <h1 class="px-2 text-md">Date: {date}</h1>
          </div>

          <div class=" mt-4 text-gray-800 ">
            <h1 class="px-2 text-md">Market Price: {OrginalPrice}</h1>
          </div>

          <div class=" mt-4 text-gray-800 ">
            <h1 class="px-2 text-md">Resell Price: {resalePrice}</h1>
          </div>

          <div class=" mt-4 text-gray-800 ">
            <h1 class="px-2 text-md">Condition: {condition}</h1>
          </div>

          <div class=" mt-4 text-gray-800 ">
            <h1 class="px-2 text-md">Total Use: {use}</h1>
          </div>


          <div class=" mt-4 text-gray-800 flex">
          <h1 class="px-2 text-md">Seller Name: {sellerName} </h1>
          {
            sellerStatus && <span className='text-green-700 pl-2 flex items-center'><AiFillCheckCircle/></span>
          }
          </div>

          <div class=" mt-4 text-gray-800 ">
            <h1 class="px-2 text-md">Loaction: {location}</h1>
          </div>

          {
            report && 
            <div class=" mt-4 text-gray-800 ">
            <h1 class="px-2 text-md text-red-800">Report: {report}</h1>
          </div>
          }

          <div class=" mt-4 text-gray-800 ">
            <h1 class="px-2 text-md">Description: {
              
              description && description.slice(0 , 100) + "..."

            }</h1>
          </div>

         {
          product && !product?.paid?
         <>
          <div class="flex items-center justify-between my-6 ">
          
          <label onClick={() => setBooking(product)} htmlFor="booking-modal" className="rounded buy-btn w-5/6 mx-2 font-semibold text-center"><span className="inline-block"><BsFillCartFill/></span> Buy Now</label>
          
          <button onClick={() => handleReport(product._id)} className="rounded report-btn w-5/6 mx-2 font-semibold"><span className="inline-block"><BsFillExclamationTriangleFill/></span> Report</button>

        </div>
         </>
         :
         <>
          <div class="flex items-center justify-between my-6 ">

        </div>
         </>
         }
        </div>
      </div>
      {
        booking && <BookingModal setBooking = {setBooking} product = {product}></BookingModal>
      }
    </div>
  )
}

export default Product
