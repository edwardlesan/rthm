"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { IUser } from "@/lib/models";
import Link from "next/link";

export function Navbar({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: IUser | null;
}) {
  return (
    <div className="flex items-center gap-4 justify-between py-2">
      {children}
      <div className="flex items-center gap-4">
        <Button size="icon" className="rounded-full size-10">
          <Bell className="stroke-white fill-white" />
        </Button>
        <Popover>
          <PopoverTrigger>
            <Avatar className="size-12 border-2 border-slate-300">
              <AvatarImage src={user?.image ?? ""} />
              <AvatarFallback>{user?.name?.charAt(0) ?? "?"}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent align="center">
            <Link className={buttonVariants()} href="/sign-in">
              Sign in
            </Link>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
