import { ProductCategory } from "../entity/product";

export class UpdateProductDto {
    
    readonly id?: string;

    readonly name?: string;

    readonly category?: ProductCategory;
    
    readonly description?: string;

    readonly price?: number;

    readonly sellerId?: string;

    readonly image?: string;
}