"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const roomNames = [
  "Living room",
  "Kitchen",
  "Kids room",
  "Bedroom",
  "Restroom",
  "Garage",
  "Pool",
  "Boiler room",
  "Office",
];

export function RoomWidget() {
  const router = useRouter();

  const handleBadgeClick = () => {
    router.push("/rooms");
  };

  return (
    <div className="w-full h-full rounded-2xl bg-sidebar p-4 flex flex-col gap-2">
      <h1 className="text-lg font-medium">Rooms</h1>
      <div className="flex gap-2 items-start flex-wrap">
        {roomNames.map((room) => (
          <Badge
            key={room}
            className="cursor-pointer bg-blue-600 rounded-xl py-2 px-4 text-sm font-normal whitespace-nowrap hover:outline hover:outline-2 hover:outline-blue-600"
            onClick={() => handleBadgeClick()}
          >
            {room}
          </Badge>
        ))}
      </div>
    </div>
  );
}
