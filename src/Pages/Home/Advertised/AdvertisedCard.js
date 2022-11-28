import React from 'react';

const AdvertisedCard = ({advertised}) => {
  
  const {ProductName , resalePrice, img} = advertised
 

  return (
    <div>
     
       {/* <div className="flex items-center space-x-3">
           
              <div className="mask mask-squircle w-12 h-12">
                <img src={img} alt="Avatar Tailwind CSS Component" />
              </div>
            
          
              <div className="">
                <h2 className='font-semibold text-xl'>{ProductName}</h2> 
                <p>Resell Price :{resalePrice}</p>
              </div>
             
          
          </div> */}
    </div>
  );
};

export default AdvertisedCard;