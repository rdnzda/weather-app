"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Plus, Star, CircleAlert } from "lucide-react";
import { getCoordinatesFromCity, getWeather } from "../services/api.js";
import Favorite from "./Favorite.jsx";

export default function Favorites({ onSelectCity, cities, setCities }) {
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState({}); // { Paris: {...}, Lyon: {...} }
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState(""); // "duplicate" ou "notfound"

  // Charger favoris depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setCities(JSON.parse(stored));
  }, []);

  // Sauvegarder favoris quand cities change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(cities));
    fetchWeatherForCities(); // Maj météo dès qu'on modifie les favoris
  }, [cities]);

  // Obtenir la météo pour toutes les villes
  const fetchWeatherForCities = async () => {
    const allData = {};
    for (const city of cities) {
      try {
        const { lat, lon, name, country } = await getCoordinatesFromCity(city);
        const location = `${name}`;
        const weather = await getWeather(lat, lon);
        allData[city] = { ...weather, location };
      } catch (err) {
        console.error(`Erreur météo pour ${city}`, err);
      }
    }
    setWeatherData(allData);
  };

  // Ajouter une ville
  const addCity = async () => {
    if (!input.trim()) return;
    const cityName = input.trim();

    // Vérifier si la ville existe déjà (insensible à la casse)
    const cityExists = cities.some(city => 
      city.toLowerCase() === cityName.toLowerCase()
    );

    if (cityExists) {
      setErrorMessage(`"${cityName}" est déjà dans vos favoris !`);
      setErrorType("duplicate");
      setTimeout(() => {
        setErrorMessage("");
        setErrorType("");
      }, 4000);
      return; // ARRÊTER ici - ne pas continuer
    }

    try {
      setIsAdding(true);
      setErrorMessage("");
      setErrorType("");
      
      const { lat, lon } = await getCoordinatesFromCity(cityName);
      if (!lat || !lon) throw new Error("Ville introuvable");

      setCities((prev) => [...prev, cityName]);
      setInput("");
    } catch (err) {
      console.error("Erreur lors de la vérification de la ville :", err);
      setErrorMessage(`Ville "${cityName}" introuvable. Vérifiez l'orthographe.`);
      setErrorType("notfound");
      setTimeout(() => {
        setErrorMessage("");
        setErrorType("");
      }, 4000);
    } finally {
      setIsAdding(false);
    }
  };

  const removeCity = (city) => {
    setCities((prev) => prev.filter((c) => c !== city));
    setWeatherData((prev) => {
      const newData = { ...prev };
      delete newData[city];
      return newData;
    });
  };

  return (
    <div className="flex w-full max-w-3xl flex-col">
      <header className="border-b border-line pb-5">
        <h1 className="font-display text-4xl font-medium leading-none text-fg sm:text-5xl">Mes Favoris</h1>
        <p className="mt-2 text-sm text-dim">Vos villes préférées</p>
      </header>

      {/* Ajout de ville */}
      <div className="mt-6">
        <label htmlFor="favorite-input" className="sr-only">
          Rechercher et ajouter une ville
        </label>
        <div className="flex items-stretch gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dim" aria-hidden="true" />
            <Input
              id="favorite-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Rechercher et ajouter une ville..."
              aria-describedby="favorite-hint"
              className="h-12 w-full rounded-sm border-line-strong bg-panel pl-10 pr-3 text-base text-fg placeholder:text-dim shadow-none hover:border-dim focus-visible:border-sky focus-visible:ring-0"
              onKeyDown={(e) => {
                if (e.key === "Enter") addCity();
              }}
            />
          </div>
          <button
            type="button"
            onClick={addCity}
            disabled={isAdding}
            aria-label="Ajouter la ville"
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-sm transition-colors cursor-pointer ${
              isAdding
                ? "cursor-not-allowed bg-line text-dim"
                : "bg-fg text-ink hover:bg-sky"
            }`}
          >
            {isAdding ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-dim border-t-fg" aria-hidden="true" />
            ) : (
              <Plus className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
        <p id="favorite-hint" className="mt-2 text-sm text-dim">
          Appuyez sur Entrée ou cliquez sur + pour ajouter la ville
        </p>

        {/* Message d'erreur */}
        {errorMessage && (
          <p
            role="alert"
            className={`mt-3 flex items-center gap-2 border-l-2 bg-panel px-3 py-2.5 text-sm font-medium text-fg ${
              errorType === "duplicate" ? "border-warn" : "border-danger"
            }`}
          >
            {errorType === "duplicate" ? (
              <Star className="h-4 w-4 shrink-0 text-warn" aria-hidden="true" />
            ) : (
              <CircleAlert className="h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
            )}
            {errorMessage}
          </p>
        )}
      </div>

      {/* Liste des favoris */}
      <div className="mt-8 w-full">
        <ul className="flex flex-col border-t border-line">
          {cities.length === 0 && (
            <li className="flex flex-col items-start gap-1 border-b border-line py-10">
              <Star className="mb-2 h-6 w-6 text-line-strong" strokeWidth={1.6} aria-hidden="true" />
              <p className="text-lg font-medium text-fg">Aucune ville favorite ajoutée</p>
              <p className="text-sm text-dim">Commencez par ajouter vos villes préférées !</p>
            </li>
          )}
          {cities.map((city) => (
            <Favorite
              key={city}
              city={city}
              weather={weatherData[city]}
              onSelectCity={onSelectCity}
              removeCity={removeCity}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
