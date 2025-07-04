import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

const CART_STORAGE_KEY = 'fastfood:cart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });
  
  // Novo estado para rastrear a última alteração
  const [lastChangedId, setLastChangedId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]);

  const handleAddToCart = (itemToAdd) => {
    const existingItem = cartItems.find(item => item.id === itemToAdd.id);
    const quantityToAdd = itemToAdd.quantity || 1;

    if (existingItem) {
      setCartItems(prevItems => prevItems.map(item =>
        item.id === itemToAdd.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
      ));
      toast.success(`${quantityToAdd}x ${itemToAdd.name} adicionado(s)!`);
    } else {
      setCartItems(prevItems => [...prevItems, { ...itemToAdd, quantity: quantityToAdd }]);
      toast.success(`${quantityToAdd}x ${itemToAdd.name} adicionado(s) ao carrinho!`);
    }
    setLastChangedId(itemToAdd.id + Date.now()); // Adiciona timestamp para re-acionar a animação
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
    setLastChangedId(itemId + Date.now());
  };

  const handleRemoveFromCart = (itemId) => {
    const removedItem = cartItems.find(item => item.id === itemId);
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    if (removedItem) {
      toast.error(`${removedItem.name} removido do carrinho.`);
    }
    setLastChangedId(itemId + Date.now());
  };

  const totalItemsInCart = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    totalItemsInCart,
    lastChangedId, // Exporta o novo estado
    addToCart: handleAddToCart,
    updateCart: handleUpdateCart,
    removeFromCart: handleRemoveFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};