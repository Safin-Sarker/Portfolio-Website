# Local Setup Guide (No Docker Required)

This guide will help you run the entire portfolio website locally without Docker. Perfect for development!

## Prerequisites

- **Node.js 18+** ([Download](https://nodejs.org/))
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))
- **Git** (for version control)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js
- OpenAI SDK
- ChromaDB (runs in-process, no server needed)
- LangChain
- And all other dependencies

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Then edit `.env.local` and add your OpenAI API key:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-actual-api-key-here

# ChromaDB Configuration (local persistent storage)
CHROMADB_PATH=./.chromadb

# App Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Name - Portfolio

# Contact Form (Optional - configure later if needed)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# CONTACT_EMAIL=your-email@gmail.com
```

### 3. Seed ChromaDB with Your Portfolio Content

Before running the app, you need to populate ChromaDB with your portfolio data:

```bash
npm run seed
```

This will:
- Load your portfolio content from `src/data/` directory
- Generate embeddings using OpenAI
- Store them in `.chromadb/` directory locally

**Note:** The `.chromadb/` directory is already in `.gitignore` so it won't be committed to your repo.

### 4. Start the Development Server

```bash
npm run dev
```

Your portfolio will be available at: **http://localhost:3000**

## How ChromaDB Works Locally

When running locally without Docker, ChromaDB:
- Runs **in-process** within your Next.js application (no separate server)
- Stores data persistently in the `.chromadb/` directory
- Automatically creates the directory if it doesn't exist
- Loads instantly on app startup

**Advantages:**
- ✅ No Docker required
- ✅ Simpler setup
- ✅ Faster startup
- ✅ Portable (works on Windows, Mac, Linux)
- ✅ Data persists between restarts

## Project Structure

```
.chromadb/               # Local ChromaDB storage (auto-created)
src/
  ├── data/              # Your portfolio content (JSON files)
  │   ├── skills.json
  │   ├── projects.json
  │   └── experience.json
  ├── lib/
  │   ├── chromadb.ts    # ChromaDB client setup
  │   ├── openai.ts      # OpenAI client setup
  │   └── langchain.ts   # RAG pipeline
  └── app/
      └── api/
          └── chat/      # Chatbot API endpoint
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Re-seed ChromaDB (if you update your portfolio content)
npm run seed
```

## Troubleshooting

### ChromaDB Directory Not Found

If you see errors about `.chromadb` directory:
1. Make sure `CHROMADB_PATH=./.chromadb` is set in `.env.local`
2. Run `npm run seed` to create and populate it

### OpenAI API Errors

If you see 401 or 403 errors:
1. Check your API key is correct in `.env.local`
2. Verify you have credits at https://platform.openai.com/account/usage
3. Make sure there are no extra spaces in your API key

### Port Already in Use

If port 3000 is already taken:
```bash
# Run on a different port
PORT=3001 npm run dev
```

### Out of Memory Errors

If you get memory errors during seeding:
1. Reduce the amount of content you're seeding at once
2. Use smaller embedding model (already using text-embedding-3-small)
3. Close other applications

## Adding Your Portfolio Content

1. **Create data files** in `src/data/`:
   - `skills.json` - Your technical skills
   - `projects.json` - Your projects with descriptions
   - `experience.json` - Work experience

2. **Run the seed script** to update embeddings:
   ```bash
   npm run seed
   ```

3. **Restart the dev server** to see changes:
   ```bash
   npm run dev
   ```

## Cost Estimates

Running locally with OpenAI API is very affordable:

- **Embeddings**: ~$0.0001 per 1K tokens
  - Initial seeding: ~$0.01-0.05 (one-time)
- **Chat**: ~$0.001-0.03 per 1K tokens (GPT-3.5 to GPT-4)
  - 100 chatbot conversations: ~$0.50-2.00/month

**Total estimated cost: Under $5/month for typical portfolio traffic**

## Next Steps

1. ✅ Set up your OpenAI API key
2. ✅ Install dependencies
3. ✅ Create your portfolio content files
4. ✅ Seed ChromaDB
5. ✅ Start the dev server
6. 🎨 Customize the UI to match your style
7. 📝 Add your real content
8. 🚀 Deploy to Vercel/Netlify/Railway

## Need Docker Instead?

If you prefer running ChromaDB in Docker (useful for production):
- See `docker-compose.yml` for the configuration
- Run `docker-compose up -d` to start ChromaDB
- Update `.env.local` to use `CHROMADB_URL=http://localhost:8000` instead of `CHROMADB_PATH`

## Support

For issues or questions:
- Check `claude.md` for detailed project documentation
- Review the [ChromaDB Docs](https://docs.trychroma.com/)
- Review the [OpenAI API Docs](https://platform.openai.com/docs)
