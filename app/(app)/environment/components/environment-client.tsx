"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Wind, Droplet, Thermometer, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  name: string;
}

const cities = ["Suceava", "Cluj-Napoca", "Timisoara", "Iasi", "Brasov"];

export function EnvironmentClient() {
  const [city, setCity] = useState(cities[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
        const res = await axios.get(url);
        setWeather(res.data);
      } catch {
        setError("Eroare la încărcarea datelor meteo.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const getSuggestions = () => {
    if (!weather) return [];

    const temp = weather.main.temp;
    const windSpeed = weather.wind.speed;
    const desc = weather.weather[0].description;

    const suggestions = [];

    if (temp > 25) {
      suggestions.push("Folosește ventilatoare pentru a răcori casa.");
      suggestions.push(
        "Închide geamurile pe timpul zilei pentru a păstra răcoarea."
      );
      suggestions.push(
        "Aprinde lumini LED pentru că generează mai puțină căldură."
      );
    } else if (temp < 10) {
      suggestions.push(
        "Deschide geamurile în timpul zilei pentru a încălzi natural locuința."
      );
      suggestions.push("Folosește încălzire suplimentară dacă este frig.");
      suggestions.push("Folosește lumini calde pentru confort.");
    } else {
      suggestions.push(
        "Temperatura este optimă. Ventilația ușoară este recomandată."
      );
      suggestions.push("Folosește lumina naturală cât poți.");
    }

    if (windSpeed > 5) {
      suggestions.push(
        "Închide geamurile dacă vântul este puternic pentru a evita curenții reci."
      );
    }

    suggestions.push(`Starea vremii: ${desc}.`);

    return suggestions;
  };

  return (
    <Card className="border-none w-full bg-transparent text-white rounded-2xl shadow-md p-6">
      <CardContent className="flex flex-col gap-4 p-0">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Sun className="w-6 h-6" /> Vremea în {city}
        </h2>

        {/* City selector */}
        <Select value={city} onValueChange={(val) => setCity(val)}>
          <SelectTrigger className="mb-4 w-[200px] text-white">
            <SelectValue placeholder="Selectează orașul" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {loading && <p>Se încarcă datele meteo...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {weather && (
          <>
            {/* Weather badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                {
                  icon: <Thermometer className="w-5 h-5" />,
                  label: `Temperatura: ${weather.main.temp.toFixed(1)}°C`,
                  gradient: "from-red-500 via-red-600 to-red-700",
                  border: "border-red-800",
                },
                {
                  icon: <Droplet className="w-5 h-5" />,
                  label: `Umiditate: ${weather.main.humidity}%`,
                  gradient: "from-blue-400 via-blue-500 to-blue-600",
                  border: "border-blue-700",
                },
                {
                  icon: <Wind className="w-5 h-5" />,
                  label: `Vânt: ${weather.wind.speed.toFixed(1)} m/s`,
                  gradient: "from-green-400 via-green-500 to-green-600",
                  border: "border-green-700",
                },
                {
                  icon: <Info className="w-5 h-5" />,
                  label: `Descriere: ${weather.weather[0].description}`,
                  gradient: "from-yellow-400 via-yellow-500 to-yellow-600",
                  border: "border-yellow-700",
                },
              ].map(({ icon, label, gradient, border }, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-1 rounded-full px-4 py-2 text-white text-sm font-semibold shadow-md bg-gradient-to-br ${gradient} border ${border}`}
                  style={{ borderWidth: "1.5px" }}
                >
                  {icon}
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Sugestii</h3>
              <ul className="space-y-3">
                {getSuggestions().map((sug, i) => (
                  <li
                    key={i}
                    className="rounded-xl px-4 py-3 bg-gradient-to-br from-cyan-600 via-cyan-500 to-cyan-700 text-white shadow-md"
                  >
                    {sug}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
