import { useState } from "react";
import { CartItem, Cart } from "@/interfaces/cart";

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        prevCart.items.push(product);
      }
      const newTotal = prevCart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { ...prevCart, total: newTotal };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== productId);
      const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { ...prevCart, items: updatedItems, total: newTotal };
    });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
  };
};
