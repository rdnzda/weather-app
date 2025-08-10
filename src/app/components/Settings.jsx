"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Thermometer,
  Trash2,
  Settings as SettingsIcon,
  User,
} from "lucide-react";

export default function Settings({ onClearFavorites }) {
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");

  // Charger l'unité de température depuis localStorage
  useEffect(() => {
    const storedUnit = localStorage.getItem("temperatureUnit");
    if (storedUnit) {
      setTemperatureUnit(storedUnit);
    }
  }, []);

  // Sauvegarder l'unité de température dans localStorage
  const handleUnitChange = (unit) => {
    setTemperatureUnit(unit);
    localStorage.setItem("temperatureUnit", unit);
    // Déclencher un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(
      new CustomEvent("temperatureUnitChanged", { detail: unit })
    );
  };

  // Supprimer tous les favoris
  const handleClearFavorites = () => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer tous vos favoris ?")
    ) {
      localStorage.removeItem("favorites");
      if (onClearFavorites) {
        onClearFavorites();
      }
      // Déclencher un événement pour notifier les autres composants
      window.dispatchEvent(new CustomEvent("favoritesCleared"));
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-2xl text-white p-3 sm:p-6">
      {/* En-tête moderne */}
      <div className="flex items-center gap-3 sm:gap-4 mb-2">
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-blue-400/30">
          <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-light text-white/90">Paramètres</h1>
          <p className="text-xs sm:text-sm text-white/50 -mt-1">Personnalisez votre expérience</p>
        </div>
      </div>

      {/* Section Unité de température */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Thermometer className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
          <h2 className="text-lg sm:text-xl font-semibold">Unité de température</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            onClick={() => handleUnitChange("celsius")}
            variant={temperatureUnit === "celsius" ? "default" : "outline"}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base ${
              temperatureUnit === "celsius"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-white/20 hover:bg-white/30 text-white border-white/30"
            }`}
          >
            Celsius (°C)
          </Button>

          <Button
            onClick={() => handleUnitChange("fahrenheit")}
            variant={temperatureUnit === "fahrenheit" ? "default" : "outline"}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base ${
              temperatureUnit === "fahrenheit"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-white/20 hover:bg-white/30 text-white border-white/30"
            }`}
          >
            Fahrenheit (°F)
          </Button>
        </div>

        <p className="text-xs sm:text-sm text-white/70 mt-2 sm:mt-3">
          Sélectionnez l'unité de température à afficher dans l'application.
        </p>
      </div>

      {/* Section Gestion des favoris */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
          <h2 className="text-lg sm:text-xl font-semibold">Gestion des favoris</h2>
        </div>

        <Button
          onClick={handleClearFavorites}
          className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-200 flex items-center gap-2 transform hover:scale-105 active:scale-95 text-sm sm:text-base w-full sm:w-auto"
        >
          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
          Supprimer tous les favoris
        </Button>

        <p className="text-xs sm:text-sm text-white/70 mt-2 sm:mt-3">
          Cette action supprimera définitivement toutes vos villes favorites.
        </p>
      </div>

      {/* Section informations */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">À propos</h2>
        <div className="text-xs sm:text-sm text-white/80 space-y-1 sm:space-y-2">
          <p>Application météo développée avec Next.js</p>
          <p>Données fournies par OpenWeatherMap</p>
          <div className="flex flex-wrap items-center gap-1">
            <p>Version 1.0.0 // Développé par</p>
            <User className="w-3 h-3 sm:w-4 sm:h-4 inline-block text-green-300" />
            <a
              href="https://github.com/rdnzda"
              className="font-semibold text-white hover:text-white/50 transition-colors duration-200"
            >
              rdnzda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
