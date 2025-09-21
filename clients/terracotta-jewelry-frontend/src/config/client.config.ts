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

// Terracotta Jewelry specific configuration
export const clientConfig: ClientConfig = {
  clientId: 'terracotta-jewelry',
  name: 'Terracotta Jewelry Store',
  apiBaseUrl: 'http://localhost:5001/api',
  theme: {
    primary: '#D4A574', // Terracotta color
    secondary: '#8B4513', // Brown
    accent: '#CD853F', // Peru
    background: '#FFF8DC', // Cornsilk
    surface: '#F5F5DC', // Beige
    text: '#5D4037' // Brown
  },
  branding: {
    logo: '/Logo.png',
    favicon: '/favicon.ico',
    companyName: 'Terracotta Jewelry',
    tagline: 'Handcrafted ceramic jewelry with soul'
  },
  features: {
    wishlist: true,
    reviews: true,
    multiCurrency: false,
    guestCheckout: true,
    socialLogin: false
  },
  payment: {
    // Add your payment provider configuration here
  },
  seo: {
    defaultTitle: 'Terracotta Jewelry - Handcrafted Ceramic Jewelry',
    defaultDescription: 'Discover unique handcrafted ceramic jewelry pieces made with love and artisan techniques',
    keywords: ['jewelry', 'terracotta', 'ceramic', 'handcrafted', 'artisan', 'unique jewelry']
  }
}