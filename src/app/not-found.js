'use client'

import { AlertCircle, Search, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-thunder">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20 max-w-md w-full text-center">
        {/* Icône 404 */}
        <div className="flex justify-center mb-6">
          <div className="bg-orange-500/20 rounded-full p-4">
            <AlertCircle className="w-12 h-12 text-orange-400" />
          </div>
        </div>

        {/* Code d'erreur */}
        <div className="text-6xl sm:text-7xl font-bold text-white/20 mb-4">
          404
        </div>

        {/* Titre */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Page introuvable
        </h1>

        {/* Description */}
        <p className="text-white/70 mb-6 text-sm sm:text-base">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Retournez à l&apos;accueil pour consulter la météo.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 w-full">
              <Home className="w-4 h-4" />
              Accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
