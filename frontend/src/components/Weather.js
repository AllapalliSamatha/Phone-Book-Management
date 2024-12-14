


import React, { useEffect, useState } from 'react';
import './Weather.css';

function Weather() {
    const [temperature, setTemperature] = useState(null);
    const [locationName, setLocationName] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeather(latitude, longitude);
                    },
                    () => {
                        setError('Unable to retrieve your location');
                    }
                );
            } else {
                setError('Geolocation is not supported by your browser');
            }
        };

        getCurrentLocation(); // Fetch the location on mount

        const intervalId = setInterval(() => {
            getCurrentLocation(); // Fetch location every 60 seconds
        }, 60000);

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    const fetchWeather = async (latitude, longitude) => {
        const apiKey = '54ab7db4359ef25af9b8a0e0f48e95a5'; // Replace with your actual API key
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setTemperature(data.main.temp);
            setLocationName(data.name);
            setWeatherIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        } catch (error) {
            setError('Failed to fetch weather data');
        }
    };

    return (
        <div className="weather-container">
            {error ? (
                <p className="weather-error">{error}</p>
            ) : temperature !== null && locationName !== null ? (
                <>
                    <img src={weatherIcon} alt="Weather Icon" className="weather-icon" />
                    <p className="weather-text">
                        Current temperature: {temperature}°C in {locationName}
                    </p>
                </>
            ) : (
                <p className="weather-text">Loading...</p>
            )}
        </div>
    );
}

export default Weather;

