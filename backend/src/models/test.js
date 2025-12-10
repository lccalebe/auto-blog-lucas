const db = require('./db');

class Article {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await db.query(query);
      console.log('✅ Articles table ready');
    } catch (error) {
      console.error('❌ Error creating table:', error);
      throw error;
    }
  }

  static async getAll() {
    const query = 'SELECT id, title, created_at FROM articles ORDER BY created_at DESC';
    const result = await db.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM articles WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async create(title, content) {
    const query = 'INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING *';
    const result = await db.query(query, [title, content]);
    return result.rows[0];
  }
}

module.exports = Article;