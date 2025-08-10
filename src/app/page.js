"use client";

import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import BottomMenu from "./components/BottomMenu";
import Favorites from "./components/Favorites";
import Settings from "./components/Settings";

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

  // Écouter les événements de suppression des favoris
  useEffect(() => {
    const handleFavoritesCleared = () => {
      setFavorites([]);
    };

    window.addEventListener("favoritesCleared", handleFavoritesCleared);
    return () => {
      window.removeEventListener("favoritesCleared", handleFavoritesCleared);
    };
  }, []);

  const handleClearFavorites = () => {
    setFavorites([]);
  };

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
    <div className="relative w-full h-screen overflow-hidden">
      {/* ✅ Background animé et flouté */}
      <div className={`absolute inset-0 z-0 ${bgClass} bg-cover bg-center bg-fixed blur-sm scale-110 transition-all duration-500`} />

      {/* ✅ Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 z-10 bg-black/30" />

      {/* ✅ Contenu principal */}
      <div className="relative z-20 flex flex-col h-full w-full safe-top safe-bottom">
        <main className="flex-1 h-full items-center justify-center overflow-y-auto min-w-full pt-3 pb-20">
          <div className="flex justify-center items-center min-h-full p-4 sm:p-6">
            {currentTab === "weather" && (
              <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 w-full flex justify-center">
                <Dashboard
                  selectedCity={selectedCity}
                  onWeatherChange={handleWeatherChange}
                />
              </div>
            )}

            {currentTab === "settings" && (
              <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500 w-full flex justify-center">
                <Settings onClearFavorites={handleClearFavorites} />
              </div>
            )}

            {currentTab === "favorites" && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 w-full flex justify-center">
                <Favorites
                  onSelectCity={(city) => {
                    setSelectedCity(city);
                    setCurrentTab("weather");
                  }}
                  cities={favorites}
                  setCities={setFavorites}
                />
              </div>
            )}
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 w-full z-30 safe-bottom">
          <BottomMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </footer>
      </div>
    </div>
  );
}
