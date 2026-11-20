'use client'

import { AlertTriangle, RefreshCw, Home, Wifi, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ErrorDisplay({ 
  type = 'generic', 
  title, 
  message, 
  onRetry, 
  onGoHome,
  retryText = 'Réessayer',
  homeText = 'Accueil'
}) {
  const getErrorConfig = () => {
    switch (type) {
      case 'network':
        return {
          icon: <Wifi className="h-7 w-7 text-red-400" aria-hidden="true" />,
          defaultTitle: 'Problème de connexion',
          defaultMessage: 'Vérifiez votre connexion internet et réessayez.',
          bgColor: 'bg-red-500/20'
        }
      case 'notfound':
        return {
          icon: <Search className="h-7 w-7 text-orange-400 aria-hidden="true" />,
          defaultTitle: 'Contenu introuvable',
          defaultMessage: 'Le contenu que vous recherchez n\'existe pas.',
          bgColor: 'bg-orange-500/20'
        }
      case 'api':
        return {
          icon: <AlertTriangle className="h-7 w-7 text-orange-400 aria-hidden="true" />,
          defaultTitle: 'Erreur du service',
          defaultMessage: 'Le service météo est temporairement indisponible.',
          bgColor: 'bg-orange-500/20'
        }
      default:
        return {
          icon: <AlertTriangle className="h-7 w-7 text-red-400" aria-hidden="true" />,
          defaultTitle: 'Une erreur s\'est produite',
          defaultMessage: 'Quelque chose ne s\'est pas passé comme prévu.',
          bgColor: 'bg-red-500/20'
        }
    }
  }

  const config = getErrorConfig()

  return (
    <section role="alert" className="panel w-full max-w-md p-6 text-center sm:p-8">
      <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${config.bgColor}`}>
        {config.icon}
      </div>
      <h2 className="text-xl font-bold text-white sm:text-2xl">
        {title || config.defaultTitle}
      </h2>
      <p className="mt-2 text-sm text-white/80 sm:text-base">
        {message || config.defaultMessage}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="h-11 flex-1 rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white shadow-none hover:bg-blue-600 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            {retryText}
          </Button>
        )}
        {onGoHome && (
          <Button
            onClick={onGoHome}
            className="h-11 flex-1 rounded-lg border border-white/25 bg-white/10 px-4 text-sm font-semibold text-white shadow-none hover:bg-white/20 cursor-pointer"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            {homeText}
          </Button>
        )}
      </div>
    </section>
  )
}
