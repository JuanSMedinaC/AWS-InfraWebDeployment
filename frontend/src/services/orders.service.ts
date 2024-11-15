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
}