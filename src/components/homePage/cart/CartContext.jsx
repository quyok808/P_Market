// CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Get initial cart items from localStorage
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    // Save cart items to localStorage whenever they change
    cartItems.map((item) => {
      if (item.quantity === 0) {
        removeFromCart(item.id);
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addProductToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...existingProduct, quantity: existingProduct.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    alert(`Đã thêm sản phẩm ${product.name} vào giỏ hàng !!!`);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  // Function to update the quantity of an item
  const updateQuantity = (productId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addProductToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
