"use client";

import WeatherWidget from "../widgets/weather-widget";
import { MembersList } from "./members-list";
import { RoomMetricsWidget } from "../widgets/room-metrics-widget";
import { CCTVWidget } from "../widgets/cctv-widget";
import { RoomWidget } from "../widgets/room-widget";

export function Dashboard() {
  const userName = "Eduardo";

  return (
    <div className="py-4 flex gap-8 w-full">
      <div className="flex flex-col gap-4 w-full">
        <WeatherWidget userName={userName} city="suceava" />
        <MembersList />
        <CCTVWidget />
      </div>
      <div className="w-2/5 flex flex-col gap-4">
        <RoomMetricsWidget />
        <RoomWidget />
      </div>
    </div>
  );
}
