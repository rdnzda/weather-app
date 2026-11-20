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
    <section
      aria-labelledby="current-city"
      className="flex min-w-0 items-center justify-between gap-4 text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.5),0_2px_16px_rgb(0_0_0/0.35)]"
    >
      <div className="min-w-0">
        <h2
          id="current-city"
          className="break-words text-3xl font-semibold sm:text-5xl"
        >
          {weatherInfo.location}
        </h2>
        <p className="tabular -ml-1 mt-1 text-8xl font-extralight leading-none tracking-tighter sm:text-[9rem] lg:text-[10rem]">
          {tempValue}
          <span className="align-top text-[0.4em] font-light">°{unitLetter}</span>
        </p>
        <p className="mt-2 text-lg font-medium sm:text-2xl">
          {translatedDescription}
        </p>
      </div>
      <WeatherIcon
        description={weatherInfo.description}
        className="h-28 w-28 shrink-0 drop-shadow-[0_4px_16px_rgb(0_0_0/0.35)] sm:h-44 sm:w-44 lg:h-52 lg:w-52"
      />
    </section>
  );
};

export default WeatherCard;
