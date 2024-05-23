import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Footer from './Footer';

describe('Footer', () => {
  test('renders the footer with copyright text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/Copyright © Diogo Estima 2024. All Rights Reserved./i);
    expect(copyrightText).toBeInTheDocument();
  });

  test('renders the footer with email', () => {
    render(<Footer />);
    const emailText = screen.getByText(/diogoestimabiz@gmail.com/i);
    expect(emailText).toBeInTheDocument();
  });
});
