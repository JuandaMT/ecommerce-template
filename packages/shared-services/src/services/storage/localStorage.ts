export class LocalStorageService {
  private prefix: string

  constructor(prefix: string = 'ecommerce') {
    this.prefix = prefix
  }

  private getKey(key: string): string {
    return `${this.prefix}_${key}`
  }

  set<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(this.getKey(key), serializedValue)
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key))
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  }

  remove(key: string): void {
    localStorage.removeItem(this.getKey(key))
  }

  clear(): void {
    const keys = Object.keys(localStorage)
    const prefixedKeys = keys.filter(key => key.startsWith(`${this.prefix}_`))

    prefixedKeys.forEach(key => {
      localStorage.removeItem(key)
    })
  }

  exists(key: string): boolean {
    return localStorage.getItem(this.getKey(key)) !== null
  }

  // Specific methods for common e-commerce data
  setAuthToken(token: string): void {
    this.set('auth_token', token)
  }

  getAuthToken(): string | null {
    return this.get<string>('auth_token')
  }

  clearAuthToken(): void {
    this.remove('auth_token')
  }

  setUser(user: any): void {
    this.set('user', user)
  }

  getUser(): any | null {
    return this.get('user')
  }

  clearUser(): void {
    this.remove('user')
  }

  setCart(cart: any): void {
    this.set('cart', cart)
  }

  getCart(): any | null {
    return this.get('cart')
  }

  clearCart(): void {
    this.remove('cart')
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.set('theme', theme)
  }

  getTheme(): 'light' | 'dark' | null {
    return this.get<'light' | 'dark'>('theme')
  }

  setRecentlyViewed(products: string[]): void {
    const maxItems = 10
    const limited = products.slice(0, maxItems)
    this.set('recently_viewed', limited)
  }

  getRecentlyViewed(): string[] {
    return this.get<string[]>('recently_viewed') || []
  }

  addToRecentlyViewed(productId: string): void {
    const current = this.getRecentlyViewed()
    const filtered = current.filter(id => id !== productId)
    const updated = [productId, ...filtered].slice(0, 10)
    this.setRecentlyViewed(updated)
  }

  setWishlist(productIds: string[]): void {
    this.set('wishlist', productIds)
  }

  getWishlist(): string[] {
    return this.get<string[]>('wishlist') || []
  }

  addToWishlist(productId: string): void {
    const current = this.getWishlist()
    if (!current.includes(productId)) {
      this.setWishlist([...current, productId])
    }
  }

  removeFromWishlist(productId: string): void {
    const current = this.getWishlist()
    this.setWishlist(current.filter(id => id !== productId))
  }

  isInWishlist(productId: string): boolean {
    return this.getWishlist().includes(productId)
  }
}