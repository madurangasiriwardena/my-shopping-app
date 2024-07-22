import React, { useState, useEffect } from 'react';
import './css/ProductList.css';
import AuthService from "./AuthService";
import apiCall from "./api";

interface Product {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: {
        count: number;
        rate: number;
    };
    title: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await apiCall('http://127.0.0.1:5000/api/shopping-list', false);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('API call failed:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.title} className="product-image" />
                    <div className="product-details">
                        <h2 className="product-title">{product.title}</h2>
                        <p className="product-description">{product.description}</p>
                        <div className="product-price-rating">
                            <span className="product-price">${product.price}</span>
                            <span className="product-rating">{product.rating.rate} ★ ({product.rating.count} reviews)</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
