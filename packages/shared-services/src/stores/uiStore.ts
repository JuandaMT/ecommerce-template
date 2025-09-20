import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  cartOpen: boolean
  mobileMenuOpen: boolean
  loading: boolean
  notifications: Notification[]

  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  toggleSidebar: () => void
  toggleCart: () => void
  toggleMobileMenu: () => void
  setLoading: (loading: boolean) => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export const useUIStore = create<UIState>()(
  devtools(
    (set, get) => ({
      theme: 'light',
      sidebarOpen: false,
      cartOpen: false,
      mobileMenuOpen: false,
      loading: false,
      notifications: [],

      setTheme: (theme) => set({ theme }),

      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light'
        }))
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }))
      },

      toggleCart: () => {
        set((state) => ({ cartOpen: !state.cartOpen }))
      },

      toggleMobileMenu: () => {
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }))
      },

      setLoading: (loading) => set({ loading }),

      addNotification: (notification) => {
        const id = Date.now().toString()
        const newNotification: Notification = {
          ...notification,
          id,
          duration: notification.duration || 5000
        }

        set((state) => ({
          notifications: [...state.notifications, newNotification]
        }))

        // Auto remove notification after duration
        setTimeout(() => {
          get().removeNotification(id)
        }, newNotification.duration)
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }))
      },

      clearNotifications: () => set({ notifications: [] })
    }),
    { name: 'UIStore' }
  )
)