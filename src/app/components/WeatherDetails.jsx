import { Droplets, Wind, ThermometerSun, GaugeCircle } from "lucide-react";

const WeatherDetails = ({ weatherInfo }) => {
  if (!weatherInfo || !weatherInfo.main || !weatherInfo.wind) return null;

  const { feels_like, humidity, pressure } = weatherInfo.main;
  const windSpeed = weatherInfo.wind.speed;

  return (
    <div className="bg-white/10 backdrop-blur-md xl:p-4 lg:p-3 md:p-2 sm:p-1 p-1 rounded-xl shadow-md text-white w-full xl:pt-10 xl:pb-10 lg:pt-8 lg:pb-8 md:pt-6 md:pb-6 sm:pt-4 sm:pb-4 pt-4 pb-4">
      <h2
        className="xl:text-md font-bold mb-5 ml-5
        lg:text-sm
        md:text-xs
        sm:text-xs
        text-xs"
      >
        QUALITÉ DE L'AIR
      </h2>
      <div className="grid grid-cols-2 xl:gap-5 lg:gap-4 md:gap-3 sm:gap-2 gap-2 text-lg ml-7">
        <div className="flex flex-col xl:gap-3 lg:gap-2 md:gap-1 sm:gap-1">
          <div className="flex flex-row gap-3">
            <ThermometerSun className="md:w-8 md:h-8 w-6 h-6 text-yellow-400" />
            <p
              className="xl:text-lg
            lg:text-md
            md:text-sm
            sm:text-xs
            text-xs"
            >
              Ressentie
            </p>
          </div>
          <p
            className="font-bold xl:text-3xl md:ml-11 ml-9
          lg:text-2xl
          md:text-xl
          sm:text-lg
          text-xs"
          >
            {Math.round(feels_like)}°C
          </p>
        </div>

        <div className="flex flex-col xl:gap-3 lg:gap-2 md:gap-1 sm:gap-1">
          <div className="flex flex-row gap-3">
            <Droplets className="md:w-8 md:h-8 w-6 h-6 text-blue-300" />
            <p className="xl:text-lg lg:text-md md:text-sm sm:text-xs text-xs">
              Humidité
            </p>
          </div>
          <p
            className="font-bold xl:text-3xl md:ml-11 ml-9
          lg:text-2xl
          md:text-xl
          sm:text-lg
          text-xs"
          >
            {humidity}%
          </p>
        </div>

        <div className="flex flex-col xl:gap-3 lg:gap-2 md:gap-1 sm:gap-1">
          <div className="flex flex-row gap-3">
            <Wind className="md:w-8 md:h-8 w-6 h-6 text-sky-400" />
            <p className="xl:text-lg lg:text-md md:text-sm sm:text-xs text-xs">
              Vent
            </p>
          </div>
          <p
            className="font-bold xl:text-3xl md:ml-11 ml-9
          lg:text-2xl
          md:text-xl
          sm:text-lg
          text-xs"
          >
            {windSpeed} m/s
          </p>
        </div>

        <div className="flex flex-col xl:gap-3 lg:gap-2 md:gap-1 sm:gap-1">
          <div className="flex flex-row gap-3">
            <GaugeCircle className="md:w-8 md:h-8 w-6 h-6 text-purple-300" />
            <p className="xl:text-lg lg:text-md md:text-sm sm:text-xs text-xs">
              Pression
            </p>
          </div>
          <p
            className="font-bold xl:text-3xl md:ml-11 ml-9
          lg:text-2xl
          md:text-xl
          sm:text-lg
          text-xs"
          >
            {pressure} hPa
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
