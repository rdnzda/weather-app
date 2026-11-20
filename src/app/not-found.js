'use client'

import { Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-thunder bg-cover bg-center flex min-h-[100dvh] items-center justify-center p-4 shadow-[inset_0_0_0_100vmax_rgb(0_0_0/0.3)]">
      <section className="panel w-full max-w-md p-6 text-center sm:p-8">
        <p className="tabular text-7xl font-light leading-none text-white/80 sm:text-8xl" aria-hidden="true">
          404
        </p>

        <h1 className="mt-4 text-3xl font-medium leading-tight text-white sm:text-4xl">
          Page introuvable
        </h1>

        <p className="mt-3 text-base leading-relaxed text-white/80">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Retournez à l&apos;accueil pour consulter la météo.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-600 sm:w-auto"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Accueil
        </Link>
      </section>
    </div>
  )
}
