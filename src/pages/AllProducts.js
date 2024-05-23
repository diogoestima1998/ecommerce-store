import React, { useContext, useState } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';
import Hero from '../components/Hero';
import { TextField, MenuItem, Select, FormControl, InputLabel, Box, Typography } from '@mui/material';

const AllProducts = () => {
  const { products } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  // Filter and sort products based on search term, selected category, and sorting criteria
  const filteredProducts = products
    .filter((item) => {
      return (
        (category === '' || item.category === category) &&
        (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    })
    .sort((a, b) => {
      switch (sortCriteria) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'best-reviews':
          return b.rating.rate - a.rating.rate;
        case 'most-ordered':
          return b.rating.count - a.rating.count;
        default:
          return 0;
      }
    });

  return (
    <div>
      <section id="products" className="py-16 h-full">
        <div className="container mx-auto">
          <Box className="mt-24 flex flex-wrap gap-4">
            <FormControl sx={{ mb: 2, flex: '1 1 20rem' }}>
              <TextField
                label="Search Products"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ mb: 2, flex: '1 1 10rem' }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="jewelery">Jewelry</MenuItem>
                <MenuItem value="men's clothing">Men's Clothing</MenuItem>
                <MenuItem value="women's clothing">Women's Clothing</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mb: 2, flex: '1 1 10rem' }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="best-reviews">Best Reviews</MenuItem>
                <MenuItem value="most-ordered">Most Ordered</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography variant="h6" component="div" gutterBottom>
            Showing {filteredProducts.length} products
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllProducts;
