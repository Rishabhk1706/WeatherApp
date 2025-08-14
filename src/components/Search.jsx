import { useState } from 'react';

function Search({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form" autoComplete="off">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
        aria-label="City"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
