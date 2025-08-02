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
    // On transforme le conteneur principal en flexbox vertical
    <div className="h-screen flex flex-col">
      {/* 1. Zone de contenu principal */}
      {/* flex-1 permet à cette zone de prendre tout l'espace vertical disponible */}
      {/* overflow-y-auto gère le défilement si le contenu est trop grand */}
      <main className="flex-1 mt-15 mb-15 overflow-y-auto">
        <div className="flex justify-center items-center min-h-full p-4 sm:p-6">
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
              cities={favorites}
              setCities={setFavorites}
            />
          )}
        </div>
      </main>

      {/* 2. Menu bas fixé */}
      {/* flex-shrink-0 empêche le menu de rétrécir */}
      <div className="flex-shrink-0">
        <BottomMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
    </div>
  );
}
