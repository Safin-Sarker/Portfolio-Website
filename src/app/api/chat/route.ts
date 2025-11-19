import { OpenAIEmbeddings } from "@langchain/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Pinecone } from "@pinecone-database/pinecone";

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX = process.env.PINECONE_INDEX || "portfolio-knowledge";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = "gpt-4o-mini";
const OPENAI_EMBEDDING_MODEL = "text-embedding-ada-002";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];
    const query: string = lastMessage.content;

    console.log(`📥 Received query: ${query}`);
    console.log("🔗 Using Pinecone vector database");

    // ===== STEP 1: Initialize OpenAI embeddings =====
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: OPENAI_API_KEY,
      modelName: OPENAI_EMBEDDING_MODEL,
    });

    const queryEmbedding = await embeddings.embedQuery(query);

    // ===== STEP 2: Query Pinecone =====
    const pinecone = new Pinecone({
      apiKey: PINECONE_API_KEY!,
    });

    const index = pinecone.index(PINECONE_INDEX);

    // Detect query intent and apply category filtering
    const queryLower = query.toLowerCase();
    const isExperienceQuery = /\b(work|experience|job|position|career|employment|worked|company|companies)\b/i.test(query);
    const isSkillsQuery = /\b(skill|skills|technology|technologies|proficient|expertise|tools)\b/i.test(query);
    const isProjectsQuery = /\b(project|projects|built|developed|created|portfolio)\b/i.test(query);
    const isEducationQuery = /\b(education|degree|university|study|studied|academic|master|bachelor)\b/i.test(query);

    let queryFilter: any = undefined;
    let topK = 10;

    // Apply metadata filtering based on query intent
    if (isExperienceQuery) {
      queryFilter = { category: { $eq: "Experience" } };
      topK = 20; // Get more chunks to ensure all experiences are retrieved
      console.log("🔍 Filtering for Experience category");
    } else if (isSkillsQuery) {
      queryFilter = { category: { $eq: "Skills" } };
      topK = 15;
      console.log("🔍 Filtering for Skills category");
    } else if (isProjectsQuery) {
      queryFilter = { category: { $eq: "Projects" } };
      topK = 15;
      console.log("🔍 Filtering for Projects category");
    } else if (isEducationQuery) {
      queryFilter = { category: { $eq: "Education" } };
      topK = 15;
      console.log("🔍 Filtering for Education category");
    } else {
      topK = 15; // Default for mixed queries
      console.log("🔍 No category filter applied (general query)");
    }

    const results = await index.namespace("").query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
      filter: queryFilter,
    });

    // Extract text from metadata
    const allDocs = results.matches
      ?.map((match) => match.metadata?.text as string)
      .filter(Boolean) || [];

    console.log(`📚 Retrieved ${allDocs.length} documents from Pinecone`);

    // Debug: Log what chunks were retrieved
    results.matches?.forEach((match, idx) => {
      console.log(`  [${idx + 1}] ${match.id} (score: ${match.score?.toFixed(4)})`);
    });

    const context = allDocs.join("\n\n---\n\n");

    // ===== STEP 5: Build system prompt with context =====
    const systemPrompt = `You are an AI assistant for MD Safin Sarker's portfolio website. Your role is to help visitors learn about Safin's background, skills, experience, and projects.

Use the following context from Safin's portfolio to answer questions accurately and helpfully:

CONTEXT:
${context}

INSTRUCTIONS:
- Keep responses CONCISE and TO THE POINT - no unnecessary elaboration
- Use a PROFESSIONAL, direct tone
- Answer based ONLY on the provided context
- Use first person when talking about Safin (e.g., "I have experience in...")

STRICT TOPIC ENFORCEMENT:
- ONLY answer questions related to Safin's profile: work experience, skills, projects, education, contact information, personal interests, hobbies, background, and location
- DO NOT answer questions about: cooking recipes, general knowledge, entertainment news, how-to guides unrelated to programming, political opinions, or any topics completely unrelated to Safin as a person or professional
- For ANY question completely unrelated to Safin's profile, respond with:
  "I'm here to help you learn about Safin. I can answer questions about his work experience, skills, projects, education, personal interests, or contact information. What would you like to know?"

INTERACTIVE RESPONSES:
- For ANY broad or general query, ALWAYS ask clarifying questions instead of listing everything
- For SKILLS queries: Ask which category (AI/ML, Backend, Frontend, Database, DevOps, Soft Skills)
- For EXPERIENCE queries: Ask which position or time period they want to know about
- For PROJECT queries: Ask which specific project interests them or what type of project
- For EDUCATION queries: Ask if they want formal education, certifications, or teaching experience
- For GENERAL queries like "tell me about yourself": Ask what specifically they'd like to know (background, current work, technical skills, etc.)
- Only provide full lists when user asks for "all" or "everything"
- If information is missing, say so briefly and suggest what you can help with

RESPONSE FORMAT:
- Start with a direct answer (1-2 sentences)

- For WORK EXPERIENCE queries, use this exact format for each position:

  **[Number]. [Position Title]**
  [Company Name] - ([Duration])
  Responsibilities: [key responsibilities in 1-2 sentences]

  ---

  EXAMPLE FORMAT (follow this EXACTLY):

  **1. AI Generated Illustrations Specialist**
  Laerdal Medical - (October 2025 - Present)
  Responsibilities: Fine-tuning LoRA and Stable Diffusion models for medical illustrations, developing interfaces, and optimizing AI workflows.

  <blank line>
  <blank line>
  ---
  <blank line>
  <blank line>

  **2. Intern - LoRA Training**
  Laerdal Medical - (July 2025 - September 2025)
  Responsibilities: Fine-tuned LoRA models and developed automated workflows.

  <blank line>
  <blank line>
  ---
  <blank line>
  <blank line>

  IMPORTANT:
  - Position title should be bold (e.g., **1. AI Generated Illustrations Specialist**)
  - Company name and duration on the next line, NOT bold, with duration in parentheses
  - "Responsibilities:" should NOT be bold - just plain text
  - CRITICAL SPACING: After each position's responsibilities, add TWO blank lines, then "---" separator, then TWO blank lines before the next position
  - The separator line must have padding: blank lines both above and below it
  - List experiences in REVERSE CHRONOLOGICAL ORDER (most recent/current position first)
  - Include ALL positions found in the context - do not skip any
  - Even if a position seems less relevant, include it

- For EDUCATION queries, use this exact format for each degree:
  **Degree:** [degree name]
  **University:** [university name]
  **Location:** [location]
  **Duration:** [dates]
  **Specialization:** [if applicable]
  **Key Highlights:** [brief points]

  IMPORTANT:
  - Use markdown bold (**) for the labels only
  - List degrees in REVERSE CHRONOLOGICAL ORDER (most recent/current degree first) - Master's BEFORE Bachelor's
  - Show ALL degrees from the context
  - Separate each degree with a blank line

- For lists (skills, projects): use clean bullet points
- Keep each point concise (1 sentence max)
- End responses quickly - don't add unnecessary conclusions

Remember: Professional, concise, to-the-point. Quality over quantity.`;

    // ===== STEP 6: Generate response with OpenAI =====
    console.log(`🤖 Generating response with ${OPENAI_MODEL}...`);

    const { OpenAI } = await import("openai");
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      stream: true,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages.slice(0, -1).map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: "user",
          content: query,
        },
      ],
      temperature: 0.7,
    });

    // Use OpenAIStream from ai package for proper streaming
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("❌ Error in chat API:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
