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

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      {/* Contenu principal */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        {currentTab === "weather" && <Dashboard selectedCity={selectedCity} />}

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
            cities={favorites} setCities={setFavorites}
          />
        )}
      </div>

      {/* Menu bas fixé */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <BottomMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
    </>
  );
}
