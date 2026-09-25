/**
 * AI Optimization Engine for Ayur Veda Global
 * Powered by NVIDIA NIM Multimodal & Vision-Instruct LLM
 */

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || ''
const NVIDIA_BASE_URL = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1'
const NVIDIA_MODEL = process.env.NVIDIA_MODEL || 'meta/llama-3.2-11b-vision-instruct'

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

async function callNvidiaLLM(messages: ChatMessage[], maxTokens = 600, temperature = 0.5): Promise<string> {
  if (!NVIDIA_API_KEY) {
    throw new Error('NVIDIA_API_KEY is not configured')
  }

  const response = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NVIDIA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: NVIDIA_MODEL,
      messages,
      max_tokens: maxTokens,
      temperature,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`NVIDIA API error (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || ''
}

/**
 * Generate high-converting SEO metadata and keywords for products or pages
 */
export async function generateSeoMetadata(params: {
  title: string
  category?: string
  description?: string
  keywords?: string[]
}) {
  const prompt = `You are the lead SEO & Ayurvedic Copywriter for "Ayur Veda Global", a premium luxury Ayurvedic health & wellness brand.
Generate optimized SEO metadata in JSON format for the following item:
Title: ${params.title}
Category: ${params.category || 'Ayurvedic Wellness'}
Description: ${params.description || ''}
Current Keywords: ${params.keywords?.join(', ') || 'Ayurveda, wellness'}

Return ONLY a valid JSON object with the following fields:
{
  "metaTitle": "SEO title under 60 chars",
  "metaDescription": "Engaging description under 155 chars with call to action",
  "primaryKeywords": ["3-5 high volume keywords"],
  "longTailQueries": ["4-6 specific search phrases customers use in India"],
  "focusSnippet": "A 2-sentence rich snippet summarizing natural benefits and authenticity"
}`

  try {
    const raw = await callNvidiaLLM([
      { role: 'system', content: 'You are an elite SEO and e-commerce growth engineer. You only reply with valid JSON.' },
      { role: 'user', content: prompt }
    ], 500, 0.3)

    const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim()
    return JSON.parse(cleaned)
  } catch (error) {
    console.error('generateSeoMetadata error:', error)
    return {
      metaTitle: `${params.title} | Ayur Veda Global`,
      metaDescription: `Discover authentic ${params.title} from Ayur Veda Global. 100% pure herbal formulation crafted with classical Ayurvedic principles.`,
      primaryKeywords: ['Ayur Veda Global', params.title, 'Ayurvedic wellness'],
      longTailQueries: [`buy ${params.title} online`, `best ayurvedic ${params.category || 'remedy'}`],
      focusSnippet: `Ayur Veda Global provides genuine herbal wellness backed by ancient wisdom.`,
    }
  }
}

/**
 * Optimize product marketing copy and highlights
 */
export async function optimizeProductCopy(params: {
  name: string
  shortDesc: string
  ingredients?: string[]
  benefits?: string[]
}) {
  const prompt = `Optimize the e-commerce copy for the product "${params.name}" by Ayur Veda Global.
Description: ${params.shortDesc}
Key Ingredients: ${params.ingredients?.join(', ') || 'Pure Ayurvedic botanicals'}
Key Benefits: ${params.benefits?.join(', ') || 'Holistic wellness'}

Return ONLY a valid JSON object:
{
  "headline": "Compelling luxury headline",
  "story": "2-3 sentences luxury brand story",
  "enhancedBenefits": ["4 crisp bullet points highlighting efficacy and natural ingredients"],
  "usageRitual": "Recommended holistic daily ritual for best results",
  "trustBadge": "e.g. 100% Herbal • GMP Certified • No Chemicals"
}`

  try {
    const raw = await callNvidiaLLM([
      { role: 'system', content: 'You are an Ayurvedic product specialist for luxury e-commerce. Return strictly valid JSON.' },
      { role: 'user', content: prompt }
    ], 600, 0.4)

    const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim()
    return JSON.parse(cleaned)
  } catch (error) {
    console.error('optimizeProductCopy error:', error)
    return {
      headline: `Experience the Pure Power of ${params.name}`,
      story: `${params.name} by Ayur Veda Global combines classical herbs with modern wellness excellence.`,
      enhancedBenefits: params.benefits || ['100% Natural Formulation', 'Fast Acting & Effective', 'Safe with No Known Side Effects'],
      usageRitual: 'Follow instructions provided on packaging or consult your wellness advisor.',
      trustBadge: '100% Herbal • GMP Certified • Ayur Veda Global Verified',
    }
  }
}

/**
 * Expand user search queries into semantic synonyms for store search
 */
export async function optimizeSearchQuery(query: string) {
  if (!query || query.trim().length === 0) return []

  const prompt = `Given the user search term "${query}" on an Indian Ayurvedic eCommerce store (Ayur Veda Global), provide 4-6 related search keywords, product synonyms, and health concern terms in Hindi or English (e.g. for "stamina" -> ["staymax", "men wellness", "energy", "body nutrition", "taqat"]).
Return ONLY a comma-separated list of keywords.`

  try {
    const raw = await callNvidiaLLM([
      { role: 'user', content: prompt }
    ], 100, 0.3)

    return raw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
  } catch (error) {
    return [query.trim().toLowerCase()]
  }
}
