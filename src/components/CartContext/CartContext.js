import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const addToCart = (product, quantity = 1) => {
  const qty = Number(quantity); // ensure it's a number
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.productId === product.productId);
    if (existingItem) {
      return prevCart.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
    } else {
      return [...prevCart, { ...product, quantity: qty }];
    }
  });
};

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, user, setUser }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
