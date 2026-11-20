"use client";

import { useState, useEffect } from "react";
import { getTemperatureUnit } from "@/lib/temperature";
import WeatherIcon from "./WeatherIcon";

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
    "thunderstorm with heavy rain": "Orage avec forte pluie",
  };

  const lower = desc.toLowerCase();
  return translations[lower] || desc.charAt(0).toUpperCase() + desc.slice(1); // fallback : capitalise
};

const WeatherCard = ({ weatherInfo }) => {
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

  const translatedDescription = translateDescription(weatherInfo.description);
  console.log(weatherInfo);

  // Extraire la température et l'unité
  const tempValue = temperatureUnit === "fahrenheit" 
    ? Math.round((weatherInfo.temp * 9/5) + 32)
    : weatherInfo.temp;

  const unitLetter = temperatureUnit === "fahrenheit" ? "F" : "C";

  return (
    <section aria-labelledby="current-city" className="min-w-0">
      <h2
        id="current-city"
        className="font-display text-4xl font-medium leading-none tracking-tight text-fg sm:text-5xl break-words"
      >
        {weatherInfo.location}
      </h2>

      <div className="mt-6 flex items-end justify-between gap-5 sm:gap-8">
        <p className="font-display tabular text-[7.5rem] font-light leading-[0.78] tracking-tight text-fg sm:text-[10rem] lg:text-[11.5rem]">
          {tempValue}
          <span className="align-top text-[0.4em] font-normal text-dim">
            °{unitLetter}
          </span>
        </p>
        <WeatherIcon
          description={weatherInfo.description}
          className="mb-1 h-20 w-20 shrink-0 text-sky sm:h-28 sm:w-28 lg:mr-4"
          strokeWidth={1}
        />
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <p className="text-lg font-medium text-fg sm:text-xl">
          {translatedDescription}
        </p>
      </div>
    </section>
  );
};

export default WeatherCard;
