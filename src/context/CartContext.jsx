
import { createContext, useContext, useState } from 'react'
import { products } from '../data/products'

const CartContext = createContext(null)

// These sample items match the original Stitch Shopping Cart.
const initialCartItems = [
  {
    ...products[0],
    quantity: 1,
    cartBadge: 'Standard Fit',
    sku: 'TW-0149',
    variantDescription: 'Sage Green • Size M',
    metaIcon: 'eco',
  },
  {
    ...products[1],
    quantity: 1,
    cartBadge: 'Hand-Finished',
    sku: 'TW-0284',
    variantDescription: 'Forest Moss • Size L',
    metaIcon: 'recycling',
  },
]

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId, quantity) => {
    const newQuantity = Math.floor(Number(quantity))

    if (!Number.isFinite(newQuantity) || newQuantity < 1) {
      return
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
