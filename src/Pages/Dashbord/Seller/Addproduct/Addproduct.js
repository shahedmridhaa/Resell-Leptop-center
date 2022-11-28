import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { authcontext } from '../../../../Authprovider/Authprovider'

const Addproduct = () => {
  
  const { user } = useContext(authcontext)
  const seller = useLoaderData()
  const navigate = useNavigate()
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const { data: categoryName  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/categoryname')
      const data = res.json()
      return data
    },
  })





  const imgHost = "4dd0f7d5470145ffaf1ef77741470a90"
  

  const handleForm = (data) => {
    const image = data.image[0]
    const formData = new FormData()
    formData.append('image', image)
    const url = `https://api.imgbb.com/1/upload?expiration=15552000&key=${imgHost} `
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const img = imgData.data.url
         console.log(imgData);


         let categoryId ;

         if(data.category === "Dell Leptop"){
          categoryId = "1"
         }
         if(data.category === "Hp Leptop")
         {
          categoryId = "2"
         }
         if(data.category === "Walton Leptop")
         {
          categoryId = "3"
         }
         if(data.category === "Toshiba Leptop")
         {
          categoryId ="4"
         }
         
          
       const productInfo = {
        category_name :data.category,
        category_id : categoryId,
        sellerName: data.name,
        sellerStatus: seller?.status,
        email:data.email,
        ProductName:data.productName,
        condition:data.condition,
        OrginalPrice :data.marketprice,
        resalePrice: data.resellprice, 
        use :data.year,
        date : data.date,
        phone: data.phone,
        location: data.location,
        description : data.description,
        img: img

    }
    console.log(productInfo);

          fetch('http://localhost:5000/addproduct', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(productInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              if(data.insertedId){
                toast.success("successfully added Product")
                navigate('/dashbord/myproduct')
              }
            })
        }
      })
  }

  return (
    <div>
      <section class="text-gray-600 body-font w-11/12 mx-auto ">
        <div class="px-5 py-10 mx-auto shadow-xl rounded">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Add Your Product Here
            </h1>
            
          </div>

          <form onSubmit={handleSubmit(handleForm)}>
            <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div class="relative flex-grow w-full">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Seller Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  {...register('name', {
                    required: true,
                  })}
                />
              </div>

              <div class="relative flex-grow w-full">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  {...register('email', {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div class="relative flex-grow w-full">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  {...register('productName', {
                    required: true,
                  })}
                />
              </div>

              <div class="relative flex-grow w-full">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Product Condition
                </label>
                <select
                  {...register('condition', { required: true })}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option disabled selected>
                    Select product Condition
                  </option>
                  <option>Excelent</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>
            </div>
            <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div class="relative flex-grow w-full">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Market Price
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  {...register('marketprice', {
                    required: true,
                  })}
                />
              </div>

              <div class="relative flex-grow w-full">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Resell Price
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  {...register('resellprice', {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div class="relative flex-grow w-full">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Product Category
                </label>
                <select
                  {...register('category', { required: true })}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option disabled selected>
                    Select product Category
                  </option>

                  {categoryName?.map((ctgname) => (
                    <option key={ctgname.category_id} value={ctgname.category_id}>
                      {ctgname.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div class="relative flex-grow w-full">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Year of purchase{' '}
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  {...register('year', {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div class="relative flex-grow w-full">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Post Date
                </label>
                <input
                  type="date"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  {...register('date', {
                    required: true,
                  })}
                />
              </div>

              <div class="relative flex-grow w-full">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Phone Number
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  {...register('phone', {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div class="relative flex-grow w-full">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Image
                </label>
                <input
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  type="file"
                  placeholder="Upload here"
                  {...register('image', {
                    required: 'Image is required',
                  })}
                />
                {errors.img && (
                  <p className="text-red-800">{errors.img?.message}</p>
                )}
              </div>

              <div class="relative flex-grow w-full">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  {...register('location', {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div class="relative flex-grow w-full">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Description{' '}
                </label>
                <textarea
                  type="text"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  {...register('description', {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <button className="btn btn-dark " type="submit">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Addproduct
