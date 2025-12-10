require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Article = require('./models/Article');
const AIService = require('./services/aiService');
const Scheduler = require('./services/scheduler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database and scheduler
Article.createTable().catch(console.error);
Scheduler.start();  // Add this

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

// Get all articles
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.getAll();
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Get single article
app.get('/api/articles/:id', async (req, res) => {
  try {
    const article = await Article.getById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});