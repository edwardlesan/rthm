"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IUser } from "@/lib/models";
import { ChevronsRight, ShieldCheck, ShieldMinus } from "lucide-react";
import { useRouter } from "next/navigation";

export const mockUsers: IUser[] = [
  {
    name: "Dad",
    email: "dad.johnson@example.com",
    image: "https://cdn-icons-png.flaticon.com/512/145/145974.png",
    access: true,
  },
  {
    name: "Mom",
    email: "mom.johnson@example.com",
    image: "https://cdn-icons-png.flaticon.com/512/168/168720.png",
    access: true,
  },
  {
    name: "Charlie",
    email: "charlie.johnson@example.com",
    image: "https://cdn-icons-png.flaticon.com/512/168/168732.png",
    access: false,
  },
  {
    name: "Diana",
    email: "diana.johnson@example.com",
    image: "https://cdn-icons-png.flaticon.com/512/168/168730.png",
    access: false,
  },
];

export function MembersList() {
  const router = useRouter();

  const navigateToMembersPage = () => {
    router.push("/members");
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-medium">Members</h1>
      <ul className="flex gap-10">
        {mockUsers.map((user, index) => (
          <li key={index} className="flex items-center gap-1 flex-col">
            <Avatar className="size-12 border-2 border-slate-300">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback>{user.name?.charAt(0) ?? "?"}</AvatarFallback>
            </Avatar>
            <p className="text-base font-semibold">{user.name}</p>
            <p className="text-xs font-normal text-neutral-400 flex items-center gap-1">
              {user.access ? (
                <ShieldCheck className="size-3 stroke-green-400" />
              ) : (
                <ShieldMinus className="size-3 stroke-red-400" />
              )}
              {user.access ? "Full Access" : "No Access"}
            </p>
          </li>
        ))}
        <div className="flex flex-col gap-1 items-center">
          <Button
            className="size-12 rounded-full flex items-center justify-center"
            onClick={navigateToMembersPage}
          >
            <ChevronsRight />
          </Button>
          <p className="text-sm text-neutral-400">See more</p>
        </div>
      </ul>
    </div>
  );
}
