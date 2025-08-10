'use client'

import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20 max-w-md w-full text-center">
        {/* Icône d'erreur */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-500/20 rounded-full p-4">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>
        </div>

        {/* Titre */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Oups ! Une erreur s&apos;est produite
        </h1>

        {/* Description */}
        <p className="text-white/70 mb-6 text-sm sm:text-base">
          Quelque chose ne s&apos;est pas passé comme prévu. 
          Veuillez réessayer ou retourner à l&apos;accueil.
        </p>

        {/* Détails de l'erreur (en développement) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6 text-left">
            <p className="text-red-300 text-xs font-mono">
              {error?.message || 'Erreur inconnue'}
            </p>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={reset}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 flex-1"
          >
            <RefreshCw className="w-4 h-4" />
            Réessayer
          </Button>

          <Button
            onClick={() => window.location.href = '/'}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 flex-1"
          >
            <Home className="w-4 h-4" />
            Accueil
          </Button>
        </div>
      </div>
    </div>
  )
}
