import React from 'react';
import menImg from '../img/men.png'
import { Link } from 'react-router-dom';
import { LinkScroll } from 'react-scroll';

const Hero = () => {
  return ( 
  <section id='home' className='h-[600px] bg-hero bg-no-repeat bg-cover bg-center py-24 mt-12'>
    <div className='container mx-auto flex justify-around h-full'>
      {/* text */}
      <div className='flex flex-col justify-center'>
        {/* pretitle */}
        <div className='font-semibold flex items-center uppercase'>
          <div className='w-10 h-[2px] bg-red-500 mr-3' ></div><span className='text-white'>Discover the latest trends in fashion.</span>
        </div>
        {/* title */}
        <h1 className='text-[70px] leading-[1.1] font-light mb-4 mt-4 text-white'>
          UPGRADE YOUR STYLE <br/>
          <span className='font-semibold text-[50px]'>Elevate Your Confidence</span>
        </h1>
        <a 
          href="#products" 
          className='self-start uppercase font-semibold border-b-2 border-white text-white cursor-pointer'
        >
          Shop Now
        </a>
      </div>
      {/* image */}
      <div className='hidden lg:block'>
        <img className='h-[568px]' src={menImg} alt=''/>
      </div>
    </div>
  </section>
  )
};

export default Hero;
