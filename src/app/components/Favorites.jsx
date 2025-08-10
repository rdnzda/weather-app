"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FaHeart, FaTrash } from "react-icons/fa";
import { Search, Plus } from "lucide-react";
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
    <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-2xl text-white p-3 sm:p-6">
      {/* En-tête moderne */}
      <div className="flex items-center gap-3 sm:gap-4 mb-2">
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-pink-400/30">
          <FaHeart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-300" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-light text-white/90">Mes Favoris</h1>
          <p className="text-xs sm:text-sm text-white/50 -mt-1">Vos villes préférées</p>
        </div>
      </div>

      {/* Ajout de ville */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-white/20 hover:border-white/30 transition-all duration-300">
        {/* Message d'erreur */}
        {errorMessage && (
          <div className={`mb-3 p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
            errorType === "duplicate" 
              ? "bg-orange-500/20 text-orange-300 border border-orange-400/30" 
              : "bg-red-500/20 text-red-300 border border-red-400/30"
          }`}>
            <div className="flex items-center gap-2">
              {errorType === "duplicate" ? (
                <FaHeart className="w-4 h-4 text-orange-400" />
              ) : (
                <Search className="w-4 h-4 text-red-400" />
              )}
              {errorMessage}
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Rechercher et ajouter une ville..."
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-white placeholder:text-white/50 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl 
                         focus:border-white/50 focus:ring-2 focus:ring-white/20 focus:bg-white/10
                         transition-all duration-200 text-base sm:text-lg font-light
                         hover:bg-white/10 hover:border-white/30"
              onKeyDown={(e) => {
                if (e.key === "Enter") addCity();
              }}
            />
          </div>
          <button
            onClick={addCity}
            disabled={isAdding}
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
              isAdding 
                ? "bg-blue-500/50 cursor-not-allowed" 
                : "bg-blue-500/80 hover:bg-blue-500"
            }`}
          >
            {isAdding ? (
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            ) : (
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            )}
          </button>
        </div>
        <p className="text-xs text-white/50 mt-2 ml-1">
          Appuyez sur Entrée ou cliquez sur + pour ajouter la ville
        </p>
      </div>

      {/* Liste des favoris */}
      <div className="text-white w-full">
        <ul className="flex flex-col gap-3 sm:gap-5">
          {cities.length === 0 && (
            <li className="p-6 sm:p-8 text-center text-white/70 italic bg-white/5 rounded-xl sm:rounded-2xl border border-white/10">
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <FaHeart className="w-6 h-6 sm:w-8 sm:h-8 text-white/30" />
                <p className="text-base sm:text-lg">Aucune ville favorite ajoutée</p>
                <p className="text-xs sm:text-sm text-white/50">Commencez par ajouter vos villes préférées !</p>
              </div>
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
