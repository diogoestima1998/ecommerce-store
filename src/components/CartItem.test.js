import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import CartItem from './CartItem';
import '@testing-library/jest-dom/extend-expect';

// Mock data
const mockItem = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120
  },
  amount: 2
};

const mockRemoveFromCart = jest.fn();
const mockIncreaseAmount = jest.fn();
const mockDecreaseAmount = jest.fn();

const renderCartItem = (item = mockItem) => {
  return render(
    <CartContext.Provider value={{
      removeFromCart: mockRemoveFromCart,
      increaseAmount: mockIncreaseAmount,
      decreaseAmount: mockDecreaseAmount
    }}>
      <BrowserRouter>
        <CartItem item={item} />
      </BrowserRouter>
    </CartContext.Provider>
  );
};

describe('CartItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders CartItem component with item details', () => {
    renderCartItem();

    expect(screen.getByText(/Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i)).toBeInTheDocument();
    expect(screen.getByText(/\$ 109.95/i)).toBeInTheDocument();
    expect(screen.getByText(/\$ 219.90/i)).toBeInTheDocument(); // 109.95 * 2
  });

  test('calls removeFromCart when the remove icon is clicked', () => {
    renderCartItem();

    fireEvent.click(screen.getByTestId('remove-button'));
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockItem.id);
  });

  test('calls increaseAmount when the plus icon is clicked', () => {
    renderCartItem();

    fireEvent.click(screen.getByTestId('increase-button'));
    expect(mockIncreaseAmount).toHaveBeenCalledWith(mockItem.id);
  });

  test('calls decreaseAmount when the minus icon is clicked', () => {
    renderCartItem();

    fireEvent.click(screen.getByTestId('decrease-button'));
    expect(mockDecreaseAmount).toHaveBeenCalledWith(mockItem.id);
  });
});
