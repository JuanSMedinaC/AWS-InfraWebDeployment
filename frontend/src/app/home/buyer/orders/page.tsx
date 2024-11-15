"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/OrderCardBuyer';
import styles from '../../../styles/OrderBuyerPage.module.css';
import { useGetOrdersBuyer } from "@/hooks/orders/useGetOrdersBuyer";
import { useGetProductsById } from "@/hooks/products/useGetProductsById";
import Cookies from 'js-cookie';

class Order {
  constructor(
    public id: string,
    public date: string,
    public total: number,
    public status: string,
    public seller: string,
    public items: Array<{ name: string, price: number, quantity: number }>
  ) {}
}

const OrderBuyerPage = () => {
  const { getOrdersBuyer } = useGetOrdersBuyer();
  const { getProductsById } = useGetProductsById();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const buyer = Cookies.get('currentUser');
        const buyerId = JSON.parse(buyer || '{}').id;
        const response = await getOrdersBuyer(buyerId);

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
            `${order.sellerUser.name} ${order.sellerUser.lastName}`,
            itemsDetails
          );
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchData();
  }, [getOrdersBuyer, getProductsById]);

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
                <p className={styles.orderDetail}>Vendedor: {order.seller}</p>
                <p className={styles.orderDetail}>Estado: {order.status}</p>

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