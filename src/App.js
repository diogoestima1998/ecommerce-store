import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Complete from './pages/Complete';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import AllProducts from './pages/AllProducts';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/complete" element={<Complete />} />
            <Route path="/all-products" element={<AllProducts />} />
          </Routes>
          <Sidebar />
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
