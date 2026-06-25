'use client'

import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react'
import { Product } from '@/data/products'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { product: action.payload, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.product.id !== action.payload) }
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.product.id !== action.payload.id) }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    case 'LOAD_CART':
      return { ...state, items: action.payload }
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (product: Product) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mizuro-cart')
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[]
        dispatch({ type: 'LOAD_CART', payload: parsed })
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mizuro-cart', JSON.stringify(state.items))
    } catch {
      // ignore
    }
  }, [state.items])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        state,
        addItem: (product) => dispatch({ type: 'ADD_ITEM', payload: product }),
        removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
        updateQuantity: (id, quantity) =>
          dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
        closeCart: () => dispatch({ type: 'CLOSE_CART' }),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
