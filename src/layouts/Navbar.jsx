import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import logo from '../assets/whiteocean.png';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        
        {/* Logo Section */}
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="WhiteOcean Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">
            White<span className="text-primary">Ocean</span>
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="navbar-search hidden-mobile">
          <input type="text" placeholder="Search for groceries..." className="search-input" />
          <button className="search-btn">
            <Search size={18} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-links hidden-mobile">
          <Link to="/products" className="nav-link">Shop</Link>
          <Link to="/vendors" className="nav-link">Vendors</Link>
          <Link to="/vendor/dashboard" className="nav-link">Vendor Dashboard</Link>
        </div>

        {/* Icons */}
        <div className="navbar-icons">
          <Link to="/profile" className="icon-btn hidden-mobile">
            <User size={22} />
          </Link>
          <Link to="/cart" className="icon-btn cart-btn">
            <ShoppingCart size={22} />
            <span className="cart-badge">3</span>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="icon-btn mobile-menu-btn hidden-desktop"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="container">
            <div className="navbar-search mobile-search">
              <input type="text" placeholder="Search for groceries..." className="search-input" />
              <button className="search-btn"><Search size={18} /></button>
            </div>
            <div className="mobile-links">
              <Link to="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/products" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
              <Link to="/vendors" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Vendors</Link>
              <Link to="/profile" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
              <Link to="/vendor/dashboard" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Vendor Dashboard</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
