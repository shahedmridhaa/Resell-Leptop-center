import { useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { AiFillDelete } from 'react-icons/ai'
import Loading from '../../Loading/Loading'
import axios from "axios";



const ReportedItem = () => {
  const { data: reportedItems, isLoading, refetch } = useQuery({
    queryKey: ['reportedItems'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/reporteditem?report=true')
      const data = res.json()
      return data
    },
  })

 


  const handleDelte = async (id) =>{
     const res = await axios.delete(`http://localhost:5000/deletereporteditem/${id}`)
     if(res.data.deletedCount > 0){
         toast.success('successfully deleted product')
         refetch()
     }
  }


 
  if (isLoading) {
    return <Loading></Loading>
  }

  return (

 <div className='my-10'>
        <h1 className='text-center text-2xl font-semibold'>All Reported Item Here</h1>
     {
        reportedItems?.map((item, i) => <div key={item._id}>

       <div className="flex justify-center w-9/12 mx-auto shadow-xl rounded my-10 p-10">
          <span className='font-bold pb-5'>{i+1}</span>
        <ul className="max-w-xs flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
        <div className='flex justify-between'>
        <li className="inline-flex items-center gap-x-2 py-3 text-sm font-medium text-gray-800 ">
            
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.img} alt="Avatar Tailwind CSS Component" />
              </div>

          </li>
         
          <li onClick={() => handleDelte(item._id)} className="inline-flex items-center  text-xl font-medium text-red-600 rounded-full p-3">
          <AiFillDelete/>
          </li>
          
        </div>
          <li className="inline-flex items-center gap-x-2 py-3 text-sm font-medium text-gray-800 ">
            ProductName: {item.ProductName}
          </li>
          <li className="inline-flex items-center gap-x-2 py-3 text-sm font-medium text-gray-800 ">
            Product Category: {item.category_name}
          </li>
          <li className="inline-flex items-center gap-x-2 py-3 text-sm font-medium text-gray-800 ">
            Seller Name: {item.sellerName}
          </li>
          <li className="inline-flex items-center gap-x-2 py-3 text-sm font-medium text-gray-800 ">
            Seller Location: {item.location}
          </li>
          <li className="inline-flex items-center gap-x-2 py-3 text-sm font-medium text-gray-800 ">
            Report Date: {item.date}
          </li>
        </ul>
        </div>
      </div>
       )
     }
    </div>


  
  )
}

export default ReportedItem
