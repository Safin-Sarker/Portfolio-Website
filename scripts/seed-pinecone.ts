import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import path from 'path';
import { config } from 'dotenv';
import fs from 'fs';

// Load environment variables from .env.local
config({ path: '.env.local' });

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX = process.env.PINECONE_INDEX || 'portfolio-knowledge';
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

async function seedPinecone() {
  console.log('🚀 Starting Pinecone seeding process...');
  console.log('📁 Reading from markdown files in src/data/knowledge/');

  // Validate API keys
  if (!OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY is not set in .env.local');
    process.exit(1);
  }

  if (!PINECONE_API_KEY) {
    console.error('❌ Error: PINECONE_API_KEY is not set in .env.local');
    process.exit(1);
  }

  console.log(`📍 Pinecone Index: ${PINECONE_INDEX}`);
  console.log(`📍 OpenAI API Key: ${OPENAI_API_KEY.substring(0, 20)}...`);
  console.log(`📍 Embedding Model: ${OPENAI_EMBEDDING_MODEL}`);

  try {
    // Initialize Pinecone client
    const pinecone = new Pinecone({
      apiKey: PINECONE_API_KEY,
    });

    console.log(`\n✅ Connected to Pinecone`);

    // Get the index
    const index = pinecone.index(PINECONE_INDEX);

    // Delete all existing vectors (optional - comment out if you want to keep existing data)
    console.log(`\n🗑️  Clearing existing vectors...`);
    try {
      await index.namespace('').deleteAll();
      console.log('✅ Cleared existing vectors');
    } catch (error) {
      console.log('ℹ️  No existing vectors to clear');
    }

    // Initialize OpenAI embeddings
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: OPENAI_API_KEY,
      modelName: OPENAI_EMBEDDING_MODEL,
    });

    let totalDocuments = 0;
    const allVectors: any[] = [];

    // Process each knowledge category
    for (const category of KNOWLEDGE_CATEGORIES) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`📂 Processing ${category}...`);
      console.log(`${'='.repeat(60)}`);

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

          // Prepare vector for Pinecone
          allVectors.push({
            id: chunkId,
            values: embedding,
            metadata: {
              category: category,
              chunkId: chunkId,
              title: chunk.title || category,
              section: chunk.section || '',
              text: chunk.content.substring(0, 1000), // First 1000 chars for reference
            },
          });

          console.log(`  ✅ Successfully embedded: ${chunkId}`);
        } catch (error) {
          console.error(`  ❌ Error processing ${chunkId}:`, error);
        }
      }

      totalDocuments += chunks.length;
    }

    // Upload all vectors to Pinecone in batches
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📤 Uploading ${allVectors.length} vectors to Pinecone...`);
    console.log(`${'='.repeat(60)}`);

    const batchSize = 100;
    for (let i = 0; i < allVectors.length; i += batchSize) {
      const batch = allVectors.slice(i, i + batchSize);
      await index.namespace('').upsert(batch);
      console.log(`✅ Uploaded batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allVectors.length / batchSize)}`);
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`🎉 Seeding complete!`);
    console.log(`📊 Total categories: ${KNOWLEDGE_CATEGORIES.length}`);
    console.log(`📊 Total documents: ${totalDocuments}`);
    console.log(`📊 Total vectors: ${allVectors.length}`);
    console.log(`💰 Estimated cost: ~$${(totalDocuments * 0.0001).toFixed(4)}`);
    console.log(`${'='.repeat(60)}`);

    // Test a query
    console.log(`\n🧪 Testing query...`);
    const testQuery = 'What work experience do you have?';
    console.log(`Query: "${testQuery}"`);

    const testEmbedding = await embeddings.embedQuery(testQuery);

    const results = await index.namespace('').query({
      vector: testEmbedding,
      topK: 3,
      includeMetadata: true,
    });

    console.log(`\nTop 3 results:`);
    results.matches?.forEach((match, idx) => {
      console.log(`  ${idx + 1}. [${match.score?.toFixed(4)}] ${match.id}`);
      console.log(`     ${match.metadata?.text?.substring(0, 100)}...`);
    });

    console.log(`\n✨ Pinecone RAG system is ready!`);
    console.log(`📚 Index: ${PINECONE_INDEX}`);
    console.log(`📊 Vectors: ${allVectors.length}`);
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
seedPinecone();
