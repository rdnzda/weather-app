// Illustrations météo de l'app (amCharts, CC BY 4.0), choisies selon la description OpenWeatherMap.
const getWeatherIconName = (description = "") => {
  const desc = description.toLowerCase();

  if (desc.includes("thunderstorm")) return "thunder";
  if (desc.includes("snow")) return "snowy-1";
  if (desc.includes("drizzle")) return "rainy-1";
  if (desc.includes("rain")) return "rainy-6";
  if (desc.includes("mist") || desc.includes("fog")) return "cloudy";
  if (desc.includes("few clouds")) return "cloudy-day-3";
  if (desc.includes("cloud")) return "cloudy";
  return "day";
};

export const getWeatherIconSrc = (description, animated = true) =>
  `/images/${animated ? "animated" : "static"}/${getWeatherIconName(description)}.svg`;

export default function WeatherIcon({ description, label = "", animated = true, className = "" }) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getWeatherIconSrc(description, animated)}
      alt={label}
      aria-hidden={label ? undefined : true}
      className={`object-contain ${className}`}
    />
  );
  if (!animated) return img;
  // Version fixe pour les personnes qui limitent les animations
  return (
    <picture className="contents">
      <source
        media="(prefers-reduced-motion: reduce)"
        srcSet={getWeatherIconSrc(description, false)}
      />
      {img}
    </picture>
  );
}
