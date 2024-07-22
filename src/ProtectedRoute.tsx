import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from './AuthService';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isLoggedIn = AuthService.isLoggedIn();

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
