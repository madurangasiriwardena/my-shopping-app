// src/Home.js

import React, { useEffect, useState } from 'react';
import AuthService from './AuthService';
import apiCall from './api';

const Home = () => {
    const [user, setUser] = useState(null);
    const [apiResponse, setApiResponse] = useState(null);

    useEffect(() => {
        AuthService.getUser().then(setUser);
    }, []);

    const callFederatedApi = async () => {
        try {
            const federatedToken = await AuthService.getFederatedToken();
            console.log('Federated token:', federatedToken);
            const response = await apiCall('https://example.com/', federatedToken);
            setApiResponse(response);
        } catch (error) {
            console.error('API call failed:', error);
        }
    };

    return (
        <div>
            <h1>Home</h1>
            {user ? <div>Welcome, {user.profile.name}</div> : <div>Please log in.</div>}
            <button onClick={callFederatedApi}>Call API with Federated Token</button>
            {apiResponse && <div>API Response: {JSON.stringify(apiResponse)}</div>}
        </div>
    );
};

export default Home;
