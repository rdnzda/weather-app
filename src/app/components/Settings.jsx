"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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
        className={`h-11 flex-1 px-4 text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-offset-[-2px] sm:flex-none sm:px-6 ${
          active ? "bg-fg text-ink" : "bg-transparent text-dim hover:text-fg"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex w-full max-w-3xl flex-col">
      <header className="border-b border-line pb-5">
        <h1 className="font-display text-4xl font-medium leading-none text-fg sm:text-5xl">Paramètres</h1>
        <p className="mt-2 text-sm text-dim">Personnalisez votre expérience</p>
      </header>

      {/* Section Unité de température */}
      <section className="grid gap-4 border-b border-line py-7 sm:grid-cols-[14rem_1fr] sm:gap-8" aria-labelledby="unit-title">
        <div>
          <h2 id="unit-title" className="text-base font-semibold text-fg">Unité de température</h2>
          <p className="mt-1 text-sm text-dim">
            Sélectionnez l&apos;unité de température à afficher dans l&apos;application.
          </p>
        </div>
        <div role="group" aria-labelledby="unit-title" className="flex w-full self-start rounded-sm border border-line-strong p-0.5 sm:w-auto sm:justify-self-start">
          {unitOption("celsius", "Celsius (°C)")}
          {unitOption("fahrenheit", "Fahrenheit (°F)")}
        </div>
      </section>

      {/* Section Gestion des favoris */}
      <section className="grid gap-4 border-b border-line py-7 sm:grid-cols-[14rem_1fr] sm:gap-8" aria-labelledby="fav-title">
        <div>
          <h2 id="fav-title" className="text-base font-semibold text-fg">Gestion des favoris</h2>
          <p className="mt-1 text-sm text-dim">
            Cette action supprimera définitivement toutes vos villes favorites.
          </p>
        </div>
        <Button
          onClick={handleClearFavorites}
          className="h-11 w-full self-start rounded-sm border border-danger/60 bg-transparent px-4 text-sm font-semibold text-danger shadow-none hover:border-danger hover:bg-danger hover:text-ink cursor-pointer sm:w-auto sm:justify-self-start"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Supprimer tous les favoris
        </Button>
      </section>

      {/* Section informations */}
      <section className="grid gap-4 py-7 sm:grid-cols-[14rem_1fr] sm:gap-8" aria-labelledby="about-title">
        <h2 id="about-title" className="text-base font-semibold text-fg">À propos</h2>
        <div className="space-y-1.5 text-sm text-dim">
          <p>Application météo développée avec Next.js</p>
          <p>Données fournies par OpenWeatherMap</p>
          <p>
            Version <span className="tabular text-fg">1.0.0</span> // Développé par{" "}
            <a
              href="https://github.com/rdnzda"
              className="font-semibold text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-sky"
            >
              rdnzda
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
