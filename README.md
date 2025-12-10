# Auto-Generated Blog

An AI-powered blog platform that automatically generates and publishes articles daily using advanced language models.

## Live Demo

**Application:** http://18.185.130.103

**API Endpoint:** http://18.185.130.103:5000/api/articles

### Tech Stack
- **Frontend:** React + Vite, Nginx
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **AI:** HuggingFace API (Llama 3.2)
- **Infrastructure:** AWS EC2, ECR, CodeBuild
- **Containerization:** Docker + Docker Compose

## Features

### Automated Content Generation
- **Daily Articles:** Automatically generates 1 article every day at 9:00 AM UTC
- **AI-Powered:** Uses Llama 3.2 3B Instruct model via HuggingFace
- **Diverse Topics:** Covers AI, technology, climate, cybersecurity, and more

### Modern Architecture
- **Microservices:** Containerized frontend, backend, and database
- **CI/CD Pipeline:** Automated build and deployment on every commit
- **Scalable:** Docker-based architecture ready for horizontal scaling
- **Persistent Storage:** PostgreSQL with Docker volumes

### Production-Ready
- **Health Checks:** Container health monitoring
- **Auto-Restart:** Services automatically restart on failure
- **Logging:** Centralized logging via CloudWatch
- **Security:** Private ECR repositories, IAM roles, security groups


## Deployment

### CI/CD Pipeline

1. **Developer pushes code** to GitHub
2. **GitHub webhook** triggers AWS CodeBuild
3. **CodeBuild** builds Docker images
4. **Images pushed** to AWS ECR
5. **CodeBuild SSHs** into EC2 and runs deployment script
6. **EC2 pulls** new images and restarts containers
7. **Application updated** automatically

### Manual Deployment (if needed)
```bash
# On EC2
cd ~/auto-blog
./deploy.sh
```
## Local Development

### Prerequisites
- Node.js 20+
- Docker Desktop
- Git

### Setup
```bash
# Clone repository
git clone https://github.com/lccalebe/auto-blog-lucas.git
cd auto-blog-lucas

# Start PostgreSQL
cd backend
docker-compose -f docker-compose.dev.yml up -d

# Install and run backend
npm install
cp .env.example .env  # Add your HF_API_KEY (HuggingFace API key)
npm run dev

# Install and run frontend
cd ../frontend
npm install
npm run dev

# Seed database
cd ../backend
npm run seed
```

Access at: `http://localhost:5173`

---

## Docker Deployment

### Build and Run Locally
```bash
# From project root
docker-compose up --build
```

Access at: `http://localhost`

### Seed Production Database
```bash
docker exec -it autoblog-backend npm run seed
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
DATABASE_URL=postgresql://user:pass@host:5432/dbname
NODE_ENV=production
HF_API_KEY=your_huggingface_api_key
```

### Frontend (.env)
```env
VITE_API_URL=http://your-api-url:5000
```

## Project Structure
```
auto-blog-lucas/
├── backend/
│   ├── src/
│   │   ├── index.js           # Express server
│   │   ├── models/
│   │   │   ├── db.js          # PostgreSQL connection
│   │   │   └── Article.js     # Article model
│   │   ├── services/
│   │   │   ├── aiService.js   # HuggingFace integration
│   │   │   └── scheduler.js   # Cron job scheduler
│   │   └── scripts/
│   │       └── seed.js        # Database seeder
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/
│   │   │   ├── ArticlesList.jsx
│   │   │   └── ArticleDetail.jsx
│   │   └── api/
│   │       └── client.js      # Axios API client
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── buildspec.yml              # CodeBuild configuration
├── docker-compose.yml         # Production orchestration
└── README.md
```

---

##  AWS Infrastructure

### Services Used
- **EC2:** t3.micro instance (free tier)
- **ECR:** Docker image registry
- **CodeBuild:** CI/CD pipeline
- **Systems Manager:** Secure parameter storage
- **IAM:** Role-based access control
- **CloudWatch:** Logging and monitoring

### Security Groups
- Port 22: SSH (restricted to specific IPs)
- Port 80: HTTP (public)
- Port 5000: Backend API (public)

---

## API Endpoints

### Articles
```
GET  /api/articles      # List all articles
GET  /api/articles/:id  # Get single article
GET  /health            # Health check
```

### Example Response
```json
{
  "id": 1,
  "title": "The Future of Artificial Intelligence",
  "content": "...",
  "created_at": "2024-12-09T12:00:00Z"
}
```

---

## 👤 Author

**Lucas Calebe**

- GitHub: [@lccalebe](https://github.com/lccalebe)

---

**Built using React, Node.js, Docker, and AWS**