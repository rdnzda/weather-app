"use client";

const getWeatherIconSrc = (description) => {
  const desc = description.toLowerCase();

  if (desc.includes("clear")) return "/images/animated/day.svg";
  if (desc.includes("clouds")) return "/images/animated/cloudy.svg";
  if (desc.includes("rain")) return "/images/animated/rainy-1.svg";
  if (desc.includes("thunderstorm")) return "/images/animated/thunder.svg";
  if (desc.includes("snow")) return "/images/animated/snowy-1.svg";
  if (desc.includes("mist") || desc.includes("fog"))
    return "/images/animated/cloudy.svg";

  return "/images/animated/day.svg";
};

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
    "thunderstorm with heavy rain": "Orage avec forte pluie",
  };

  const lower = desc.toLowerCase();
  return translations[lower] || desc.charAt(0).toUpperCase() + desc.slice(1); // fallback : capitalise
};

const WeatherCard = ({ weatherInfo }) => {
  const translatedDescription = translateDescription(weatherInfo.description);

  return (
    <div
      className="flex flex-row xl:justify-between items-center bg-white/10 backdrop-blur-md xl:p-4 lg:p-3 md:p-2 sm:p-1 p-1 rounded-xl shadow-md text-white text-md min-w-full
      lg:justify-around
      justify-around gap-10"
    >
      <div className="flex flex-col items-start gap-20 ml-5 mt-5 mb-5">
        <div className="flex flex-col items-start gap-2">
          <h2
            className="font-bold xl:text-5xl
            lg:text-4xl
            md:text-3xl
            sm:text-2xl
            text-xl"
          >
            {weatherInfo.location}
          </h2>
          <p
            className="xl:text-xl ml-0.5 text-gray-50
            lg:text-lg
            md:text-md
            sm:text-sm
            text-xs"
          >
            {translatedDescription}
          </p>
        </div>
        <h3
          className="font-semibold xl:text-8xl
        lg:text-7xl
        md:text-6xl
        sm:text-5xl
        text-4xl"
        >
          {weatherInfo.temp}°C
        </h3>
      </div>

      <div className="flex flex-row items-center align-center mr-7">
        <img
          src={getWeatherIconSrc(weatherInfo.description)}
          alt="weather icon"
          className="xl:w-80 xl:h-80 object-contain
          lg:w-70 lg:h-70
          md:w-60 md:h-60
          sm:w-50 sm:h-50
          w-40 h-40"
        />
      </div>
    </div>
  );
};

export default WeatherCard;
