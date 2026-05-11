import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { products, categories } from '../data/mockData';
import './Products.css';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="products-page py-12">
      <div className="container">
        
        {/* Page Header */}
        <div className="products-header">
          <h1 className="page-title">Shop Groceries</h1>
          <div className="products-search-bar">
            <input type="text" placeholder="Search products..." className="products-search-input" />
            <Search className="search-icon" size={18} />
          </div>
        </div>

        <div className="products-layout">
          {/* Sidebar Filters */}
          <aside className="products-sidebar">
            <div className="filter-card">
              <div className="filter-header">
                <h3 className="filter-title">Categories</h3>
                <Filter size={16} className="text-gray" />
              </div>
              <ul className="category-list">
                <li 
                  className={`category-item ${activeCategory === 'All' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('All')}
                >
                  All Products
                </li>
                {categories.map(cat => (
                  <li 
                    key={cat.id} 
                    className={`category-item ${activeCategory === cat.name ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-card">
              <h3 className="filter-title">Price Range</h3>
              <div className="price-inputs">
                <input type="number" placeholder="Min" className="price-input" />
                <span>-</span>
                <input type="number" placeholder="Max" className="price-input" />
              </div>
              <Button variant="outline" className="w-full mt-4">Apply Filter</Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="products-main">
            <div className="products-top-bar">
              <p className="results-count">Showing {filteredProducts.length} results</p>
              <select className="sort-select">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
        
      </div>
    </div>
  );
};

export default Products;
