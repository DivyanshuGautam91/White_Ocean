import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/ui/Loader';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// Placeholder pages
const Profile = () => (
  <div className="container py-20">
    <h1>Profile</h1>
  </div>
);

const Vendors = () => (
  <div className="container py-20">
    <h1>Vendors</h1>
  </div>
);

const VendorDashboard = () => (
  <div className="container py-20">
    <h1>Vendor Dashboard</h1>
  </div>
);

const NotFound = () => (
  <div className="container py-20 text-center">
    <h1>404 - Page Not Found</h1>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      
      <div>
        <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;