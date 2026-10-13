import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { isAdmin, uploadDir } from '@/lib/db';
export async function POST(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const file = (await req.formData()).get('file');
  if (!file || !(file.type?.startsWith('image/') || file.type === 'application/pdf')) return NextResponse.json({ error: 'Image or PDF only' }, { status: 400 });
  const ext = path.extname(file.name).toLowerCase().replace(/[^.a-z0-9]/g, '') || '.png';
  const name = Date.now() + '-' + Math.random().toString(36).slice(2, 7) + ext;
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, name), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: '/api/file/' + name });
}
