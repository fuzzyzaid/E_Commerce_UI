import React, { createContext, useState, useEffect, useMemo } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) setCart(JSON.parse(storedCart));
    } catch (e) {
      console.error("CartProvider: failed to read cart from localStorage", e);
    }
  }, []);

  // persist cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("CartProvider: failed to persist cart to localStorage", e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const qty = Number(quantity) || 1;
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.productId === product.productId);
      if (existing) {
        return prevCart.map((i) =>
          i.productId === product.productId ? { ...i, quantity: Number(i.quantity) + qty } : i
        );
      }
      return [...prevCart, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const qty = Number(quantity) || 1;
    setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i)));
  };

  const clearCart = () => setCart([]);

  // memoize context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, updateQuantity, clearCart }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
