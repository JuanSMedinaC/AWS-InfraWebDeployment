import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order';
import { Product } from './product';
@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'order_id'})
  orderId:string;
  
  @ManyToOne(() => Order, order => order.items)
  @JoinColumn({name: 'order_id'})
  order: Order;

  
  @Column({name: 'product_id'})
  productId:string;

  @ManyToOne(() => Product)
  @JoinColumn({name: 'product_id'})
  product: Product;

  @Column()
  quantity: number;
}