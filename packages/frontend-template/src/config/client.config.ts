export interface ClientConfig {
  clientId: string
  name: string
  apiBaseUrl: string
  theme: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
  }
  branding: {
    logo: string
    favicon: string
    companyName: string
    tagline?: string
  }
  features: {
    wishlist: boolean
    reviews: boolean
    multiCurrency: boolean
    guestCheckout: boolean
    socialLogin: boolean
  }
  payment: {
    stripe?: {
      publishableKey: string
    }
    paypal?: {
      clientId: string
    }
  }
  seo: {
    defaultTitle: string
    defaultDescription: string
    keywords: string[]
  }
}

// Default configuration - will be overridden by client-specific config
export const defaultConfig: ClientConfig = {
  clientId: 'default',
  name: 'E-commerce Store',
  apiBaseUrl: 'http://localhost:5001/api',
  theme: {
    primary: '#1976d2',
    secondary: '#dc004e',
    accent: '#ff5722',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#333333'
  },
  branding: {
    logo: '/logo.png',
    favicon: '/favicon.ico',
    companyName: 'Your Store',
    tagline: 'Quality products for everyone'
  },
  features: {
    wishlist: true,
    reviews: true,
    multiCurrency: false,
    guestCheckout: true,
    socialLogin: false
  },
  payment: {},
  seo: {
    defaultTitle: 'E-commerce Store - Quality Products',
    defaultDescription: 'Discover amazing products at great prices',
    keywords: ['ecommerce', 'online store', 'shopping']
  }
}

// This will be replaced during client generation
export const clientConfig: ClientConfig = defaultConfig