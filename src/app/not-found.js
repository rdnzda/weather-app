'use client'

import { Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-thunder flex min-h-[100dvh] items-center justify-center p-4">
      <section className="w-full max-w-lg border-l-2 border-warn bg-panel px-5 py-6 sm:px-8 sm:py-8">
        <p className="font-display tabular text-7xl font-light leading-none text-dim sm:text-8xl" aria-hidden="true">
          404
        </p>

        <h1 className="mt-4 font-display text-3xl font-medium leading-tight text-fg sm:text-4xl">
          Page introuvable
        </h1>

        <p className="mt-3 text-base leading-relaxed text-dim">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Retournez à l&apos;accueil pour consulter la météo.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-sm bg-fg px-6 text-sm font-semibold text-ink transition-colors hover:bg-sky sm:w-auto"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Accueil
        </Link>
      </section>
    </div>
  )
}
