import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const Checkout = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    address: '',
    country: '',
    zipcode: '',
    cardNumber: '',
    month: '',
    year: '',
    securityCode: '',
    cardName: ''
  });

  const [errors, setErrors] = useState({});

  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach(key => {
      if (!formData[key] && key !== 'month' && key !== 'year') {
        newErrors[key] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length === 0) {
      // Proceed with form submission, navigate with cart state, and clear cart
      navigate('/complete', { state: { cart, total } });
      clearCart();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="relative mx-auto w-full bg-white mt-24 lg:mt-16">
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
              Secure Checkout
              <span className="mt-2 block h-1 w-10 bg-[#0E2A47] sm:w-20"></span>
            </h1>
            <form className="mt-10 flex flex-col space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="text-xs font-semibold text-gray-500">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
              </div>
              <div>
                <label htmlFor="address" className="text-xs font-semibold text-gray-500">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="123 Main St"
                  value={formData.address}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${errors.address ? 'border-red-500' : ''}`}
                />
                {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
              </div>
              <div>
                <label htmlFor="country" className="text-xs font-semibold text-gray-500">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="USA"
                  value={formData.country}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${errors.country ? 'border-red-500' : ''}`}
                />
                {errors.country && <span className="text-red-500 text-xs">{errors.country}</span>}
              </div>
              <div>
                <label htmlFor="zipcode" className="text-xs font-semibold text-gray-500">ZIP Code</label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  placeholder="12345"
                  value={formData.zipcode}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${errors.zipcode ? 'border-red-500' : ''}`}
                />
                {errors.zipcode && <span className="text-red-500 text-xs">{errors.zipcode}</span>}
              </div>
              <div className="relative">
                <label htmlFor="card-number" className="text-xs font-semibold text-gray-500">Card number</label>
                <input
                  type="text"
                  id="card-number"
                  name="cardNumber"
                  placeholder="1234-5678-XXXX-XXXX"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className={`block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${errors.cardNumber ? 'border-red-500' : ''}`}
                />
                <img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" className="absolute bottom-3 right-3 max-h-4" />
                {errors.cardNumber && <span className="text-red-500 text-xs">{errors.cardNumber}</span>}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Expiration date</p>
                <div className="mr-6 flex flex-wrap">
                  <div className="my-1">
                    <label htmlFor="month" className="sr-only">Select expiration month</label>
                    <select
                      name="month"
                      id="month"
                      value={formData.month}
                      onChange={handleChange}
                      className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    >
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                  <div className="my-1 ml-3 mr-6">
                    <label htmlFor="year" className="sr-only">Select expiration year</label>
                    <select
                      name="year"
                      id="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative my-1">
                    <label htmlFor="security-code" className="sr-only">Security code</label>
                    <input
                      type="text"
                      id="security-code"
                      name="securityCode"
                      placeholder="Security code"
                      value={formData.securityCode}
                      onChange={handleChange}
                      className={`block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${errors.securityCode ? 'border-red-500' : ''}`}
                    />
                    {errors.securityCode && <span className="text-red-500 text-xs">{errors.securityCode}</span>}
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="card-name" className="sr-only">Card name</label>
                <input
                  type="text"
                  id="card-name"
                  name="cardName"
                  placeholder="Name on the card"
                  value={formData.cardName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500 ${errors.cardName ? 'border-red-500' : ''}`}
                />
                {errors.cardName && <span className="text-red-500 text-xs">{errors.cardName}</span>}
              </div>
              <button type="submit" className="mt-4 inline-flex w-full items-center justify-center rounded bg-[#0E2A47] py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">
                Place Order
              </button>
            </form>
            <p className="mt-10 text-center text-sm font-semibold text-gray-500">
              By placing this order you agree to the <a href="#" className="whitespace-nowrap text-[#0E2A47] underline hover:text-[#0E2aaa]">Terms and Conditions</a>
            </p>
          </div>
        </div>
        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Order summary</h2>
          <div>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-[#0E2A47] to-[#002144] opacity-95"></div>
          </div>
          <div className="relative">
            <ul className="space-y-5">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div className="inline-flex">
                    <div>
                        <img src={item.image} alt={item.name} className="max-h-16" />
                    </div>
                    <div className="ml-3 flex items-center">
                      <div className='flex flex-col'>
                        <p className="text-base font-semibold text-white">{item.amount}x&nbsp;</p>
                        <p className="text-base font-semibold text-white">{item.name}</p>
                      </div>
                      <p className="text-sm font-medium text-white text-opacity-80">{item.title}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">${item.price * item.amount}</p>
                </li>
              ))}
            </ul>
            <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
            <div className="space-y-2">
              <p className="flex justify-between text-lg font-bold text-white"><span>Total price:</span><span>${total.toFixed(2)}</span></p>
              <p className="flex justify-between text-sm font-medium text-white"><span>Vat: 10%</span><span>${(total * 0.1).toFixed(2)}</span></p>
            </div>
          </div>
          <div className="relative mt-10 text-white">
            <h3 className="mb-5 text-lg font-bold">Support</h3>
            <p className="text-sm font-semibold">+41 123 456 789 <span className="font-light">(International)</span></p>
            <p className="mt-1 text-sm font-semibold">support@diogoestima.com</p>
            <p className="mt-2 text-xs font-medium">Call us now for payment related issues</p>
          </div>
          <div className="relative mt-10 flex">
            <p className="flex flex-col"><span className="text-sm font-bold text-white">Money Back Guarantee</span><span className="text-xs font-medium text-white">within 30 days of purchase</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
