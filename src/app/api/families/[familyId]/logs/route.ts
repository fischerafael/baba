import { NextRequest, NextResponse } from "next/server";
import { logs } from "@/lib/mock-db";
import { isValidDayKey, toDayKeySP } from "@/lib/timezone";
import type { ActivityLog } from "@/types/domain";

export async function GET(
  request: NextRequest,
  { params }: { params: { familyId: string } }
) {
  const requestedDay = request.nextUrl.searchParams.get("day");
  const day = requestedDay && isValidDayKey(requestedDay) ? requestedDay : toDayKeySP();

  const data = logs
    .filter((log) => log.familyId === params.familyId && log.dayKey === day)
    .sort((a, b) => a.id.localeCompare(b.id));

  return NextResponse.json({ data, day });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { familyId: string } }
) {
  const body = (await request.json()) as {
    titleSnapshot?: string;
    activityKind?: "standard" | "checkin" | "checkout";
    observations?: string;
  };

  if (!body.titleSnapshot || !body.activityKind) {
    return NextResponse.json({ error: "titleSnapshot e activityKind são obrigatórios." }, { status: 400 });
  }

  const created: ActivityLog = {
    id: String(logs.length + 1),
    familyId: params.familyId,
    activityKind: body.activityKind,
    titleSnapshot: body.titleSnapshot,
    observations: body.observations,
    dayKey: toDayKeySP(),
    createdByUserId: "mock-user",
    createdByRole: "babysitter"
  };

  logs.push(created);
  return NextResponse.json({ data: created }, { status: 201 });
}
