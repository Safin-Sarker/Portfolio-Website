# RAG Chatbot Setup Guide

This portfolio website features an AI-powered chatbot using Retrieval Augmented Generation (RAG) to answer questions about your experience, skills, and projects.

## Architecture

- **ChromaDB**: Vector database for storing document embeddings
- **Ollama**: Local LLM server for embeddings and text generation
- **LangChain**: Framework for orchestrating the RAG pipeline
- **Next.js API**: Backend endpoint for chat functionality

## Setup Instructions

### 1. Start the Docker Services

First, make sure Docker is running, then start all services:

```bash
docker-compose up -d
```

This will start:
- ChromaDB on port 8000
- Ollama on port 11434
- Next.js app on port 3000

### 2. Pull the Ollama Models

You need to pull the required models into the Ollama container:

```bash
# Pull the LLM model (llama3.1)
docker exec -it portfolio-ollama ollama pull llama3.1

# Pull the embedding model (nomic-embed-text)
docker exec -it portfolio-ollama ollama pull nomic-embed-text
```

### 3. Seed the ChromaDB Database

Run the seed script to populate ChromaDB with your portfolio data:

```bash
npm run seed
```

This will:
- Connect to ChromaDB
- Generate embeddings for all portfolio knowledge
- Store them in the `portfolio-knowledge` collection
- Run a test query to verify everything works

### 4. Verify the Setup

1. Check that all containers are running:
   ```bash
   docker-compose ps
   ```

2. Test ChromaDB:
   ```bash
   curl http://localhost:8000/api/v1/heartbeat
   ```

3. Test Ollama:
   ```bash
   curl http://localhost:11434/api/tags
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 and click the chat button in the bottom-right corner!

## Usage

### Chatbot Features

- **Ask About Experience**: "What is Safin's current role?"
- **Ask About Skills**: "What AI/ML skills does Safin have?"
- **Ask About Projects**: "Tell me about Safin's projects"
- **Ask About Education**: "Where did Safin study?"

### Updating the Knowledge Base

To update the portfolio information that the chatbot knows:

1. Edit `src/data/portfolio-knowledge.ts`
2. Run `npm run seed` to re-index the data
3. Restart the dev server

## Troubleshooting

### Chatbot not responding
- Check that all Docker containers are running
- Verify models are pulled: `docker exec -it portfolio-ollama ollama list`
- Check ChromaDB has data: The seed script should show the document count

### Slow responses
- The first query after starting Ollama may be slow as it loads the model
- Subsequent queries should be faster
- Consider using a smaller model like `llama3.2` for faster responses

### Connection errors
- Verify ChromaDB URL in .env or docker-compose.yml
- Verify Ollama URL in .env or docker-compose.yml
- Check Docker network: `docker network inspect portfolio-network`

## Environment Variables

These are pre-configured in docker-compose.yml:

```env
OLLAMA_BASE_URL=http://ollama:11434
OLLAMA_MODEL=llama3.1
OLLAMA_EMBEDDING_MODEL=nomic-embed-text
CHROMADB_URL=http://chromadb:8000
```

For local development without Docker, you may need to change these to `localhost`.

## Technology Stack

- **Vector Database**: ChromaDB
- **LLM**: Llama 3.1 (via Ollama)
- **Embeddings**: nomic-embed-text (via Ollama)
- **Framework**: LangChain
- **UI**: Next.js 14 with React and Framer Motion
- **Streaming**: Vercel AI SDK

Enjoy your AI-powered portfolio chatbot! 🤖✨
