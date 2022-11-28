import React from 'react';

const AdvertisedCard = ({advertised}) => {
  
  const {ProductName , resalePrice, img} = advertised
 

  return (
    <div>
     
      <div className=" space-x-3 shadow-lg p-8 rounded-md">
           
            <div className='flex items-center border p-3'>
                <div className=" w-24">
                <img src={img} alt="Avatar Tailwind CSS Component" />
              </div>
            
          
              <div className="ml-8">
                <h2 className='font-semibold text-xl'>{ProductName}</h2> 
                <p>Resell Price :{resalePrice}</p>
              </div>
            </div>
             
          
          </div> 
    </div>
  );
};

export default AdvertisedCard;