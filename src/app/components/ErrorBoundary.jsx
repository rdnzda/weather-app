'use client'

import React from 'react'
import ErrorDisplay from './ErrorDisplay'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-rainy flex items-center justify-center p-4">
          <ErrorDisplay
            type="generic"
            title="Une erreur inattendue s'est produite"
            message="L'application a rencontré un problème. Veuillez réessayer ou rafraîchir la page."
            onRetry={() => {
              this.setState({ hasError: false, error: null })
              window.location.reload()
            }}
            onGoHome={() => {
              this.setState({ hasError: false, error: null })
              window.location.href = '/'
            }}
            retryText="Rafraîchir"
          />
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
