import React from 'react'
import { AnimatedTestimonials } from './AnimatedTestimonial'
import kizukis from '../../constants'

function Kizuki() {
  return (
    <div className='relative h-auto w-screen bg-slate-900 flex flex-col py-[4rem] md:[8rem] gap-10 border border-spacing-y-1 px-4 overflow-x-hidden'>
      <span>
      <p className='text-white text-center font-anime text-[1.6rem] sm:text-[2.3rem]'>Blood and shadows entwine to form our art. <br />We are the <span className='text-red-500 bg-white p-2'>Kizukis!</span></p>
      </span>
      <AnimatedTestimonials testimonials={kizukis} autoplay={true}/>
    </div>
  )
}

export default Kizuki