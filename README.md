# 🌤️ Weather App

Une application météo moderne et interactive construite avec Next.js 15 et React 19, offrant des prévisions météorologiques en temps réel avec une interface utilisateur élégante et des animations fluides.

## ✨ Fonctionnalités

- 🌍 **Recherche par ville** - Trouvez la météo de n'importe quelle ville dans le monde
- 📍 **Géolocalisation automatique** - Météo locale détectée automatiquement
- 📊 **Prévisions 5 jours** - Planifiez votre semaine avec les prévisions détaillées
- ⭐ **Système de favoris** - Sauvegardez vos villes préférées pour un accès rapide
- 🎨 **Arrière-plans dynamiques** - L'interface s'adapte aux conditions météorologiques actuelles
- 📱 **Design responsive** - Optimisé pour mobile et desktop
- ✨ **Animations fluides** - Interface moderne avec Framer Motion et GSAP
- 🌡️ **Détails complets** - Température, humidité, vent, pression et plus

## 🛠️ Technologies utilisées

- **Frontend**: Next.js 15, React 19, TailwindCSS 4
- **Animations**: Framer Motion, GSAP
- **UI Components**: HeroUI, Radix UI, Lucide React
- **API**: OpenWeatherMap API
- **Styling**: TailwindCSS avec support des animations personnalisées
- **Icons**: React Icons, Weather React Icons

## 🚀 Installation et démarrage

1. **Clonez le repository**
```bash
git clone <votre-repo-url>
cd weather-app
```

2. **Installez les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configurez les variables d'environnement**
Créez un fichier `.env.local` à la racine du projet :
```env
NEXT_PUBLIC_API_KEY=your_openweathermap_api_key
```

> 📝 **Note**: Obtenez votre clé API gratuite sur [OpenWeatherMap](https://openweathermap.org/api)

4. **Lancez le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

5. **Ouvrez votre navigateur**
Rendez-vous sur [http://localhost:3000](http://localhost:3000) pour voir l'application.

## 📁 Structure du projet

```
src/
├── app/
│   ├── components/          # Composants React de l'application
│   │   ├── Dashboard.jsx    # Composant principal météo
│   │   ├── WeatherCard.jsx  # Carte météo actuelle
│   │   ├── WeatherForecast.jsx # Prévisions 5 jours
│   │   ├── Favorites.jsx    # Gestion des favoris
│   │   └── ...
│   ├── services/
│   │   └── api.js          # Services API OpenWeatherMap
│   ├── globals.css         # Styles globaux
│   └── page.js            # Page principale
├── components/ui/          # Composants UI réutilisables
├── lib/                   # Utilitaires et helpers
└── blocks/               # Blocs d'animations personnalisés
```

## 🎨 Personnalisation

### Arrière-plans météo
Les arrière-plans se trouvent dans `public/images/backgrounds/` et changent automatiquement selon les conditions :
- `clear.jpg` - Temps clair
- `cloudy.jpg` - Nuageux
- `rainy.jpg` - Pluvieux
- `snowy.jpg` - Neigeux
- `thunderstorm.jpg` - Orages
- `fog.jpg` - Brouillard

### Icônes météo
Icônes animées disponibles dans `public/images/animated/` et `public/images/static/`

## 🔧 Scripts disponibles

```bash
npm run dev          # Démarrage en mode développement
npm run build        # Build de production
npm run start        # Démarrage du serveur de production
npm run lint         # Vérification du code avec ESLint
```

## 🌐 Déploiement

### Vercel (Recommandé)
1. Connectez votre repository GitHub à [Vercel](https://vercel.com)
2. Ajoutez votre `NEXT_PUBLIC_API_KEY` dans les variables d'environnement
3. Déployez automatiquement

### Autres plateformes
L'application peut être déployée sur toute plateforme supportant Next.js :
- Netlify
- Railway
- Heroku
- AWS Amplify

## 📱 Fonctionnalités détaillées

### Navigation
- **Météo** : Affichage principal avec recherche et prévisions
- **Favoris** : Gestion des villes sauvegardées
- **Paramètres** : Options de l'application

### Météo intelligente
- Détection automatique de la localisation
- Conseils personnalisés selon la météo
- Interface adaptative aux conditions
- Données en temps réel

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [OpenWeatherMap](https://openweathermap.org/) pour l'API météo
- [Vercel](https://vercel.com/) pour l'hébergement et Next.js
- La communauté open source pour les outils fantastiques
