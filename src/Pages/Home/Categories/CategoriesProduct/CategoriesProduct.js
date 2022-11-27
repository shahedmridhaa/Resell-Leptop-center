import React from 'react';
import { useLoaderData } from 'react-router-dom';
import "./Category.css"
import Product from './Product';

const CategoriesProduct = () => {

    const products = useLoaderData()
    console.log(products);


    return (
        <div className=''>
            
            <section className='productbanner text-center text-white'>
                 <h1 className='text-5xl font-bold pb-2'>Your Best Choise Here</h1>
                 <p className='text-lg'>Buy your Desired Leptop with cheap price</p>

            </section>
            <section className='py-24 bg-slate-50'>
            <div className='container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
                {
                    products?.map(product => <Product
                    key = {product._id}
                    product = {product}
                    ></Product>)
                }
            </div>
            </section>
           
        </div>
    );
};

export default CategoriesProduct;