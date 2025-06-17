"use client";

import { useState } from "react";

export function RoomMetricsWidget() {
  const [widgets] = useState([
    {
      id: 1,
      title: "Temperature",
      value: "Loading...",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Humidity",
      value: "Loading...",
      color: "bg-yellow-500",
    },
    {
      id: 3,
      title: "Light Intensity",
      value: "Loading...",
      color: "bg-red-500",
    },
  ]);

  return (
    <div className="w-full h-full rounded-2xl bg-sidebar p-12 flex flex-col gap-4">
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className={`flex flex-col items-center justify-center w-full rounded-lg text-white p-4 ${widget.color}`}
        >
          <h3 className="text-lg font-semibold">{widget.title}</h3>
          <p className="text-2xl font-bold">{widget.value}</p>
        </div>
      ))}
    </div>
  );
}
