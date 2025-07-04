import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

const CART_STORAGE_KEY = 'fastfood:cart';

// 1. Cria o Contexto
const CartContext = createContext();

// 2. Cria o componente Provedor
export const CartProvider = ({ children }) => {
  // Tenta carregar o carrinho do localStorage ao iniciar
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  // Salva o carrinho no localStorage sempre que ele for alterado
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]);

  const handleAddToCart = (itemToAdd) => {
    const existingItem = cartItems.find(item => item.id === itemToAdd.id);
    if (existingItem) {
      setCartItems(prevItems => prevItems.map(item =>
        item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
      toast.success(`Mais um ${itemToAdd.name} adicionado!`);
    } else {
      setCartItems(prevItems => [...prevItems, { ...itemToAdd, quantity: 1 }]);
      toast.success(`${itemToAdd.name} adicionado ao carrinho!`);
    }
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
    const removedItem = cartItems.find(item => item.id === itemId);
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    if (removedItem) {
      toast.error(`${removedItem.name} removido do carrinho.`);
    }
  };

  const totalItemsInCart = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // O valor que será fornecido para os componentes filhos
  const value = {
    cartItems,
    totalItemsInCart,
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
