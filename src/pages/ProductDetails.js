import React, {useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';

const ProductDetails = () => {
  //get product id from the url
  const {id} = useParams()
  const {products} = useContext(ProductContext);
  const {addToCart} = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const product = products.find(item => {
    return item.id === parseInt(id);
  })

  //if product is not found
  if(!product){
    return <section className='h-screen flex justify-center items-center'>Loading...</section>
  }

  //destructure product
  const {title, price, description, image, rating} = product;
  

  console.log("product:", product)

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
    <section className='pt-32 pb-12 lg:py-32 flex items-center pt-16 pb-16'>
      <div className='container mx-auto pt-16'>
        <div className='flex flex-col lg:flex-row items-center'>
          {/* image */}
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img className='max-w-[200px] lg:max-w-sm' src={image} alt=''/>
          </div>
          {/* text */}
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>
              {title}
            </h1>
            <div className='text-xl text-red-500 font-medium mb-6'>
                $ {price}
            </div>
            <h2 className='font-semibold mb-1 flex'> {rating.rate}&nbsp;<Rating name="half-rating" defaultValue={rating.rate} precision={0.01} readOnly/>&nbsp;<span className='text-sm text-gray-500 flex justify-center items-center'>({rating.count} Ratings)</span></h2>
            <p className='mb-8'>{description}</p>
            <button onClick={() => {
              addToCart(product, product.id)
              setOpen(true);
            }} className='bg-primary py-4 px-8 text-white'>
              Add to cart
            </button>
          </div>
        </div>
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
    </section>
    )
};

export default ProductDetails;
