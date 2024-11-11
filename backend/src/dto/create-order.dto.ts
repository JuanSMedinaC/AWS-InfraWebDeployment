import { CreateOrderItemDto } from "./create-orderItem.dto";

export class CreateOrderDto {
  orderDate: Date;

  id: string;

  buyerId: string;

  sellerId: string;

  items: CreateOrderItemDto[];
}