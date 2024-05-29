// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart([...cart, { product, quantity }]);
  };
  const removeFromCart = (productId) => {
    console.log("Removing item:", productId); // Log the item being removed
    setCart(cart.filter(item => item.product._id !== productId));
  };
    // Create cartItems array containing product IDs and quantities
    const cartItems = cart.map(item => ({
        productId: item.product._id,
        quantity: item.quantity
      }));
      // In your cartContext file

const updateQuantity = (productId, quantity) => {
  setCart(currentCart => {
    return currentCart.map(item => {
      if (item.product._id === productId) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
  });
};

  return (
    <CartContext.Provider value={{ cart, addToCart,removeFromCart ,cartItems,updateQuantity}}>
      {children}
    </CartContext.Provider>
  );
};
