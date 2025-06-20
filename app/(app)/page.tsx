"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Dashboard } from "@/components/ui/dashboard";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [userName, setUserName] = useState<string>("Utilizator");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/me");
        setUserName(res.data.username);
      } catch (error) {
        setUserName("Utilizator");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <Loader2 className="animate-spin w-6 h-6 text-neutral-500" />
      </div>
    );
  }

  return <Dashboard userName={userName} />;
}
