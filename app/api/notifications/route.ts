import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import type { Notification } from "@/lib/generated/prisma";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    // Return mock data during build
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return NextResponse.json({
        notifications: [],
        hasMore: false,
      });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 5;
    const offset = (page - 1) * limit;

    // Parallelize database queries for better performance
    const [notifications, totalCount] = await Promise.all([
      db.notification.findMany({
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      db.notification.count(),
    ]);

    return NextResponse.json({
      notifications: notifications.map((notification: Notification) => ({
        id: notification.id,
        message: notification.message,
        isSeen: notification.isSeen,
        createdAt: notification.createdAt.toISOString(),
      })),
      hasMore: offset + limit < totalCount,
    });
  } catch (error) {
    console.error("Failed to fetch notifications:", error);

    // Return empty response if error occurs during build
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return NextResponse.json({
        notifications: [],
        hasMore: false,
      });
    }

    return NextResponse.json(
      { notifications: [], hasMore: false },
      { status: 500 }
    );
  }
}
