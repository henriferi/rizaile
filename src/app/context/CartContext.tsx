// context/CartContext.tsx
'use client'
import { createContext, useContext, useState } from 'react'
import { Product } from '../types/Product'

type CartItem = Product & { quantidade: number }

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantidade: p.quantidade + 1 } : p
        )
      }
      return [...prev, { ...product, quantidade: 1 }]
    })
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
