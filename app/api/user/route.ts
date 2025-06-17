import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";

// Schema pentru validarea datelor completate
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    // <-- Verificam daca emailul deja exista -->
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
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

    // <-- Verificam daca numele de utilizator deja exista -->
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
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
