import React from 'react';
import ProductList from './ProductList';
import './css/Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <ProductList />
        </div>
    );
};

export default Home;
