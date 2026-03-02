import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("baba_session", "mock-session", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/"
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("baba_session", "", { expires: new Date(0), path: "/" });
  return response;
}
