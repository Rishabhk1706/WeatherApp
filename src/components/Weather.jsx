function Weather({ data }) {
  if (!data) return null;
  if (data.error) return <p className="error">{data.error}</p>;

  // Extract fields for easier use
  const {
    name,
    sys: { country, sunrise, sunset },
    weather,
    main,
    wind,
    clouds,
    visibility,
    timezone
  } = data;

  const weatherMain = weather[0].main;
  const weatherDesc = weather[0].description;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  // Convert Unix timestamps to readable local times, considering timezone offset in seconds
  const toLocalTime = (unixTime) => {
    return new Date((unixTime + timezone) * 1000).toUTCString().slice(17, 22);
  };

  return (
    <div className="weather-box">
      <h2>
        {name}, {country}
      </h2>
      <img src={iconUrl} alt={weatherDesc} />
      <p className="temperature">{Math.round(main.temp)}°C</p>
      <p className="description">
        {weatherMain} - {weatherDesc}
      </p>

      <div className="details-grid">
        <div><strong>Temperature:</strong> {main.temp}°C</div>
        <div><strong>Feels Like:</strong> {main.feels_like}°C</div>
        <div><strong>Min Temp:</strong> {main.temp_min}°C</div>
        <div><strong>Max Temp:</strong> {main.temp_max}°C</div>
        <div><strong>Humidity:</strong> {main.humidity}%</div>
        <div><strong>Visibility:</strong> {visibility} meters</div>
        <div><strong>Wind Speed:</strong> {wind.speed} m/s</div>
        <div><strong>Cloudiness:</strong> {clouds.all}%</div>
        <div><strong>Sunrise:</strong> {toLocalTime(sunrise)} (local time)</div>
        <div><strong>Sunset:</strong> {toLocalTime(sunset)} (local time)</div>
      </div>
    </div>
  );
}

export default Weather;
