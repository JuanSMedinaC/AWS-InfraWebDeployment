const express = require('express');
const router = express.Router();
//const checkoutController = require('../controllers/checkoutController');

router.post('/process', checkoutController.processPayment);

module.exports = router;
