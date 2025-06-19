"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IUser } from "@/lib/models";
import axios from "axios";
import { ChevronsRight, ShieldCheck, ShieldMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function MembersList() {
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Eroare la preluarea utilizatorilor:", error);
      }
    };

    fetchUsers();
  }, []);

  const navigateToMembersPage = () => {
    router.push("/members");
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-medium">Membrii locuinței</h1>
      <ul className="flex gap-10 flex-wrap">
        {users.map((user, index) => (
          <li key={index} className="flex items-center gap-1 flex-col">
            <Avatar className="size-12 border-2 border-slate-300">
              <AvatarImage src={user.avatarUrl || ""} />
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase() ?? "?"}
              </AvatarFallback>
            </Avatar>
            <p className="text-base font-semibold">{user.name}</p>
            <p className="text-xs font-normal text-neutral-400 flex items-center gap-1">
              {user.access ? (
                <ShieldCheck className="size-3 stroke-green-400" />
              ) : (
                <ShieldMinus className="size-3 stroke-red-400" />
              )}
              {user.access ? "Acces complet" : "Fără acces"}
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
          <p className="text-sm text-neutral-400">Vezi mai mult</p>
        </div>
      </ul>
    </div>
  );
}
