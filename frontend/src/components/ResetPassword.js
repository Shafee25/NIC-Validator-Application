import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }
        try {
            const url = 'http://localhost/mobios-api/user/reset_password.php';
            const response = await axios.post(url, { token, password });
            setMessage(response.data.message);
            setIsSuccess(true);
            setTimeout(() => navigate('/'), 3000); // Redirect to login after 3s
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred.');
        }
    };
    
    if (!token) {
        return <p>Invalid request. No token provided.</p>;
    }

    return (
        <div className="auth-form">
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p style={{ color: isSuccess ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
};

export default ResetPassword;