"use client";

import { useState, useEffect } from "react";
import { Droplets, Wind, ThermometerSun, GaugeCircle } from "lucide-react";
import { getTemperatureUnit } from "@/lib/temperature";

const WeatherDetails = ({ weatherInfo }) => {
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

  if (!weatherInfo || !weatherInfo.main || !weatherInfo.wind) return null;

  const { feels_like, humidity, pressure } = weatherInfo.main;
  const windSpeed = weatherInfo.wind.speed;

  // Convertir la température ressentie selon l'unité choisie
  const feelsLikeTemp = temperatureUnit === "fahrenheit" 
    ? Math.round((feels_like * 9/5) + 32)
    : Math.round(feels_like);

  const rows = [
    { label: "Ressentie", value: feelsLikeTemp, unit: "°", Icon: ThermometerSun, color: "text-yellow-400" },
    { label: "Humidité", value: humidity, unit: "%", Icon: Droplets, color: "text-blue-300" },
    { label: "Vent", value: windSpeed, unit: "m/s", Icon: Wind, color: "text-sky-400" },
    { label: "Pression", value: pressure, unit: "hPa", Icon: GaugeCircle, color: "text-purple-300" },
  ];

  return (
    <section aria-labelledby="details-title" className="panel min-w-0 p-5 sm:p-6">
      <h2 id="details-title" className="text-sm font-semibold text-white/75">
        Conditions
      </h2>
      <dl className="mt-2 grid grid-cols-2">
        {rows.map(({ label, value, unit, Icon, color }, i) => (
          <div
            key={label}
            className={`py-3 sm:py-4 ${i % 2 === 0 ? "pr-3 border-r border-white/10" : "pl-4 sm:pl-5"} ${i < 2 ? "border-b border-white/10" : ""}`}
          >
            <dt className="flex items-center gap-2 text-sm text-white/75">
              <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
              {label}
            </dt>
            <dd className="tabular mt-2 text-2xl font-semibold text-white sm:text-3xl">
              {value}
              <span className={`${unit === "°" ? "" : "ml-1 "}text-sm font-normal text-white/70`}>{unit}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default WeatherDetails;
