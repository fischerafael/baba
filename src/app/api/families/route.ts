import { NextResponse } from "next/server";
import { families } from "@/lib/mock-db";

export async function GET() {
  return NextResponse.json({ data: families });
}
