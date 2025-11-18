import { OpenAI } from 'openai';

export const KNOWLEDGE_CATEGORIES = [
  'About',
  'Experience',
  'Skills',
  'Projects',
  'Education',
  'Contact',
] as const;

export type KnowledgeCategory = (typeof KNOWLEDGE_CATEGORIES)[number];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Routes a user query to the appropriate knowledge base collections
 * Uses OpenAI to intelligently classify the query intent
 */
export async function routeQuery(query: string): Promise<KnowledgeCategory[]> {
  const routingPrompt = `You are a query router for a portfolio chatbot. Analyze the user's question and determine which category or categories of information are needed to answer it.

Available categories:
- About: Personal information, background, summary, location, interests
- Experience: Work experience, job history, positions, internships, roles, responsibilities
- Skills: Technical skills, programming languages, frameworks, tools, soft skills
- Projects: Personal projects, portfolio work, GitHub repositories, applications built
- Education: Academic background, degrees, certifications, courses, learning
- Contact: Contact information, email, phone, LinkedIn, GitHub, social media

User Query: "${query}"

Return ONLY a JSON array of relevant category names. Examples:
- "What's your work experience?" → ["Experience"]
- "Tell me about yourself" → ["About", "Experience", "Skills"]
- "What React projects have you built?" → ["Projects", "Skills"]
- "How can I contact you?" → ["Contact"]
- "What's your education background?" → ["Education"]
- "Do you have DevOps skills?" → ["Skills", "Experience", "Projects"]

Return only the JSON array, no other text.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a query routing assistant. Return only valid JSON arrays.',
        },
        {
          role: 'user',
          content: routingPrompt,
        },
      ],
      temperature: 0.3, // Low temperature for consistent routing
      max_tokens: 100,
    });

    const content = response.choices[0]?.message?.content?.trim();

    if (!content) {
      console.warn('⚠️ Router returned empty response, using default routing');
      return getDefaultRouting(query);
    }

    // Parse the JSON response
    let categories: string[];
    try {
      categories = JSON.parse(content);
    } catch (parseError) {
      console.warn(
        '⚠️ Failed to parse router response, using default routing'
      );
      console.warn('Response was:', content);
      return getDefaultRouting(query);
    }

    // Validate and filter categories
    const validCategories = categories.filter((cat) =>
      KNOWLEDGE_CATEGORIES.includes(cat as KnowledgeCategory)
    ) as KnowledgeCategory[];

    if (validCategories.length === 0) {
      console.warn('⚠️ No valid categories returned, using default routing');
      return getDefaultRouting(query);
    }

    console.log(
      `🎯 Query routed to collections: ${validCategories.join(', ')}`
    );
    return validCategories;
  } catch (error) {
    console.error('❌ Error in query routing:', error);
    return getDefaultRouting(query);
  }
}

/**
 * Fallback routing based on simple keyword matching
 * Used when AI routing fails
 */
function getDefaultRouting(query: string): KnowledgeCategory[] {
  const lowerQuery = query.toLowerCase();

  const routes: KnowledgeCategory[] = [];

  // Experience keywords
  if (
    /\b(work|job|experience|position|role|career|employment|worked|intern)\b/.test(
      lowerQuery
    )
  ) {
    routes.push('Experience');
  }

  // Skills keywords
  if (
    /\b(skill|technology|tech|framework|language|programming|tool|proficient|knowledge|know)\b/.test(
      lowerQuery
    )
  ) {
    routes.push('Skills');
  }

  // Projects keywords
  if (
    /\b(project|portfolio|github|built|created|developed|application|app|website)\b/.test(
      lowerQuery
    )
  ) {
    routes.push('Projects');
  }

  // Education keywords
  if (
    /\b(education|degree|university|school|study|studied|learn|learned|course|certification|graduate)\b/.test(
      lowerQuery
    )
  ) {
    routes.push('Education');
  }

  // Contact keywords
  if (
    /\b(contact|email|phone|reach|linkedin|github|social|call|message)\b/.test(
      lowerQuery
    )
  ) {
    routes.push('Contact');
  }

  // About keywords
  if (
    /\b(about|who|yourself|background|bio|introduction|summary|personal)\b/.test(
      lowerQuery
    )
  ) {
    routes.push('About');
  }

  // General questions get broader routing
  if (
    routes.length === 0 ||
    /\b(tell me about|describe|what|who are you)\b/.test(lowerQuery)
  ) {
    routes.push('About', 'Experience', 'Skills');
  }

  console.log(
    `🔄 Using fallback routing to collections: ${routes.join(', ')}`
  );
  return routes;
}

/**
 * Gets collection names for given categories
 */
export function getCollectionNames(
  categories: KnowledgeCategory[]
): string[] {
  return categories.map((cat) => `portfolio-${cat.toLowerCase()}`);
}
