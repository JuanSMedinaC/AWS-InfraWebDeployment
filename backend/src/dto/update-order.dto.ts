type Partial<T> = {
    [P in keyof T]?: T[P];
};
import { CreateOrderItemDto } from './create-orderItem.dto';

export class UpdateOrderItemDto implements Partial<CreateOrderItemDto> {
    quantity?: number;
}