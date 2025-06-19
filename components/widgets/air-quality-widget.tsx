"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock, Activity, CalendarDays } from "lucide-react";

interface SensorData {
  mq8_approx_ppm: number;
  mq8_raw: number;
  createdAt: string;
}

export function AirQualityWidget() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);

  useEffect(() => {
    const loadAirData = async () => {
      const res = await axios.get("/api/sensor-data");
      const data = res.data[0];
      setSensorData({
        mq8_approx_ppm: data.mq8_approx_ppm,
        mq8_raw: data.mq8_raw,
        createdAt: data.createdAt,
      });
    };

    loadAirData();
  }, []);

  const ppm = sensorData?.mq8_approx_ppm;
  const raw = sensorData?.mq8_raw;
  const date = sensorData?.createdAt ? new Date(sensorData.createdAt) : null;

  const getH2Color = (ppm: number | undefined) => {
    if (ppm === undefined) return "bg-gray-300 text-gray-800";
    if (ppm < 100) return "bg-green-100 text-green-700";
    if (ppm < 300) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-700";
  };

  const getSuggestion = (ppm: number | undefined) => {
    if (ppm === undefined) return "Verifică senzorul";
    if (ppm < 100) return "Calitatea aerului este bună.";
    if (ppm < 300) return "Recomandat: aerisire ușoară.";
    return "Deschide ferestrele imediat și verifică posibile scurgeri!";
  };

  const gradientStyle = (ppm: number | undefined) => {
    if (ppm === undefined) return "from-gray-700 via-gray-600 to-gray-500";
    if (ppm < 100) return "from-green-400 via-green-500 to-green-600";
    if (ppm < 300) return "from-yellow-300 via-yellow-400 to-yellow-600";
    return "from-red-400 via-red-500 to-red-600";
  };

  return (
    <Card
      className={`h-full shadow-md border-none rounded-2xl p-6 bg-gradient-to-br ${gradientStyle(
        ppm
      )}`}
    >
      <CardContent className="flex flex-col gap-4 p-0 text-white h-full">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" /> Calitate aer (H₂)
        </h2>

        <div className="bg-white/10 rounded-xl p-4 flex flex-col flex-1 justify-between gap-4 h-full">
          {/* PPM */}
          <div className="flex justify-between items-center text-sm">
            <span>Concentrație Hidrogen (H₂)</span>
            <span
              className={`px-2 py-1 rounded-full font-medium text-sm ${getH2Color(
                ppm
              )}`}
            >
              {ppm !== undefined ? `${ppm.toFixed(1)} ppm` : "—"}
            </span>
          </div>

          {/* RAW value */}
          <div className="flex justify-between text-sm text-white/80">
            <span>Valoare brută senzor</span>
            <span>{raw ?? "—"}</span>
          </div>

          {/* Data ultimei măsurători */}
          <div className="flex justify-between text-sm text-white/80">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" /> Data ultimei măsurători
            </span>
            <span>{date ? date.toLocaleDateString("ro-RO") : "—"}</span>
          </div>

          {/* Ora ultimei măsurători */}
          <div className="flex justify-between text-sm text-white/80">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> Ora ultimei măsurători
            </span>
            <span>{date ? date.toLocaleTimeString("ro-RO") : "—"}</span>
          </div>

          {/* Sugestie */}
          <div className="text-sm italic text-white/90 mt-2 flex items-start gap-2">
            <Activity className="w-4 h-4 mt-[2px]" />
            {getSuggestion(ppm)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
