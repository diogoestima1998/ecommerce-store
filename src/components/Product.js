import React, {useState, useContext} from 'react';
import {Link} from "react-router-dom";
import {BsCartPlus} from "react-icons/bs"
import {CartContext} from '../contexts/CartContext'
import Rating from '@mui/material/Rating';
import { FaMagnifyingGlass } from "react-icons/fa6";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Product = ({product}) => {
  const {addToCart} = useContext(CartContext);
  const {id, image, category, title, price, rating} = product;
  const [open, setOpen] = useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      onClick={handleClose}
      style={{
        backgroundColor: 'green',
      }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
  <div>
    {/* Cards */}
    <div className='border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-[200px] mx-auto flex justify-center items-center'>
          <img className='max-h-[160px] group-hover:scale-110 transition duration-300' src={image} alt=''></img>
        </div>
      </div>
      {/* Buttons */}
      <div className='absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
        <button onClick={() => {
          addToCart(product, id)
          setOpen(true);
        }}>
          <div className='flex justify-center items-center text-white w-12 h-12 bg-red-500'>
            <BsCartPlus  className='text-3xl'/>
          </div>
        </button>
        <Link to={`/product/${id}`} className='w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl'>
          <FaMagnifyingGlass />
        </Link>
      </div>
    </div>
    {/* Descriptions */}
    <div>
      <div className='text-sm capitalize text-gray-500 mb-1'>{category}</div>
      <Link to={`/product/${id}`}>
        <h2 className='font-semibold mb-1'>{title}</h2>
        <h2 className='font-semibold mb-1 flex'> {rating.rate}&nbsp;<Rating name="half-rating" defaultValue={rating.rate} precision={0.01} readOnly/>&nbsp;<span className='text-sm text-gray-500 flex justify-center items-center'>({rating.count})</span></h2>
      </Link>
      <div className='font-semibold'>$ {price}</div>

    </div>
    {/* Snackbar */}
    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        Item added to the cart!
      </Alert>
    </Snackbar>
  </div>);
};

export default Product;
