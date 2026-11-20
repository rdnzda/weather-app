import {
  Sun,
  CloudSun,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
} from "lucide-react";

// Pictogrammes au trait, choisis à partir de la description OpenWeatherMap.
export const getWeatherIcon = (description = "") => {
  const desc = description.toLowerCase();

  if (desc.includes("thunderstorm")) return CloudLightning;
  if (desc.includes("snow")) return CloudSnow;
  if (desc.includes("light rain") || desc.includes("drizzle")) return CloudDrizzle;
  if (desc.includes("rain")) return CloudRain;
  if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze"))
    return CloudFog;
  if (desc.includes("few clouds")) return CloudSun;
  if (desc.includes("cloud")) return Cloud;
  if (desc.includes("clear")) return Sun;
  return Sun;
};

export default function WeatherIcon({ description, label, className = "", strokeWidth = 1.5 }) {
  const Icon = getWeatherIcon(description);
  return (
    <Icon
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}
