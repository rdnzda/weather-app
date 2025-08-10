// Utilitaires pour la conversion de température

/**
 * Convertit Celsius en Fahrenheit
 * @param {number} celsius - Température en Celsius
 * @returns {number} Température en Fahrenheit
 */
export const celsiusToFahrenheit = (celsius) => {
  return Math.round((celsius * 9/5) + 32);
};

/**
 * Convertit Fahrenheit en Celsius
 * @param {number} fahrenheit - Température en Fahrenheit
 * @returns {number} Température en Celsius
 */
export const fahrenheitToCelsius = (fahrenheit) => {
  return Math.round((fahrenheit - 32) * 5/9);
};

/**
 * Formate la température selon l'unité choisie
 * @param {number} tempCelsius - Température en Celsius (valeur de base de l'API)
 * @param {string} unit - Unité souhaitée ('celsius' ou 'fahrenheit')
 * @returns {string} Température formatée avec l'unité
 */
export const formatTemperature = (tempCelsius, unit = 'celsius') => {
  if (unit === 'fahrenheit') {
    return `${celsiusToFahrenheit(tempCelsius)}°F`;
  }
  return `${Math.round(tempCelsius)}°C`;
};

/**
 * Obtient l'unité de température depuis localStorage
 * @returns {string} 'celsius' ou 'fahrenheit'
 */
export const getTemperatureUnit = () => {
  if (typeof window === 'undefined') return 'celsius';
  return localStorage.getItem('temperatureUnit') || 'celsius';
};
