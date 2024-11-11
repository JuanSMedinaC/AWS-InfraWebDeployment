import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { Product } from "./product";

export interface UserInput {
  name: string; 
  lastName: string;
  email: string; 
  password: string;
  role: UserRole;
}

export enum UserRole {
    ADMIN = 'admin',
    SELLER = 'seller',
    BUYER = 'buyer'
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',
          {unique: true})
  email: string;

  @Column('text')
  name: string;

  @Column('text')
  lastName: string;

  @Column('text')
  password: string;

  @Column('text')
  role: UserRole;

  @Column('timestamp',
          {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  createdAt: number;

  @OneToMany(() => Product, product => product.user, {cascade:true})
  products: Product[];

  @OneToMany(() => Order, order => order.user, {cascade:true})
  orders: Order[];

  @OneToMany(() => Order, order => order.sellerUser)
  soldOrders: Order[];
}