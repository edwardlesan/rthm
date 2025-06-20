import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

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
