// src/components/AuthPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// A single, reusable component for the form content
const AuthForm = ({ isLoginView, onLoginSuccess }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            const url = 'http://localhost/mobios-api/user/login.php';
            const response = await axios.post(url, { username, password });
            if (response.data.status === 'success') {
                onLoginSuccess();
                navigate('/app');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            const url = 'http://localhost/mobios-api/user/register.php';
            const response = await axios.post(url, { username, email, password });
            setMessage(response.data.message);
            // Optionally, switch to login view after successful registration
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>{isLoginView ? 'Login' : 'Register'}</h2>
            <form onSubmit={isLoginView ? handleLogin : handleRegister}>
                <div className="input-group">
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                {!isLoginView && (
                    <div className="input-group">
                        <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className="input-group">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {isLoginView && (
                    <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                )}

                <button type="submit" className="auth-button" disabled={isLoading}>
                    {isLoading ? 'Processing...' : (isLoginView ? 'Login' : 'Register')}
                </button>
            </form>
            {message && <p className="auth-message">{message}</p>}
        </div>
    );
};


const AuthPage = ({ onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-panel-left">
                    <div className="panel-content">
                        <h2>{isLoginView ? 'Hello, Welcome!' : 'Welcome!'}</h2>
                        <p>{isLoginView ? "Don't have an account?" : 'Already have an account?'}</p>
                        <button className="panel-button" onClick={() => setIsLoginView(!isLoginView)}>
                            {isLoginView ? 'Register' : 'Login'}
                        </button>
                    </div>
                </div>
                <div className="auth-panel-right">
                    <AuthForm isLoginView={isLoginView} onLoginSuccess={onLoginSuccess} />
                    <div className="social-login">
                        <div className="separator">or login with social platforms</div>
                        <div className="social-icons">
                            <button className="social-icon-btn">G</button>
                            <button className="social-icon-btn">f</button>
                            <button className="social-icon-btn">in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;