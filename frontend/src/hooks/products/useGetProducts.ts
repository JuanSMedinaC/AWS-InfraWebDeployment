
import { Product } from "@/interfaces/product";
import {ProductsService} from "@/services/products.service";

export const useGetProducts = () => {
    const getProducts = async () => {
        const productsService = new ProductsService(process.env.NEXT_PUBLIC_API_URL || "");
        const allProducts = await productsService.getAll();

        return allProducts as Product[];
    }

    return {getProducts};
};
