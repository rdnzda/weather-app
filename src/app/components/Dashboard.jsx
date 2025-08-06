"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  getCoordinatesFromCity,
  getWeather,
  getForecast,
} from "../services/api";
import AnimatedInput from "@/blocks/Animations/AnimatedContent/AnimatedInput";
import WeatherCard from "./WeatherCard";
import WeatherForecast from "./WeatherForecast";
import WeatherDetails from "./WeatherDetails";

function Dashboard({ selectedCity, onWeatherChange }) {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
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
    setCity("Paris");
    if (onWeatherChange) onWeatherChange(null);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl sm:gap-6 gap-10 items-center">
      {loading ? (
        <img
          src="/images/animated/thunder.svg"
          alt="weather icon"
          className="w-[300px] h-[300px] object-contain"
        />
      ) : weatherInfo ? (
        <>
          <div className="input-container min-w-full flex flex-row items-center gap-2">
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
              <Input
                placeholder="Rechercher une ville"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full xl:text-2xl md:h-12 h-10 rounded-xl backdrop-blur-md shadow-md placeholder:text-white/70
                lg:text-xl
                md:text-lg
                text-sm"
              />
            </AnimatedInput>
          </div>
          <div className="flex flex-col sm:gap-5 gap-7 items-center min-w-full">
            <WeatherCard weatherInfo={weatherInfo} />
            <WeatherForecast
              weatherInfo={forecast}
              weatherAdvice={getWeatherAdvice(weatherInfo.description)}
            />
            <WeatherDetails weatherInfo={weatherInfo} />
          </div>
        </>
      ) : (
        <p className="text-red-500 text-sm">
          Impossible de récupérer la météo.
        </p>
      )}
    </div>
  );
}

export default Dashboard;
