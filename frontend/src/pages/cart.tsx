import { FC, useState } from "react";
import { useCart } from "@/hooks/cart/useCart";
import { PaymentService } from "@/services/payment.service";
import Cart from "@/components/cart/Cart";
import styles from "@/styles/CartPage.module.css";

const CartPage: FC = () => {
  const { cart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    const paymentResult = await PaymentService.processPayment(cart.total);
    setPaymentSuccess(paymentResult);
    setIsProcessing(false);
  };

  return (
    <div className={styles.pageContainer}>
      <Cart />
      {isProcessing ? (
        <p>Procesando pago...</p>
      ) : (
        <>
          <button onClick={handlePayment} disabled={cart.total === 0}>
            {cart.total === 0 ? "Añade productos para pagar" : "Pagar"}
          </button>
          {paymentSuccess && <p>Pago realizado con éxito</p>}
          {!paymentSuccess && paymentSuccess !== null && <p>Error en el pago</p>}
        </>
      )}
    </div>
  );
};

export default CartPage;
