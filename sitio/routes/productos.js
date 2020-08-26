var express = require('express');
var router = express.Router();
const controller = require('../controllers/productosController');

const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/imagenProducto')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage})

router.get('/', controller.listar);

router.get('/buscar',controller.buscar)

router.get('/cargaProducto', controller.cargaProducto);
router.post('/cargaProducto',upload.any(),controller.publicarProducto);

router.get('/detalleProducto',controller.detalleProducto);

router.get('/carrito', controller.carrito);

router.get('/:catProducto', controller.catProducto);
module.exports = router;