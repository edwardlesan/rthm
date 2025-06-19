"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import {
  Lightbulb,
  Thermometer,
  Video,
  Cloud,
  Sun,
  Wind,
  AlertTriangle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DeviceType =
  | "LED"
  | "DHT11"
  | "BMP280"
  | "MQ8"
  | "Fotorezistive Sensor"
  | "Camera";

interface Device {
  id: number;
  name: string;
  type: DeviceType;
  status: "online" | "offline";
  isOn?: boolean;
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setDevices([
      {
        id: 1,
        name: "LED sufragerie",
        type: "LED",
        status: "online",
        isOn: true,
      },
      {
        id: 2,
        name: "Senzor Temperatură & Umiditate",
        type: "DHT11",
        status: "online",
      },
      {
        id: 3,
        name: "Senzor Presiune & Altitudine",
        type: "BMP280",
        status: "online",
      },
      {
        id: 4,
        name: "Senzor Gaz",
        type: "MQ8",
        status: "online",
      },
      {
        id: 5,
        name: "Senzor Lumină Ambientală",
        type: "Fotorezistive Sensor",
        status: "online",
      },
      {
        id: 6,
        name: "Cameră Supraveghere",
        type: "Camera",
        status: "offline",
      },
    ]);
  }, []);

  const toggleDevice = async (id: number) => {
    const device = devices.find((d) => d.id === id);
    if (!device || typeof device.isOn !== "boolean") return;

    try {
      const response = await axios.post("/api/led", { status: !device.isOn });
      const updatedStatus = response.data.status;

      setDevices((prev) =>
        prev.map((d) => (d.id === id ? { ...d, isOn: updatedStatus } : d))
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Eroare",
      });
    }
  };

  const getIcon = (type: DeviceType) => {
    switch (type) {
      case "LED":
        return <Lightbulb className="w-6 h-6 text-yellow-400" />;
      case "DHT11":
        return <Thermometer className="w-6 h-6 text-blue-500" />;
      case "BMP280":
        return <Cloud className="w-6 h-6 text-sky-500" />;
      case "MQ8":
        return <Wind className="w-6 h-6 text-pink-500" />;
      case "Fotorezistive Sensor":
        return <Sun className="w-6 h-6 text-amber-400" />;
      case "Camera":
        return <Video className="w-6 h-6 text-purple-400" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dispozitive Conectate</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-sidebar p-6 rounded-2xl shadow flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              {getIcon(device.type)}
              <div>
                <h2 className="text-lg font-semibold">{device.name}</h2>
                <p className="text-sm text-muted-foreground">{device.type}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-2 text-sm font-medium ${
                  device.status === "online" ? "text-green-500" : "text-red-500"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    device.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
                {device.status === "online" ? "online" : "offline"}
              </span>

              {device.type === "LED" && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {device.isOn ? "Pornit" : "Oprit"}
                  </span>
                  <Switch
                    checked={device.isOn}
                    onCheckedChange={() => toggleDevice(device.id)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
