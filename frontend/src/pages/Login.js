import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../util';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo),
                credentials: 'include'
            });

            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                handleError(error?.details[0].message || 'Error occurred');
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError('An error occurred during login');
        }
    };

    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: "url('https://www.shutterstock.com/image-illustration/3d-render-human-social-network-600nw-548542618.jpg')", // Full-page background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div style={{ position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)', fontStyle: 'italic', color: 'white' }}>
                PhoneBook Management
            </div>
            <form 
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent form background
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                    width: '300px',
                    textAlign: 'center'
                }}
            >
                <h1>Login</h1>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        value={loginInfo.email}
                        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px' }}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password'
                        value={loginInfo.password}
                        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px' }}
                    />
                </div>
                <button 
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Login
                </button>
                <span>Don't have an account? <Link to="/signup">Signup</Link></span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
