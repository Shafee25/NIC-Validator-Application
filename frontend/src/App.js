import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import NicUploader from './components/NicUploader';
import Reports from './components/Reports';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import './App.css';

// Main application layout (after login)
// It now receives handleLogout as a prop
const MainLayout = ({ handleLogout }) => {
    const [activeView, setActiveView] = useState('dashboard');
    return (
        <div className="main-app-container">
            <header className="app-header">
                <h1>NIC Validator</h1>
                {/* This logout button is now correctly wired */}
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <nav className="main-nav">
                <button onClick={() => setActiveView('dashboard')} className={activeView === 'dashboard' ? 'active' : ''}>Dashboard</button>
                <button onClick={() => setActiveView('upload')} className={activeView === 'upload' ? 'active' : ''}>Upload Data</button>
                <button onClick={() => setActiveView('reports')} className={activeView === 'reports' ? 'active' : ''}>Reports</button>
            </nav>
            <div className="main-content">
                {activeView === 'dashboard' && <Dashboard />}
                {activeView === 'upload' && <NicUploader />}
                {activeView === 'reports' && <Reports />}
            </div>
        </div>
    );
};

function App() {
    // A more robust app would use localStorage or context to persist login state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // We need to use useNavigate here for the logout function
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        // CRUCIAL: Navigate back to the login page after logging out
        navigate('/');
    };
    
    // This component protects routes that require login
    const PrivateRoute = ({ children }) => {
        // If logged in, show the child component (MainLayout). Otherwise, redirect to the login page.
        // We wrap the children in our new centering div here.
        return isLoggedIn ? <div className="main-app-wrapper">{children}</div> : <Navigate to="/" />;
    };

    return (
        <Routes>
            <Route path="/" element={
                isLoggedIn ? <Navigate to="/app" /> : <AuthPage onLoginSuccess={handleLoginSuccess} />
            } />
            
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/app" element={
                <PrivateRoute>
                    <MainLayout handleLogout={handleLogout} />
                </PrivateRoute>
            } />
        </Routes>
    );
}

// We need to wrap App in BrowserRouter in index.js or here.
// Let's wrap it here to be self-contained.
const AppWrapper = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

export default AppWrapper;