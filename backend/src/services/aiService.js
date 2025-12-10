const { OpenAI } = require('openai');

const client = new OpenAI({
  baseURL: 'https://router.huggingface.co/v1',
  apiKey: process.env.HF_API_KEY,
});

class AIService {
  static async generateArticle(topic) {
    const prompt = `Write a blog article about: ${topic}

Please format your response exactly like this:
Title: [An engaging, specific title]
Content: [A well-written blog post of 300-500 words with clear paragraphs]`;

    try {
      console.log(`🤖 Calling HuggingFace API for topic: ${topic}`);

      const chatCompletion = await client.chat.completions.create({
        model: 'meta-llama/Llama-3.2-3B-Instruct:together',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 800,
        temperature: 0.7,
      });

      const generatedText = chatCompletion.choices[0].message.content;
      console.log('✅ Received response from AI');

      // Parse title and content
      const lines = generatedText.split('\n').filter(line => line.trim());
      let title = '';
      let content = '';
      let foundContent = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.toLowerCase().startsWith('title:')) {
          title = line.replace(/^title:\s*/i, '').trim();
        } else if (line.toLowerCase().startsWith('content:')) {
          foundContent = true;
          const contentStart = line.replace(/^content:\s*/i, '').trim();
          if (contentStart) {
            content = contentStart;
          }
        } else if (foundContent) {
          content += '\n\n' + line.trim();
        }
      }

      // Fallback if parsing fails
      if (!title) {
        title = `Understanding ${topic}`;
      }
      if (!content || content.length < 50) {
        content = generatedText;
      }

      console.log(`✅ Article generated: "${title}"`);
      return { title, content: content.trim() };

    } catch (error) {
      console.error('❌ AI Generation Error:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }

      // Fallback content
      return {
        title: `Exploring ${topic}`,
        content: `This article explores the fascinating world of ${topic}. As technology continues to evolve, understanding ${topic} becomes increasingly important for professionals and enthusiasts alike.\n\nThe field of ${topic} has seen remarkable developments in recent years, with innovations that are reshaping how we approach related challenges and opportunities. This comprehensive guide will help you understand the key concepts and practical applications.\n\nWhether you're just starting to learn about ${topic} or looking to deepen your existing knowledge, staying informed about the latest trends and best practices is essential for success in this dynamic area.`,
      };
    }
  }

  static getRandomTopic() {
    const topics = [
      'The Future of Artificial Intelligence',
      'Climate Change and Technology Solutions',
      'The Rise of Remote Work',
      'Quantum Computing Explained',
      'Cybersecurity Best Practices',
      'The Impact of Social Media on Society',
      'Sustainable Energy Innovations',
      'The Evolution of Mobile Technology',
      'Blockchain Beyond Cryptocurrency',
      'Mental Health in the Digital Age',
      'How AI is Transforming Healthcare',
      'The Ethics of Artificial Intelligence',
      'AI in Creative Industries: Art, Music, and Writing',
      'The Future of Autonomous Vehicles',
      'Natural Language Processing and Its Applications',
      'AI in Education: Personalized Learning',
      'Robotics in Everyday Life',
      'The Role of AI in Cybersecurity',
      'Machine Learning for Small Businesses',
      'Digital Detox: Finding Balance in a Connected World',
      'The Gig Economy and Its Future',
      'Social Media and Mental Health: Coping Strategies',
      'Virtual Reality and the Future of Entertainment',
      'Smart Homes: Convenience vs. Privacy',
      'The Impact of 5G on Society',
      'Online Privacy in the Modern Age',
      'Innovations in Renewable Energy',
      'Space Exploration: AI and Robotics on Other Planets',
      'The Promise of CRISPR and Gene Editing',
      'Nanotechnology: Shaping the Future',
      'Climate Change Solutions Powered by Tech'
    ];
    return topics[Math.floor(Math.random() * topics.length)];
  }
}

module.exports = AIService;