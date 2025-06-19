"use client";

import WeatherWidget from "../widgets/weather-widget";
import { MembersList } from "./members-list";
import { RoomMetricsWidget } from "../widgets/room-metrics-widget";
import { CCTVWidget } from "../widgets/cctv-widget";
import { useEffect, useState } from "react";
import axios from "axios";
import { LuminosityWidget } from "../widgets/luminosity-widget";
import { AirQualityWidget } from "../widgets/air-quality-widget";
import { SensorHistoryWidget } from "../widgets/sensor-history-widget";

export function Dashboard({ userName }: { userName: string }) {
  const [sensorData, setSensorData] = useState({
    temperature_C: undefined,
    humidity_percent: undefined,
    pressure_hPa: undefined,
    luminosity_raw: undefined,
    luminosity_percent: undefined,
  });

  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get("/api/sensor-data");
      const data = res.data[0];
      setSensorData({
        temperature_C: data.temperature_C,
        humidity_percent: data.humidity_percent,
        pressure_hPa: data.pressure_hPa,
        luminosity_raw: data.luminosity_raw,
        luminosity_percent: data.luminosity_percent,
      });
    };

    loadData();
  }, []);

  return (
    <div className="h-full w-full flex gap-8">
      <div className="flex flex-col gap-4 w-full h-full">
        <WeatherWidget userName={userName} city="suceava" />
        <MembersList />
        <CCTVWidget />
      </div>

      <div className="w-2/5 flex flex-col gap-4 h-full">
        <RoomMetricsWidget
          temperature={sensorData.temperature_C}
          humidity={sensorData.humidity_percent}
          pressure={sensorData.pressure_hPa}
        />
        <LuminosityWidget />
        <AirQualityWidget />
      </div>
    </div>
  );
}
