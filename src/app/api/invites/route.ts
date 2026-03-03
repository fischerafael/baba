import { NextRequest, NextResponse } from "next/server";

const invites: Array<{
  id: string;
  familyId: string;
  email: string;
  role: "member" | "babysitter";
  status: "pending" | "accepted" | "revoked";
}> = [];

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    familyId?: string;
    email?: string;
    role?: "member" | "babysitter";
  };

  if (!body.familyId || !body.email || !body.role) {
    return NextResponse.json({ error: "familyId, email e role são obrigatórios." }, { status: 400 });
  }

  const invite = {
    id: crypto.randomUUID(),
    familyId: body.familyId,
    email: body.email.toLowerCase(),
    role: body.role,
    status: "pending" as const
  };

  invites.push(invite);
  return NextResponse.json({ data: invite }, { status: 201 });
}
