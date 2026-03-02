import { NextResponse } from "next/server";

export async function POST(
  _request: Request,
  { params }: { params: { inviteId: string } }
) {
  return NextResponse.json({
    data: {
      inviteId: params.inviteId,
      status: "accepted",
      message: "Fluxo de aceite conectado (mock)."
    }
  });
}
