import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div>Loading...</div>; // Placeholder for now

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location, message: "Access only for college students" }} replace />;
    }

    return children;
};

export default ProtectedRoute;
