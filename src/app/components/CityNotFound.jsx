'use client'

import { AlertTriangle, Search, MapPin, RotateCcw, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function CityNotFound({ onRetry, onNewSearch, searchedCity }) {
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
    <section
      role="alert"
      aria-labelledby="city-not-found-title"
      className="panel w-full max-w-md p-6 text-center sm:p-8"
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/20">
        <AlertTriangle className="h-7 w-7 text-orange-400" aria-hidden="true" />
      </div>

      <h2 id="city-not-found-title" className="text-xl font-bold text-white sm:text-2xl">
        Ville introuvable
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">
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

      <div className="mt-6">
        <label htmlFor="retry-city" className="sr-only">Nouvelle recherche</label>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" aria-hidden="true" />
          <Input
            id="retry-city"
            type="text"
            placeholder="Nouvelle recherche..."
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-11 rounded-lg border-white/20 bg-white/10 pl-10 text-base text-white placeholder:text-white/55 shadow-none hover:border-white/30 focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400/40"
          />
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={handleNewSearch}
          disabled={!newCity.trim()}
          className="h-11 flex-1 rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white shadow-none hover:bg-blue-600 disabled:opacity-50 cursor-pointer sm:text-base"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Rechercher
        </Button>

        {onRetry && (
          <Button
            onClick={onRetry}
            className="h-11 flex-1 rounded-lg border border-white/25 bg-white/10 px-4 text-sm font-semibold text-white shadow-none hover:bg-white/20 cursor-pointer sm:text-base"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Réessayer
          </Button>
        )}
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-xs text-white/70 sm:text-sm">
        <Lightbulb className="h-4 w-4 shrink-0 text-yellow-300" aria-hidden="true" />
        Suggestions : Paris, London, New York, Tokyo...
      </p>
    </section>
  )
}
