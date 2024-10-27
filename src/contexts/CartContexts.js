'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const syncCart = () => {
      try {
        const localCartString = localStorage.getItem('cart');
        if (localCartString) {
          const localCart = JSON.parse(localCartString);
          setCart(localCart);
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    };
  
    syncCart();
  }, []);

 
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: Math.max(item.quantity + quantity, 1) }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity }];
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);









