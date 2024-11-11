import { Request, Response } from "express";
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsService } from '../service/product.service';
import { Product } from '../entity/product';

const productService = new ProductsService();

class ProductController {

    async findAll(req: Request, res: Response): Promise<any> {
        try {
            const products = await productService.findAll();
            return res.status(200).json(products);
        } catch (error) {
            return res.status(400).json({ message: "Error al obtener los productos" });
        }
    }

    async findOne(req: Request, res: Response): Promise<any> {
        try {
            const id  = req.params.id;
            const product = await productService.findOneById(id);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(400).json({ message: "Error al obtener el producto" });
        }
    }

    async create(req: Request, res: Response): Promise<any> {
        try {
            const createProductDto = req.body;
            const product = await productService.create(createProductDto);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(400).json({ message: "Error al crear el producto"});
        }
    }

    async update(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const updateProductDto = req.body;
            const updatedProduct = await productService.update(req, id, updateProductDto);
            return res.status(200).json(updatedProduct);
        } catch (error) {
            return res.status(400).json({ message: "Error al actualizar el producto" });
        }
    }

    async delete(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const product = await productService.delete(req, id);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(400).json({ message: "Error al eliminar el producto"});
        }
    }

    async findProductsByCategory(req: Request, res: Response): Promise<any> {
        try {
            const  category = req.params.category;
            const products = await productService.findProductsByCategory(category);
            return res.status(200).json(products);
        } catch (error) {
            return res.status(400).json({ message: "Error al obtener los productos por categoría" });
        }
    }

    async findProductsByUser(req: Request, res: Response): Promise<any> {
        try {
            const userId = req.params.userId;
            const products = await productService.findProductsByUser(userId);
            return res.status(200).json(products);
        } catch (error) {
            return res.status(400).json({ message: "Error al obtener los productos por usuario" });
        }
    }
}

export default new ProductController();