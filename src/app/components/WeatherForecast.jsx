"use client";

// Traduction des descriptions météo en français
const translateDescription = (desc) => {
  const translations = {
    "clear sky": "Ciel dégagé",
    "few clouds": "Quelques nuages",
    "scattered clouds": "Nuages épars",
    "broken clouds": "Nuages fragmentés",
    "overcast clouds": "Ciel couvert",
    "shower rain": "Averses",
    rain: "Pluie",
    "light rain": "Pluie légère",
    "moderate rain": "Pluie modérée",
    thunderstorm: "Orage",
    snow: "Neige",
    mist: "Brume",
    fog: "Brouillard",
  };

  const lower = desc.toLowerCase();
  return translations[lower] || desc.charAt(0).toUpperCase() + desc.slice(1);
};

// Mapping description → chemin icône SVG
const getWeatherIconSrc = (description) => {
  const desc = description.toLowerCase();

  if (desc.includes("clear")) return "/images/animated/day.svg";
  if (desc.includes("clouds")) return "/images/animated/cloudy.svg";
  if (desc.includes("rain")) return "/images/animated/rainy-6.svg";
  if (desc.includes("thunderstorm")) return "/images/animated/thunder.svg";
  if (desc.includes("snow")) return "/images/animated/snowy-1.svg";
  if (desc.includes("mist") || desc.includes("fog"))
    return "/images/animated/cloudy.svg";

  return "/weather-icons/default.svg";
};

const WeatherForecast = ({ weatherInfo }) => {
  return (
    <div className="flex flex-row justify-around bg-white/10 backdrop-blur-md md:p-4 rounded-xl shadow-md text-white text-md w-full">
      {weatherInfo.map((forecast, index) => {
        const date = new Date(forecast.dt_txt);
        const day = date.toLocaleDateString("fr-FR", { weekday: "short" }); // jour abrégé
        const hours = date.getHours().toString().padStart(2, "0");

        const description = forecast.weather[0].description;
        const temp = Math.round(forecast.main.temp);
        const iconSrc = getWeatherIconSrc(description);
        const translatedDescription = translateDescription(description);

        return (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg lg:p-4 py-2 min-w-1/6"
          >
            <span
              className="font-semibold xl:text-xl
              lg:text-lg
              md:text-md
              sm:text-sm
              text-xs"
            >
              {day}
            </span>
            <span className="xl:text-lg
              lg:text-md
              md:text-sm
              sm:text-xs
              text-xs hidden md:block">
              {hours}h
              </span>
            <img
              src={iconSrc}
              alt={translatedDescription}
              className="xl:w-35 xl:h-35 md:my-2 object-contain
              lg:w-30 lg:h-30
              md:w-25 md:h-25
              sm:w-20 sm:h-20
              w-14 h-14"
            />
            <span className="font-bold xl:text-xl
              lg:text-lg
              md:text-md
              sm:text-sm
              text-xs">
            {temp}°C
            </span>
            <span className="xl:text-md text-center
              lg:text-sm
              md:text-xs
              md:block
              hidden
              text-[10px]">
            {translatedDescription}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherForecast;
