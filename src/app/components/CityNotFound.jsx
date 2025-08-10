'use client'

import { AlertTriangle, Search, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'

export default function CityNotFound({ onRetry, onNewSearch, searchedCity }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Déclencher l'animation d'entrée après un court délai
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])
  const [newCity, setNewCity] = useState('')

  const handleNewSearch = () => {
    if (newCity.trim()) {
      onNewSearch(newCity.trim())
      setNewCity('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNewSearch()
    }
  }

  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 text-center max-w-md mx-auto 
                     transform transition-all duration-500 ease-out ${
                       isVisible 
                         ? 'translate-y-0 opacity-100 scale-100' 
                         : 'translate-y-8 opacity-0 scale-95'
                     }`}>
      {/* Icône d'erreur */}
      <div className={`flex justify-center mb-4 transform transition-all duration-700 delay-200 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <div className="bg-orange-500/20 rounded-full p-3 animate-pulse">
          <AlertTriangle className="w-8 h-8 text-orange-400" />
        </div>
      </div>

      {/* Titre */}
      <h2 className={`text-xl sm:text-2xl font-bold text-white mb-2 transform transition-all duration-700 delay-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        Ville introuvable
      </h2>

      {/* Message d'erreur avec ville recherchée */}
      <p className={`text-white/70 mb-6 text-sm sm:text-base transform transition-all duration-700 delay-400 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        {searchedCity ? (
          <>
            Aucune ville trouvée pour <span className="font-semibold text-orange-300">&quot;{searchedCity}&quot;</span>.
            <br />
            Vérifiez l&apos;orthographe ou essayez une autre ville.
          </>
        ) : (
          "Aucune ville trouvée. Vérifiez l'orthographe ou essayez une autre ville."
        )}
      </p>

      {/* Champ de nouvelle recherche */}
      <div className={`mb-4 transform transition-all duration-700 delay-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <Input
            type="text"
            placeholder="Nouvelle recherche..."
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 bg-white/20 border-white/30 text-white placeholder-white/50 rounded-lg text-sm sm:text-base focus:scale-105 transition-transform duration-200"
          />
        </div>
      </div>

      {/* Boutons d'action */}
      <div className={`flex flex-col sm:flex-row gap-3 transform transition-all duration-700 delay-600 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <Button
          onClick={handleNewSearch}
          disabled={!newCity.trim()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 flex-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base transform hover:scale-105 active:scale-95"
        >
          <Search className="w-4 h-4" />
          Rechercher
        </Button>

        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 flex-1 text-sm sm:text-base transform hover:scale-105 active:scale-95"
          >
            Réessayer
          </Button>
        )}
      </div>

      {/* Suggestions */}
      <div className={`mt-4 text-xs sm:text-sm text-white/50 transform transition-all duration-700 delay-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <p>💡 Suggestions : Paris, London, New York, Tokyo...</p>
      </div>
    </div>
  )
}
