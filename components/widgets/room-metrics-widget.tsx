"use client";

import { Thermometer, Droplets, Gauge } from "lucide-react";

interface RoomMetricsWidgetProps {
  temperature?: number;
  humidity?: number;
  pressure?: number;
}

export function RoomMetricsWidget({
  temperature,
  humidity,
  pressure,
}: RoomMetricsWidgetProps) {
  const getStatusColor = (title: string, value: number | undefined) => {
    if (value === undefined) return "text-gray-400";

    switch (title) {
      case "Temperature":
        return value > 30
          ? "text-red-500"
          : value < 15
          ? "text-blue-500"
          : "text-green-500";
      case "Humidity":
        return value < 30 ? "text-yellow-400" : "text-green-500";
      case "Air Pressure":
        return value < 1000 ? "text-yellow-500" : "text-blue-500";
      default:
        return "text-gray-400";
    }
  };

  const metrics = [
    {
      id: 1,
      title: "Temperatură",
      value: temperature !== undefined ? `${temperature} °C` : "Loading...",
      icon: <Thermometer className="w-6 h-6" />,
      color: getStatusColor("Temperature", temperature),
    },
    {
      id: 2,
      title: "Umiditate",
      value: humidity !== undefined ? `${humidity} %` : "Loading...",
      icon: <Droplets className="w-6 h-6" />,
      color: getStatusColor("Humidity", humidity),
    },
    {
      id: 3,
      title: "Presiunea aerului",
      value: pressure !== undefined ? `${pressure} hPa` : "Loading...",
      icon: <Gauge className="w-6 h-6" />,
      color: getStatusColor("Air Pressure", pressure),
    },
  ];

  return (
    <div className="w-full bg-sidebar p-6 rounded-2xl shadow-md">
      <div className="flex flex-col gap-y-4">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="flex items-center gap-4 p-4 bg-white/10 rounded-xl text-white"
          >
            <div className={`p-2 rounded-full bg-white/20 ${metric.color}`}>
              {metric.icon}
            </div>
            <div>
              <h3 className="text-sm font-medium text-white/70">
                {metric.title}
              </h3>
              <p className={`text-lg font-bold ${metric.color}`}>
                {metric.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
