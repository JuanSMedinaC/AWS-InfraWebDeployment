import { Request, Response } from "express";
import { OrderService } from '../service/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderItemDto } from '../dto/update-order.dto';
import { CreateOrderItemDto } from '../dto/create-orderItem.dto';
import { UserRole } from '../entity/user';
const orderService= new OrderService();
export class OrderController {

    async create(req: Request, res: Response) : Promise<any> {
        try {
            const order = req.body;
            const createdOrder = await orderService.createOrder(order);
            return res.status(201).json(createdOrder);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Error al crear la orden" });
        }
    }

    async createOrderItem(req: Request, res: Response) : Promise<any> {
        try {
            const id = req.params.id;
            const orderItem = req.body;
            const item= await orderService.createOrderItem(id, orderItem);
            return res.status(201).json(item);
        } catch (error) {
            return res.status(400).json({ message: "Error al crear el item de la orden" });
        }
    }


    async findAll(req: Request, res: Response) : Promise<any>{
        try {
            const orders = await orderService.findAll();
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(400).json({ message: "Error al obtener las ordenes" });
        }
    }

    async findAllByBuyerId(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const orders = await orderService.findByBuyer(id);
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(400).json({ message: "Error al obtener las ordenes" });
        }
    }


    async findAllBySellerId(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const orders = await orderService.findBySeller(id);
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(400).json({ message: "Error al obtener las ordenes" });
        }
    }


    async findOne(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const order =await orderService.findOne(id);
            return res.status(200).json(order);
        } catch (error) {
            return res.status(400).json({ message: "Error al obtener la orden" });
        }
    }


    async update(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const updateOrderItemDto : UpdateOrderItemDto = req.body;
            const updatedOrder = await orderService.update(req, id, updateOrderItemDto);
            return res.status(200).json(updatedOrder);
        } catch (error) {
            return res.status(400).json({ message: "Error al actualizar la orden" });
        }
    }

    async acceptOrder(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const response = await orderService.acceptOrder(req, id);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json({ message: "Error al aceptar la orden" });
        }
    }

    async remove(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const order = await orderService.removeOrder(req, id);
            return res.status(200).json(order);
        } catch (error) {
            return res.status(400).json({ message: "Error al eliminar la orden" });
        }
    }

    async removeItem(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const prevOrder = await orderService.removeOrderItem(req, id);
            return res.status(200).json(prevOrder);
        } catch (error) {
            return res.status(400).json({ message: "Error al eliminar el item de la orden" });
        }
    }
}