// notification-container.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";
import { useToast } from "@/hooks/use-toast";

type AnomalyNotification = {
  id: string;
  createdAt: string;
  message: string;
  isSeen: boolean;
  type: string;
  value: number;
};

export default function NotificationContainer() {
  const [notifications, setNotifications] = useState<AnomalyNotification[]>([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);
  const { toast } = useToast();

  const fetchMore = async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    try {
      const res = await axios.get(`/api/notifications?limit=20&page=${page}`);

      if (res.status === 200) {
        const data = res.data;
        const newNotifications: AnomalyNotification[] = Array.isArray(data)
          ? data
          : data.notifications;

        if (!Array.isArray(newNotifications)) {
          toast({
            title: "Eroare",
            description: "Datele primite nu sunt valide.",
            variant: "destructive",
          });
          return;
        }

        setNotifications((prev) => {
          const unique = new Map(prev.map((n) => [n.id, n]));
          newNotifications.forEach((n) => unique.set(n.id, n));

          return Array.from(unique.values()).sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        setPage((p) => p + 1);
      }
    } catch (error) {
      toast({
        title: "Eroare la încărcarea notificărilor",
        description: "A apărut o problemă la conectarea cu serverul.",
        variant: "destructive",
      });
    } finally {
      isLoadingRef.current = false;
    }
  };

  const markAsSeen = async (id: string) => {
    try {
      await axios.patch(`/api/notifications/${id}/seen`);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, isSeen: true } : notif
        )
      );
    } catch (error) {
      toast({
        title: "Eroare la actualizare",
        description: "Nu s-a putut marca notificarea ca văzută.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMore();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore();
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-80 max-h-[400px] rounded-xl bg-white/10 backdrop-blur-md p-4 shadow-xl text-white">
      <h3 className="text-lg font-semibold mb-3">Notificări</h3>

      <ScrollArea className="h-[320px] pr-2">
        <div className="space-y-3">
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              className={cn(
                "p-3 rounded-lg border border-white/10 transition cursor-pointer",
                notif.isSeen
                  ? "bg-white/5 hover:bg-white/10"
                  : "bg-red-500/20 ring-2 ring-red-500/60"
              )}
              onClick={() => markAsSeen(notif.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-red-400 w-4 h-4" />
                  <span className="text-sm">{notif.message}</span>
                </div>
                {!notif.isSeen && (
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                )}
              </div>
              <p className="text-xs mt-1 text-white/70">
                {formatDistanceToNow(new Date(notif.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </motion.div>
          ))}
          <div ref={observerRef} className="h-10" />
        </div>
      </ScrollArea>
    </div>
  );
}
