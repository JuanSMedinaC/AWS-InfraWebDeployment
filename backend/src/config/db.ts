import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entity/user"
import { Order } from "../entity/order";
import { Product } from "../entity/product";
import { OrderItem } from "../entity/orderItem";


dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'postgres', // Ajusta el tipo si usas otra base de datos
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Order, Product, OrderItem],
  migrations: ["src/migration/*.ts"],
  subscribers: ["src/subscriber/*.ts"],
  ssl: false
});
