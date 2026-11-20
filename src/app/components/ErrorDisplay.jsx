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
          icon: <Wifi className="h-6 w-6 text-danger" strokeWidth={1.6} aria-hidden="true" />,
          defaultTitle: 'Problème de connexion',
          defaultMessage: 'Vérifiez votre connexion internet et réessayez.',
          bgColor: 'border-danger'
        }
      case 'notfound':
        return {
          icon: <Search className="h-6 w-6 text-warn" strokeWidth={1.6} aria-hidden="true" />,
          defaultTitle: 'Contenu introuvable',
          defaultMessage: 'Le contenu que vous recherchez n\'existe pas.',
          bgColor: 'border-warn'
        }
      case 'api':
        return {
          icon: <AlertTriangle className="h-6 w-6 text-warn" strokeWidth={1.6} aria-hidden="true" />,
          defaultTitle: 'Erreur du service',
          defaultMessage: 'Le service météo est temporairement indisponible.',
          bgColor: 'border-warn'
        }
      default:
        return {
          icon: <AlertTriangle className="h-6 w-6 text-danger" strokeWidth={1.6} aria-hidden="true" />,
          defaultTitle: 'Une erreur s\'est produite',
          defaultMessage: 'Quelque chose ne s\'est pas passé comme prévu.',
          bgColor: 'border-danger'
        }
    }
  }

  const config = getErrorConfig()

  return (
    <section role="alert" className={`w-full max-w-lg border-l-2 ${config.bgColor} bg-panel px-5 py-6 sm:px-8 sm:py-8`}>
      <div className="flex items-center gap-3">
        <span className="shrink-0">{config.icon}</span>
        <h2 className="font-display text-3xl font-medium leading-tight text-fg">
          {title || config.defaultTitle}
        </h2>
      </div>

      <p className="mt-4 text-base leading-relaxed text-dim">
        {message || config.defaultMessage}
      </p>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="h-11 flex-1 rounded-sm bg-fg px-4 text-sm font-semibold text-ink shadow-none hover:bg-sky cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            {retryText}
          </Button>
        )}

        {onGoHome && (
          <Button
            onClick={onGoHome}
            className="h-11 flex-1 rounded-sm border border-line-strong bg-transparent px-4 text-sm font-semibold text-fg shadow-none hover:border-fg hover:bg-transparent cursor-pointer"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            {homeText}
          </Button>
        )}
      </div>
    </section>
  )
}
