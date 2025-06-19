"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Lightbulb } from "lucide-react";

export function LuminosityWidget() {
  const [luminosityRaw, setLuminosityRaw] = useState<number | undefined>();
  const [luminosityPercent, setLuminosityPercent] = useState<
    number | undefined
  >();

  useEffect(() => {
    const loadLuminosity = async () => {
      const res = await axios.get("/api/sensor-data");
      const data = res.data[0];
      setLuminosityRaw(data.luminosity_raw);
      setLuminosityPercent(data.luminosity_percent);
    };

    loadLuminosity();
  }, []);

  const getLightType = (percent: number | undefined) => {
    if (percent === undefined) return "N/A";
    return percent > 60 ? "sunlight" : "artificial";
  };

  const getSuggestion = (lux: number | undefined) => {
    if (lux === undefined) return "Date indisponibile";
    if (lux < 100) return "Prea întunecat pentru citit";
    if (lux < 200) return "Potrivit pentru relaxare";
    return "Luminozitate excelentă";
  };

  const getLightIcon = (type: "sunlight" | "artificial" | "N/A") => {
    if (type === "sunlight") return <Sun className="w-5 h-5 text-yellow-400" />;
    if (type === "artificial")
      return <Lightbulb className="w-5 h-5 text-amber-300" />;
    return null;
  };

  const suggestionBgClass =
    (luminosityRaw ?? 0) < 100
      ? "bg-red-100 text-red-600"
      : (luminosityRaw ?? 0) < 200
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <Card className="bg-sidebar shadow-md border-none rounded-2xl p-6">
      <CardContent className="flex flex-col gap-4 p-0">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
          <Sun className="w-6 h-6 text-yellow-400" /> Luminozitate
        </h2>

        <div className="bg-white/10 rounded-xl p-4 flex flex-col gap-2 text-white">
          <div className="flex justify-between items-center">
            <span className="font-medium text-white/70">Cameră principală</span>
            <div className="flex items-center gap-2 text-sm text-white/70">
              {getLightIcon(getLightType(luminosityPercent))}
              {getLightType(luminosityPercent) === "sunlight"
                ? "Lumina naturală"
                : "Lumina artificială"}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-lg font-bold text-white">
              {luminosityRaw ?? "—"} lx
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full font-semibold ${suggestionBgClass}`}
              style={{
                backgroundColor: suggestionBgClass
                  .replace("text-", "")
                  .replace("-600", "-200"),
              }}
            >
              {getSuggestion(luminosityRaw)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
