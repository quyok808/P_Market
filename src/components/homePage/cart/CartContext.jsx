// CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          "http://localhost:8080/v1/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    fetchProducts();
  }, []);

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

  function notifyUser(textnotify) {
    Toastify({
      text: textnotify,
      duration: 3000,
      close: false,
      gravity: "top",
      position: "right",
      backgroundColor: "#D1E9F6",
      style: {
        color: "black", // Thay đổi màu chữ
      },
    }).showToast();
  }
  const addProductToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    var quantityOrder = parseInt(
      prompt("Bạn muốn thêm bao nhiêu sản phẩm ?"),
      10
    );

    if (!quantityOrder || quantityOrder <= 0) {
      notifyUser("Vui lòng nhập số lượng hợp lệ!");
      return;
    }
    if (quantityOrder <= product.quantity) {
      if (existingProduct) {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id
              ? {
                  ...existingProduct,
                  quantity: existingProduct.quantity + quantityOrder,
                }
              : item
          )
        );
      } else {
        setCartItems([...cartItems, { ...product, quantity: quantityOrder }]);
      }
      notifyUser(`Đã thêm sản phẩm ${product.name} vào giỏ hàng !!!`);
    } else {
      notifyUser(`Sản phẩm ${product.name} không có đủ số lượng trong kho !!!`);
    }
    // alert(`Đã thêm sản phẩm ${product.name} vào giỏ hàng !!!`);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  function isSmallerQuantity(newQuantity, productId) {
    const currentproduct = products.find((product) => product.id === productId);
    return newQuantity <= currentproduct.quantity;
  }

  // Function to update the quantity of an item
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else if (isSmallerQuantity(newQuantity, productId)) {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      notifyUser(`Số lượng vượt quá số lượng sản phẩm hiện có!`);
    }
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
