"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, CloudOff, MapPin } from "lucide-react";
import {
  getCoordinatesFromCity,
  getWeather,
  getForecast,
} from "../services/api";
import WeatherCard from "./WeatherCard";
import WeatherForecast from "./WeatherForecast";
import WeatherDetails from "./WeatherDetails";
import CityNotFound from "./CityNotFound";

function Dashboard({ selectedCity, onWeatherChange }) {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchedCity, setSearchedCity] = useState("");

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      const weather = await getWeather(lat, lon);
      const forecastData = await getForecast(lat, lon);

      const weatherData = {
        location: `${weather.name}`,
        temp: Math.round(weather.main.temp),
        description: weather.weather[0].description,
        icon: weather.weather[0].icon,
        wind: weather.wind,
        main: weather.main,
      };

      setWeatherInfo(weatherData);
      setForecast(forecastData);

      if (onWeatherChange) onWeatherChange(weatherData.description);
    } catch (err) {
      console.error("Erreur météo par coordonnées :", err);
      setWeatherInfo(null);
      setForecast([]);
      setError({ type: 'coords', message: 'Impossible de récupérer la météo pour cette localisation' });
      if (onWeatherChange) onWeatherChange(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherAdvice = (description) => {
    const desc = description.toLowerCase();

    if (desc.includes("rain")) {
      return "La pluie est au rendez-vous aujourd'hui. Pensez à prendre un parapluie ou une veste pour rester bien au sec.";
    }

    if (desc.includes("clear")) {
      return "Le ciel est dégagé et le soleil brille. C’est une belle occasion pour sortir profiter du beau temps.";
    }

    if (desc.includes("cloud")) {
      return "Le ciel est couvert de nuages. L’ambiance est calme, parfaite pour une promenade tranquille ou un moment cosy à la maison.";
    }

    if (desc.includes("snow")) {
      return "La neige tombe ! Couvrez-vous bien et faites attention en vous déplaçant. Pourquoi ne pas en profiter pour une boisson chaude ?";
    }

    if (desc.includes("thunder")) {
      return "Des orages sont annoncés. Restez à l'abri autant que possible, et évitez de sortir sans nécessité.";
    }

    if (desc.includes("fog") || desc.includes("mist")) {
      return "Un brouillard dense enveloppe l'extérieur. La visibilité est réduite, alors soyez prudent si vous devez sortir.";
    }

    return "Quel que soit le temps, prenez soin de vous et adaptez votre journée à la météo du moment.";
  };

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      setSearchedCity(cityName);
      
      const { lat, lon, name, country } = await getCoordinatesFromCity(
        cityName
      );
      const weather = await getWeather(lat, lon);
      const forecastData = await getForecast(lat, lon);

      const weatherData = {
        location: `${name}`,
        temp: Math.round(weather.main.temp),
        description: weather.weather[0].description,
        icon: weather.weather[0].icon,
        wind: weather.wind,
        main: weather.main,
      };

      setWeatherInfo(weatherData);
      setForecast(forecastData);

      if (onWeatherChange) onWeatherChange(weatherData.description);
    } catch (err) {
      console.error("Erreur météo :", err);
      setWeatherInfo(null);
      setForecast([]);
      setError({ type: 'city', message: 'Ville introuvable', searchedCity: cityName });
      if (onWeatherChange) onWeatherChange(null);
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial avec géolocalisation
  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchWeatherByCoords(latitude, longitude);
        },
        async (err) => {
          console.warn("Localisation refusée, chargement Paris par défaut.");
          await fetchWeather("Paris");
        }
      );
    } else {
      console.warn("Géolocalisation non supportée.");
      fetchWeather("Paris");
    }
  }, [selectedCity]);

  const handleSearch = async () => {
    if (!city.trim()) return;
    await fetchWeather(city.trim());
    setCity("");
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleSearch();
    }
  };

  const handleClearWeather = () => {
    setWeatherInfo(null);
    setForecast([]);
    setError(null);
    setCity("Paris");
    if (onWeatherChange) onWeatherChange(null);
  };

  const handleRetrySearch = () => {
    if (searchedCity) {
      fetchWeather(searchedCity);
    }
  };

  const handleNewSearch = (newCityName) => {
    setCity("");
    fetchWeather(newCityName);
  };

  return (
    <div className="flex w-full flex-col">
      {loading ? (
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-[60vh] flex-col items-center justify-center gap-3"
        >
          <img
            src="/images/animated/thunder.svg"
            alt=""
            className="h-28 w-28 object-contain sm:h-36 sm:w-36"
          />
          <p className="rounded-full bg-black/40 px-4 py-1.5 text-base text-white">
            Chargement de la météo...
          </p>
        </div>
      ) : error?.type === 'city' ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <CityNotFound
            onRetry={handleRetrySearch}
            onNewSearch={handleNewSearch}
            searchedCity={error.searchedCity}
          />
        </div>
      ) : weatherInfo ? (
        <div className="w-full animate-fade">
          <div className="flex w-full flex-col gap-4 sm:gap-5">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-end">
              <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
                <WeatherCard weatherInfo={weatherInfo} />
                <div role="search" className="input-container relative w-full">
                  <label htmlFor="city-search" className="sr-only">
                    Rechercher une ville
                  </label>
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-white/60"
                    aria-hidden="true"
                  />
                  <Input
                    id="city-search"
                    type="search"
                    placeholder="Rechercher une ville..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="h-12 w-full rounded-xl border-white/15 bg-[rgb(12_16_22/0.86)] pl-12 pr-4 text-base text-white placeholder:text-white/55 shadow-none sm:h-14 sm:text-lg
                               hover:border-white/25 focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400/40"
                  />
                </div>
              </div>
              <WeatherDetails weatherInfo={weatherInfo} />
            </div>
            <WeatherForecast
              weatherInfo={forecast}
              weatherAdvice={getWeatherAdvice(weatherInfo.description)}
            />
          </div>
        </div>
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center">
          <section
            role="alert"
            className="panel w-full max-w-md p-6 text-center sm:p-8"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20">
              <CloudOff className="h-7 w-7 text-red-400" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Impossible de récupérer la météo
            </h2>
            {error?.message && (
              <p className="mt-2 text-sm text-white/75">{error.message}</p>
            )}
            <button
              type="button"
              onClick={() => fetchWeather("Paris")}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-blue-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 cursor-pointer"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Charger Paris par défaut
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
