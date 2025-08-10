"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  getCoordinatesFromCity,
  getWeather,
  getForecast,
} from "../services/api";
import AnimatedInput from "@/blocks/Animations/AnimatedContent/AnimatedInput";
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
      return "La pluie est au rendez-vous aujourd'hui. Pensez à prendre un parapluie ou une veste pour rester bien au sec ☔.";
    }

    if (desc.includes("clear")) {
      return "Le ciel est dégagé et le soleil brille. C’est une belle occasion pour sortir profiter du beau temps ☀️.";
    }

    if (desc.includes("cloud")) {
      return "Le ciel est couvert de nuages. L’ambiance est calme, parfaite pour une promenade tranquille ou un moment cosy à la maison.";
    }

    if (desc.includes("snow")) {
      return "La neige tombe ! Couvrez-vous bien et faites attention en vous déplaçant. Pourquoi ne pas en profiter pour une boisson chaude ? ❄️";
    }

    if (desc.includes("thunder")) {
      return "Des orages sont annoncés. Restez à l'abri autant que possible, et évitez de sortir sans nécessité ⚡.";
    }

    if (desc.includes("fog") || desc.includes("mist")) {
      return "Un brouillard dense enveloppe l'extérieur. La visibilité est réduite, alors soyez prudent si vous devez sortir.";
    }

    return "Quel que soit le temps, prenez soin de vous et adaptez votre journée à la météo du moment 🌤️.";
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
    <div className="flex flex-col w-full max-w-7xl gap-6 sm:gap-8 items-center px-2 sm:px-4">
      {loading ? (
        <div className="flex flex-col items-center gap-4 py-8 animate-fade-in-scale">
          <img
            src="/images/animated/thunder.svg"
            alt="weather icon"
            className="w-48 h-48 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-contain"
          />
          <p className="text-white/70 text-base sm:text-lg font-light">
            Chargement de la météo...
          </p>
        </div>
      ) : error?.type === 'city' ? (
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CityNotFound 
            onRetry={handleRetrySearch}
            onNewSearch={handleNewSearch}
            searchedCity={error.searchedCity}
          />
        </div>
      ) : weatherInfo ? (
        <div className="w-full animate-slide-in-top">
          <div className="input-container w-full flex flex-row items-center gap-2">
            <AnimatedInput
              distance={200}
              direction="vertical"
              reverse={true}
              duration={1}
              ease="power3.out"
              initialOpacity={0.2}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0}
            >
              <div className="relative w-full">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/60 z-10" />
                <Input
                  placeholder="Rechercher une ville..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-white placeholder:text-white/50 bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl 
                             focus:border-white/50 focus:ring-2 focus:ring-white/20 focus:bg-white/15
                             transition-all duration-200 text-base sm:text-lg font-light backdrop-blur-md shadow-lg
                             hover:bg-white/15 hover:border-white/30"
                />
              </div>
            </AnimatedInput>
          </div>
          <div className="flex flex-col mt-3 md:mt-6 gap-4 sm:gap-6 items-center w-full">
            <WeatherCard weatherInfo={weatherInfo} />
            <WeatherForecast
              weatherInfo={forecast}
              weatherAdvice={getWeatherAdvice(weatherInfo.description)}
            />
            <WeatherDetails weatherInfo={weatherInfo} />
          </div>
        </div>
      ) : (
        <div className="py-8 w-full max-w-md animate-slide-in-bottom">
          <div className="bg-red-500/10 backdrop-blur-md rounded-xl p-6 border border-red-400/30 text-center">
            <p className="text-red-400 text-base sm:text-lg font-light mb-4">
              ❌ Impossible de récupérer la météo
            </p>
            {error?.message && (
              <p className="text-red-300/70 text-sm mb-4">
                {error.message}
              </p>
            )}
            <button
              onClick={() => fetchWeather("Paris")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Charger Paris par défaut
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
