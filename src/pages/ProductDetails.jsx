import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, Heart, Truck, ShieldCheck } from 'lucide-react';
import Button from '../components/ui/Button';
import { products } from '../data/mockData';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  
  // For demo purposes, we just grab the first product if ID is missing or invalid
  const product = products.find(p => p.id === parseInt(id)) || products[0];

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="product-details-page py-12">
      <div className="container">
        
        <div className="details-layout">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="main-image-wrapper">
              {product.discount > 0 && (
                <span className="badge-discount">-{product.discount}%</span>
              )}
              <img src={product.image} alt={product.name} className="main-image" />
            </div>
            <div className="thumbnail-list">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`thumbnail ${i === 1 ? 'active' : ''}`}>
                  <img src={product.image} alt={`${product.name} thumb ${i}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <div className="breadcrumb">
              <span>Home</span> / <span>Shop</span> / <span>{product.category}</span> / <span className="current">{product.name}</span>
            </div>
            
            <h1 className="product-title">{product.name}</h1>
            
            <div className="meta-row">
              <div className="rating-box">
                <Star size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                <span>{product.rating}</span>
                <span className="reviews-count">(124 reviews)</span>
              </div>
              <span className="stock-status in-stock">In Stock</span>
            </div>
            
            <p className="vendor-link">Sold by: <strong>{product.vendor}</strong></p>

            <div className="price-box">
              <span className="price-current">${product.price.toFixed(2)}</span>
              {product.discount > 0 && (
                <span className="price-old">
                  ${((product.price * 100) / (100 - product.discount)).toFixed(2)}
                </span>
              )}
            </div>
            
            <p className="product-desc">{product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

            <hr className="divider" />

            {/* Actions */}
            <div className="actions-row">
              <div className="quantity-selector">
                <button onClick={handleDecrease} className="qty-btn"><Minus size={16} /></button>
                <span className="qty-value">{quantity}</span>
                <button onClick={handleIncrease} className="qty-btn"><Plus size={16} /></button>
              </div>
              
              <Button size="lg" className="add-to-cart-primary">
                <ShoppingCart size={20} /> Add to Cart
              </Button>
              
              <button className="wishlist-btn">
                <Heart size={24} color="var(--color-text-gray)" />
              </button>
            </div>

            {/* Features */}
            <div className="features-box">
              <div className="feature-item">
                <Truck size={24} className="text-primary" />
                <div>
                  <h4>Free Delivery</h4>
                  <p>On orders over $50</p>
                </div>
              </div>
              <div className="feature-item">
                <ShieldCheck size={24} className="text-primary" />
                <div>
                  <h4>Quality Guarantee</h4>
                  <p>100% fresh or refund</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
