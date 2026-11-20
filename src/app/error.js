'use client'

import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="bg-rainy bg-cover bg-center flex min-h-[100dvh] items-center justify-center p-4 shadow-[inset_0_0_0_100vmax_rgb(0_0_0/0.3)]">
      <section role="alert" className="panel w-full max-w-md p-6 text-center sm:p-8">
        <div className="flex flex-col items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20"><AlertTriangle className="h-7 w-7 text-red-400" aria-hidden="true" /></span>
          <h1 className="text-3xl font-medium leading-tight text-white sm:text-4xl">
            Oups ! Une erreur s&apos;est produite
          </h1>
        </div>

        <p className="mt-4 text-base leading-relaxed text-white/80">
          Quelque chose ne s&apos;est pas passé comme prévu.
          Veuillez réessayer ou retourner à l&apos;accueil.
        </p>

        {/* Détails de l'erreur (en développement) */}
        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-4 overflow-x-auto border border-white/10 bg-black/40 p-3 text-xs text-red-400">
            {error?.message || 'Erreur inconnue'}
          </pre>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={reset}
            className="h-11 flex-1 rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white shadow-none hover:bg-blue-600 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Réessayer
          </Button>

          <Button
            onClick={() => window.location.href = '/'}
            className="h-11 flex-1 rounded-sm border border-white/10-strong bg-transparent px-4 text-sm font-semibold text-white shadow-none hover:border-fg hover:bg-transparent cursor-pointer"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Accueil
          </Button>
        </div>
      </section>
    </div>
  )
}
