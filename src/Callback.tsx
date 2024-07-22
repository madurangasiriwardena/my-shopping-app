// src/Callback.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Ensures the callback is handled only once
        const handleAuthCallback = async () => {
            try {
                await AuthService.handleCallback();
                navigate('/');
            } catch (error) {
                console.error('Error handling callback:', error);
            }
        };
        handleAuthCallback();
    }, [navigate]);
    return <div>Loading...</div>;
};

export default Callback;
