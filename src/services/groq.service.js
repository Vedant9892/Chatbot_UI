import Groq from "groq-sdk";
import { env } from "../config/env.js";

const client = new Groq({ apiKey: env.groqApiKey });

export async function generateGroqReply(messages) {
  const completion = await client.chat.completions.create({
    model: env.groqModel,
    messages
  });

  return completion.choices?.[0]?.message?.content?.trim() || "Sorry, I could not generate a response.";
}
