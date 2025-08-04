"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FaHeart, FaTrash } from "react-icons/fa";
import { getCoordinatesFromCity, getWeather } from "../services/api.js";
import Favorite from "./Favorite.jsx";

export default function Favorites({ onSelectCity, cities, setCities }) {
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState({}); // { Paris: {...}, Lyon: {...} }

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

  // Corrige moi la fonction asynchrone pour ajouter une ville
  const addCity = async () => {
    if (!input.trim()) return;
    const cityName = input.trim();

    if (cities.includes(cityName)) {
      alert("Cette ville est déjà dans vos favoris !");
      return;
    }

    try {
      const { lat, lon } = await getCoordinatesFromCity(cityName); // ⬅️ on vérifie d’abord
      if (!lat || !lon) throw new Error("Ville introuvable");

      setCities((prev) => [...prev, cityName]);
      setInput("");
    } catch (err) {
      console.error("Erreur lors de la vérification de la ville :", err);
      alert("Ville introuvable. Vérifie l'orthographe !");
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
    <div className="flex flex-col gap-6 w-full max-w-7xl text-white">
      {/* Ajout de ville */}
      <div className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ajouter une ville"
          className="w-full xl:text-2xl lg:text-xl md:text-lg sm:text-md text-sm h-10 placeholder:text-white/70 text-white border border-white rounded-xl focus:border-white focus:ring-1 focus:ring-white transition backdrop-blur-md shadow-md"
          onKeyDown={(e) => {
            if (e.key === "Enter") addCity();
          }}
        />
      </div>

      {/* Liste des favoris */}
      <div className="text-white min-w-full">
        <ul className="divide-y flex flex-col gap-5">
          {cities.length === 0 && (
            <li className="p-4 text-center text-white/70 italic">
              Aucune ville favorite ajoutée.
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
