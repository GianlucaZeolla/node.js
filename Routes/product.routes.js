const express = require('express');

const productController = require('../Controllers/product.controller');

const router = express.Router();

const auth = require('../middlewares/auth'); // Asegúrate de usar la ruta correcta
const isAdmin = require('../middlewares/isAdmin'); // Si tienes roles

router.get('/',  auth, productController.getProducts);
router.get('/:id',  auth, productController.getProductById);
router.post('/',  auth, productController.createProduct);
router.put('/:id',  auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);



// Eliminar producto (sólo admin)
router.delete('/:id', auth, isAdmin, productController.deleteProduct);

module.exports = router;
