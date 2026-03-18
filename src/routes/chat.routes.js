import { Router } from "express";
import { env } from "../config/env.js";
import { generateGroqReply } from "../services/groq.service.js";
import { getRecentSessionMessages, saveChatMessage } from "../services/chat-storage.service.js";

const router = Router();

router.post("/chat", async (req, res, next) => {
  try {
    const { message, sessionId = "default-session" } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "A valid message is required." });
    }

    const history = await getRecentSessionMessages(sessionId, env.maxHistoryMessages);

    const messages = [
      { role: "system", content: env.systemPrompt },
      ...history,
      { role: "user", content: message }
    ];

    await saveChatMessage(sessionId, "user", message);
    const botReply = await generateGroqReply(messages);
    await saveChatMessage(sessionId, "assistant", botReply);

    return res.json({ reply: botReply, sessionId });
  } catch (error) {
    return next(error);
  }
});

export default router;
