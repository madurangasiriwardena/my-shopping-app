import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Callback from './Callback';
import LandingPage from './LandingPage';
import AuthService from './AuthService';
import './css/App.css';
import ProfileIcon from './icons/profile-icon.svg'; // Import as default
import LogoIcon from './icons/logo-icon.svg';
import ProtectedRoute from "./ProtectedRoute"; // Import as default

const App: React.FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn());

    useEffect(() => {
        const handleAuthChange = (event: CustomEvent) => {
            setIsLoggedIn(event.detail.isLoggedIn);
        };

        window.addEventListener('authChange', handleAuthChange as EventListener);

        return () => {
            window.removeEventListener('authChange', handleAuthChange as EventListener);
        };
    }, []);

    const login = () => {
        AuthService.login();
    };

    const logout = () => {
        AuthService.logout();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="App">
            {location.pathname !== '/' && (
                <header>
                    <nav>
                        <Link to="/home">
                            <img src={LogoIcon} alt="Logo" width="150" height="40" />
                        </Link>
                        <div className="profile-menu" onClick={toggleMenu}>
                            <img src={ProfileIcon} alt="Profile" width="40" height="40" /> {/* Profile icon */}
                        </div>
                        <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                            <Link to="/profile" onClick={toggleMenu}>Profile</Link>
                            {isLoggedIn ? (
                                <button onClick={() => { logout(); toggleMenu(); }}>Logout</button>
                            ) : (
                                <button onClick={() => { login(); toggleMenu(); }}>Login</button>
                            )}
                        </div>
                    </nav>
                </header>
            )}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/callback" element={<Callback />} />
            </Routes>
        </div>
    );
};

const AppWrapper: React.FC = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
