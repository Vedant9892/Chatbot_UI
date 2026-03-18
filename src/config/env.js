import dotenv from "dotenv";

dotenv.config();
// Validate and export environment variables
export const env = {
  port: Number(process.env.PORT || 3000),
  groqApiKey: process.env.GROQ_API_KEY || "",
  groqModel: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
  systemPrompt: process.env.SYSTEM_PROMPT || "You are a helpful chatbot assistant.",
  maxHistoryMessages: Number(process.env.MAX_HISTORY_MESSAGES || 10)
};

export function validateEnv() {
  if (!env.groqApiKey) {
    throw new Error("Missing GROQ_API_KEY. Copy .env.example to .env and set the key.");
  }
}
