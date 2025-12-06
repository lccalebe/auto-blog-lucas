import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articlesAPI } from '../api/client';

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await articlesAPI.getAll();
      setArticles(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load articles. Please try again later.');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading articles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🤖 Auto-Generated Blog</h1>
        <p className="subtitle">AI-powered articles, generated daily</p>
      </header>

      {articles.length === 0 ? (
        <div className="empty-state">
          <p>No articles yet. Check back soon!</p>
        </div>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="article-card"
            >
              <h2 className="article-title">{article.title}</h2>
              <p className="article-date">{formatDate(article.created_at)}</p>
              <span className="read-more">Read more →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticlesList;