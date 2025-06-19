"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/lib/models";
import {
  UserMinus,
  MessageSquare,
  ShieldCheck,
  ShieldMinus,
  KeyRound,
} from "lucide-react";

export function MemberCard({ member }: { member: IUser }) {
  return (
    <div className="bg-sidebar rounded-2xl py-10 px-16 flex flex-col gap-2 items-center">
      <Avatar className="size-20 border-2 border-slate-300">
        <AvatarImage src={member.image ?? ""} />
        <AvatarFallback>
          {member.name?.charAt(0).toUpperCase() ?? "?"}
        </AvatarFallback>
      </Avatar>

      <h1 className="text-xl font-medium">{member.name}</h1>
      <p className="text-xs font-normal text-neutral-400 flex items-center gap-1">
        {member.access ? (
          <ShieldCheck className="size-4 stroke-green-400" />
        ) : (
          <ShieldMinus className="size-4 stroke-red-400" />
        )}
        {member.access ? "Full Access" : "No Access"}
      </p>

      <div className="flex items-center gap-4 mt-10">
        {member.access ? (
          <></>
        ) : (
          <KeyRound className="size-5 stroke-white cursor-pointer hover:stroke-blue-400 transition-all duration-300" />
        )}

        <MessageSquare className="size-5 stroke-white cursor-pointer hover:stroke-blue-400 transition-all duration-300" />

        <UserMinus className="size-5 stroke-white cursor-pointer hover:stroke-red-400 transition-all duration-300" />
      </div>
    </div>
  );
}
