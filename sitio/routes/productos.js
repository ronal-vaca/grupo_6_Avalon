var express = require('express');
var router = express.Router();
const controller = require('../controllers/productosController');



router.get('/', controller.listar);

router.get('/cargaProducto', controller.cargaProducto);

router.get('/detalleProducto',controller.detalleProducto);

router.get('/carrito', controller.carrito);

module.exports = router;