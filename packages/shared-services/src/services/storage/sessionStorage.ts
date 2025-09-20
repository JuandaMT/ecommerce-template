export class SessionStorageService {
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
      sessionStorage.setItem(this.getKey(key), serializedValue)
    } catch (error) {
      console.error('Error saving to sessionStorage:', error)
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(this.getKey(key))
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error reading from sessionStorage:', error)
      return null
    }
  }

  remove(key: string): void {
    sessionStorage.removeItem(this.getKey(key))
  }

  clear(): void {
    const keys = Object.keys(sessionStorage)
    const prefixedKeys = keys.filter(key => key.startsWith(`${this.prefix}_`))

    prefixedKeys.forEach(key => {
      sessionStorage.removeItem(key)
    })
  }

  exists(key: string): boolean {
    return sessionStorage.getItem(this.getKey(key)) !== null
  }

  // Specific methods for session-based data
  setCheckoutData(data: any): void {
    this.set('checkout_data', data)
  }

  getCheckoutData(): any | null {
    return this.get('checkout_data')
  }

  clearCheckoutData(): void {
    this.remove('checkout_data')
  }

  setSearchHistory(searches: string[]): void {
    const maxItems = 20
    const limited = searches.slice(0, maxItems)
    this.set('search_history', limited)
  }

  getSearchHistory(): string[] {
    return this.get<string[]>('search_history') || []
  }

  addToSearchHistory(search: string): void {
    if (!search.trim()) return

    const current = this.getSearchHistory()
    const filtered = current.filter(s => s.toLowerCase() !== search.toLowerCase())
    const updated = [search, ...filtered].slice(0, 20)
    this.setSearchHistory(updated)
  }

  clearSearchHistory(): void {
    this.remove('search_history')
  }

  setCurrentFilters(filters: any): void {
    this.set('current_filters', filters)
  }

  getCurrentFilters(): any | null {
    return this.get('current_filters')
  }

  clearCurrentFilters(): void {
    this.remove('current_filters')
  }

  setReturnUrl(url: string): void {
    this.set('return_url', url)
  }

  getReturnUrl(): string | null {
    return this.get<string>('return_url')
  }

  clearReturnUrl(): void {
    this.remove('return_url')
  }

  setFormData(formName: string, data: any): void {
    this.set(`form_${formName}`, data)
  }

  getFormData(formName: string): any | null {
    return this.get(`form_${formName}`)
  }

  clearFormData(formName: string): void {
    this.remove(`form_${formName}`)
  }
}