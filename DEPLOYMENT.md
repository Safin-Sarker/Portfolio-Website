# Deployment Guide - Portfolio Website

This guide covers different deployment strategies for your portfolio with Docker, CI/CD, and various platforms.

---

## 📋 Table of Contents

- [Deployment Options Overview](#deployment-options-overview)
- [Option 1: Hybrid Deployment (Recommended)](#option-1-hybrid-deployment-recommended)
- [Option 2: Docker All-in-One (Railway/Render)](#option-2-docker-all-in-one-railwayrender)
- [Option 3: Serverless (Vercel + Managed DB)](#option-3-serverless-vercel--managed-db)
- [CI/CD Setup](#cicd-setup)
- [Environment Secrets](#environment-secrets)
- [Troubleshooting](#troubleshooting)

---

## Deployment Options Overview

### ❌ What Vercel CANNOT Do:
- Run Docker containers
- Run persistent databases (ChromaDB)
- Store files permanently
- Run long-running processes

### ✅ What Vercel CAN Do:
- Deploy Next.js apps (serverless)
- Auto-deploy from GitHub
- Edge functions
- Environment variables
- Preview deployments

---

## Option 1: Hybrid Deployment (Recommended)

**Best for:** Production-ready apps with budget flexibility

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Vercel    │ ───> │   Railway    │ ───> │   OpenAI    │
│  (Next.js)  │      │  (ChromaDB)  │      │    API      │
└─────────────┘      └──────────────┘      └─────────────┘
```

### Setup:

#### 1. Deploy ChromaDB to Railway

**Step 1:** Create Railway account at [railway.app](https://railway.app)

**Step 2:** Install Railway CLI
```bash
npm install -g @railway/cli
railway login
```

**Step 3:** Create new project
```bash
railway init
railway link
```

**Step 4:** Deploy ChromaDB
```bash
# Railway will auto-detect Dockerfile.chromadb
railway up
```

**Step 5:** Get ChromaDB URL
```bash
railway variables
# Copy the RAILWAY_PUBLIC_DOMAIN
# Your ChromaDB URL: https://your-app.railway.app
```

#### 2. Deploy Next.js to Vercel

**Step 1:** Push code to GitHub (when GitHub is back up!)
```bash
git add .
git commit -m "Add deployment configs"
git push origin Developer
```

**Step 2:** Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repository
- Add environment variables:
  - `OPENAI_API_KEY` = your OpenAI key
  - `CHROMADB_URL` = Railway URL from above

**Step 3:** Deploy
- Click "Deploy"
- Vercel auto-detects Next.js and builds

#### 3. Seed ChromaDB

After deployment, seed the database:
```bash
# Point to production ChromaDB
CHROMADB_URL=https://your-app.railway.app npm run seed
```

### Cost Breakdown:
- **Vercel**: Free (Hobby plan)
- **Railway**: $5-10/month
- **OpenAI**: Pay as you go (~$2-5/month)
- **Total**: ~$7-15/month

---

## Option 2: Docker All-in-One (Railway/Render)

**Best for:** Docker enthusiasts, full control

Deploy entire app (Next.js + ChromaDB) as Docker containers.

### Railway Deployment:

**Step 1:** Create `railway.json`
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Step 2:** Deploy
```bash
railway up
```

**Step 3:** Set environment variables in Railway dashboard
- `OPENAI_API_KEY`
- `CHROMADB_PATH=/app/.chromadb`

### Render Deployment:

**Step 1:** Create `render.yaml`
```yaml
services:
  - type: web
    name: portfolio
    env: docker
    dockerfilePath: ./Dockerfile
    envVars:
      - key: OPENAI_API_KEY
        sync: false
      - key: CHROMADB_PATH
        value: /app/.chromadb
```

**Step 2:** Connect GitHub and deploy

### Cost Breakdown:
- **Railway**: $5-10/month
- **Render**: Free tier or $7/month
- **OpenAI**: ~$2-5/month

---

## Option 3: Serverless (Vercel + Managed DB)

**Best for:** Maximum scalability, zero infrastructure management

Replace ChromaDB with a managed vector database.

### Using Pinecone (Easiest):

**Step 1:** Sign up at [pinecone.io](https://www.pinecone.io/)

**Step 2:** Install Pinecone client
```bash
npm install @pinecone-database/pinecone
```

**Step 3:** Update `src/lib/vectordb.ts`
```typescript
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pinecone.index('portfolio-knowledge');
```

**Step 4:** Add to `.env.local`
```env
PINECONE_API_KEY=your-pinecone-key
PINECONE_INDEX=portfolio-knowledge
```

**Step 5:** Deploy to Vercel
- GitHub integration auto-deploys
- Add environment variables in Vercel dashboard

### Using Supabase Vector:

**Step 1:** Create Supabase project at [supabase.com](https://supabase.com)

**Step 2:** Enable pgvector extension
```sql
CREATE EXTENSION vector;
```

**Step 3:** Install Supabase client
```bash
npm install @supabase/supabase-js
```

**Step 4:** Update environment variables
```env
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
```

### Cost Breakdown:
- **Vercel**: Free
- **Pinecone**: Free tier (100k vectors)
- **Supabase**: Free tier or $25/month
- **OpenAI**: ~$2-5/month

---

## CI/CD Setup

### GitHub Actions Workflows Created:

1. **`.github/workflows/deploy-vercel.yml`**
   - Auto-deploys to Vercel on push
   - Runs tests and linting
   - Creates preview deployments for PRs

2. **`.github/workflows/deploy-docker.yml`**
   - Deploys Docker container to Railway
   - Triggers on main/Developer branch

3. **`.github/workflows/deploy-chromadb.yml`**
   - Deploys only ChromaDB service
   - Useful for hybrid approach

### Required GitHub Secrets:

Add these in: **GitHub Repo → Settings → Secrets → Actions**

#### For Vercel:
```
VERCEL_TOKEN          # Get from vercel.com/account/tokens
VERCEL_ORG_ID         # Run: vercel whoami
VERCEL_PROJECT_ID     # Run: vercel link
OPENAI_API_KEY        # Your OpenAI key
```

#### For Railway:
```
RAILWAY_TOKEN         # Get from railway.app/account/tokens
OPENAI_API_KEY        # Your OpenAI key
```

#### For Pinecone (if using):
```
PINECONE_API_KEY      # Get from pinecone.io
```

---

## Environment Secrets

### How to Add Secrets:

**GitHub:**
1. Go to your repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each secret from above

**Vercel:**
1. Go to your project
2. Settings → Environment Variables
3. Add each variable
4. Select environment (Production/Preview/Development)

**Railway:**
1. Go to your project
2. Variables tab
3. Add variables
4. Save

---

## Recommended Approach

### For Your Portfolio:

**I recommend Option 1 (Hybrid):**

```
Next.js on Vercel + ChromaDB on Railway
```

**Why?**
- ✅ Best of both worlds
- ✅ Vercel's amazing Next.js performance
- ✅ ChromaDB on Railway (easy Docker deployment)
- ✅ GitHub Actions for CI/CD
- ✅ ~$7-10/month total cost
- ✅ Scalable and production-ready

**Setup Steps:**
1. Wait for GitHub to come back online
2. Push your code to GitHub
3. Deploy ChromaDB to Railway using `Dockerfile.chromadb`
4. Deploy Next.js to Vercel (auto-detects from GitHub)
5. Add environment variables to both platforms
6. Run seed script pointing to Railway ChromaDB URL
7. Done! 🚀

---

## Troubleshooting

### ChromaDB Connection Issues:
```bash
# Test ChromaDB connection
curl https://your-chromadb-url.railway.app/api/v1/heartbeat
```

### Vercel Build Fails:
```bash
# Test build locally first
npm run build
```

### Railway Deployment Fails:
```bash
# Check logs
railway logs
```

### Environment Variables Not Working:
- Verify they're set in the platform dashboard
- Restart the deployment
- Check for typos in variable names

---

## Next Steps

1. ✅ Wait for GitHub to come back online
2. ✅ Push code with deployment configs
3. ✅ Choose deployment strategy (recommend Option 1)
4. ✅ Set up CI/CD secrets
5. ✅ Deploy and test
6. ✅ Seed your vector database
7. ✅ Share your portfolio! 🎉

---

**Questions?** Check the [main README](./README.md) or [claude.md](./claude.md) for more details.
