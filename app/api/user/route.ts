import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/lib/models";

// Schema pentru înregistrare
const userSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Numele de utilizator este obligatoriu" })
    .max(30, {
      message: "Numele de utilizator nu poate depăși 30 caractere",
    }),
  email: z
    .string()
    .min(1, { message: "Adresa de email este obligatorie" })
    .email({
      message: "Introduceți o adresă de email validă",
    }),
  password: z
    .string()
    .min(1, { message: "Câmp obligatoriu" })
    .min(8, { message: "Parola trebuie să conțină minim 8 caractere" }),
});

// Schema pentru actualizare profil
const updateUserSchema = z.object({
  username: z
    .string()
    .max(30, { message: "Numele nu poate depăși 30 caractere" })
    .optional(),
  bio: z
    .string()
    .max(160, { message: "Biografia nu poate depăși 160 caractere" })
    .optional(),
  location: z
    .string()
    .max(100, { message: "Locația nu poate depăși 100 caractere" })
    .optional(),
  avatarUrl: z.union([z.string().url("URL invalid"), z.literal("")]).optional(),
});

// POST - Înregistrare utilizator nou
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "Un utilizator cu acest mail deja exista",
        },
        { status: 409 }
      );
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "Un utilizator cu acest nume deja exista",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "Utilizator creat cu succes" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { user: null, message: "Ceva nu a mers bine" },
      { status: 500 }
    );
  }
}

// GET - Listă utilizatori (admin/demo)
export async function GET() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        bio: true,
        location: true,
      },
    });

    const formattedUsers = users.map((user: User) => ({
      id: user.id,
      name: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      location: user.location,
      access: true,
    }));

    return NextResponse.json(formattedUsers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Eroare la preluarea utilizatorilor" },
      { status: 500 }
    );
  }
}

// PATCH - Actualizare profil utilizator
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Neautorizat" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = updateUserSchema.parse(body);

    const updatedUser = await db.user.update({
      where: { email: session.user.email },
      data,
    });

    const { password, ...safeUser } = updatedUser;

    return NextResponse.json(
      { user: safeUser, message: "Profil actualizat cu succes" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Eroare la actualizarea profilului", error },
      { status: 400 }
    );
  }
}
