import React from 'react'

const AdvertisedCard = ({ add }) => {
  console.log('sadfasdfdsaf', add)
  const {
    condition,
    resellPrice,
    productName,
    img,
    category_name,
    OrginalPrice,
    date,
  } = add
  return (
    <div>
      {add? (
        <>


            

          <div class="bg-white border rounded-xl shadow-sm sm:flex dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div class="flex-shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-l-xl sm:max-w-[15rem] md:rounded-tr-none md:max-w-xs">
              <img
                className="w-full h-full absolute top-0 left-0 object-cover"
                src={img}
                alt="I..."
              />
            </div>
            <div class="flex flex-wrap">
            <button className='btn btn-sm m-2 bg-gradient-to-r from-purple-500 to-pink-500'>Advertised</button>
              <div class="p-4 flex flex-col h-full sm:p-7">
               
                <h3 class="text-lg font-bold text-gray-800 dark:text-white">
                  {productName}
                </h3>
                <span class="mt-1 text-gray-800 dark:text-gray-400">
                  condition: {condition}
                </span>
                <span class="mt-1 text-gray-800 dark:text-gray-400">
                  Market Price: {OrginalPrice}
                </span>
                <span class="mt-1 text-gray-800 dark:text-gray-400">
                  Resell Price: {resellPrice}
                </span>
                <span class="mt-1 text-gray-800 dark:text-gray-400">
                  Category: {category_name}
                </span>
               
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default AdvertisedCard
