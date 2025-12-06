require('dotenv').config();
const Article = require('../models/Article');
const AIService = require('../services/aiService');

async function seedArticles() {
  console.log('🌱 Seeding database with 3 initial articles...');

  try {
    // Initialize table
    await Article.createTable();

    // Generate 3 articles
    for (let i = 1; i <= 3; i++) {
      const topic = AIService.getRandomTopic();
      console.log(`\n📝 Generating article ${i}/3: ${topic}`);
      
      const { title, content } = await AIService.generateArticle(topic);
      const article = await Article.create(title, content);
      
      console.log(`✅ Article ${i} created: "${article.title}"`);
      
      // Small delay to avoid rate limits
      if (i < 3) {
        console.log('⏳ Waiting 2 seconds...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log('\n🎉 Seeding complete! 3 articles created.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedArticles();