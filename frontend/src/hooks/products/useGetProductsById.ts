
import { Product } from "@/interfaces/product";
import {ProductsService} from "@/services/products.service";

export const useGetProductsById = () => {
    const getProductsById = async (id:string) => {
        const productsService = new ProductsService(process.env.NEXT_PUBLIC_API_URL || "");
        const product = await productsService.getById(id);
        return product as Product;
    }

    return {getProductsById};
};
