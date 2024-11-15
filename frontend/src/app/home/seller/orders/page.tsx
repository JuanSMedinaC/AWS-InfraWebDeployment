"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/OrderCardBuyer';
import styles from '../../../styles/OrderBuyerPage.module.css';
import { useGetOrdersSeller } from "@/hooks/orders/useGetOrdersSeller";
import { useGetProductsById } from "@/hooks/products/useGetProductsById";
import { useUpdateOrderStatus } from "@/hooks/orders/useUpdateOrderStatus";
import Cookies from 'js-cookie';

class Order {
  constructor(
    public id: string,
    public date: string,
    public total: number,
    public accepted: string,
    public buyer: string,
    public items: Array<{ name: string, price: number, quantity: number }>
  ) {}
}

const OrderBuyerPage = () => {
  const { getOrdersSeller } = useGetOrdersSeller();
  const { getProductsById } = useGetProductsById();
  const [orders, setOrders] = useState<Order[]>([]);
  const { updateOrderStatus } = useUpdateOrderStatus();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const seller = Cookies.get('currentUser');
        const sellerId = JSON.parse(seller || '{}').id;
        const response = await getOrdersSeller(sellerId);

        const ordersData = await Promise.all(response.map(async (order) => {
          let total = 0;
          const itemsDetails = await Promise.all(order.items.map(async (item) => {
            const product = await getProductsById(item.productId);
            total += product.price * item.quantity;
            return {
              name: product.name,
              price: product.price,
              quantity: item.quantity
            };
          }));

          return new Order(
            order.id,
            new Date(order.createdAt).toLocaleDateString(),
            total,
            order.accepted ? 'Aceptada' : 'Pendiente',
            `${order.user.name} ${order.user.lastName}`,
            itemsDetails
          );
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchData();
  }, [getOrdersSeller, getProductsById]);

  const changeOrderStatus = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId);

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId
            ? { ...order, accepted: 'Aceptado' }
            : order
        )
      );
    } catch (error) {
      console.error('Error changing order accepted:', error);
    }
  };


  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>Historial de compras</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className={styles.orderItem}>
                <h3 className={styles.orderTitle}>Orden #{order.id}</h3>
                <p className={styles.orderDetail}>Pedido en: {order.date}</p>
                <p className={styles.orderDetail}>Comprador: {order.buyer}</p>
                <p className={styles.orderDetail}>Estado: {order.accepted}</p>

                <h4 className={styles.sectionTitle}>Detalles de los productos:</h4>
                {order.items.map((item, index) => (
                  <div key={index} className={styles.productDetail}>
                    <p>Producto {index + 1}:</p>
                    <p>Nombre: {item.name}</p>
                    <p>Precio: ${item.price}</p>
                    <p>Cantidad: {item.quantity}</p>
                  </div>
                ))}

                <p className={styles.orderDetail}>Total: ${order.total}</p>

                {/* Solo mostrar el botón si el estado es "Pendiente" */}
                {order.accepted === 'Pendiente' && (
                  <button 
                    className={styles.button}
                    onClick={() => changeOrderStatus(order.id)}
                  >
                    Cambiar estado a Enviado
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No tienes órdenes de compra.</p>
          )}
        </CardContent>
      </Card>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>
          <a href='/home/buyer'>Volver al Home</a>
        </button>
      </div>
    </div>
  );
};

export default OrderBuyerPage;
