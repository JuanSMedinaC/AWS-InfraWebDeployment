export interface CreateOrderDto {
    buyerId: string;
    sellerId: string;
    items: {
        productId: string;
        quantity: number;
    }[];
}