import Groq from "groq-sdk";
import { buildPrompt } from "../../../lib/promptBuilder";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const prompt = buildPrompt(body);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    return Response.json({
      brief: completion.choices[0].message.content,
      provider: "groq",
      model: "llama-3.1-8b-instant",
    });
  } catch (error) {
    console.error("GROQ ERROR:", error);

    return Response.json(
      { error: "Failed to generate brief" },
      { status: 500 }
    );
  }
}
