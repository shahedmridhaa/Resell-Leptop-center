import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Loading/Loading';
import Category from './Category';

const Categories = () => {

     const {data: categories, isLoading} = useQuery({
             queryKey:[],
             queryFn:async()=>{
                const res = await fetch('http://localhost:5000/categories')
                const data = res.json()
                return data
             }
     })


    if(isLoading){
        return <Loading></Loading>
    }

    return (
   <div className='py-24'>
         <div className='pt-14 container mx-auto'>
            <div className='text-center pb-24'>
            <h1 className='text-2xl font-bold'>Featured Category</h1>
            <p>Get Your Desired Leptop from Featured Category!</p>
            </div>

            <div>

             <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                 {
                    categories?.map(category => <Category
                        key={category.category_id}
                        category={category}
                    ></Category>
                   
                     )
                }
             </div>

            </div>
        </div>
   </div>
    );
};

export default Categories;