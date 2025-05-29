import React, { useState, useEffect } from 'react';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://newsapi.org/v2/top-headlines?country=us&apiKey=bf34f5f9be484ed492d77eb02dbe0c06'
        );
        const data = await response.json();
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ textAlign: 'center', color: '#333', fontSize: '36px', marginBottom: '20px' }}>One Minute News</h1>

      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#888' }}>Loading latest headlines...</p>
      ) : error ? (
        <p style={{ color: 'red', fontSize: '18px', textAlign: 'center' }}>{error}</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {articles.map((article, index) => (
            <li
              key={index}
              style={{
                marginBottom: '20px',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
              }}
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt="article"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    marginBottom: '15px',
                  }}
                />
              )}
              <h3 style={{ fontSize: '22px', color: '#333', fontWeight: 'bold' }}>{article.title}</h3>
              <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#007BFF',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.color = '#0056b3'}
                onMouseLeave={(e) => e.target.style.color = '#007BFF'}
              >
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;