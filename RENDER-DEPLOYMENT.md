# Render Deployment Guide

Complete guide to deploy your portfolio on Render with free vector database options.

---

## 🎯 Deployment Options

### Option 1: Render + Pinecone (100% Free) ⭐ RECOMMENDED

**Perfect for:**
- Zero cost deployment
- No credit card needed (Pinecone free tier)
- Production-ready

**Cost:** $0/month (with limitations)

---

### Option 2: Render All-in-One (Free for 90 days)

**Perfect for:**
- Quick deployment
- Testing and development
- Budget-conscious

**Cost:** $0 for 90 days, then $7/month

---

## 🚀 Option 1: Render + Pinecone (FREE)

### Step 1: Set Up Pinecone (Free Vector DB)

**1.1 Create Pinecone Account**
- Go to [pinecone.io](https://www.pinecone.io/)
- Sign up (no credit card required!)
- Create a new index:
  - Name: `portfolio-knowledge`
  - Dimensions: `1536` (for OpenAI embeddings)
  - Metric: `cosine`
  - Plan: `Starter (Free)`

**1.2 Get API Key**
- Go to API Keys section
- Copy your API key

**1.3 Install Pinecone**
```bash
npm install @pinecone-database/pinecone
```

**1.4 Update Code for Pinecone**

Create `src/lib/pinecone.ts`:
```typescript
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export const index = pinecone.index('portfolio-knowledge');

// Store embedding
export async function storeEmbedding(
  id: string,
  embedding: number[],
  metadata: Record<string, any>
) {
  await index.upsert([
    {
      id,
      values: embedding,
      metadata,
    },
  ]);
}

// Query embeddings
export async function queryEmbeddings(
  embedding: number[],
  topK: number = 5
) {
  const results = await index.query({
    vector: embedding,
    topK,
    includeMetadata: true,
  });
  return results.matches;
}
```

Update `.env.local`:
```env
OPENAI_API_KEY=sk-your-key
PINECONE_API_KEY=your-pinecone-key
PINECONE_INDEX=portfolio-knowledge
```

### Step 2: Deploy to Render

**2.1 Push to GitHub** (when GitHub is back online)
```bash
git add .
git commit -m "Add Render and Pinecone configuration"
git push origin Developer
```

**2.2 Create Render Account**
- Go to [render.com](https://render.com)
- Sign up with GitHub

**2.3 Create New Web Service**
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** `portfolio-website`
   - **Region:** Oregon (US West) - Free
   - **Branch:** `Developer` or `main`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free

**2.4 Add Environment Variables**
Click "Environment" and add:
```
OPENAI_API_KEY = sk-your-openai-key
PINECONE_API_KEY = your-pinecone-key
PINECONE_INDEX = portfolio-knowledge
NODE_ENV = production
```

**2.5 Deploy**
- Click "Create Web Service"
- Wait 5-10 minutes for build and deployment

**2.6 Seed Pinecone Database**
```bash
# After deployment, seed your data
PINECONE_API_KEY=your-key npm run seed
```

**✅ Done!** Your portfolio is live on Render with free Pinecone vector database!

---

## 🚀 Option 2: Render All-in-One (Docker)

Deploy both Next.js and ChromaDB on Render using `render.yaml`.

### Step 1: Prepare Render Configuration

The `render.yaml` file is already created for you! It includes:
- Next.js web service
- ChromaDB service
- Persistent disk for ChromaDB

### Step 2: Deploy via Blueprint

**2.1 Push to GitHub**
```bash
git add .
git commit -m "Add Render blueprint"
git push origin Developer
```

**2.2 Deploy Blueprint**
1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click "New +" → "Blueprint"
3. Connect your repository
4. Select `render.yaml`
5. Add environment variables:
   - `OPENAI_API_KEY`

**2.3 Deploy**
- Click "Apply"
- Render will create 2 services:
  - `portfolio-nextjs` (your website)
  - `portfolio-chromadb` (vector database)

### Step 3: Seed Database

After deployment:
```bash
# Get ChromaDB URL from Render dashboard
CHROMADB_URL=https://portfolio-chromadb.onrender.com npm run seed
```

**✅ Done!** Both services are running!

---

## 📊 Comparison: Which Option?

| Feature | Render + Pinecone | Render All-in-One |
|---------|-------------------|-------------------|
| **Cost** | Free forever | Free 90 days → $7/month |
| **Setup** | Medium | Easy |
| **Performance** | Excellent | Good |
| **Scalability** | High | Medium |
| **Cold Starts** | Fast | Slow (free tier sleeps) |
| **Best For** | Production | Development/Testing |

**My Recommendation:** Use **Render + Pinecone** for production!

---

## 🔧 CI/CD with GitHub Actions

The workflow is already created: `.github/workflows/deploy-render.yml`

### Setup GitHub Secrets

Add in **GitHub → Settings → Secrets → Actions**:

```
RENDER_DEPLOY_HOOK_URL
OPENAI_API_KEY
PINECONE_API_KEY (if using Pinecone)
```

**Get Deploy Hook URL:**
1. Go to Render dashboard
2. Select your service
3. Settings → Deploy Hook
4. Copy the URL

### How It Works

On every push to `main` or `Developer`:
1. ✅ Runs linter
2. ✅ Builds the app
3. ✅ Triggers Render deployment
4. ✅ Auto-deploys your site

---

## 🆓 Free Vector Database Comparison

### 1. Pinecone (Recommended)

**Free Tier:**
- ✅ 1 index
- ✅ 100,000 vectors
- ✅ 100 queries per second
- ✅ No credit card required

**Setup Difficulty:** ⭐⭐ (Easy)

**Code Example:**
```typescript
import { Pinecone } from '@pinecone-database/pinecone';
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
```

---

### 2. Supabase Vector

**Free Tier:**
- ✅ 500MB database
- ✅ Unlimited vectors (within storage)
- ✅ PostgreSQL + pgvector
- ✅ No credit card required

**Setup Difficulty:** ⭐⭐⭐ (Medium)

**Code Example:**
```typescript
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(url, key);
```

---

### 3. Qdrant Cloud

**Free Tier:**
- ✅ 1GB cluster
- ✅ Unlimited vectors (within storage)
- ✅ Fast performance

**Setup Difficulty:** ⭐⭐⭐ (Medium)

---

### 4. Upstash Vector

**Free Tier:**
- ✅ 10,000 queries per day
- ✅ 10,000 vectors
- ✅ Edge-ready (Vercel compatible!)

**Setup Difficulty:** ⭐⭐ (Easy)

**Code Example:**
```typescript
import { Index } from '@upstash/vector';
const index = new Index({ url, token });
```

---

## 🎯 My Recommendation

### For Your Portfolio:

**Use: Render + Pinecone**

**Why?**
1. ✅ **100% FREE** (no hidden costs)
2. ✅ **Production-ready** (fast and reliable)
3. ✅ **Easy setup** (just 2 platforms)
4. ✅ **Great free tiers** (100k vectors on Pinecone)
5. ✅ **Auto-deploy** with GitHub Actions
6. ✅ **No cold starts** (Pinecone is always warm)

**Setup Time:** ~20 minutes

**Monthly Cost:** $0 (within free tier limits)

---

## 🚀 Quick Start Commands

### Deploy to Render + Pinecone:

```bash
# 1. Install Pinecone
npm install @pinecone-database/pinecone

# 2. Set up environment
cp .env.example .env.local
# Add PINECONE_API_KEY and OPENAI_API_KEY

# 3. Update code to use Pinecone (see Step 1.4 above)

# 4. Push to GitHub (when online)
git add .
git commit -m "Add Pinecone integration"
git push origin Developer

# 5. Deploy on Render
# - Go to render.com
# - Create new web service
# - Connect GitHub
# - Add environment variables
# - Deploy!

# 6. Seed database
npm run seed
```

---

## ⚠️ Render Free Tier Limitations

**Important to know:**
- Services **spin down after 15 minutes** of inactivity
- **First request takes ~30 seconds** to wake up
- **750 free hours/month** per service
- After 90 days, some services require paid plan

**To avoid cold starts:**
- Use paid plan ($7/month)
- Or use Render + Pinecone (Pinecone doesn't sleep!)

---

## 📞 Need Help?

- **Render Docs:** [render.com/docs](https://render.com/docs)
- **Pinecone Docs:** [docs.pinecone.io](https://docs.pinecone.io)
- **GitHub Actions:** Check workflow logs in Actions tab

---

## 🎉 Next Steps

1. ⏰ Wait for GitHub to recover
2. 📝 Choose deployment option (I recommend Render + Pinecone)
3. 🔑 Sign up for Pinecone (free, no CC)
4. 🚀 Deploy to Render
5. ✅ Test your live portfolio!

**Your portfolio will be live at:** `https://your-app-name.onrender.com`

---

**Questions?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for more deployment options!
