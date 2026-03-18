import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import { ensureJsonFile, readJsonFile, writeJsonFile } from "../utils/fileStore.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../../");

const messagesFile = path.join(rootDir, "data", "chats", "messages.json");
const sessionsFile = path.join(rootDir, "data", "sessions", "sessions.json");
const usersFile = path.join(rootDir, "data", "users", "users.json");
const knowledgeFile = path.join(rootDir, "data", "knowledge", "knowledge-base.json");

export async function initStorageFiles() {
  await ensureJsonFile(messagesFile, []);
  await ensureJsonFile(sessionsFile, {});
  await ensureJsonFile(usersFile, {});
  await ensureJsonFile(knowledgeFile, { entries: [] });
}

export async function saveChatMessage(sessionId, role, content) {
  const allMessages = await readJsonFile(messagesFile, []);

  allMessages.push({
    id: crypto.randomUUID(),
    sessionId,
    role,
    content,
    timestamp: new Date().toISOString()
  });

  await writeJsonFile(messagesFile, allMessages);
}

export async function getRecentSessionMessages(sessionId, limit = 10) {
  const allMessages = await readJsonFile(messagesFile, []);

  return allMessages
    .filter((m) => m.sessionId === sessionId)
    .slice(-limit)
    .map(({ role, content }) => ({ role, content }));
}
