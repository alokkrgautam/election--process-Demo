import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: "You are BharatBot, the 2026 Election Compliance & Voter Guide AI. Provide accurate, neutral, and helpful information about the Indian election process."
});

// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip) || { count: 0, startTime: now };

    if (now - userLimit.startTime > RATE_LIMIT_WINDOW) {
      userLimit.count = 1;
      userLimit.startTime = now;
    } else {
      userLimit.count++;
    }
    rateLimitMap.set(ip, userLimit);

    if (userLimit.count > MAX_REQUESTS) {
      return new Response(JSON.stringify({ error: "Too many requests. Please wait a minute." }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { messages, text } = await req.json();
    
    // Basic validation
    if (!text || text.length > 1000) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    const chat = model.startChat({
      history: messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      })),
    });

    const result = await chat.sendMessage(text);
    const response = await result.response;
    
    return new Response(JSON.stringify({ text: response.text() }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
