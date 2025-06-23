import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: any) {
  const { id } = params;

  try {
    const updatedNotification = await db.notification.update({
      where: { id },
      data: { isSeen: true },
    });

    return NextResponse.json({
      id: updatedNotification.id,
      isSeen: updatedNotification.isSeen,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Eroare la actualizarea notificării" },
      { status: 500 }
    );
  }
}
