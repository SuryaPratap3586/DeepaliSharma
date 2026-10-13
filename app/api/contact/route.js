import { NextResponse } from 'next/server';
import { getMsgs, saveMsgs, isAdmin } from '@/lib/db';
export const dynamic = 'force-dynamic';
export async function POST(req) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) return NextResponse.json({ error: 'All fields required' }, { status: 400 });
  const list = await getMsgs();
  list.unshift({ id: Date.now(), name: String(name).slice(0, 100), email: String(email).slice(0, 150), message: String(message).slice(0, 3000), date: new Date().toISOString() });
  await saveMsgs(list);
  return NextResponse.json({ ok: true });
}
export async function GET(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getMsgs());
}
export async function DELETE(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  await saveMsgs((await getMsgs()).filter((m) => m.id !== id));
  return NextResponse.json({ ok: true });
}
