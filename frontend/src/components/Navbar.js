// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../logo.jpg';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        toast.success('Logout successful');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.logoContainer}>
                <img src={logo} alt="Logo" style={styles.logo} />
            </div>
            <div style={styles.title}>
                <span className="scrolling-text">PHONE BOOK MANAGEMENT</span>
            </div>
            <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
            <ToastContainer />
            <style>
                {`
                .scrolling-text {
                    display: inline-block;
                    white-space: nowrap;
                    animation: scroll 10s linear infinite;
                    font-family: italic; // Apply font here as well
                }

                @keyframes scroll {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                `}
            </style>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#4b0082',
        color: '#e6e6fa',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
    },
    logo: {
        height: '50px',
        width: 'auto',
    },
    title: {
        flexGrow: 2,
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: '400',
        fontFamily: '"Dancing Script", cursive',
        overflow: 'hidden',
    },
    logoutButton: {
        padding: '10px 15px',
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: 'auto',
    },
};

export default Navbar;
