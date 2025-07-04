import React, { createContext, useState, useContext } from 'react';

// 1. Cria o Contexto
const CartContext = createContext();

// 2. Cria o componente Provedor
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (itemToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  };

  const handleUpdateCart = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // O valor que será fornecido para os componentes filhos
  const value = {
    cartItems,
    addToCart: handleAddToCart,
    updateCart: handleUpdateCart,
    removeFromCart: handleRemoveFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 3. Cria um hook customizado para consumir o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
