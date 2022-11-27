


import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({category}) => {
         const {category_name, category_id, category_img} = category

    return (
        <div>
            <Link to={`/category_product/${category_id}`} class="flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-xl transition dark:shadow-slate-700/[.7]">
  <div class="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden">
    <img className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl" src={category_img} alt=".."/>
  </div>
  <div class="p-4 md:p-5">
    <h3 class="text-lg text-center font-bold text-gray-800 ">
      {category_name}
    </h3>
  </div>
  
</Link>

 </div>
    );
};

export default Category;