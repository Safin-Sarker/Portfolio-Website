# Fully Local Setup - No Docker Required! 🚀

This guide shows you how to run the entire portfolio and RAG chatbot **completely locally** without any Docker containers.

## Prerequisites

- ✅ Ollama installed locally
- ✅ Node.js and npm
- ❌ **NO Docker needed!**

## Architecture

```
┌─────────────────────────────────────┐
│      Next.js Portfolio App          │
│         (localhost:3000)            │
└──────────────┬──────────────────────┘
               │
               ├──────────────┬─────────────────┐
               │              │                 │
               ▼              ▼                 ▼
    ┌──────────────┐  ┌─────────────┐  ┌─────────────┐
    │    Ollama    │  │  ChromaDB   │  │  Portfolio  │
    │   (Local)    │  │  (Local)    │  │    Data     │
    │   :11434     │  │  File-based │  │   .chromadb │
    └──────────────┘  └─────────────┘  └─────────────┘
```

## Setup Steps

### 1. Install Ollama Models

```bash
# Install the LLM model
ollama pull llama3.1

# Install the embedding model
ollama pull nomic-embed-text

# Verify installation
ollama list
```

### 2. Verify Configuration

Check that `.env.local` is configured for local mode:

```env
# Ollama Configuration (Local)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1
OLLAMA_EMBEDDING_MODEL=nomic-embed-text

# ChromaDB Configuration (Local - File-based)
# Empty = use local file storage
CHROMADB_URL=

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Important**: `CHROMADB_URL` should be **empty** for local file-based storage!

### 3. Seed the Database

This creates a local `.chromadb` directory with your portfolio data:

```bash
npm run seed
```

Expected output:
```
🚀 Starting ChromaDB seeding process...
📍 ChromaDB Mode: Local File-based
📍 ChromaDB Path: D:\portfolio web site\Portfolio-Website\.chromadb
📍 Ollama URL: http://localhost:11434
📍 Embedding Model: nomic-embed-text
✅ Created collection: portfolio-knowledge
📚 Processing 23 documents...
  ✅ Successfully embedded: about (About)
  ✅ Successfully embedded: current-role (Experience)
  ...
🎉 Seeding complete! Total documents in collection: 23
✨ All done! ChromaDB is ready for RAG queries.
```

### 4. Start the Development Server

```bash
npm run dev
```

The portfolio will be available at http://localhost:3000 (or 3001/3002 if ports are in use).

### 5. Test the Chatbot!

1. Open http://localhost:3000 in your browser
2. Click the purple chat button (bottom-right corner)
3. Try these questions:
   - "What are Safin's AI skills?"
   - "Tell me about Safin's experience at Laerdal Medical"
   - "What projects has Safin worked on?"
   - "Where did Safin study?"

## How It Works

### Local ChromaDB Storage

- ChromaDB stores all embeddings in a **local directory**: `.chromadb/`
- **No server needed** - it's just files on your disk
- Persistent across restarts
- Fast and simple

### File Structure

```
Portfolio-Website/
├── .chromadb/              # Local ChromaDB storage (auto-created)
│   └── chroma.sqlite3      # Vector database
├── .env.local              # Your local configuration
├── src/
│   ├── data/
│   │   └── portfolio-knowledge.ts  # Your portfolio data
│   └── app/
│       └── api/
│           └── chat/
│               └── route.ts        # RAG API endpoint
└── scripts/
    └── seed-embeddings.ts          # Database seeding script
```

## Benefits of Fully Local Setup

✅ **No Docker overhead**
✅ **Faster startup**
✅ **Easier debugging**
✅ **Simpler setup**
✅ **Works offline**
✅ **Better for development**

## Troubleshooting

### Ollama not responding

```bash
# Check if Ollama is running
ollama list

# Test Ollama
ollama run llama3.1 "Hello"

# Check Ollama service status
# Windows: Check Task Manager for "ollama"
# Mac: brew services list | grep ollama
# Linux: systemctl status ollama
```

### ChromaDB errors

```bash
# Delete and recreate the database
rm -rf .chromadb
npm run seed
```

### Chat not working

1. **Check Ollama**: Make sure both models are installed
   ```bash
   ollama list
   ```

2. **Check database**: Make sure `.chromadb` directory exists
   ```bash
   ls -la .chromadb
   ```

3. **Re-seed if needed**:
   ```bash
   npm run seed
   ```

4. **Restart dev server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

### Slow responses

First query is slow (10-30 seconds) as Ollama loads the model into memory. Subsequent queries are much faster (1-3 seconds).

**Speed improvements**:
- Use a smaller model: `ollama pull llama3.2`
- Use GPU: Ollama automatically uses NVIDIA GPUs if available
- Reduce context: Edit the API route to retrieve fewer documents

## Updating Portfolio Data

When you update your experience, skills, or projects:

1. Edit `src/data/portfolio-knowledge.ts`
2. Re-run the seed script:
   ```bash
   npm run seed
   ```
3. Restart the dev server

The chatbot will now have the updated information!

## Production Deployment

For production, you can:

### Option 1: Keep it fully local (simple)
- Deploy to a VPS with Ollama installed
- ChromaDB runs file-based
- Works great for personal portfolios

### Option 2: Use hosted services (scalable)
- Use OpenAI API instead of Ollama
- Use Pinecone or Weaviate instead of local ChromaDB
- More expensive but scales better

## Summary

You now have a **fully local AI-powered portfolio**:
- ✅ RAG chatbot with your portfolio knowledge
- ✅ All running locally, no cloud dependencies
- ✅ No Docker required
- ✅ Fast and private

Enjoy your local AI assistant! 🤖✨
