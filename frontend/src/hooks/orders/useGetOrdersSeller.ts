import { OrdersService } from "@/services/orders.service";
import { Order } from "@/interfaces/order";

export const useGetOrdersSeller = () => {
    const getOrdersSeller = async (sellerId:string) => {
        const ordersService = new OrdersService(process.env.NEXT_PUBLIC_API_URL || "");
        const orders = await ordersService.getOrderSeller(sellerId);

        return orders as Order[];
    }

    return {getOrdersSeller};
};
