/**
 * Vector Database Abstraction Layer
 * Supports: ChromaDB, Pinecone, Supabase Vector
 *
 * Switch between vector databases by changing VECTOR_DB_TYPE in .env.local
 */

const VECTOR_DB_TYPE = process.env.VECTOR_DB_TYPE || 'chromadb'; // 'chromadb' | 'pinecone' | 'supabase'

// ==================== Pinecone ====================
async function initPinecone() {
  const { Pinecone } = await import('@pinecone-database/pinecone');

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  return pinecone.index(process.env.PINECONE_INDEX || 'portfolio-knowledge');
}

export async function storePineconeEmbedding(
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

export async function queryPineconeEmbeddings(
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

// ==================== ChromaDB ====================
async function initChromaDB() {
  const { ChromaClient } = await import('chromadb');

  const chromaUrl = process.env.CHROMADB_URL;
  const chromaPath = process.env.CHROMADB_PATH;

  if (chromaUrl) {
    return new ChromaClient({ path: chromaUrl });
  } else if (chromaPath) {
    return new ChromaClient({ path: chromaPath });
  } else {
    throw new Error('CHROMADB_URL or CHROMADB_PATH must be set');
  }
}

export async function storeChromaEmbedding(
  id: string,
  embedding: number[],
  metadata: Record<string, any>
) {
  const client = await initChromaDB();
  const collection = await client.getOrCreateCollection({
    name: 'portfolio_knowledge',
  });

  await collection.add({
    ids: [id],
    embeddings: [embedding],
    metadatas: [metadata],
  });
}

export async function queryChromaEmbeddings(
  embedding: number[],
  topK: number = 5
) {
  const client = await initChromaDB();
  const collection = await client.getCollection({
    name: 'portfolio_knowledge',
  });

  const results = await collection.query({
    queryEmbeddings: [embedding],
    nResults: topK,
  });

  return results.ids[0]?.map((id, idx) => ({
    id,
    score: results.distances?.[0]?.[idx],
    metadata: results.metadatas?.[0]?.[idx],
  }));
}

// ==================== Unified Interface ====================
export async function storeEmbedding(
  id: string,
  embedding: number[],
  metadata: Record<string, any>
) {
  switch (VECTOR_DB_TYPE) {
    case 'pinecone':
      return storePineconeEmbedding(id, embedding, metadata);
    case 'chromadb':
      return storeChromaEmbedding(id, embedding, metadata);
    default:
      throw new Error(`Unsupported vector database: ${VECTOR_DB_TYPE}`);
  }
}

export async function queryEmbeddings(
  embedding: number[],
  topK: number = 5
) {
  switch (VECTOR_DB_TYPE) {
    case 'pinecone':
      return queryPineconeEmbeddings(embedding, topK);
    case 'chromadb':
      return queryChromaEmbeddings(embedding, topK);
    default:
      throw new Error(`Unsupported vector database: ${VECTOR_DB_TYPE}`);
  }
}
