# 🌤️ Weather App

A modern, interactive weather app built with Next.js 15 and React 19. It shows real-time weather and forecasts in a clean interface with smooth animations.

## ✨ Features

- 🌍 **City search**: find the weather for any city in the world
- 📍 **Automatic geolocation**: local weather detected on load
- 📊 **5-day forecast**: detailed forecasts to plan the week
- ⭐ **Favorites**: save cities for quick access
- 🎨 **Dynamic backgrounds**: the interface adapts to the current weather
- 📱 **Responsive design**: works on mobile and desktop
- ✨ **Smooth animations**: Framer Motion and GSAP
- 🌡️ **Full details**: temperature, humidity, wind, pressure and more

## 🛠️ Tech stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Animations**: Framer Motion, GSAP
- **UI components**: HeroUI, Radix UI, Lucide React
- **API**: OpenWeatherMap
- **Icons**: React Icons, Weather React Icons

## 🚀 Getting started

1. **Clone the repository**

   ```bash
   git clone https://github.com/rdnzda/weather-app.git
   cd weather-app
   ```

2. **Install the dependencies**

   ```bash
   npm install
   ```

3. **Set the environment variable**: create a `.env.local` file at the project root (never commit it):

   ```env
   NEXT_PUBLIC_API_KEY=your_openweathermap_api_key
   ```

   You can get a free API key from [OpenWeatherMap](https://openweathermap.org/api).

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## 📁 Project structure

```text
src/
├── app/
│   ├── components/            # App components
│   │   ├── Dashboard.jsx      # Main weather view
│   │   ├── WeatherCard.jsx    # Current weather card
│   │   ├── WeatherForecast.jsx # 5-day forecast
│   │   ├── Favorites.jsx      # Saved cities
│   │   └── ...
│   ├── services/
│   │   └── api.js             # OpenWeatherMap API calls
│   ├── globals.css
│   └── page.js
├── components/ui/             # Reusable UI components
├── lib/                       # Utilities
└── blocks/                    # Custom animation blocks
```

## 🎨 Customization

Backgrounds live in `public/images/backgrounds/` and change automatically with the weather: `clear.jpg`, `cloudy.jpg`, `rainy.jpg`, `snowy.jpg`, `thunderstorm.jpg`, `fog.jpg`.

Animated and static weather icons are in `public/images/animated/` and `public/images/static/`.

## 🔧 Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # production server
npm run lint    # ESLint
```

## 🌐 Deployment

The app runs on any platform that supports Next.js. On [Vercel](https://vercel.com): connect the repository, add `NEXT_PUBLIC_API_KEY` to the environment variables, and deploy.

## 📄 License

MIT. See [`LICENSE`](LICENSE). Weather data provided by [OpenWeatherMap](https://openweathermap.org/).
