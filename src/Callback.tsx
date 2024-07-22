// src/Callback.js

import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

const Callback: React.FC = () => {
    const navigate = useNavigate();
    const [isHandled, setIsHandled] = useState(false);

    useEffect(() => {
        const handleAuthCallback = async () => {
            if (!isHandled) {
                setIsHandled(true);
                await AuthService.handleCallback();
                navigate('/home');
            }
        };

        handleAuthCallback();
    }, [isHandled, navigate]);

    return <div>Loading...</div>;
};

export default Callback;
