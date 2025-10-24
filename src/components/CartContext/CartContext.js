// src/components/CartContext/CartContext.jsx
import React, { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext();

function loadCart() {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => loadCart());

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("CartProvider: persist error", e);
    }
  }, [cart]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "cart") {
        try {
          setCart(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setCart([]);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addToCart = (product, quantity = 1) => {
    const qty = Number(quantity) || 1;
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.productId ? { ...i, quantity: Number(i.quantity) + qty } : i
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (productId) => setCart((prev) => prev.filter((i) => i.productId !== productId));

  const updateQuantity = (productId, quantity) => {
    const qty = Math.max(1, Number(quantity) || 1);
    setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i)));
  };

  const clearCart = () => setCart([]);

  const value = useMemo(() => ({ cart, addToCart, removeFromCart, updateQuantity, clearCart }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;