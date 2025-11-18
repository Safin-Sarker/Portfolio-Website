import { ChromaClient } from 'chromadb';
import { OpenAIEmbeddings } from '@langchain/openai';
import path from 'path';
import { config } from 'dotenv';
import fs from 'fs';

// Load environment variables from .env.local
config({ path: '.env.local' });

const CHROMADB_URL = process.env.CHROMADB_URL;
const CHROMADB_PATH = process.env.CHROMADB_PATH || path.join(process.cwd(), '.chromadb');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_EMBEDDING_MODEL = 'text-embedding-ada-002';

// Knowledge base categories matching markdown files
const KNOWLEDGE_CATEGORIES = [
  'About',
  'Experience',
  'Skills',
  'Projects',
  'Education',
  'Contact',
] as const;

type KnowledgeCategory = typeof KNOWLEDGE_CATEGORIES[number];

async function seedEmbeddings() {
  console.log('🚀 Starting Agentic RAG ChromaDB seeding process...');
  console.log('📁 Reading from markdown files in src/data/knowledge/');

  // Validate OpenAI API key
  if (!OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY is not set in .env.local');
    process.exit(1);
  }

  // Determine ChromaDB mode
  const isLocalMode = !CHROMADB_URL;

  if (isLocalMode) {
    console.log(`📍 ChromaDB Mode: Local File-based`);
    console.log(`📍 ChromaDB Path: ${CHROMADB_PATH}`);
  } else {
    console.log(`📍 ChromaDB URL: ${CHROMADB_URL}`);
  }

  console.log(`📍 OpenAI API Key: ${OPENAI_API_KEY.substring(0, 20)}...`);
  console.log(`📍 Embedding Model: ${OPENAI_EMBEDDING_MODEL}`);

  try {
    // Initialize ChromaDB client
    const client = new ChromaClient(
      CHROMADB_URL ? { path: CHROMADB_URL } : undefined
    );

    console.log(`\n✅ Connected to ChromaDB`);

    // Initialize OpenAI embeddings
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: OPENAI_API_KEY,
      modelName: OPENAI_EMBEDDING_MODEL,
    });

    let totalDocuments = 0;

    // Process each knowledge category
    for (const category of KNOWLEDGE_CATEGORIES) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`📂 Processing ${category} collection...`);
      console.log(`${'='.repeat(60)}`);

      const collectionName = `portfolio-${category.toLowerCase()}`;

      // Delete existing collection if it exists
      try {
        await client.deleteCollection({ name: collectionName });
        console.log(`🗑️  Deleted existing collection: ${collectionName}`);
      } catch (error) {
        console.log(`ℹ️  Collection ${collectionName} doesn't exist, creating new one`);
      }

      // Create new collection
      const collection = await client.createCollection({
        name: collectionName,
        metadata: {
          description: `${category} knowledge base for portfolio RAG chatbot`,
          category: category,
        },
      });
      console.log(`✅ Created collection: ${collectionName}`);

      // Read markdown file
      const mdFilePath = path.join(
        process.cwd(),
        'src',
        'data',
        'knowledge',
        `${category}.md`
      );

      if (!fs.existsSync(mdFilePath)) {
        console.warn(`⚠️  Warning: ${category}.md not found, skipping...`);
        continue;
      }

      const mdContent = fs.readFileSync(mdFilePath, 'utf-8');

      // Chunk the content intelligently
      const chunks = chunkMarkdown(mdContent, category);

      console.log(`📄 Found ${chunks.length} chunks in ${category}.md`);

      // Process each chunk
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const chunkId = `${category.toLowerCase()}-chunk-${i + 1}`;

        console.log(`  [${i + 1}/${chunks.length}] Embedding: ${chunkId}`);

        try {
          // Generate embedding
          const embedding = await embeddings.embedQuery(chunk.content);

          // Add to ChromaDB
          await collection.add({
            ids: [chunkId],
            embeddings: [embedding],
            documents: [chunk.content],
            metadatas: [
              {
                category: category,
                chunkId: chunkId,
                title: chunk.title || category,
                section: chunk.section || '',
              },
            ],
          });

          console.log(`  ✅ Successfully embedded: ${chunkId}`);
        } catch (error) {
          console.error(`  ❌ Error processing ${chunkId}:`, error);
        }
      }

      // Verify the collection
      const count = await collection.count();
      console.log(`\n📊 ${collectionName}: ${count} documents embedded`);
      totalDocuments += count;
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`🎉 Seeding complete!`);
    console.log(`📊 Total collections: ${KNOWLEDGE_CATEGORIES.length}`);
    console.log(`📊 Total documents: ${totalDocuments}`);
    console.log(`💰 Estimated cost: ~$${(totalDocuments * 0.0001).toFixed(4)}`);
    console.log(`${'='.repeat(60)}`);

    // Test a query
    console.log(`\n🧪 Testing query routing...`);
    const testQuery = 'What work experience do you have?';
    console.log(`Query: "${testQuery}"`);

    const testEmbedding = await embeddings.embedQuery(testQuery);

    // Query experience collection
    const experienceCollection = await client.getCollection({
      name: 'portfolio-experience',
    });

    const results = await experienceCollection.query({
      queryEmbeddings: [testEmbedding],
      nResults: 3,
    });

    console.log(`\nTop 3 results from Experience collection:`);
    results.documents[0]?.forEach((doc, idx) => {
      console.log(`  ${idx + 1}. ${doc?.substring(0, 100)}...`);
    });

    console.log(`\n✨ Agentic RAG system is ready!`);
    console.log(`📚 Collections available:`);
    KNOWLEDGE_CATEGORIES.forEach((cat) => {
      console.log(`   - portfolio-${cat.toLowerCase()}`);
    });
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

