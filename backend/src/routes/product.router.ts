import { Router } from 'express';
import  productController  from '../controller/product.controller';
import { ProductsService } from '../service/product.service';

const router = Router();

router.get('/', productController.findAll);
router.get('/:id', productController.findOne);
router.post('/create', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.get('/category/:category', productController.findProductsByCategory);
router.get('/user/:userId',  productController.findProductsByUser);

export default router;