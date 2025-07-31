const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// Étape 1 : Récupérer les coordonnées (lat/lon) à partir du nom de ville
export const getCoordinatesFromCity = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  const data = await res.json();

  if (!data || data.length === 0) {
    throw new Error("Ville non trouvée");
  }

  const { lat, lon, name, country } = data[0];
  return { lat, lon, name, country };
};

// Étape 2 : Appel météo actuelle
export const getWeather = async (lat, lon) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
  );
  const data = await res.json();
  console.log(data);
  return data;
};

// Étape 3 : Appel forecast 5 jours / 3h (filtré à midi uniquement)
export const getForecast = async (lat, lon) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
  );
  const data = await res.json();

  // Filtrer pour ne garder que les prévisions à 12:00:00 (midi)
  const dailyAtNoon = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

  return dailyAtNoon; // tableau d'environ 5 entrées (1 par jour)
};
