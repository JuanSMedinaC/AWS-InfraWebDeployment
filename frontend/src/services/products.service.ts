import { CreateProductDto } from '@/dto/orders/createProdcut.dto';
import axios, { AxiosInstance } from 'axios';
import Cookies from "js-cookie";


export class ProductsService {
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

    public async getAll() {
        const response = await this.axios.get('/products/', {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async getByUser() {
        const currentUser = JSON.parse(Cookies.get("currentUser") || "{}");
        if (!currentUser.id) {
            throw new Error("User ID not found in cookies");
        }
        const response = await this.axios.get(`/products/user/${currentUser.id}`, { 
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async getById(id: string) {
        const response = await this.axios.get(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async create(product: CreateProductDto) {
        const response = await this.axios.post('/products/create', product, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    public async deleteById(id: string) {
        const response = await this.axios.delete(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }
}