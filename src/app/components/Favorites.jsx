"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FaHeart } from "react-icons/fa";
import { Search, Plus, CircleAlert } from "lucide-react";
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
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 sm:gap-5">
      {/* En-tête */}
      <header className="flex items-center gap-4 py-2 text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.5),0_2px_12px_rgb(0_0_0/0.35)]">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgb(12_16_22/0.86)] border border-white/10 sm:h-12 sm:w-12">
          <FaHeart className="h-5 w-5 text-pink-300" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Mes Favoris</h1>
          <p className="text-sm sm:text-base">Vos villes préférées</p>
        </div>
      </header>

      {/* Ajout de ville */}
      <div className="panel p-4 sm:p-5">
        <label htmlFor="favorite-input" className="sr-only">
          Rechercher et ajouter une ville
        </label>
        <div className="flex items-stretch gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" aria-hidden="true" />
            <Input
              id="favorite-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Rechercher et ajouter une ville..."
              aria-describedby="favorite-hint"
              className="h-12 w-full rounded-lg border-white/20 bg-white/10 pl-11 pr-3 text-base text-white placeholder:text-white/55 shadow-none hover:border-white/30 focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400/40"
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
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white transition-colors cursor-pointer ${
              isAdding ? "cursor-not-allowed bg-blue-500/50" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isAdding ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/50 border-t-white" aria-hidden="true" />
            ) : (
              <Plus className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <p id="favorite-hint" className="mt-2 text-xs text-white/70 sm:text-sm">
          Appuyez sur Entrée ou cliquez sur + pour ajouter la ville
        </p>

        {/* Message d'erreur */}
        {errorMessage && (
          <p
            role="alert"
            className={`mt-3 flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium ${
              errorType === "duplicate"
                ? "border-orange-400/40 bg-orange-500/15 text-orange-200"
                : "border-red-400/40 bg-red-500/15 text-red-200"
            }`}
          >
            {errorType === "duplicate" ? (
              <FaHeart className="h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
            ) : (
              <CircleAlert className="h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
            )}
            {errorMessage}
          </p>
        )}
      </div>

      {/* Liste des favoris */}
      <ul className="flex flex-col gap-3">
        {cities.length === 0 && (
          <li className="panel flex flex-col items-center gap-2 p-8 text-center">
            <FaHeart className="h-7 w-7 text-white/30" aria-hidden="true" />
            <p className="text-lg text-white">Aucune ville favorite ajoutée</p>
            <p className="text-sm text-white/70">Commencez par ajouter vos villes préférées !</p>
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
  );
}
