import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, ManyToMany, Timestamp } from 'typeorm';
import { User } from './user';
import { OrderItem } from './orderItem';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp',
            {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  createdAt: number;

  @Column({name: 'buyer_id'})
  buyerId: string;

  @ManyToOne(() => User, user=> user.orders)
  @JoinColumn ({name : 'buyer_id'})
  user: User;

  @Column({name: 'seller_id'})
  sellerId: string;

  @ManyToOne(() => User, sellerUser=> sellerUser.soldOrders)
  @JoinColumn ({name : 'seller_id'})
  sellerUser: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, {cascade:true})
  items: OrderItem[];

  @Column()
  accepted: boolean;
}