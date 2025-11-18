# Portfolio Website

An portfolio website with a RAG-powered AI chatbot built with Next.js, OpenAI, and ChromaDB.

## Features

- Modern, responsive design with animations
- Hero section with eye-catching effects
- About Me, Skills, Projects, and Experience sections
- Contact form
- RAG Chatbot powered by OpenAI (GPT-4/3.5)
- Runs locally without Docker (or with Docker for production)

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes
- **AI/ML:** OpenAI API, ChromaDB, LangChain.js
- **Infrastructure:** Docker (optional), Docker Compose (optional)

## Getting Started

### Quick Start (No Docker Required)

```bash
# Install dependencies
npm install

# Add your OpenAI API key to .env.local
echo "OPENAI_API_KEY=sk-your-key-here" > .env.local
echo "CHROMADB_PATH=./.chromadb" >> .env.local

# Seed ChromaDB with your portfolio data
npm run seed

# Start the development server
npm run dev
```

Visit http://localhost:3000

### Full Documentation

- **Local Setup (Recommended):** See [LOCAL-SETUP.md](LOCAL-SETUP.md)
- **Detailed Documentation:** See [claude.md](claude.md)
- **Docker Setup:** See [docker-compose.yml](docker-compose.yml)

## License

MIT
