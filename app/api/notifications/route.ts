import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 4;
  const offset = (page - 1) * limit;

  const notifications = await db.notification.findMany({
    skip: offset,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const totalCount = await db.notification.count();

  return NextResponse.json({
    notifications: notifications.map((notification) => ({
      id: notification.id,
      message: notification.message,
      isSeen: notification.isSeen,
      createdAt: notification.createdAt.toISOString(),
    })),
    hasMore: offset + notifications.length < totalCount,
  });
}
