import React from 'react';
import AuthService from './AuthService';
import './css/LandingPage.css';

const LandingPage: React.FC = () => {
    const login = () => {
        AuthService.login();
    };

    return (
        <div className="landing-page">
            <img src="/america.png" alt="Logo" className="logo" />
            <button onClick={login} className="login-button">Login</button>
        </div>
    );
};

export default LandingPage;
