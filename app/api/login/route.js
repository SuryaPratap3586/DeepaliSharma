import { NextResponse } from "next/server";
import { token } from "@/lib/db";
export async function POST(req) {
  const { password = "" } = await req.json();
  const real = (process.env.ADMIN_PASSWORD || "").trim();
  if (!real || String(password).trim() !== real)
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin", token(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin");
  return res;
}
