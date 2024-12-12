import React, { useState } from 'react';
import axios from 'axios';

function Imageapp() {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]); // State to store search results
  const [loading, setLoading] = useState(false); // Loading state

  const handleSearch = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          page: 1,
          query: inputValue,
          client_id: 'melu9q0-zc3VdcAD6hT5axlkpW5nmvc_vT2h3lJlgd8',
        },
      });
      setResults(response.data.results); // Update the results state
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h2>Search Image App</h2> <br />

      <div className="input">
        <input
          type="text"
          placeholder="Search here..."
          style={{
            height: '40px',
            width: '250px',
            backgroundColor: 'transparent',
            color: 'white',
            borderColor: 'white',
            borderRadius: '10px',
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="ms-2"
          style={{
            height: '45px',
            width: '100px',
            backgroundColor: 'green',
            color: 'white',
            borderRadius: '10px',
          }}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {loading ? (
        <p style={{ marginTop: '20px' }}>Loading...</p>
      ) : (
        <div
          className="images"
          style={{
            marginTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {results.length > 0 ? (
            results.map((item) => (
              <div key={item.id}>
                <img
                  src={item.urls.regular}
                  alt={item.alt_description || 'Image'}
                  style={{
                    width: '200px',
                    height: '200px',
                    margin: '10px',
                    borderRadius: '10px',
                  }}
                />
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Imageapp;
