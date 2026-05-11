import React from 'react';
import { CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import './Checkout.css';

const Checkout = () => {
  return (
    <div className="checkout-page py-12">
      <div className="container">
        <h1 className="page-title mb-8">Checkout</h1>

        <div className="checkout-layout">
          {/* Left Column: Forms */}
          <div className="checkout-forms">
            
            {/* Shipping Address */}
            <div className="checkout-card">
              <h2 className="card-title"><Truck size={20} className="text-primary" /> Shipping Address</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" className="form-input" placeholder="John" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" className="form-input" placeholder="Doe" />
                </div>
                <div className="form-group full-width">
                  <label>Address</label>
                  <input type="text" className="form-input" placeholder="123 Main St" />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input type="text" className="form-input" placeholder="New York" />
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input type="text" className="form-input" placeholder="10001" />
                </div>
                <div className="form-group full-width">
                  <label>Phone Number</label>
                  <input type="tel" className="form-input" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="checkout-card">
              <h2 className="card-title"><CreditCard size={20} className="text-primary" /> Payment Method</h2>
              
              <div className="payment-options">
                <label className="payment-option selected">
                  <input type="radio" name="payment" defaultChecked />
                  <div className="option-content">
                    <span className="font-semibold">Credit/Debit Card</span>
                    <div className="card-icons">💳</div>
                  </div>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <div className="option-content">
                    <span className="font-semibold">PayPal</span>
                  </div>
                </label>
              </div>

              <div className="form-grid mt-6">
                <div className="form-group full-width">
                  <label>Card Number</label>
                  <input type="text" className="form-input" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" className="form-input" placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input type="text" className="form-input" placeholder="123" />
                </div>
                <div className="form-group full-width">
                  <label>Name on Card</label>
                  <input type="text" className="form-input" placeholder="John Doe" />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="order-summary-sidebar">
            <div className="checkout-card sticky-card">
              <h2 className="card-title">Order Summary</h2>
              
              <div className="summary-items">
                <div className="s-item">
                  <span>Organic Bananas x2</span>
                  <span>$9.98</span>
                </div>
                <div className="s-item">
                  <span>Whole Milk 1L x1</span>
                  <span>$2.99</span>
                </div>
                <div className="s-item">
                  <span>Atlantic Salmon x1</span>
                  <span>$15.99</span>
                </div>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-calc">
                <div className="s-row">
                  <span>Subtotal</span>
                  <span>$28.96</span>
                </div>
                <div className="s-row">
                  <span>Tax</span>
                  <span>$1.45</span>
                </div>
                <div className="s-row">
                  <span>Delivery</span>
                  <span>$5.00</span>
                </div>
              </div>

              <div className="summary-divider"></div>

              <div className="s-row s-total">
                <span>Total</span>
                <span>$35.41</span>
              </div>

              <Button size="lg" className="w-full mt-6 flex justify-center items-center gap-2">
                <CheckCircle2 size={20} /> Place Order
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
