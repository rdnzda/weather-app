"use client";

import { useState, useEffect } from "react";
import { getTemperatureUnit } from "@/lib/temperature";
import WeatherIcon from "./WeatherIcon";

// Traduction des descriptions météo en français
const translateDescription = (desc) => {
  const translations = {
    "clear sky": "Ciel dégagé",
    "few clouds": "Nuages dispersés",
    "scattered clouds": "Ciel nuageux",
    "broken clouds": "Ciel partiellement nuageux",
    "overcast clouds": "Ciel couvert",
    "shower rain": "Averses",
    rain: "Pluie",
    "light rain": "Pluie légère",
    "moderate rain": "Pluie modérée",
    thunderstorm: "Orage",
    snow: "Neige",
    mist: "Brume",
    fog: "Brouillard",
  };

  const lower = desc.toLowerCase();
  return translations[lower] || desc.charAt(0).toUpperCase() + desc.slice(1);
};

const WeatherForecast = ({ weatherInfo, weatherAdvice }) => {
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  
  // Écouter les changements d'unité de température
  useEffect(() => {
    const updateUnit = () => {
      setTemperatureUnit(getTemperatureUnit());
    };
    
    // Initialiser l'unité
    updateUnit();
    
    // Écouter les changements
    window.addEventListener("temperatureUnitChanged", updateUnit);
    
    return () => {
      window.removeEventListener("temperatureUnitChanged", updateUnit);
    };
  }, []);
  const days = weatherInfo.map((forecast) => {
    const date = new Date(forecast.dt_txt);
    const description = forecast.weather[0].description;
    return {
      key: forecast.dt_txt,
      day: date.toLocaleDateString("fr-FR", { weekday: "short" }), // jour abrégé
      temp:
        temperatureUnit === "fahrenheit"
          ? Math.round((forecast.main.temp * 9) / 5 + 32)
          : Math.round(forecast.main.temp),
      description,
      translatedDescription: translateDescription(description),
    };
  });

  // Échelle verticale du graphique : min/max réels, avec une marge.
  const temps = days.map((d) => d.temp);
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const span = Math.max(max - min, 4);
  const mid = (max + min) / 2;
  const lo = mid - span / 2;
  const yPct = (t) => 82 - ((t - lo) / span) * 52; // 30 % (haut) → 82 % (bas)
  const xPct = (i) => ((i + 0.5) / days.length) * 100;
  const points = days.map((d, i) => `${xPct(i)},${yPct(d.temp)}`).join(" ");

  return (
    <section aria-labelledby="forecast-title" className="w-full">
      <p className="max-w-3xl border-l-2 border-sky pl-4 text-base leading-relaxed text-fg/90 sm:text-lg">
        {weatherAdvice}
      </p>

      <div className="mt-10 border-b border-line pb-3">
        <h2 id="forecast-title" className="text-sm font-semibold text-dim">
          Prévisions à 12:00
        </h2>
      </div>

      {days.length > 0 && (
        <div className="relative">
          {/* Courbe des températures */}
          <div className="relative h-36 sm:h-44" aria-hidden="true">
            <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line x1="0" x2="100" y1={yPct(max)} y2={yPct(max)} stroke="var(--line)" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
              <line x1="0" x2="100" y1={yPct(min)} y2={yPct(min)} stroke="var(--line)" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
              <polyline
                points={points}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {days.map((d, i) => (
              <div
                key={d.key}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${xPct(i)}%`, top: `${yPct(d.temp)}%` }}
              >
                <span className="block h-2.5 w-2.5 rounded-full border-2 border-sky bg-ink" />
                <span className="font-display tabular absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 text-xl font-medium leading-none text-fg sm:text-2xl">
                  {d.temp}°
                </span>
              </div>
            ))}
          </div>

          {/* Tableau jour par jour */}
          <ol
            className="grid border-t border-line"
            style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))` }}
          >
            {days.map((d, i) => (
              <li
                key={d.key}
                className={`flex flex-col items-center gap-2 px-1 py-4 text-center ${
                  i > 0 ? "border-l border-line" : ""
                }`}
              >
                <span className="text-sm font-semibold capitalize text-fg sm:text-base">
                  {d.day}
                </span>
                <WeatherIcon
                  description={d.description}
                  label={d.translatedDescription}
                  className="h-7 w-7 text-dim sm:h-8 sm:w-8"
                />
                <span className="sr-only">{d.temp}°</span>
                <span className="hidden text-xs leading-snug text-dim md:block lg:text-sm">
                  {d.translatedDescription}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
};

export default WeatherForecast;
