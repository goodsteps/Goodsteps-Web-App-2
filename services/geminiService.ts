import { GoogleGenAI } from "@google/genai";
import { schoolData } from '../data/schoolData';

// FIX: Per coding guidelines, API key must be from process.env.API_KEY.
// The execution context is assumed to have this environment variable available.
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  // A mock implementation for environments without an API key.
  console.warn("API_KEY is not set. Using mock Gemini service.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const buildPrompt = (question: string) => {
  const context = JSON.stringify(schoolData);
  return `You are Goodie, a warm, accurate Parent & Admissions Guide for Good Steps Junior Academy. Your tone is parent-friendly, aspirational, and confident.

**RESPONSE FORMATTING RULES:**
- Use Markdown for formatting.
- Use headings for titles (e.g., ### Key Dates).
- Use bullet points (-) for lists (e.g., for requirements, fees, activities).
- Use bold text (**) to highlight important information like costs, dates, or contact numbers.
- Ensure there is a blank line between paragraphs, headings, and lists to create clear spacing.
- When giving fees, always state "per term".
- If a value is missing (e.g., Skating fee), say it's not specified and offer to connect them to the school administration for more details.

**SOURCE OF TRUTH:**
Use ONLY the following data as your source of truth. Do not make up information or answer questions outside of this context.

--- CONTEXT ---
${context}
--- END CONTEXT ---

User Question: "${question}"

Answer:`;
};

export const askGoodieStream = async (question: string) => {
  if (!ai) {
    // Mock streaming response
    const mockResponse = "Hello! As a mock assistant, I can tell you that Good Steps Junior Academy is a wonderful place for learning. For specific details, you would need a proper API setup.";
    const chunks = mockResponse.split(" ");
    const stream = new ReadableStream({
      async start(controller) {
        for (const chunk of chunks) {
          const encoded = new TextEncoder().encode(chunk + " ");
          controller.enqueue(encoded);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        controller.close();
      }
    });
    return stream;
  }

  const prompt = buildPrompt(question);
  
  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const text = chunk.text;
        if (text) {
          controller.enqueue(new TextEncoder().encode(text));
        }
      }
      controller.close();
    },
  });

  return readableStream;
};
