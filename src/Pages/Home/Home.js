import React from 'react'
import Banner from './Banner/Banner'
import Categories from './Categories/ProductCategory/Categories'
import Testimonial from './Testimonial/Testimonial'
import Advertised from './Advertised/Advertised'

const Home = () => {
  return (
    <div>
      <div>
        <Banner></Banner>
        <Categories></Categories>
        <Advertised></Advertised>
        <Testimonial></Testimonial>
      </div>
    </div>
  )
}

export default Home
