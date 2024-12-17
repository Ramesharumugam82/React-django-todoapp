// src/Auth.js
import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin
                ? 'http://127.0.0.1:8000/api/login/'
                : 'http://127.0.0.1:8000/api/signup/';
            const data = isLogin
                ? { username, password }
                : { username, password, email };

            const response = await axios.post(url, data);
            setSuccess(response.data.message);
            setError('');
            if (isLogin) {
                onLogin(); // Call the onLogin function passed as a prop
            }
        } catch (err) {
            setError(isLogin ? 'Invalid credentials' : 'Error creating user');
            setSuccess('');
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                {!isLogin && (
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                Switch to {isLogin ? 'Signup' : 'Login'}
            </button>
        </div>
    );
};

export default Auth;