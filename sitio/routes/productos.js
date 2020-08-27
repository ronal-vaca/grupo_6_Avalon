var express = require('express');
var router = express.Router();
const controller = require('../controllers/productosController');



router.get('/', controller.listar);

router.get('/buscar',controller.buscar)

router.get('/cargaProducto', controller.cargaProducto);

router.get('/detalleProducto',controller.detalleProducto);

router.get('/carrito/:id', controller.carrito);

router.get('/:catProducto', controller.catProducto);

module.exports = router;