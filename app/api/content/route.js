import { NextResponse } from 'next/server';
import { getSite, saveSite, isAdmin } from '@/lib/db';
export const dynamic = 'force-dynamic';
export async function GET() { return NextResponse.json(await getSite()); }
export async function PUT(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await saveSite(await req.json());
  return NextResponse.json({ ok: true });
}
