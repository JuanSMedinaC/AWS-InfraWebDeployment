
import { CreateProductDto } from "@/dto/orders/createProdcut.dto";
import {ProductsService} from "@/services/products.service";

export const useCreateProduct = () => {
    const createProduct = async (product: CreateProductDto) => {
        const productsService = new ProductsService(process.env.NEXT_PUBLIC_API_URL || "");
        await productsService.create(product);
    }

    return {createProduct};
};