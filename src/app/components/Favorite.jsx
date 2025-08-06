import React, { useState } from "react";
import { FaEllipsisV, FaTrash } from "react-icons/fa";

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

  const handleClick = () => {
    if (onSelectCity) onSelectCity(city);
  };

  const iconSrc = weather?.weather?.[0]?.description
    ? getWeatherIconSrc(weather.weather[0].description)
    : null;

  const translatedDesc = weather?.weather?.[0]?.description
    ? translateDescription(weather.weather[0].description)
    : null;

  return (
    <li
      className={`relative flex justify-between items-center px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md shadow-md hover:bg-white/20 cursor-pointer select-none border-none
        ${menuOpen ? "overflow-visible" : "overflow-hidden"}`}
      onClick={handleClick}
    >
      {weather ? (
        <>
          {/* Infos Ville + Description */}
          <div className="ml-2 flex flex-row justify-between items-center max-w-10xl w-full gap-5">
            <div className="flex flex-col items-start gap-1">
              <h2
                className="font-semilight
              sm:text-2xl
              text-xl"
              >
                {weather?.location || city}
              </h2>
              <div className="relative flex flex-row items-center justify-center gap-1">
                <h3
                  className="font-extralight
              lg:text-7xl
              md:text-6xl
              text-5xl"
                >
                  {Math.round(weather.main.temp)}
                </h3>
                <span className="absolute text-5xl top-1.5 -right-5">°</span>
              </div>
              {translatedDesc && (
                <p
                  className="mt-2 font-medium tracking-wide text-white opacity-80 text-clip
              md:text-lg
              sm:text-md
              text-sm"
                >
                  {translatedDesc}
                </p>
              )}
            </div>
            {iconSrc && (
              <img
                src={iconSrc}
                alt="weather icon"
                className="object-contain
                w-30 h-30"
              />
            )}
          </div>
          {/* Température + Icône + Menu */}
          <div className="flex items-center gap-4 relative">
            {/* Bouton menu */}
            <div className="relative pt-2 cursor-pointer">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((prev) => !prev);
                }}
                className="text-white hover:text-white/70 cursor-pointer"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                <FaEllipsisV size={20} />
              </button>

              <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute right-0 top-full mt-2 bg-amber-900 text-white rounded-md shadow-lg z-10 w-40
                  transition-transform transition-opacity duration-300
                  ${
                    menuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }
                `}
                aria-hidden={!menuOpen}
              >
                <button
                  onClick={() => {
                    removeCity(city);
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-3 px-4 py-4 w-full h-full
                    hover:bg-gray-100 hover:text-black 
                    rounded-md transition-all duration-200 ease-in-out"
                >
                  <FaTrash size={14} />
                  Supprimer
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
