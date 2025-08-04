"use client";

import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import BottomMenu from "./components/BottomMenu";
import Favorites from "./components/Favorites";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("weather");
  const [selectedCity, setSelectedCity] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const [bgClass, setBgClass] = useState("bg-clear");

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleWeatherChange = (description) => {
    console.log("Météo changée :", description);
    if (!description) return setBgClass("bg-clear");

    const desc = description.toLowerCase();

    if (desc.includes("clear")) setBgClass("bg-clear");
    else if (desc.includes("cloud")) setBgClass("bg-cloudy");
    else if (desc.includes("light rain")) setBgClass("bg-rainy");
    else if (desc.includes("thunderstorm")) setBgClass("bg-thunder");
    else if (desc.includes("snow")) setBgClass("bg-snowy");
    else if (desc.includes("mist") || desc.includes("fog")) setBgClass("bg-foggy");
    else setBgClass("bg-clear");
  };

  return (
    <div className="relative sm:h-screen w-full h-screen overflow-hidden">
      {/* ✅ Background animé et flouté */}
      <div className={`absolute inset-0 z-0 ${bgClass} bg-cover bg-center blur-xs scale-110 transition-all duration-500`} />

      {/* ✅ Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 z-10 bg-black/30" />

      {/* ✅ Contenu principal */}
      <div className="relative z-20 flex flex-col sm:h-full w-full">
        <main className="flex-1 h-full items-center justify-center md:mt-15 md:mb-15 mt-12 mb-18 overflow-y-auto min-w-full">
          <div className="flex justify-center items-center min-h-full p-4 sm:p-6">
            {currentTab === "weather" && (
              <Dashboard
                selectedCity={selectedCity}
                onWeatherChange={handleWeatherChange}
              />
            )}

            {currentTab === "settings" && (
              <div className="mt-10 text-center text-white">
                <h2 className="text-2xl font-bold">Paramètres</h2>
                <p className="mt-2">Fonctionnalités à venir...</p>
              </div>
            )}

            {currentTab === "favorites" && (
              <Favorites
                onSelectCity={(city) => {
                  setSelectedCity(city);
                  setCurrentTab("weather");
                }}
                cities={favorites}
                setCities={setFavorites}
              />
            )}
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 w-full z-30">
          <BottomMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </footer>
      </div>
    </div>
  );
}
