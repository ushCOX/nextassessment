// Remove the line "use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch the list of categories
        axios.get('https://dummyjson.com/products/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleCategoryClick = (category: string) => {
        // Fetch the products of the selected category
        axios.get(`https://dummyjson.com/products/${category}`)
            .then(response => {
                setProducts(response.data);
                setSelectedCategory(category);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    return (
        <div>
            <h2>Product Categories</h2>
            <ul>
                {categories.map(category => (
                    <li key={category} onClick={() => handleCategoryClick(category)}>
                        {category}
                    </li>
                ))}
            </ul>

            {selectedCategory && (
                <div>
                    <h3>Products of {selectedCategory}</h3>
                    <ul>
                        {products.map((product: { id: string, name: string }) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProductList;