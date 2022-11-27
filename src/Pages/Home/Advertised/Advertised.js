import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdvertisedCard from './AdvertisedCard';

const Advertised = () => {

    const {data : advertised} =useQuery({
        queryKey:['advertised'],
        queryFn: async() =>{
            const res = await fetch('http://localhost:5000/showadvertised')
            const data = res.json()
            return data
        }
    })

    return (
        <div className='container mx-auto grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-20 mb-32 gap-5'>
           {
             advertised?.map(adds => <AdvertisedCard
             key={adds._id} add={adds}
             ></AdvertisedCard> )

           }
        </div>
    );
};

export default Advertised;