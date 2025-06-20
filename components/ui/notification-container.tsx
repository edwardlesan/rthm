"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

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
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchMore = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const res = await axios.get(`/api/notifications?limit=4&page=${page}`);

      if (res.status === 200) {
        const { notifications: newNotifications, hasMore: newHasMore } =
          res.data;

        if (!Array.isArray(newNotifications)) {
          toast({
            title: "Eroare",
            description: "Datele primite nu sunt valide.",
            variant: "destructive",
          });
          return;
        }

        setNotifications((prev) => {
          const existingIds = new Set(prev.map((n) => n.id));
          const merged = [
            ...prev,
            ...newNotifications.filter((n) => !existingIds.has(n.id)),
          ].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          return merged;
        });

        setPage((prev) => prev + 1); // Only increment after success
        setHasMore(newHasMore);
      }
    } catch (error) {
      toast({
        title: "Eroare la încărcarea notificărilor",
        description: "A apărut o problemă la conectarea cu serverul.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

  return (
    <div className="w-84 max-h-[550px] rounded-xl bg-white/10 backdrop-blur-md p-4 shadow-xl text-white">
      <h3 className="text-lg font-semibold mb-3">Notificări</h3>

      <ScrollArea className="max-h-[450px] pr-2 rounded-md overflow-y-auto">
        <div className="space-y-3 overflow-y-hidden">
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              className={cn(
                "p-3 rounded-lg border border-white/10 transition cursor-pointer",
                notif.isSeen
                  ? "bg-white/5 hover:bg-white/10"
                  : "bg-red-500/20 border-red-500/60 ring-none"
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

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center py-2">
              <Button
                onClick={fetchMore}
                disabled={isLoading}
                className="text-white"
                variant="ghost"
              >
                {isLoading ? "Se încarcă..." : "Încarcă mai multe"}
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
