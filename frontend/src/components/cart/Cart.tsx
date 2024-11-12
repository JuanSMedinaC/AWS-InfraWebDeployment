import { FC } from "react";
import { CartItem } from "@/interfaces/cart";
import { useCart } from "@/hooks/cart/useCart";
import styles from "./Cart.module.css";

const Cart: FC = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className={styles.cartContainer}>
      <h2>Carrito de Compras</h2>
      {cart.items.length === 0 ? (
        <p>No tienes productos en tu carrito</p>
      ) : (
        <ul>
          {cart.items.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <div>{item.name}</div>
              <div>${item.price} x {item.quantity}</div>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.total}>
        <span>Total: ${cart.total}</span>
      </div>
    </div>
  );
};

export default Cart;
