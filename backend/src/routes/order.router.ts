import { Router } from 'express';
import { OrderController } from '../controller/order.controller';
import auth from '../middlewares/auth';

const router = Router();
const orderController = new OrderController();

router.post('/', auth,orderController.create);
router.post('/:id/items',auth, orderController.createOrderItem);
router.get('/', auth,orderController.findAll);
router.get('/buyer/:id', auth, orderController.findAllByBuyerId);
router.get('/seller/:id', auth, orderController.findAllBySellerId);
router.get('/:id', auth, orderController.findOne);
router.put('/:id', auth,orderController.update);
router.put('/', auth,orderController.acceptOrder);
router.delete('/:id', auth, orderController.remove);
router.delete('/:id/items', auth, orderController.removeItem);

export default router;