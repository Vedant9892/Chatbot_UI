import { mkdir, readFile, writeFile, access } from "fs/promises";
import path from "path";

export async function ensureJsonFile(filePath, fallbackValue) {
  await mkdir(path.dirname(filePath), { recursive: true });

  try {
    await access(filePath);
  } catch {
    await writeFile(filePath, JSON.stringify(fallbackValue, null, 2), "utf8");
  }
}

export async function readJsonFile(filePath, fallbackValue) {
  await ensureJsonFile(filePath, fallbackValue);

  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export async function writeJsonFile(filePath, data) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}
