import { Router } from 'express';
import  productController  from '../controller/product.controller';
import { ProductsService } from '../service/product.service';
import auth from '../middlewares/auth';

const router = Router();

router.get('/', auth, productController.findAll);
router.get('/:id', auth, productController.findOne);
router.post('/create',auth, productController.create);
router.put('/:id',auth, productController.update);
router.delete('/:id',auth, productController.delete);
router.get('/category/:category',auth, productController.findProductsByCategory);
router.get('/user/:userId',auth,  productController.findProductsByUser);

export default router;