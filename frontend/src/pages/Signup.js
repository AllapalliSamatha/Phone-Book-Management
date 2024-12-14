import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../util';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, name, password } = signupInfo;

        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }

        try {
            const url = "http://localhost:8080/auth/signup"; // Updated to http
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo),
                credentials: 'include'
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError('An error occurred during signup');
            console.error('Error:', err);
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
            <div style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', fontStyle: 'italic', color: 'white' }}>
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
                <h1>Signup</h1>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter Your Name...'
                        value={signupInfo.name}
                        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px' }}
                    />

                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter Your email...'
                        value={signupInfo.email}
                        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px' }}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter Your password...'
                        value={signupInfo.password}
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
                    Signup
                </button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
