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
          icon: <Wifi className="w-12 h-12 text-red-400" />,
          defaultTitle: 'Problème de connexion',
          defaultMessage: 'Vérifiez votre connexion internet et réessayez.',
          bgColor: 'bg-red-500/20'
        }
      case 'notfound':
        return {
          icon: <Search className="w-12 h-12 text-orange-400" />,
          defaultTitle: 'Contenu introuvable',
          defaultMessage: 'Le contenu que vous recherchez n\'existe pas.',
          bgColor: 'bg-orange-500/20'
        }
      case 'api':
        return {
          icon: <AlertTriangle className="w-12 h-12 text-yellow-400" />,
          defaultTitle: 'Erreur du service',
          defaultMessage: 'Le service météo est temporairement indisponible.',
          bgColor: 'bg-yellow-500/20'
        }
      default:
        return {
          icon: <AlertTriangle className="w-12 h-12 text-red-400" />,
          defaultTitle: 'Une erreur s\'est produite',
          defaultMessage: 'Quelque chose ne s\'est pas passé comme prévu.',
          bgColor: 'bg-red-500/20'
        }
    }
  }

  const config = getErrorConfig()

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 text-center max-w-md mx-auto">
      {/* Icône d'erreur */}
      <div className="flex justify-center mb-6">
        <div className={`${config.bgColor} rounded-full p-4`}>
          {config.icon}
        </div>
      </div>

      {/* Titre */}
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
        {title || config.defaultTitle}
      </h2>

      {/* Message */}
      <p className="text-white/70 mb-6 text-sm sm:text-base">
        {message || config.defaultMessage}
      </p>

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 flex-1"
          >
            <RefreshCw className="w-4 h-4" />
            {retryText}
          </Button>
        )}

        {onGoHome && (
          <Button
            onClick={onGoHome}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 flex-1"
          >
            <Home className="w-4 h-4" />
            {homeText}
          </Button>
        )}
      </div>
    </div>
  )
}
