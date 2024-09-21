import { useCart } from "../../components/homePage/cart/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../../public/css/homepage/shoppingCart.css";
import Layout from "../../Layout";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useEffect, useState } from "react";

export default function ShoppingCart() {
  function Content() {
    // Function to remove an item from the cart
    const { cartItems, getTotalPrice, updateQuantity, removeFromCart } =
      useCart();
    const [prevQuantity, setPrevQuantity] = useState([
      {
        productId: "",
        quantity: "",
      },
    ]);

    useEffect(() => {
      const initQuantity = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      setPrevQuantity(initQuantity);
    }, []);

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

    const handleBuyNow = () => {
      if (cartItems.length > 0) {
        window.location.href = "http://localhost:5173/checkout";
      } else {
        notifyUser("Bạn không có sản phẩm nào trong giỏ hàng để thanh toán");
      }
    };

    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    const handleKeyDown = (event, productId) => {
      if (event.key === "Enter") {
        let newQuantity = parseInt(event.target.value, 10);
        if (newQuantity > 0) {
          updateQuantity(productId, newQuantity);
        } else {
          alert("Số lượng không thể nhỏ hơn 1 ");
          console.log(prevQuantity);
          event.target.value = prevQuantity.find(
            (item) => item.productId === productId
          ).quantity;
        }
      }
    };

    const handleOnChange = (event, productId) => {
      const currentQuantity = parseInt(event.target.value, 10);
      if (currentQuantity > 0) {
        setPrevQuantity({
          ...prevQuantity,
          [productId]: currentQuantity,
        });
      }
    };

    return (
      <div>
        <div className="cart-items">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="cart-item">
                    <td>
                      <img
                        src={`http://localhost:8080/Product_images/${item.image}`}
                        width={"90px"}
                        height={"140px"}
                        alt={item.name}
                        className="item-image"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{formatter.format(item.price)}</td>
                    <td>
                      <input
                        type="number"
                        defaultValue={item.quantity}
                        onChange={(event) => handleOnChange(event, item.id)}
                        onKeyDown={(event) => handleKeyDown(event, item.id)}
                        min="1"
                        className="quantity-input"
                      />
                    </td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Total Price */}
          <h3>Tổng tiền: {formatter.format(getTotalPrice())}</h3>
          <button onClick={() => handleBuyNow()} className="buy-now-btn">
            Thanh toán
          </button>
        </div>
      </div>
    );
  }
  return <Layout component={<Content />} />;
}
