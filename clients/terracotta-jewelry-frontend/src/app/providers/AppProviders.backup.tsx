import React, { ReactNode, useEffect } from 'react'
import { useUIStore } from '@ecommerce/shared-services'
import { useAuthIntegration } from '../../domains/auth/hooks/useAuthIntegration'
import { clientConfig } from '../../config/client.config'

interface AppProvidersProps {
  children: ReactNode
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const { checkAuthStatus } = useAuthIntegration()
  const { setTheme } = useUIStore()

  useEffect(() => {
    // Initialize auth status
    checkAuthStatus()

    // Set theme from client config
    document.documentElement.style.setProperty('--primary-color', clientConfig.theme.primary)
    document.documentElement.style.setProperty('--secondary-color', clientConfig.theme.secondary)
    document.documentElement.style.setProperty('--accent-color', clientConfig.theme.accent)
    document.documentElement.style.setProperty('--background-color', clientConfig.theme.background)
    document.documentElement.style.setProperty('--surface-color', clientConfig.theme.surface)
    document.documentElement.style.setProperty('--text-color', clientConfig.theme.text)

    // Set document title and meta
    document.title = clientConfig.seo.defaultTitle
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', clientConfig.seo.defaultDescription)
    }
  }, [checkAuthStatus])

  return <>{children}</>
}