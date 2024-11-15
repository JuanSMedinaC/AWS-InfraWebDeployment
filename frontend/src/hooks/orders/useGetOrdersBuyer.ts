import { OrdersService } from "@/services/orders.service";
import { Order } from "@/interfaces/order";

export const useGetOrdersBuyer = () => {
    const getOrdersBuyer = async (buyerId:string) => {
        const ordersService = new OrdersService(process.env.NEXT_PUBLIC_API_URL || "");
        const orders = await ordersService.getOrdersBuyer(buyerId);

        return orders as Order[];
    }

    return {getOrdersBuyer};
};
