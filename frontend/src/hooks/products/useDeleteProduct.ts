
import {ProductsService} from "@/services/products.service";

export const useDeleteProduct = () => {
    const deleteProduct = async (id:string) => {
        const productsService = new ProductsService(process.env.NEXT_PUBLIC_API_URL || "");
        await productsService.deleteById(id);
    }

    return {deleteProduct};
};
