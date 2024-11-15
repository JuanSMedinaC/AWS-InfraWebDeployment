import { User } from "./user";

export interface Order {
    accepted: boolean;
    id: string;
    buyerId: string;
    sellerId: string;
    items: {
      productId: string;
      quantity: number;
    }[];
    createdAt: string;
    sellerUser:User
  }