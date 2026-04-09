import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Global Search State

  // 1. Add to Cart Function
  const addToCart = (product) => {
    setCartItems((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} added to cart! 🥗`);
  };

  // 2. Remove from Cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 3. Clear Cart (Payment success ke baad ke liye)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        searchTerm, 
        setSearchTerm 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);