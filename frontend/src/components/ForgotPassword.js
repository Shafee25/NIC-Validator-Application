// src/components/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // --- 1. Add loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsSuccess(false);
        setIsLoading(true); // --- 2. Set loading to true on submit

        try {
            const url = 'http://localhost/mobios-api/user/request_reset.php';
            const response = await axios.post(url, { email });
            setMessage(response.data.message);
            setIsSuccess(true);
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred.');
        } finally {
            setIsLoading(false); // --- 3. Set loading to false when done
        }
    };

    return (
        <div className="auth-form">
            <h2>Forgot Password</h2>
            <p>Enter your email to receive a reset link.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {/* --- 4. Disable button when loading --- */}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
            {message && <p style={{ color: isSuccess ? '#28a745' : '#dc3545' }}>{message}</p>}
        </div>
    );
};

export default ForgotPassword;