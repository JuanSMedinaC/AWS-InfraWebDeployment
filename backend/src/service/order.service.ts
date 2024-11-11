import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderItemDto } from '../dto/update-order.dto';
import { Order } from '../entity/order';
import { OrderItem } from '../entity/orderItem';
import { CreateOrderItemDto } from '../dto/create-orderItem.dto';
import { User, UserRole } from '../entity/user';
import { ProductsService } from '../service/product.service';
import { Product } from '../entity/product';
import { error } from 'console';
import { AppDataSource } from '../config/db';

const productService: ProductsService = new ProductsService();

export class OrderService {
    private readonly orderItemRepository = AppDataSource.getRepository(OrderItem);
    private readonly ordersRepository = AppDataSource.getRepository(Order);
    private readonly productRepository = AppDataSource.getRepository(Product);

    async createOrder(createOrderDto: CreateOrderDto) {
        try {
            const order = this.ordersRepository.create(createOrderDto);
            for (var x of order.items) {
                const productId = x.productId;
                const product: Product | null = await productService.findOne(productId);
                if (!product) throw error(`Product with id: ${productId} not found`);
                console.log(product.sellerId);
                console.log(order.sellerId);
                if (product.sellerId != order.sellerId) {
                    throw error('Vendedor incorrect');
                }
            }
            order.accepted = false;
            return await this.ordersRepository.save(order);
        }catch (error) {
            console.log(error);
        }
    }
    

    async acceptOrder(req: any, id: string) {
        const user = req.user as User;
        const order = await this.ordersRepository.findOneBy({ id: id })
        if (order){
            if (user.id == order.sellerId || user.role==(UserRole.ADMIN)) {
                order.accepted = true;
                if (!order) throw error(`Order Item with id: ${id} not found`);

                return `This action updates a #${id} order`;
            } else {
                throw error('Unauthorized');
            }
        }
    }

    async createOrderItem(id: string, createOrderItemDto: CreateOrderItemDto) {
        try {
            createOrderItemDto.orderId = id;
            const orderItem = this.orderItemRepository.create(createOrderItemDto);
            const product :Product | null = await this.productRepository.findOne({ where: { id: orderItem.productId } });
            const order = await this.ordersRepository.findOne({ where: { id: orderItem.orderId } });
            if (!product || !order) throw error('Product or Order not found');
            if (product.sellerId != order.sellerId) {
                console.log(product.sellerId);
                throw error('Bad request');
            }
            return await this.orderItemRepository.save(orderItem);
        } catch (error) {
            console.log(error);
        }

    }

    findAll() {
        return this.ordersRepository.find(
            {
                relations: {
                    user: true,
                    sellerUser: true,
                    items: true
                }
            }
        );
    }

    async findOne(id: string) {
        return await this.ordersRepository.findOne({ where: { id: id }, relations: ['user', 'sellerUser', 'items.product'] });
    }

    async findByBuyer(id: string) {
        return await this.ordersRepository.find({
            where: { buyerId: id }, relations: {
                user: true,
                sellerUser: true,
                items: true
            }
        });
    }

    async findBySeller(id: string) {
        return await this.ordersRepository.find({
            where: { sellerId: id }, relations: {
                user: true,
                sellerUser: true,
                items: true
            }
        });
    }

    async findOneItem(id: string) {
        return await this.orderItemRepository.findOne({ where: { id: id } });
    }

    async update(req: any, id: string, updateOrderItemDto: UpdateOrderItemDto) {
        try{
            const user = req.body.loggedUser ;
            console.log(user);
            const orderItem = await this.orderItemRepository.findOneBy({ id: id });
            if (!orderItem) throw error(`Order Item with id: ${id} not found`);
            const order= await this.ordersRepository.findOneBy({ id: orderItem.orderId })
            console.log(order);
            if (!order) throw error(`Order with id: ${id} not found`);
            if (order.buyerId == user.user_id || user.role==(UserRole.ADMIN)) {
                const order = await this.orderItemRepository.preload({
                    id: id,
                    ...updateOrderItemDto
                  });
                

                if (!order) throw error(`Order Item with id: ${id} not found`);


                await this.orderItemRepository.save(order);
                return order;

            } else {
                throw error('Unauthorized');
            }
        }catch(error){
            console.log(error);
        }
    }


    async removeOrder(req: any, id: string) {
        try {
            const user = req.body.loggedUser;
            var order :Order |null = await this.ordersRepository.findOne({ where: { id: id }, relations: ['items'] });
            if (order){
                if (order.buyerId == user.user_id || user.role==(UserRole.ADMIN)) {
                    if (order.items && Array.isArray(order.items)) {
                        await Promise.all(order.items.map(item => this.removeOrderItem(req, item.id)));
                    }
                    return await this.ordersRepository.remove(order);
                }
                else {
                    throw error('Unauthorized');
                }
            }
        }catch (error) {
            console.log(error);
        }
    }
    async removeOrderItem(req: any, id: string) {
        try {
            const user = req.body.loggedUser;
            const orderItem: OrderItem |null = await this.orderItemRepository.findOneBy({ id: id })
            if (!orderItem) throw error(`Order Item with id: ${id} not found`);
            const order: Order | null = await this.ordersRepository.findOneBy({ id: orderItem.orderId })
            if (!order) throw error(`Order with id: ${id} not found`);
            if (order.buyerId == user.user_id || user.role == (UserRole.ADMIN)) {
                return await this.orderItemRepository.remove(orderItem);
            } else {
                throw error('Unauthorized');
            }
        } catch (error) {
            console.log(error);
        }   
    }
}