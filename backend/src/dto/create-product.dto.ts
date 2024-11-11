import { ProductCategory } from "../entity/product";

export class CreateProductDto {
  readonly name: string;

  readonly description: string;

  readonly price: number;

  readonly category: ProductCategory;

  readonly sellerId : string;

  readonly image: string;
}