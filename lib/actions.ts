"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { db } from "./db";
import { MemberCardProps, User } from "./models";

export async function getUser(): Promise<User | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  try {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        bio: true,
        location: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function getAllUsers(): Promise<MemberCardProps["member"][]> {
  const users = await db.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      avatarUrl: true,
    },
  });

  return users.map((user: User) => ({
    name: user.username,
    email: user.email,
    image: user.avatarUrl || "",
    access: true,
  }));
}
