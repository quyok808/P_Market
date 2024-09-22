import React, { useState } from "react";
import "../../../public/css/storePage/checkout.css";
import Layout from "../../Layout";
import { useCart } from "../homePage/cart/CartContext";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import axios from "axios";

export default function CheckOut() {
  const Checkout = () => {
    const { cartItems, removeFromCart } = useCart();
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      address: "",
      city: "",
      note: "",
      country: "",
      status: "confirming",
      paymentMethod: "bankTransfer",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    function notifyUser(textnotify) {
      Toastify({
        text: textnotify,
        duration: 3000,
        close: false,
        gravity: "top",
        position: "right",
        backgroundColor: "#D1E9F6",
        style: {
          color: "black",
        },
      }).showToast();
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      // Xử lý dữ liệu gửi đi (ví dụ: gửi đến server)
      const orderData = {
        orderdetails: cartItems.map((item) => ({
          quantity: item.quantity,
          product: {
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description || null,
            image: item.image || null,
            quantity: item.quantity,
            category: {
              id: item.categoryId, // Giả sử bạn có id danh mục
              name: item.categoryName, // Giả sử bạn có tên danh mục
            },
          },
        })),
        address: formData.address,
        note: formData.note,
        customername: formData.name,
        city: formData.city,
        email: formData.email,
        orderdate: new Date().toISOString(), // Ngày đặt hàng
        total: calculateTotal(),
        status: formData.status,
        paymentMethod: formData.paymentMethod,
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/v1/api/order",
          orderData
        );
        console.log("Order submited: ", response.data);
        notifyUser("Order placed successfully!");
      } catch (error) {
        console.log("Error: ", error);
      }
      const resetCartItems = async () => {
        await Promise.all(cartItems.map((item) => removeFromCart(item.id)));
      };

      resetCartItems();

      window.location.href = `http://localhost:5173/store`;
    };

    const calculateTotal = () => {
      return cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    };

    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return (
      <div className="checkout-container">
        <div className="checkout-content">
          <div className="cart-summary">
            <h2>Tổng sản phẩm</h2>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Hình ảnh</th>
                  <th>Giá tiền</th>
                  <th>Tổng</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <img
                        src={`http://localhost:8080/Product_images/${item.image}`}
                        width={"90px"}
                        height={"140px"}
                      />
                    </td>
                    <td>{formatter.format(item.price.toFixed(2))}</td>
                    <td>
                      {formatter.format(
                        (item.price * item.quantity).toFixed(2)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4">Total</td>
                  <td>{formatter.format(calculateTotal().toFixed(2))}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="checkout-form">
            <h1>Thanh toán</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Tên người nhận:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Địa chỉ:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">Thành phố:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="note">Ghi chú:</label>
                <input
                  type="text"
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="paymentMethod">Phương thức thanh toán:</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="momo">Momo</option>
                  <option value="cash">Thanh toán khi nhận hàng</option>
                  <option value="bankTransfer">Chuyển khoản ngân hàng</option>
                </select>
              </div>
              <button className="button-checkout" type="submit">
                Đặt Hàng
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  return <Layout component={<Checkout />} />;
}
