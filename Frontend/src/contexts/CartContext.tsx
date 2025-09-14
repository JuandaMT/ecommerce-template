import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { CartState, CartContextType, CartItem } from '../types/Cart'
import { Product } from '../types/Product'

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
}

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  return { totalItems, totalPrice }
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload
      const existingItemIndex = state.items.findIndex(item => item.product._id === product._id)

      let updatedItems: CartItem[]
      if (existingItemIndex > -1) {
        // Si el producto ya existe, actualizar cantidad
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Si es nuevo, agregarlo
        updatedItems = [...state.items, { product, quantity }]
      }

      const { totalItems, totalPrice } = calculateTotals(updatedItems)

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      }
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.product._id !== action.payload)
      const { totalItems, totalPrice } = calculateTotals(updatedItems)

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload

      if (quantity <= 0) {
        // Si la cantidad es 0 o negativa, remover el item
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: productId })
      }

      const updatedItems = state.items.map(item =>
        item.product._id === productId ? { ...item, quantity } : item
      )

      const { totalItems, totalPrice } = calculateTotals(updatedItems)

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      }
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      }

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      }

    case 'LOAD_CART': {
      const { totalItems, totalPrice } = calculateTotals(action.payload)
      return {
        ...state,
        items: action.payload,
        totalItems,
        totalPrice,
      }
    }

    default:
      return state
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState)

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('terracotta-cart')
    if (savedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (cart.items.length > 0) {
      localStorage.setItem('terracotta-cart', JSON.stringify(cart.items))
    } else {
      localStorage.removeItem('terracotta-cart')
    }
  }, [cart.items])

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}