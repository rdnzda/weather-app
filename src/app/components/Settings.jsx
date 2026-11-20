"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Thermometer, Trash2, Settings as SettingsIcon, User } from "lucide-react";

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

  const unitOption = (unit, label) => {
    const active = temperatureUnit === unit;
    return (
      <button
        type="button"
        onClick={() => handleUnitChange(unit)}
        aria-pressed={active}
        className={`h-11 flex-1 rounded-md px-4 text-sm font-semibold transition-colors cursor-pointer sm:flex-none sm:px-6 ${
          active ? "bg-blue-500 text-white" : "bg-transparent text-white/75 hover:bg-white/10 hover:text-white"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 sm:gap-5">
      {/* En-tête */}
      <header className="flex items-center gap-4 py-2 text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.5),0_2px_12px_rgb(0_0_0/0.35)]">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgb(12_16_22/0.86)] border border-white/10 sm:h-12 sm:w-12">
          <SettingsIcon className="h-5 w-5 text-blue-300" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Paramètres</h1>
          <p className="text-sm sm:text-base">Personnalisez votre expérience</p>
        </div>
      </header>

      {/* Section Unité de température */}
      <section className="panel p-5 sm:p-6" aria-labelledby="unit-title">
        <div className="flex items-center gap-3">
          <Thermometer className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          <h2 id="unit-title" className="text-lg font-semibold text-white">Unité de température</h2>
        </div>
        <div role="group" aria-labelledby="unit-title" className="mt-4 flex w-full rounded-lg border border-white/15 bg-white/5 p-1 sm:inline-flex sm:w-auto">
          {unitOption("celsius", "Celsius (°C)")}
          {unitOption("fahrenheit", "Fahrenheit (°F)")}
        </div>
        <p className="mt-3 text-sm text-white/75">
          Sélectionnez l&apos;unité de température à afficher dans l&apos;application.
        </p>
      </section>

      {/* Section Gestion des favoris */}
      <section className="panel p-5 sm:p-6" aria-labelledby="fav-title">
        <div className="flex items-center gap-3">
          <Trash2 className="h-5 w-5 text-red-400" aria-hidden="true" />
          <h2 id="fav-title" className="text-lg font-semibold text-white">Gestion des favoris</h2>
        </div>
        <Button
          onClick={handleClearFavorites}
          className="mt-4 h-11 w-full rounded-lg bg-red-500 px-5 text-sm font-semibold text-white shadow-none hover:bg-red-600 cursor-pointer sm:w-auto"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Supprimer tous les favoris
        </Button>
        <p className="mt-3 text-sm text-white/75">
          Cette action supprimera définitivement toutes vos villes favorites.
        </p>
      </section>

      {/* Section informations */}
      <section className="panel p-5 sm:p-6" aria-labelledby="about-title">
        <h2 id="about-title" className="text-lg font-semibold text-white">À propos</h2>
        <div className="mt-3 space-y-1.5 text-sm text-white/80">
          <p>Application météo développée avec Next.js</p>
          <p>Données fournies par OpenWeatherMap</p>
          <p className="flex flex-wrap items-center gap-1">
            Version 1.0.0 // Développé par
            <User className="h-4 w-4 text-green-300" aria-hidden="true" />
            <a
              href="https://github.com/rdnzda"
              className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
            >
              rdnzda
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
