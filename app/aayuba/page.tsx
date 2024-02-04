'use client';
import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchData = await fetch(
        'https://dummyjson.com/products/categories',
      );
      if (!fetchData.ok) {
        alert('Error occurred');
      }
      const res = await fetchData.json();
      setCategories(res);
    };
    // Fetch the list of categories
    fetchCategories();
  }, []);

  const handleCategoryClick = async (category: string) => {
    // Fetch the products of the selected category
    const fetchData = await fetch(
      `https://dummyjson.com/products/category/${category}`,
    );
    if (!fetchData.ok) {
      alert('Error occurred');
    }
    const res = await fetchData.json();
    setSelectedCategory(category);
    setProducts(res.products);
    // Fetch the list of categories
  };
  return (
    <div>
      <h2>Product Categories</h2>
      <div className="flex justify-between">
        <ul>
          {categories.map((category) => (
            <li key={category} onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          ))}
        </ul>

        {selectedCategory.length > 0 && (
          <div>
            <h3>Products of {selectedCategory}</h3>
            <ul>
              {products.map((product: { id: string; title: string }) => (
                <li key={product.id}>{product.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
