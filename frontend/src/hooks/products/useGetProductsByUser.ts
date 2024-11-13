
import { Product } from "@/interfaces/product";
import {ProductsService} from "@/services/products.service";

export const useGetProductsByUser = () => {
    const getProductsByUser = async () => {
        const productsService = new ProductsService(process.env.NEXT_PUBLIC_API_URL || "");
        const allProducts = await productsService.getByUser();

        return allProducts as Product[];
    }

    return {getProductsByUser};
};
