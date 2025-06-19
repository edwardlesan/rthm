"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, User, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import NotificationContainer from "./notification-container";

export function Navbar({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: any | null;
}) {
  const fallbackInitial = user?.username?.charAt(0).toUpperCase() ?? "U";

  const [isNotificationOpen, setNotificationOpen] = useState(false);

  return (
    <div className="flex items-center gap-4 justify-between pb-4 pt-2">
      {children}
      <div className="flex items-center gap-4">
        <Popover open={isNotificationOpen} onOpenChange={setNotificationOpen}>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              aria-label="Notifications"
              className={`group rounded-full size-10 relative text-white transition-colors duration-200 ${
                isNotificationOpen ? "text-cyan-400" : ""
              }`}
            >
              <Bell
                className={`stroke-white fill-white transition-transform duration-200 group-hover:stroke-cyan-400 group-hover:fill-cyan-400 group-hover:scale-110 ${
                  isNotificationOpen
                    ? "stroke-cyan-400 fill-cyan-400 scale-100"
                    : ""
                }`}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="p-0 border-none bg-transparent shadow-none"
          >
            <NotificationContainer />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Avatar className="size-12 border-2 border-slate-300 cursor-pointer">
              <AvatarImage src={user?.avatarUrl || ""} />
              <AvatarFallback>{fallbackInitial}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-48 rounded-xl bg-white/10 backdrop-blur-md p-4 shadow-xl text-white flex flex-col gap-2"
          >
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => redirect("/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profilul meu
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Deconectare
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
