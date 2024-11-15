import { CreateOrderDto } from '@/dto/orders/createOrder.dto';
import axios, { AxiosInstance } from 'axios';
import Cookies from "js-cookie";


export class OrdersService {
    protected readonly axios: AxiosInstance;
    
    constructor(url: string) {
        this.axios = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 30000,
            timeoutErrorMessage: 'Request Timeout'
        });
    }

    public async create(createOrderDto: CreateOrderDto) {
        //console.log("DTO",createOrderDto);
        const response = await this.axios.post("/orders/",createOrderDto, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async getOrdersBuyer(buyerId: string) {
        const response = await this.axios.get(`/orders/buyer/${buyerId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async getOrderSeller(sellerId: string) {
        const response = await this.axios.get(`/orders/seller/${sellerId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async getOrder(orderId: string) {
        const response = await this.axios.get(`/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async updateOrderStatus(orderId: string) {
        const token = Cookies.get("token");
        const currentUser = Cookies.get("currentUser");

        if (!token || !currentUser) {
            throw new Error("No se encontró el token o el usuario actual en las cookies");
        }

        const user = JSON.parse(currentUser);
        const userId = user.id;

        const body = {
            userId: userId,
            orderId: orderId
        };

        console.log("Body enviado al backend:", body);

        const response = await this.axios.put(`/orders/`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }

}