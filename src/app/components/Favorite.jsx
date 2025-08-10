import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaTrash } from "react-icons/fa";
import { getTemperatureUnit } from "@/lib/temperature";

// Icônes & traduction
const getWeatherIconSrc = (description) => {
  const desc = description.toLowerCase();
  if (desc.includes("clear")) return "/images/animated/day.svg";
  if (desc.includes("clouds")) return "/images/animated/cloudy.svg";
  if (desc.includes("rain")) return "/images/animated/rainy-1.svg";
  if (desc.includes("thunderstorm")) return "/images/animated/thunder.svg";
  if (desc.includes("snow")) return "/images/animated/snowy-1.svg";
  if (desc.includes("mist") || desc.includes("fog"))
    return "/images/animated/cloudy.svg";
  return "/images/animated/day.svg";
};

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

  const iconSrc = weather?.weather?.[0]?.description
    ? getWeatherIconSrc(weather.weather[0].description)
    : null;

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
    <li
      className={`relative flex justify-between items-center px-3 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-md shadow-md hover:bg-white/20 cursor-pointer select-none border-none transition-all duration-200 active:scale-[0.98]
        ${menuOpen ? "overflow-visible" : "overflow-hidden"}`}
      onClick={handleClick}
    >
      {weather ? (
        <>
          {/* Infos Ville + Description */}
          <div className="ml-1 sm:ml-2 flex flex-row justify-between items-center w-full gap-3 sm:gap-5">
            <div className="flex flex-col items-start gap-1 min-w-0 flex-1">
              <h2 className="font-semilight text-lg sm:text-xl lg:text-2xl truncate w-full">
                {weather?.location || city}
              </h2>
              <div className="relative flex flex-row items-center justify-start gap-1">
                <h3 className="font-extralight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                  {temp}
                </h3>
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl -mt-1 sm:-mt-2">°{tempUnit}</span>
              </div>
              {translatedDesc && (
                <p className="mt-1 sm:mt-2 font-medium tracking-wide text-white opacity-80 text-xs sm:text-sm md:text-base lg:text-lg truncate w-full">
                  {translatedDesc}
                </p>
              )}
            </div>
            {iconSrc && (
              <img
                src={iconSrc}
                alt="weather icon"
                className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex-shrink-0"
              />
            )}
          </div>
          {/* Température + Icône + Menu */}
          <div className="flex items-center gap-4 relative">
            {/* Bouton menu moderne */}
            <div className="relative pt-2 cursor-pointer">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((prev) => !prev);
                }}
                className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200 transform hover:scale-105"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                <FaEllipsisV className="w-4 h-4 text-white/80" />
              </button>

              <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute right-0 top-full mt-3 bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-white/20 z-10 w-12 h-12 overflow-hidden
                  transition-all duration-300 ease-out
                  ${
                    menuOpen
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                  }
                `}
                aria-hidden={!menuOpen}
              >
                <button
                  onClick={() => {
                    removeCity(city);
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-center w-full h-full
                    hover:bg-red-500/30 hover:backdrop-blur-md hover:cursor-pointer
                    transition-all duration-200 ease-in-out
                    text-white/90 hover:text-red-300"
                >
                  <FaTrash className="w-4 h-4 text-red-400 hover:text-red-300" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <img
            src="/images/animated/thunder.svg"
            alt="weather icon"
            className="w-20 h-20 object-contain mt-2"
          />
        </div>
      )}
    </li>
  );
}

export default Favorite;
