import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';

import CartItem from '../components/CartItem';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckoutClick = (e) => {
    if (itemAmount > 0) {
      handleClose();
      navigate('/checkout');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      e.preventDefault();
    }
  };

  return (
    <div className={`${isOpen ? 'right-0' : '-right-full'} w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}>
      <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-sm font-semibold'>Shopping Bag ({itemAmount})</div>
        {/* icons */}
        <div onClick={handleClose} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
          <IoMdArrowForward className='text-2xl' />
        </div>
      </div>
      <div className='flex flex-col gap-y-2 h-[485px] lg:h-[640px] overflow-y-auto overflow-x-hidden border-b'>
        {cart.map(item => {
          return <CartItem item={item} key={item.id} />
        })}
      </div>
      <div className='flex flex-col'>
        <div className='flex w-full justify-between items-center'>
          {/* total */}
          <div className='uppercase font-semibold'>
            <span className='mr-2'>Total:</span> $ {parseFloat(total).toFixed(2)}
          </div>
          {/* clear cart icon */}
          <div onClick={clearCart} className='cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl'>
            <FiTrash2 />
          </div>
        </div>

        <Link
          to={itemAmount > 0 ? '/checkout' : '#'}
          className={`flex p-4 justify-center items-center w-full font-medium ${itemAmount > 0 ? 'bg-primary text-white cursor-pointer' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
          onClick={handleCheckoutClick}
        >
          Checkout
        </Link>
      </div>
    </div>
  )
};

export default Sidebar;
