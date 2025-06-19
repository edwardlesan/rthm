import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Neautorizat" }, { status: 401 });
  }

  try {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        bio: true,
        location: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Utilizatorul nu a fost găsit" },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Eroare la obținerea datelor utilizatorului" },
      { status: 500 }
    );
  }
}
