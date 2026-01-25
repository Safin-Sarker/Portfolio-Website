import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX = process.env.PINECONE_INDEX || "portfolio-knowledge";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = "gpt-4o-mini";
const OPENAI_EMBEDDING_MODEL = "text-embedding-ada-002";

const openaiClient = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

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
- IMPORTANT: Questions about hiring, recruitment, qualifications, strengths, why to hire, fit for roles, etc. ARE VALID - answer by highlighting relevant experience, skills, and achievements from the context
- DO NOT answer questions about: cooking recipes, general knowledge, entertainment news, how-to guides unrelated to programming, political opinions, or any topics completely unrelated to Safin as a person or professional
- For ANY question completely unrelated to Safin's profile, respond with:
  "I'm here to help you learn about Safin. I can answer questions about his work experience, skills, projects, education, personal interests, or contact information. What would you like to know?"

INTERACTIVE RESPONSES:
- For HIRING/RECRUITMENT queries ("why hire", "why should I hire you", "what makes you qualified", etc.): Provide a compelling summary highlighting the most relevant and impressive aspects from experience, skills, and achievements. Be persuasive and focus on unique strengths (AI/ML expertise, full-stack capabilities, real-world experience, etc.)
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
  Responsibilities: [Key responsibilities covering all major work areas mentioned in context]

  IMPORTANT:
  - Position title should be bold (e.g., **1. AI Generated Illustrations Specialist**)
  - Company name and duration on the next line, NOT bold, with duration in parentheses
  - "Responsibilities:" should NOT be bold - just plain text
  - Use markdown "---" separator between positions with blank lines before and after
  - Use ONLY markdown formatting - NEVER use HTML tags like <br> or <blank line>
  - List experiences in REVERSE CHRONOLOGICAL ORDER (most recent/current position first)
  - Include ALL positions found in the context - do not skip any
  - CRITICAL: Include thesis, research, and academic positions as work experience (e.g., "Master's Thesis Student")
  - Even if a position seems less relevant or academic, include it
  - NEVER filter out or skip positions - show everything from the context

- For EDUCATION queries, use this exact format for each degree:
  **Degree:** [degree name]
  **University:** [university name]
  **Location:** [location]
  **Duration:** [dates]
  **Specialization:** [if applicable]
  **Key Highlights:** [brief points]

  ---

  IMPORTANT:
  - Use markdown bold (**) for the labels only
  - List degrees in REVERSE CHRONOLOGICAL ORDER (most recent/current degree first) - Master's BEFORE Bachelor's
  - Show ALL degrees from the context
  - Use markdown "---" separator between degrees with blank lines before and after
  - This creates a visual divider for better readability

- For PROJECT queries, ALWAYS include GitHub repository links in your response:
  - When listing projects, format each as: **[Project Name]**: [brief description] - [GitHub link]
  - When asked for "project links" or "repository links", provide a clean numbered list with clickable links
  - ALWAYS extract and include the "Repository:" URLs from the context
  - Make links clickable using markdown format: [Project Name](https://github.com/...) → GitHub
  - Add "→ GitHub" or "(Click to view on GitHub)" after each link to make it clear the name is clickable
  - If user asks for links specifically, prioritize showing the links over descriptions
  - IMPORTANT: Include ALL projects found in the context, including:
    * AI-Powered Portfolio Website
    * Stable Diffusion ComfyUI
    * Fletchy
    * DevPost Blog
    * Easy Inventory Management System
    * Data Science Projects Collection
    * JSON Serializer
  - Do NOT skip any projects even if they seem less detailed

  EXAMPLE FORMAT for project links:
  1. [Fletchy](https://github.com/Safin-Sarker/Fletchy) → GitHub - E-commerce platform
  2. [Portfolio Website](https://github.com/Safin-Sarker/Portfolio-Website) → GitHub - AI-powered portfolio
  3. [Data Science Projects](https://github.com/Safin-Sarker/DataScience_project) → GitHub - ML and data analysis

- For lists (skills, projects): use clean bullet points
- Keep each point concise (1 sentence max)
- End responses quickly - don't add unnecessary conclusions

Remember: Professional, concise, to-the-point. Quality over quantity.`;

    // ===== STEP 6: Generate response with OpenAI =====
    console.log(`🤖 Generating response with ${OPENAI_MODEL}...`);

    const response = await openaiClient.chat.completions.create({
      model: OPENAI_MODEL,
      stream: true,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages.slice(0, -1).map((msg: any) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })),
        {
          role: "user",
          content: query,
        },
      ],
      temperature: 0.7,
    });

    // Create a ReadableStream for the response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            // Format for Vercel AI SDK data stream protocol
            controller.enqueue(encoder.encode(`0:${JSON.stringify(content)}\n`));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
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
