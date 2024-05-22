import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Complete from './pages/Complete';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return <div className='overflow-hidden'>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/complete' element={<Complete/>}/>
      </Routes>
      <Sidebar/>
      <Footer/>
    </Router>
  </div>;
};

export default App;