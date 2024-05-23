import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Hero from './Hero';
import { BrowserRouter as Router } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}));

const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

describe('Hero', () => {
  test('renders the pretitle', () => {
    renderWithRouter(<Hero />);
    const pretitleElement = screen.getByText(/discover the latest trends in fashion/i);
    expect(pretitleElement).toBeInTheDocument();
  });

  test('renders the title', () => {
    renderWithRouter(<Hero />);
    const titleElement = screen.getByText(/upgrade your style/i);
    expect(titleElement).toBeInTheDocument();
    const subtitleElement = screen.getByText(/elevate your confidence/i);
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders the "Shop Now" link', () => {
    renderWithRouter(<Hero />);
    const shopNowLink = screen.getByText(/shop now/i);
    expect(shopNowLink).toBeInTheDocument();
    expect(shopNowLink).toHaveAttribute('href', '#products');
  });

  test('renders the image on larger screens', () => {
    useMediaQuery.mockReturnValue(false); // Simulate larger screen
    renderWithRouter(<Hero />);
    const imageElement = screen.getByAltText('');
    expect(imageElement).toBeInTheDocument();
  });


});
