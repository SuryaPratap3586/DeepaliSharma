import fs from 'fs/promises';
import path from 'path';
import { uploadDir } from '@/lib/db';
const types = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.pdf': 'application/pdf' };
export async function GET(_, { params }) {
  const name = path.basename(params.name);
  try {
    const buf = await fs.readFile(path.join(uploadDir, name));
    return new Response(buf, { headers: { 'Content-Type': types[path.extname(name).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'public, max-age=31536000, immutable' } });
  } catch { return new Response('Not found', { status: 404 }); }
}
