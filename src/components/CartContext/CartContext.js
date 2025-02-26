import React, { createContext, useState, useEffect } from "react";

// Create context
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // Manage user authentication

  useEffect(() => {
    // Load cart from localStorage if it exists
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    // Parse quantity to ensure it's a number
    const parsedQuantity = parseInt(quantity, 10);
  
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === product.productId);
  
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + parsedQuantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: parsedQuantity }];
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