/**
 * Intelligently chunk markdown content
 * Split by headers and ensure reasonable chunk sizes
 */
function chunkMarkdown(
  content: string,
  category: string
): Array<{ content: string; title?: string; section?: string }> {
  const chunks: Array<{ content: string; title?: string; section?: string }> =
    [];

  // Split by main headers (## or ###)
  const sections = content.split(/(?=^##\s)/gm);

  sections.forEach((section) => {
    section = section.trim();
    if (!section) return;

    // Extract header title
    const headerMatch = section.match(/^##\s+(.+)$/m);
    const title = headerMatch ? headerMatch[1] : undefined;

    // For large sections, split into smaller chunks
    if (section.length > 2000) {
      // Split by subsections (###)
      const subsections = section.split(/(?=^###\s)/gm);

      subsections.forEach((subsection) => {
        subsection = subsection.trim();
        if (!subsection) return;

        const subsectionHeaderMatch = subsection.match(/^###\s+(.+)$/m);
        const subsectionTitle = subsectionHeaderMatch
          ? subsectionHeaderMatch[1]
          : title;

        // If still too large, split by paragraphs
        if (subsection.length > 2000) {
          const paragraphs = subsection.split(/\n\n+/);
          let currentChunk = '';

          paragraphs.forEach((para) => {
            if (currentChunk.length + para.length > 1500 && currentChunk) {
              chunks.push({
                content: currentChunk.trim(),
                title: subsectionTitle,
                section: category,
              });
              currentChunk = para;
            } else {
              currentChunk += (currentChunk ? '\n\n' : '') + para;
            }
          });

          if (currentChunk) {
            chunks.push({
              content: currentChunk.trim(),
              title: subsectionTitle,
              section: category,
            });
          }
        } else {
          chunks.push({
            content: subsection,
            title: subsectionTitle,
            section: category,
          });
        }
      });
    } else {
      chunks.push({
        content: section,
        title: title,
        section: category,
      });
    }
  });

  return chunks;
}

// Run the seed function
seedEmbeddings();
