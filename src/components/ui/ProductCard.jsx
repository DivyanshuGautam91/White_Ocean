import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import Button from './Button';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="product-image-container">
        {product.discount > 0 && (
          <span className="product-badge">-{product.discount}%</span>
        )}
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      
      <div className="product-content">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <Star size={14} fill="var(--color-accent)" color="var(--color-accent)" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <h3 className="product-name">{product.name}</h3>
        <p className="product-vendor">by {product.vendor}</p>
        
        <div className="product-footer">
          <div className="product-price">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="old-price">
                ${((product.price * 100) / (100 - product.discount)).toFixed(2)}
              </span>
            )}
          </div>
          
          <Button size="sm" className="add-to-cart-btn">
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
