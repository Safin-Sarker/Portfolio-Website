/**
 * Pinecone Vector Database Client
 * Simplified to use Pinecone only for portfolio vector storage
 */

import { Pinecone } from '@pinecone-database/pinecone';

// Initialize Pinecone client
async function initPinecone() {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  return pinecone.index(process.env.PINECONE_INDEX || 'portfolio-knowledge');
}

/**
 * Store an embedding in Pinecone
 */
export async function storeEmbedding(
  id: string,
  embedding: number[],
  metadata: Record<string, any>
) {
  const index = await initPinecone();
  await index.upsert([
    {
      id,
      values: embedding,
      metadata,
    },
  ]);
}

/**
 * Query Pinecone for similar embeddings
 */
export async function queryEmbeddings(
  embedding: number[],
  topK: number = 5
) {
  const index = await initPinecone();
  const results = await index.query({
    vector: embedding,
    topK,
    includeMetadata: true,
  });

  return results.matches?.map(match => ({
    id: match.id,
    score: match.score,
    metadata: match.metadata,
  }));
}

/**
 * Get Pinecone index stats
 */
export async function getIndexStats() {
  const index = await initPinecone();
  return await index.describeIndexStats();
}
