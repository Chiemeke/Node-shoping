const express = require('express');
const router = express.Router();
const orderController = require('../middleware/orderController');

const checkAuth = require('../middleware/check-auth');


router.route('/').get(checkAuth,orderController.getOrders);

router.route('/').post(checkAuth,orderController.postOrders);
router.route('/:orderId').get(checkAuth,orderController.getOrdersbyId);
router.route('/:id').patch(checkAuth,orderController.patchOrders);
router.route('/:id').delete(checkAuth,orderController.deleteOrders)

module.exports= router;