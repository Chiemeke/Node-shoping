const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const productController = require('../middleware/productController');



router.route('/').get(productController.getProducts);

router.route('/').post(checkAuth,productController.postProducts);


router.route('/:productID').get(productController.getProductbyId);


router.route('/:id').patch(checkAuth,productController.patchProduct);

router.route('/:id').delete(checkAuth,productController.deleteProduct);
module.exports= router;