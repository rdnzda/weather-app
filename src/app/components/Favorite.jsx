import React, { useState, useEffect } from "react";
import { EllipsisVertical, Trash2 } from "lucide-react";
import WeatherIcon from "./WeatherIcon";
import { getTemperatureUnit } from "@/lib/temperature";

const translateDescription = (desc) => {
  const translations = {
    "clear sky": "Ciel dégagé",
    "few clouds": "Nuages dispersés",
    "scattered clouds": "Ciel nuageux",
    "broken clouds": "Ciel partiellement nuageux",
    "overcast clouds": "Ciel couvert",
    "shower rain": "Averses",
    "thunderstorm with heavy rain": "Orage avec forte pluie",
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

function Favorite({ city, weather, onSelectCity, removeCity }) {
  const [menuOpen, setMenuOpen] = useState(false);
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

  const handleClick = () => {
    if (onSelectCity) onSelectCity(city);
  };

  const description = weather?.weather?.[0]?.description;

  const translatedDesc = weather?.weather?.[0]?.description
    ? translateDescription(weather.weather[0].description)
    : null;

  // Convertir la température selon l'unité choisie
  const temp = weather?.main?.temp ? (
    temperatureUnit === "fahrenheit" 
      ? Math.round((weather.main.temp * 9/5) + 32)
      : Math.round(weather.main.temp)
  ) : null;
  const tempUnit = temperatureUnit === "fahrenheit" ? "F" : "C";

  return (
    <li className="panel relative flex items-stretch">
      <button
        type="button"
        onClick={handleClick}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-l-2xl py-3 pl-4 pr-2 text-left transition-colors hover:bg-white/5 cursor-pointer focus-visible:outline-offset-[-2px] sm:gap-5 sm:pl-6"
      >
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-semibold text-white sm:text-2xl">
            {weather?.location || city}
          </h2>
          {weather ? (
            <>
              {temp !== null && (
                <p className="tabular text-4xl font-extralight leading-tight text-white sm:text-5xl">
                  {temp}
                  <span className="align-top text-[0.5em] text-white/70">°{tempUnit}</span>
                </p>
              )}
              {translatedDesc && (
                <p className="truncate text-sm font-medium text-white/80 sm:text-base">
                  {translatedDesc}
                </p>
              )}
            </>
          ) : (
            <p role="status" className="text-sm text-white/70">Chargement...</p>
          )}
        </div>
        {description && (
          <WeatherIcon description={description} animated={false} className="h-16 w-16 shrink-0 sm:h-24 sm:w-24" />
        )}
      </button>

      {weather && (
        <div className="relative flex items-center pr-2 sm:pr-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white/85 transition-colors hover:bg-white/20 cursor-pointer"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label={`Options pour ${weather?.location || city}`}
          >
            <EllipsisVertical className="h-4 w-4" aria-hidden="true" />
          </button>

          {menuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-2 top-[calc(50%+1.5rem)] z-10 overflow-hidden rounded-lg border border-white/15 bg-[#0c1016] shadow-lg shadow-black/40"
            >
              <button
                type="button"
                onClick={() => {
                  removeCity(city);
                  setMenuOpen(false);
                }}
                className="flex h-11 items-center gap-2 whitespace-nowrap px-4 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Supprimer
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export default Favorite;
