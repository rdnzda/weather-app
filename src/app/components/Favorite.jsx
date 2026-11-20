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
    <li className="relative flex items-stretch border-b border-line">
      <button
        type="button"
        onClick={handleClick}
        className="group flex min-w-0 flex-1 items-center gap-4 py-4 pr-2 text-left cursor-pointer hover:bg-panel focus-visible:outline-offset-[-2px] sm:gap-6 sm:pl-2"
      >
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-display text-2xl font-medium leading-tight text-fg sm:text-3xl">
            {weather?.location || city}
          </h2>
          <p className="mt-1 flex items-center gap-2 truncate text-sm text-dim sm:text-base">
            {weather ? (
              <>
                {description && (
                  <WeatherIcon description={description} className="h-4 w-4 shrink-0 text-sky" />
                )}
                {translatedDesc}
              </>
            ) : (
              <span role="status">Chargement...</span>
            )}
          </p>
        </div>
        {weather && temp !== null && (
          <p className="font-display tabular shrink-0 text-5xl font-light leading-none text-fg sm:text-6xl">
            {temp}
            <span className="align-top text-[0.45em] font-normal text-dim">°{tempUnit}</span>
          </p>
        )}
      </button>

      {weather && (
        <div className="relative flex items-center pl-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-sm text-dim transition-colors hover:bg-panel hover:text-fg cursor-pointer"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label={`Options pour ${weather?.location || city}`}
          >
            <EllipsisVertical className="h-5 w-5" aria-hidden="true" />
          </button>

          {menuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-full z-10 -mt-2 border border-line-strong bg-panel"
            >
              <button
                type="button"
                onClick={() => {
                  removeCity(city);
                  setMenuOpen(false);
                }}
                className="flex h-11 items-center gap-2 whitespace-nowrap px-4 text-sm font-medium text-danger transition-colors hover:bg-ink cursor-pointer"
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
