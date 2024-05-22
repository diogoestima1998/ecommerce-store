import React, { useContext, useState, useEffect } from 'react';
import { SidebarContext } from '../contexts/SidebarContext'; //Sidebar context
import { CartContext } from '../contexts/CartContext'; //Sidebar context
import {BsBag} from 'react-icons/bs';
import { AiOutlineShoppingCart } from "react-icons/ai";
import {Link, useNavigate } from 'react-router-dom';
/* import Logo from '../img/men-suit-icon.svg';
 */


const Header = () => {
  const navigate = useNavigate(); // Define navigate using useNavigate

  const [isActive, setIsActive] = useState(false);
  const {isOpen, setIsOpen} = useContext(SidebarContext);
  const {itemAmount} = useContext(CartContext);

  const Logo = () => (
    <svg className="w-[40px]" width="40" height="40" viewBox="0 0 122.88 115.02" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <g>
        <path className="st0" fillRule="evenodd" clipRule="evenodd" d="M108.24,14.64C99.41,10.89,90.57,7.49,81.92,0c3.59,12.4-6.64,40.68-20.59,73.22 C51.98,47.94,40.7,21.82,41.02,0c-3.33,3.37-7.53,6.09-12.15,8.49l-14.43,6.37c-4.28,1.83-5.85,6.59-6.15,12.73 C3.8,56.66-0.14,85.74,0,114.81h21.22L24.2,67.7c1.38,4.24,2.45,8.67,3.23,13.41c1.65,10,1.33,15.39,0.25,25.21l-0.93,8.49h31.94 l2.81-15.43l3.24,15.64H96.4l-0.83-8.53c-0.93-9.53-1.21-14.37,0.28-24.04c0.73-4.75,1.73-9.6,2.95-14.52l2.86,47.08h21.22 c-0.1-28.29-3.16-56.82-8.28-85.53C114.81,21.22,112.67,16.29,108.24,14.64L108.24,14.64z M64.24,17.2l6.47,17.24l-3.54,2.11 l0.99,6.53h0c0.03,0.23-0.05,0.46-0.23,0.62l-7.1,6.07c-0.24,0.23-0.61,0.25-0.88,0.05l-7.47-5.64c-0.21-0.14-0.32-0.4-0.29-0.66 l4.41-29.49c0.03-0.35,0.33-0.62,0.68-0.62h5.79l0,0c0.34,0,0.63,0.24,0.68,0.59L64.24,17.2L64.24,17.2L64.24,17.2z M55.14,1.93 l2.46,6.93h4.93l2.84-6.92c-1.8-1.18-3.55-1.77-5.25-1.77C58.44,0.17,56.78,0.76,55.14,1.93L55.14,1.93L55.14,1.93z M61.44,91.68 c1.37,0,2.48,1.11,2.48,2.48c0,1.37-1.11,2.48-2.48,2.48c-1.37,0-2.48-1.11-2.48-2.48C58.96,92.79,60.07,91.68,61.44,91.68 L61.44,91.68z M79.64,40.51h16.52c0.14,0,0.26,0.12,0.26,0.26v3.65c0,0.14-0.12,0.26-0.26,0.26H79.64c-0.14,0-0.26-0.12-0.26-0.26 v-3.65C79.39,40.62,79.5,40.51,79.64,40.51L79.64,40.51z M61.44,75.97c1.37,0,2.48,1.11,2.48,2.48s-1.11,2.48-2.48,2.48 c-1.37,0-2.48-1.11-2.48-2.48S60.07,75.97,61.44,75.97L61.44,75.97z"/>
      </g>
    </svg>
  );

  
  //event listener
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
    });
  })
  
  const handleLinkClick = (event, targetId) => {
    event.preventDefault();
    navigate(`/#${targetId}`);
    // Delay to allow navigation to complete before scrolling
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className={`${isActive ? 'bg-white py-4 shadow-md': 'bg-none py-6 bg-black'} fixed w-full z-10 transition-all`}>
      <div className='container mx-auto flex items-center justify-between h-full'>
        {/* Logo */}
        <Link to={'/'}>
          <div className={`${isActive ? 'text-black' : 'text-white'}`}>
            <Logo />
          </div>
        </Link>
        {/* Navigation Links */}
        <nav className='flex gap-8'>
          <Link to="/#home" onClick={(e) => handleLinkClick(e, 'home')} className={`${isActive ? 'text-black' : 'text-white'} text-lg`}>
            HOME
          </Link>
          <Link to="/#products" onClick={(e) => handleLinkClick(e, 'products')} className={`${isActive ? 'text-black' : 'text-white'} text-lg`}>
            PRODUCTS
          </Link>
          <Link to="/#contacts" onClick={(e) => handleLinkClick(e, 'contacts')} className={`${isActive ? 'text-black' : 'text-white'} text-lg`}>
            CONTACTS
          </Link>
        </nav>
        {/* Cart */}
        <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer flex relative'>
          <AiOutlineShoppingCart className={`${isActive ? 'text-black' : 'text-white'} text-3xl`}/>
          <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>{itemAmount}</div>
        </div>
      </div>
    </header>
  )
};

export default Header;
