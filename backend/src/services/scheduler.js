const cron = require('node-cron');
const AIService = require('./aiService');
const Article = require('../models/Article');

class Scheduler {
  static start() {
    console.log('📅 Scheduler initialized');
    
    // Run every day at 9:00 AM
    // Format: second minute hour day month weekday
    cron.schedule('0 9 * * *', async () => {
      console.log('⏰ Daily article generation triggered');
      await this.generateDailyArticle();
    });

    console.log('✅ Daily article generation scheduled for 9:00 AM');
  }

  static async generateDailyArticle() {
    try {
      const topic = AIService.getRandomTopic();
      console.log(`🤖 Generating daily article about: ${topic}`);
      
      const { title, content } = await AIService.generateArticle(topic);
      const article = await Article.create(title, content);
      
      console.log(`✅ Daily article created: "${article.title}" (ID: ${article.id})`);
      return article;
    } catch (error) {
      console.error('❌ Error generating daily article:', error);
      throw error;
    }
  }
}

module.exports = Scheduler;