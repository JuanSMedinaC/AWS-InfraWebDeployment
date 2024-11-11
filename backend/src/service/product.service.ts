import { Product, ProductCategory } from "../entity/product";
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { User, UserRole } from '../entity/user';
import { AppDataSource } from '../config/db';
import { error } from "console";

export class ProductsService {
    private productsRepository = AppDataSource.getRepository(Product);
    private userRepository = AppDataSource.getRepository(User);
    
    async findAll() {
        return await this.productsRepository.find({
            relations : {
                user: true,
            }
        })
    }

    async findOneById(id: string): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: { id }, 
        });
        if (!product) {
            throw error(`Product with id ${id} not found`);
        }
        return product;
    }
    

    findProductsByCategory(category: string) {
        const productCategory = ProductCategory[category as keyof typeof ProductCategory];
        if (!productCategory) {
            throw error(`Invalid category: ${category}`);
        }
        return this.productsRepository.findBy({ category: productCategory });
    }

    async create(createProductDto: CreateProductDto) {
        
        try{
            const user = await this.userRepository.findOneBy({id:createProductDto.sellerId});

            if ( !user ) throw error(`User with id: ${ createProductDto.sellerId } not found`);
    
            const product = this.productsRepository.create(createProductDto);

            return await this.productsRepository.save(product);
        }catch(error){
            throw error;
        }
    }

    async update(req:any, id: string, updateProductDto: UpdateProductDto) {
        const user = req.user as User;
        const product = await this.productsRepository.findOneBy({id:id});
        if (!product) {
            throw error(`Product with id ${id} not found`);
        }
        if (product.sellerId==user.id||user.role==(UserRole.ADMIN)){
            const product = await this.productsRepository.preload({
                id: id,
                ...updateProductDto
            });
        
            if ( !product ) throw error(`Product with id: ${ id } not found`);
        
            try {
                await this.productsRepository.save( product );
                return product;
            
            } catch (error) {
                throw error;
            }
        }else{
            throw error('Unauthorized');
        }
    }

    async delete(req: any, id: string) {
        const user = req.user as User;
        const product = await this.productsRepository.findOneBy({id:id})
        if (!product) {
            throw error(`Product with id ${id} not found`);
        }
        if (product.sellerId==user.id||user.role==(UserRole.ADMIN)){
            return await this.productsRepository.remove(product);
        }else{
            throw error('Unauthorized');
        }
    }
    async findOne(id: string) {
        return await this.productsRepository.findOneBy({id:id});
    }

    findProductsByUser(userId: string) {
        try{
            return this.productsRepository.findBy({sellerId:userId});
        }catch(error){
            throw error;
        }
    }
}