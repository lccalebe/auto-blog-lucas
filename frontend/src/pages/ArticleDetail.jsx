import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { articlesAPI } from '../api/client';

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await articlesAPI.getById(id);
      setArticle(response.data);
      setError(null);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Article not found.');
      } else {
        setError('Failed to load article. Please try again later.');
      }
      console.error('Error fetching article:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading article...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
        <Link to="/" className="back-button">← Back to articles</Link>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="container">
      <Link to="/" className="back-button">← Back to articles</Link>
      
      <article className="article-detail">
        <header className="article-header">
          <h1 className="article-title-detail">{article.title}</h1>
          <p className="article-meta">
            Published on {formatDate(article.created_at)}
          </p>
        </header>
        
        <div className="article-content">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

export default ArticleDetail;