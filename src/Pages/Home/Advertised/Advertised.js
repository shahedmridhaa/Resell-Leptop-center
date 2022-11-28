import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdvertisedCard from './AdvertisedCard';

const Advertised = () => {

   const {data: advertise} = useQuery({
    queryKey:["advertise"],
    queryFn: async()=>{
        const res = await fetch('http://localhost:5000/advertise?isAdvertise=true')
        const data = res.json()
        return data
    }
   })
    // ==section
    return (
        <div>
        {
          advertise?.length > 0 &&

          <div className='container mx-auto mt-16 mb-20'>
            
           <h1 className='py-10 text-center font-bold text-2xl'>Product Advertised</h1>


          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 '>
          {
            advertise?.map(add => <AdvertisedCard
             key={add._id}
             advertised={add}
             >
            </AdvertisedCard>)
          }
        </div>
        </div>
        }
        </div>
        
    );
};

export default Advertised;