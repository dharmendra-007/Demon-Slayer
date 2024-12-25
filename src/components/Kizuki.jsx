import React from 'react'
import { AnimatedTestimonials } from './AnimatedTestimonial'
import kizuki from '../../constants'

function Kizuki() {
  return (
    <div className='relative h-screen w-screen bg-[#242121] flex flex-col  gap-16 border border-spacing-y-1'>
      <span>
      <p className='text-white text-center font-anime py-10 text-[2.5rem]'>Blood and shadows entwine to form our art. <br />We are the <span className='text-red-500 bg-white p-2'>Kizukis!</span></p>
      </span>
      <AnimatedTestimonials testimonials={kizuki} autoplay={true}/>
    </div>
  )
}

export default Kizuki