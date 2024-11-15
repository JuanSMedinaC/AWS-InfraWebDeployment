import { CreateOrderDto } from "@/dto/orders/createOrder.dto"
import { OrdersService } from "@/services/orders.service";

export const useCreateOrder = () => {
    const createOrder = async (order: CreateOrderDto) => {
        const orderService = new OrdersService(process.env.NEXT_PUBLIC_API_URL || "");

        await orderService.create(order);
    }

    return {createOrder};
};