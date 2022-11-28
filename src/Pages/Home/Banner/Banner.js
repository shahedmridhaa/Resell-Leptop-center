import React from 'react'
import bannerright from '../../../assest/bannerrightimg.png'

const Banner = () => {
  return (
    <div className="banner bg-slate-50 py-32">
      <div className="container mx-auto">
        <div className="w-full sm:px-3">
          <div className=" flex flex-col justify-between items-center lg:flex-row-reverse sm:mx-auto">
            <div>
            <img src={bannerright} alt="..." className="max-w-xl sm:mx-auto w-96 lg:w-full" />
            </div>
            <div className="sm:pt-20">
              <h1 className="text-4xl font-bold">CHOOSE YOUR LEPTOP</h1>
              <p className="py-6">
                Looking for a good essay, research or speech topic on Laptop?
                <br></br> ✓ Check our list of Here is different kind of leptop
              </p>
              <button className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-none">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  )
}

export default Banner
