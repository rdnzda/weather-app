"use client";

const getWeatherIconSrc = (description) => {
  const desc = description.toLowerCase();

  if (desc.includes("clear")) return "/images/animated/day.svg";
  if (desc.includes("clouds")) return "/images/animated/cloudy.svg";
  if (desc.includes("rain")) return "/images/animated/rainy-6.svg";
  if (desc.includes("thunderstorm")) return "/images/animated/thunder.svg";
  if (desc.includes("snow")) return "/images/animated/snowy-1.svg";
  if (desc.includes("mist") || desc.includes("fog"))
    return "/images/animated/cloudy.svg";

  return "/images/animated/day.svg";
};

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
    "thunderstorm with heavy rain": "Orage avec forte pluie",
  };

  const lower = desc.toLowerCase();
  return translations[lower] || desc.charAt(0).toUpperCase() + desc.slice(1); // fallback : capitalise
};

const WeatherCard = ({ weatherInfo }) => {
  const translatedDescription = translateDescription(weatherInfo.description);
  console.log(weatherInfo);

  return (
    <div className="flex md:flex-row md:justify-around sm:justify-around justify-center items-center md:bg-white/10 md:backdrop-blur-md xl:p-4 lg:p-3 md:p-2 sm:p-1 p-1 rounded-xl md:shadow-md text-white text-md min-w-full">
      <div className="flex flex-col items-center justi gap-1">
        <h2
          className="xl:text-5xl font-semilight
            lg:text-4xl
            md:text-3xl
            text-2xl"
        >
          {weatherInfo.location}
        </h2>
        <div className="relative flex flex-row items-center justify-center gap-1">
          <h3
            className="xl:text-8xl font-extralight
        lg:text-7xl
        md:text-6xl
        text-7xl"
          >
            {weatherInfo.temp}
          </h3>
          <span className="absolute text-5xl top-1.5 -right-5">°</span>
        </div>
        <p
          className="xl:text-xt mt-2 font-medium tracking-wide text-white opacity-80 text-clip
            lg:text-lg
            md:text-md
            text-xs"
        >
          {translatedDescription}
        </p>
      </div>

      <div className="flex flex-row items-center align-center sm:mr-5 mr-2 hidden md:block">
        <img
          src={getWeatherIconSrc(weatherInfo.description)}
          alt="weather icon"
          className="xl:w-80 xl:h-80 object-contain
          lg:w-70 lg:h-70
          md:w-60 md:h-60
          sm:w-50 sm:h-50
          w-35 h-35"
        />
      </div>
    </div>
  );
};

export default WeatherCard;
