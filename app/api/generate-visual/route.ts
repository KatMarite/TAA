import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

// In-memory sliding window rate limiter (per IP)
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per minute per IP
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestCounts.get(ip);

  // Clean expired entries periodically
  if (ipRequestCounts.size > 1000) {
    for (const [key, val] of ipRequestCounts.entries()) {
      if (val.resetAt < now) ipRequestCounts.delete(key);
    }
  }

  if (!entry || entry.resetAt < now) {
    ipRequestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

// Module-level cached AI client
let cachedAI: GoogleGenAI | null = null;
function getAIClient(apiKey: string): GoogleGenAI {
  if (!cachedAI) {
    cachedAI = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'taa-platform-visuals',
        },
      },
    });
  }
  return cachedAI;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting check
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'anonymous-client';

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute before generating more visuals.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    // 2. Validate API Key configuration
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Visual generation service is temporarily unavailable.' },
        { status: 503 }
      );
    }

    // 3. Parse and validate request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body.' },
        { status: 400 }
      );
    }

    const { prompt, courseTitle } = body as Record<string, unknown>;

    // 4. Sanitize and validate inputs
    const sanitizedPrompt = typeof prompt === 'string' ? prompt.trim().slice(0, 300) : '';
    const sanitizedTitle = typeof courseTitle === 'string' ? courseTitle.trim().slice(0, 100) : '';

    if (sanitizedPrompt.length > 300) {
      return NextResponse.json(
        { error: 'Prompt must be 300 characters or fewer.' },
        { status: 400 }
      );
    }

    const ai = getAIClient(apiKey);
    const fullPrompt =
      sanitizedPrompt ||
      `Editorial corporate photograph for a South African vocational training course titled "${sanitizedTitle || 'Professional Facility Hygiene'}". Diverse adult learners and facilitator in navy blue and emerald green attire in a modern sunlit Johannesburg training facility, crisp realistic photography.`;

    // 5. Generate content with timeout protection (15 seconds)
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Generation request timed out')), 15000)
    );

    const generatePromise = ai.models.generateContent({
      model: process.env.GEMINI_VISUAL_MODEL || 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: '4:3',
        },
      },
    });

    const response = await Promise.race([generatePromise, timeoutPromise]);

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        const mimeType = part.inlineData.mimeType || 'image/png';
        const dataUrl = `data:${mimeType};base64,${part.inlineData.data}`;
        return NextResponse.json({ imageUrl: dataUrl });
      }
    }

    return NextResponse.json(
      { error: 'No image data returned from visual model.' },
      { status: 422 }
    );
  } catch (error: unknown) {
    const isTimeout = error instanceof Error && error.message.includes('timed out');
    console.error('Error generating visual:', error);
    return NextResponse.json(
      { error: isTimeout ? 'Visual generation timed out. Please try again.' : 'Failed to generate visual.' },
      { status: isTimeout ? 504 : 500 }
    );
  }
}
