"use client";

// Traduction des descriptions météo en français
const translateDescription = (desc) => {
  const translations = {
    "clear sky": "Ciel dégagé",
    "few clouds": "Nuages dispersés",
    "scattered clouds": "Ciel nuageux",
    "broken clouds": "Ciel partiellement nuageux",
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
  if (desc.includes("few clouds")) return "/images/animated/cloudy-day-3.svg";
  if (desc.includes("scattered clouds")) return "/images/animated/cloudy.svg";
  if (desc.includes("broken clouds")) return "/images/animated/cloudy.svg";
  if (desc.includes("overcast clouds")) return "/images/animated/cloudy.svg";
  if (desc.includes("light rain")) return "/images/animated/rainy-1.svg";
  if (desc.includes("rain")) return "/images/animated/rainy-6.svg";
  if (desc.includes("thunderstorm")) return "/images/animated/thunder.svg";
  if (desc.includes("snow")) return "/images/animated/snowy-1.svg";
  if (desc.includes("mist") || desc.includes("fog"))
    return "/images/animated/cloudy.svg";

  return "/weather-icons/default.svg";
};

const WeatherForecast = ({ weatherInfo, weatherAdvice }) => {
  return (
    <div className="flex flex-col bg-white/10 backdrop-blur-md rounded-xl shadow-md text-white text-md w-full">
      <div className="flex flex-row justify-around md:p-4 border-b border-white/40 shadow-md text-white text-md w-full">
        <p className="text-sm md:text-lg font-light italic py-3 px-4 text-justify opacity-90">
          {weatherAdvice}
        </p>
      </div>
      <div className="flex flex-row justify-around">
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
              <img
                src={iconSrc}
                alt={translatedDescription}
                className="xl:w-35 xl:h-35 md:my-2 object-contain
              lg:w-30 lg:h-30
              md:w-25 md:h-25
              sm:w-20 sm:h-20
              w-14 h-14"
              />
              <span
                className="font-bold xl:text-xl
              lg:text-lg
              md:text-md
              sm:text-sm
              text-xs"
              >
                {temp}°C
              </span>
              <span
                className="xl:text-md text-center
              lg:text-sm
              md:text-xs
              md:block
              hidden
              text-[10px]"
              >
                {translatedDescription}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;
