import "reflect-metadata";
import express,  { Request, Response} from 'express'; 
import { AppDataSource } from "./config/db";
import dotenv from "dotenv";
import cors from 'cors';
import userRouter from './routes/users.router';
import productRouter from './routes/product.router';
import orderRouter from './routes/order.router';

dotenv.config();

const app = express();

app.use(cors())

const PORT  = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Conexión exitosa con la base de datos");

    // Configuración y rutas de Express
    app.listen(3000, () => {
      console.log("Servidor iniciado en el puerto 3000");
    });
    app.get('/', (req: Request, res: Response) => {
      res.send("Hello world");
    })
  })
  .catch((error) => console.log("Error al conectar con la base de datos:", error));
