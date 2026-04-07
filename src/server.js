import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import chatRoutes from "./routes/chat.routes.js";
import { env, validateEnv } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { initStorageFiles } from "./services/chat-storage.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../");
const publicDir = path.join(rootDir, "public");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(publicDir));

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "groq-chatbot" });
});

app.use("/api", chatRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

async function bootstrap() {
  validateEnv();
  await initStorageFiles();

  app.listen(env.port, () => {
    console.log(`Server running at http://localhost:${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start app:", error.message);
  process.exit(1);
});

// For testing purposes