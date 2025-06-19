"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { IWeatherData } from "@/lib/models";
import { Cloud, Sun, CloudRain, CloudSnow, Wind } from "lucide-react";
import { formatDate, getWelcomeMessage } from "@/lib/utils";

const WeatherWidget = ({
  userName,
  city,
}: {
  userName: string | null;
  city?: string;
}) => {
  const [weather, setWeather] = useState<IWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const currentDate = new Date();
  const { formattedDate, formattedTime } = formatDate(currentDate);

  const getWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case "clear sky":
        return <Sun className="size-4" />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return <Cloud className="size-4" />;
      case "rain":
      case "shower rain":
        return <CloudRain className="size-4" />;
      case "snow":
        return <CloudSnow className="size-4" />;
      case "wind":
        return <Wind className="size-4" />;
      default:
        return <Cloud className="size-4" />;
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
      try {
        const response = await axios.get(url);
        setWeather(response.data);
      } catch (err) {
        setError("Failed to load weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const formatTemperature = (temp: number) => {
    const roundedTemp = Math.round(temp);
    return roundedTemp > 0 ? `+${roundedTemp}` : `${roundedTemp}`;
  };

  const capitalizeCity = (city: string | undefined) => {
    if (!city) return "";
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col gap-2">
        <p className="text-3xl font-medium">{`Salut, ${userName}!`}</p>
        <p className="text-sm">
          {getWelcomeMessage(
            weather?.weather[0]?.description || "Să ai o zi buna!"
          )}
        </p>
      </div>
      <div className="flex flex-col gap-2 text-end">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-medium">{formattedTime}</p>
          <p className="text-sm">{formattedDate}</p>
        </div>

        <div className="flex items-center gap-2 justify-end">
          {loading ? (
            <p className="text-yellow-200 text-sm">Loading weather...</p>
          ) : error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : (
            <>
              <p className="text-yellow-200 text-sm">
                {capitalizeCity(city)},&nbsp;
                {formatTemperature(weather?.main.temp ?? 0)} °C
              </p>
              <div
                role="img"
                aria-label={weather?.weather[0]?.description || "weather"}
                className="rounded-full size-6 bg-blue-400 flex items-center justify-center"
              >
                {getWeatherIcon(weather?.weather[0]?.description || "")}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
