"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

type SensorEntry = {
  id: number;
  temperature_C: number | null;
  humidity_percent: number | null;
  luminosity_raw: number | null;
  pressure_hPa: number | null;
  altitude_m: number | null;
  createdAt: string;
};

const COLORS = {
  luminosity: "#FFD700", // galben
  humidity: "#0074D9", // albastru
  temperature: "#FF4136", // rosu
  altitude: "#9b59b6", // mov
  pressure: "#2ecc71", // verde
};

export function SensorHistoryWidget({ className }: Props) {
  const [data, setData] = useState<SensorEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get("/api/sensor-data?limit=20&order=desc");
        const entries: SensorEntry[] = res.data;

        entries.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        const formatted = entries.map((entry, i) => ({
          ...entry,
          index: i + 1,
        }));

        setData(formatted);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Eroare",
          description: "Eroare la încărcarea datelor senzori",
        });
      }
    }

    loadData();
  }, []);

  const Legend = () => (
    <div className="flex flex-wrap gap-4 text-white text-xs font-medium mt-3 select-none justify-center">
      <div className="flex items-center gap-1.5">
        <span
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: COLORS.luminosity }}
        />
        <span style={{ color: COLORS.luminosity }}>Luminozitate (lx)</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: COLORS.humidity }}
        />
        <span style={{ color: COLORS.humidity }}>Umiditate (%)</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: COLORS.temperature }}
        />
        <span style={{ color: COLORS.temperature }}>Temperatură (°C)</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: COLORS.altitude }}
        />
        <span style={{ color: COLORS.altitude }}>Altitudine (m)</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: COLORS.pressure }}
        />
        <span style={{ color: COLORS.pressure }}>Presiune (hPa)</span>
      </div>
    </div>
  );

  return (
    <Card
      className={cn(
        "bg-sidebar shadow-md border-none rounded-2xl p-4 text-white flex flex-col",
        className
      )}
    >
      <CardContent className="p-0 flex flex-col flex-1">
        <h2 className="text-lg font-semibold mb-2">
          Ultimele 10 măsurători senzori
        </h2>

        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#ffffff33"
                vertical={false}
              />
              <XAxis
                dataKey="index"
                tick={{ fill: "white", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#888" }}
                interval={0}
              />
              <YAxis
                tick={{ fill: "white", fontSize: 12 }}
                axisLine={{ stroke: "#888" }}
                tickLine={false}
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#222",
                  borderRadius: 8,
                  border: "none",
                }}
                labelStyle={{ color: "white" }}
                itemStyle={{ color: "white" }}
                formatter={(value: any, name: string) => {
                  switch (name) {
                    case "luminosity_raw":
                      return [`${value} lx`, "Luminozitate"];
                    case "humidity_percent":
                      return [`${value}%`, "Umiditate"];
                    case "temperature_C":
                      return [`${value} °C`, "Temperatură"];
                    case "altitude_m":
                      return [`${value} m`, "Altitudine"];
                    case "pressure_hPa":
                      return [`${value} hPa`, "Presiune"];
                    default:
                      return value;
                  }
                }}
              />
              <Line
                type="monotone"
                dataKey="luminosity_raw"
                stroke={COLORS.luminosity}
                strokeWidth={2}
                dot={{
                  r: 3,
                  strokeWidth: 2,
                  stroke: COLORS.luminosity,
                  fill: COLORS.luminosity,
                }}
                activeDot={{ r: 5 }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="humidity_percent"
                stroke={COLORS.humidity}
                strokeWidth={2}
                dot={{
                  r: 3,
                  strokeWidth: 2,
                  stroke: COLORS.humidity,
                  fill: COLORS.humidity,
                }}
                activeDot={{ r: 5 }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="temperature_C"
                stroke={COLORS.temperature}
                strokeWidth={2}
                dot={{
                  r: 3,
                  strokeWidth: 2,
                  stroke: COLORS.temperature,
                  fill: COLORS.temperature,
                }}
                activeDot={{ r: 5 }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="altitude_m"
                stroke={COLORS.altitude}
                strokeWidth={2}
                dot={{
                  r: 3,
                  strokeWidth: 2,
                  stroke: COLORS.altitude,
                  fill: COLORS.altitude,
                }}
                activeDot={{ r: 5 }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="pressure_hPa"
                stroke={COLORS.pressure}
                strokeWidth={2}
                dot={{
                  r: 3,
                  strokeWidth: 2,
                  stroke: COLORS.pressure,
                  fill: COLORS.pressure,
                }}
                activeDot={{ r: 5 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Legend />
      </CardContent>
    </Card>
  );
}
