import { Carousel } from 'antd'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const CarouselImages = ({ images, title }) => {
  return (
    <div className='flex my-8 px-6 flex-col justify-center sm:flex-row'>
      <Carousel autoplay className='w-full sm:w-[500px] md:w-[500px] h-[600px]'>
        {images?.map(item => {
          return (
            <img
              key={uuidv4()}
              src={item}
              alt={title}
              className='w-full sm:w-[550px] md:w-[600px] md:h-[700px] h-[600px] sm:h-[800px] object-cover'
            />
          )
        })}
      </Carousel>
    </div>
  
  )
}

export default CarouselImages