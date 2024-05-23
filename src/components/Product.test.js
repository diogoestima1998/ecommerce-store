import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Product from './Product';
import { CartContext } from '../contexts/CartContext';

// Mock product data
const mockProduct = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120
  }
};

// Mock CartContext
const mockAddToCart = jest.fn();

const renderWithRouter = (ui) => {
  return render(
    <Router>
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        {ui}
      </CartContext.Provider>
    </Router>
  );
};

describe('Product Component', () => {
  test('renders product details correctly', () => {
    renderWithRouter(<Product product={mockProduct} />);
    
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`(${mockProduct.rating.count})`)).toBeInTheDocument();
    
    const productImage = screen.getByAltText('');
    expect(productImage).toHaveAttribute('src', mockProduct.image);
  });

  test('calls addToCart when "Add to Cart" button is clicked', () => {
    renderWithRouter(<Product product={mockProduct} />);
    
    const addToCartButton = screen.getByRole('button');
    fireEvent.click(addToCartButton);
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, mockProduct.id);
  });

  test('displays Snackbar when "Add to Cart" button is clicked', () => {
    renderWithRouter(<Product product={mockProduct} />);
    
    const addToCartButton = screen.getByRole('button');
    fireEvent.click(addToCartButton);
    
    const snackbar = screen.getByText(/Item added to the cart!/i);
    expect(snackbar).toBeInTheDocument();
  });
});
