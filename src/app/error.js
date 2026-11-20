'use client'

import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="bg-rainy flex min-h-[100dvh] items-center justify-center p-4">
      <section role="alert" className="w-full max-w-lg border-l-2 border-danger bg-panel px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 shrink-0 text-danger" strokeWidth={1.6} aria-hidden="true" />
          <h1 className="font-display text-3xl font-medium leading-tight text-fg sm:text-4xl">
            Oups ! Une erreur s&apos;est produite
          </h1>
        </div>

        <p className="mt-4 text-base leading-relaxed text-dim">
          Quelque chose ne s&apos;est pas passé comme prévu.
          Veuillez réessayer ou retourner à l&apos;accueil.
        </p>

        {/* Détails de l'erreur (en développement) */}
        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-4 overflow-x-auto border border-line bg-ink p-3 text-xs text-danger">
            {error?.message || 'Erreur inconnue'}
          </pre>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={reset}
            className="h-11 flex-1 rounded-sm bg-fg px-4 text-sm font-semibold text-ink shadow-none hover:bg-sky cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Réessayer
          </Button>

          <Button
            onClick={() => window.location.href = '/'}
            className="h-11 flex-1 rounded-sm border border-line-strong bg-transparent px-4 text-sm font-semibold text-fg shadow-none hover:border-fg hover:bg-transparent cursor-pointer"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Accueil
          </Button>
        </div>
      </section>
    </div>
  )
}
