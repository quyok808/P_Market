import Cart from "./Cart";
import { useCart } from "../homePage/cart/CartContext";

export default function Menu() {
  const { cartItems } = useCart();
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/store">Store</a>
        </li>
        <li>
          <Cart cartItems={cartItems} />
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
      </ul>
    </nav>
  );
}
