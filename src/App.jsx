import { useState } from 'react';
import Search from './components/Search';
import Weather from './components/Weather';

import blackcloud from './assets/blackcloud.png';
import clearsky from './assets/clearsky.png';
import raining from './assets/raining.png';
import sunshine from './assets/sunshine.png';
import image from './assets/image.png';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState("My Location");

  const getBackgroundImage = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear': return `url(${clearsky})`;
      case 'Rain':
      case 'Drizzle':
      case 'Thunderstorm': return `url(${raining})`;
      case 'Clouds': return `url(${blackcloud})`;
      case 'Snow': return `url(${clearsky})`;
      case 'Mist':
      case 'Fog':
      case 'Haze': return `url(${blackcloud})`;
      default: return `url(${sunshine})`;
    }
  };

  const fetchWeather = async (city) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('City not found!');
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setWeatherData({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoordinates = async (lat, lon) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Location not found!');
      const data = await response.json();
      setWeatherData(data);
      if (data.name && data.sys?.country) {
        setLocationName(`${data.name}, ${data.sys.country}`);
      }
    } catch (error) {
      setWeatherData({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const getLocationAndWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          alert('Could not get your location: ' + error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const weatherMain = weatherData?.weather?.[0]?.main;
  const backgroundImage = weatherMain ? getBackgroundImage(weatherMain) : `url(${sunshine})`;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', minWidth: '100vw' }}>
      <button
        className="location-button"
        onClick={getLocationAndWeather}
      >
        <img
          src={image}
          alt="Location Icon"
          className="location-icon"
        />
        {locationName}
      </button>
      <div
        className="app-background"
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          minWidth: '100vw',
          transition: 'background-image 0.5s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: '3rem',
        }}
      >
        <h1 className="title">🌤️ Weather App</h1>
        <Search onSearch={fetchWeather} />
        {loading && <p className="loading">Loading...</p>}
        <Weather data={weatherData} />
      </div>
    </div>
  );
}

export default App;
