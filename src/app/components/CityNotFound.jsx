'use client'

import { SearchX, Search, MapPin, RotateCcw } from 'lucide-react'
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
      className="w-full max-w-lg border-l-2 border-warn bg-panel px-5 py-6 sm:px-8 sm:py-8"
    >
      <div className="flex items-center gap-3">
        <SearchX className="h-6 w-6 shrink-0 text-warn" strokeWidth={1.6} aria-hidden="true" />
        <h2 id="city-not-found-title" className="font-display text-3xl font-medium leading-none text-fg sm:text-4xl">
          Ville introuvable
        </h2>
      </div>

      <p className="mt-4 text-base leading-relaxed text-dim">
        {searchedCity ? (
          <>
            Aucune ville trouvée pour <span className="font-semibold text-fg">&laquo;&nbsp;{searchedCity}&nbsp;&raquo;</span>.
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
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dim" aria-hidden="true" />
          <Input
            id="retry-city"
            type="text"
            placeholder="Nouvelle recherche..."
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-12 rounded-sm border-line-strong bg-ink pl-10 text-base text-fg placeholder:text-dim shadow-none hover:border-dim focus-visible:border-sky focus-visible:ring-0"
          />
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <Button
          onClick={handleNewSearch}
          disabled={!newCity.trim()}
          className="h-11 flex-1 rounded-sm bg-fg px-4 text-sm font-semibold text-ink shadow-none hover:bg-sky disabled:opacity-40 cursor-pointer"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Rechercher
        </Button>

        {onRetry && (
          <Button
            onClick={onRetry}
            className="h-11 flex-1 rounded-sm border border-line-strong bg-transparent px-4 text-sm font-semibold text-fg shadow-none hover:border-fg hover:bg-transparent cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Réessayer
          </Button>
        )}
      </div>

      <p className="mt-5 border-t border-line pt-4 text-sm text-dim">
        Suggestions : Paris, London, New York, Tokyo...
      </p>
    </section>
  )
}
