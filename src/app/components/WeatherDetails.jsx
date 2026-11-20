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
    { label: "Ressentie", value: feelsLikeTemp, unit: "°", Icon: ThermometerSun },
    { label: "Humidité", value: humidity, unit: "%", Icon: Droplets },
    { label: "Vent", value: windSpeed, unit: "m/s", Icon: Wind },
    { label: "Pression", value: pressure, unit: "hPa", Icon: GaugeCircle },
  ];

  return (
    <section aria-labelledby="details-title" className="min-w-0 lg:border-l lg:border-line lg:pl-12">
      <h2 id="details-title" className="text-sm font-semibold text-dim">
        Qualité de l&apos;air
      </h2>
      <dl className="mt-3 grid grid-cols-2 border-t border-line lg:grid-cols-1">
        {rows.map(({ label, value, unit, Icon }, i) => (
          <div
            key={label}
            className={`flex flex-col gap-1 border-b border-line py-4 lg:flex-row lg:items-baseline lg:justify-between ${
              i % 2 === 0 ? "pr-4 border-r lg:border-r-0 lg:pr-0" : "pl-4 lg:pl-0"
            }`}
          >
            <dt className="flex items-center gap-2 text-sm text-dim">
              <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              {label}
            </dt>
            <dd className="font-display tabular text-3xl font-medium leading-none text-fg sm:text-4xl">
              {value}
              <span className={`${unit === "°" ? "" : "ml-1 "}text-base font-normal text-dim`}>{unit}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default WeatherDetails;
