import "../../../public/css/homepage/shoppingCart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Cart({ cartItems }) {
  return (
    <a href="/cart" className="cart-icon">
      <FontAwesomeIcon icon={faShoppingCart} className="fa-shopping-cart" />
      <span id="cart-quantity" className="cart-quantity">
        {cartItems.reduce((total, item) => total + item.quantity, 0)}
      </span>
    </a>
  );
}
