import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { products } from '../data/mockData';
import './Cart.css';

const Cart = () => {
  // Demo cart items
  const cartItems = [
    { ...products[0], quantity: 2 },
    { ...products[2], quantity: 1 },
    { ...products[3], quantity: 1 }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const delivery = 5.00;
  const total = subtotal + tax + delivery;

  return (
    <div className="cart-page py-12">
      <div className="container">
        <h1 className="page-title mb-8">Shopping Cart</h1>

        <div className="cart-layout">
          {/* Cart Items List */}
          <div className="cart-items-section">
            <div className="cart-header">
              <span className="col-product">Product</span>
              <span className="col-price">Price</span>
              <span className="col-qty">Quantity</span>
              <span className="col-total">Total</span>
              <span className="col-action"></span>
            </div>
            
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="col-product item-info">
                    <img src={item.image} alt={item.name} className="item-img" />
                    <div>
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-vendor">{item.vendor}</p>
                    </div>
                  </div>
                  
                  <div className="col-price item-price">
                    ${item.price.toFixed(2)}
                  </div>
                  
                  <div className="col-qty">
                    <div className="qty-control">
                      <button className="qty-btn"><Minus size={14} /></button>
                      <span className="qty-val">{item.quantity}</span>
                      <button className="qty-btn"><Plus size={14} /></button>
                    </div>
                  </div>
                  
                  <div className="col-total item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <div className="col-action">
                    <button className="remove-btn">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>${delivery.toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <Link to="/checkout" style={{ width: '100%', display: 'block' }}>
              <Button size="lg" className="checkout-btn">
                Proceed to Checkout <ArrowRight size={18} />
              </Button>
            </Link>
            
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Cart;
