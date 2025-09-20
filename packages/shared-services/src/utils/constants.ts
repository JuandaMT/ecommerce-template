export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification'
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: '/products/:id',
    SEARCH: '/products/search',
    FEATURED: '/products/featured',
    RELATED: '/products/:id/related',
    CATEGORIES: '/products/categories',
    TAGS: '/products/tags'
  },
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAIL: '/orders/:id',
    UPDATE_STATUS: '/orders/:id/status',
    CANCEL: '/orders/:id/cancel',
    TRACKING: '/orders/:id/tracking',
    RETURN: '/orders/:id/return',
    INVOICE: '/orders/:id/invoice'
  },
  ADMIN: {
    PRODUCTS: '/admin/products',
    ORDERS: '/admin/orders',
    USERS: '/admin/users'
  }
} as const

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  CART: 'cart',
  THEME: 'theme',
  RECENTLY_VIEWED: 'recently_viewed',
  WISHLIST: 'wishlist',
  CHECKOUT_DATA: 'checkout_data',
  SEARCH_HISTORY: 'search_history',
  CURRENT_FILTERS: 'current_filters',
  RETURN_URL: 'return_url'
} as const

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
} as const

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
} as const

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  STRIPE: 'stripe'
} as const

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
} as const

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100
} as const

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 500,
  SEARCH_HISTORY_MAX: 20,
  RECENTLY_VIEWED_MAX: 10,
  FREE_SHIPPING_THRESHOLD: 100,
  TAX_RATE: 0.1,
  DEFAULT_SHIPPING_COST: 10
} as const

export const PRODUCT_SORT_OPTIONS = [
  { field: 'name', order: 'asc', label: 'Name (A-Z)' },
  { field: 'name', order: 'desc', label: 'Name (Z-A)' },
  { field: 'price', order: 'asc', label: 'Price (Low to High)' },
  { field: 'price', order: 'desc', label: 'Price (High to Low)' },
  { field: 'createdAt', order: 'desc', label: 'Newest First' },
  { field: 'createdAt', order: 'asc', label: 'Oldest First' }
] as const

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.'
} as const

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  REGISTER_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  ORDER_CREATED: 'Order placed successfully!',
  ORDER_CANCELLED: 'Order cancelled successfully!',
  ITEM_ADDED_TO_CART: 'Item added to cart!',
  ITEM_REMOVED_FROM_CART: 'Item removed from cart!',
  WISHLIST_UPDATED: 'Wishlist updated!'
} as const