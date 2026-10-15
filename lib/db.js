import crypto from "crypto";
import path from "path";
import { getDb } from "@/lib/mongodb";

const dir = path.join(process.cwd(), "data");

// Keep this export for compatibility with existing code.
export const uploadDir = path.join(dir, "uploads");

export const token = () =>
  crypto
    .createHash("sha256")
    .update((process.env.ADMIN_PASSWORD || "") + ":portfolio")
    .digest("hex");

export const isAdmin = (req) =>
  !!process.env.ADMIN_PASSWORD && req.cookies.get("admin")?.value === token();

// Read website content from MongoDB.
export async function getSite() {
  const db = await getDb();
  const doc = await db.collection("site_content").findOne({
    _id: "main",
  });

  return doc?.content ?? {};
}

// Save website content to MongoDB.
export async function saveSite(value) {
  const db = await getDb();

  await db
    .collection("site_content")
    .updateOne({ _id: "main" }, { $set: { content: value } }, { upsert: true });
}

// Read messages from MongoDB.
export async function getMsgs() {
  const db = await getDb();
  const doc = await db.collection("site_content").findOne({
    _id: "messages",
  });

  return doc?.items ?? [];
}

// Save messages to MongoDB.
export async function saveMsgs(value) {
  const db = await getDb();

  await db
    .collection("site_content")
    .updateOne(
      { _id: "messages" },
      { $set: { items: value } },
      { upsert: true },
    );
}
