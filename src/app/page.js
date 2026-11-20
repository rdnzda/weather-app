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
    <div className="relative isolate min-h-[100dvh] w-full text-white">
      {/* Photo de fond selon la météo : nette, avec un voile pour la lisibilité */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 -z-20 ${bgClass} bg-cover bg-center transition-all duration-500`}
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-black/30"
      />

      <main className="w-full safe-top pb-32">
        <div className="mx-auto w-full max-w-5xl px-4 pt-4 sm:px-6 sm:pt-8">
          {currentTab === "weather" && (
            <div>
              <Dashboard
                selectedCity={selectedCity}
                onWeatherChange={handleWeatherChange}
              />
            </div>
          )}

          {currentTab === "settings" && (
            <div>
              <Settings onClearFavorites={handleClearFavorites} />
            </div>
          )}

          {currentTab === "favorites" && (
            <div>
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

      <footer className="fixed bottom-0 left-0 z-30 w-full safe-bottom">
        <BottomMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </footer>
    </div>
  );
}
