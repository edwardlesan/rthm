import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const last = await db.ledState.findFirst({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ status: last?.status ?? false });
}

export async function POST(req: Request) {
  const { status } = await req.json();

  const updated = await db.ledState.create({ data: { status } });
  return NextResponse.json({
    message: "LED status updated",
    status: updated.status,
  });
}
