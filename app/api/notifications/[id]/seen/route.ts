// app/api/notifications/[id]/seen/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const updatedNotification = await db.notification.update({
      where: { id },
      data: { isSeen: true },
    });

    return NextResponse.json({
      id: updatedNotification.id,
      isSeen: updatedNotification.isSeen,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Eroare la actualizarea notificării" },
      { status: 500 }
    );
  }
}
