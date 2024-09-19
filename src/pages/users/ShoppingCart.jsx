import { useCart } from "../../components/homePage/cart/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../../public/css/homepage/shoppingCart.css";
import Layout from "../../Layout";

export default function ShoppingCart() {
  function Content() {
    // Function to remove an item from the cart
    const { cartItems } = useCart();
    const { getTotalPrice } = useCart();
    const { updateQuantity } = useCart();
    const { removeFromCart } = useCart();

    const handleBuyNow = () => {
      if (cartItems.length > 0) {
        window.location.href = "http://localhost:5173/checkout";
      } else {
        alert("Bạn không có sản phẩm nào trong giỏ hàng để thanh toán");
      }
    };

    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
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
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
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
