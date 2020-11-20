var express = require('express');
var router = express.Router();
const controller = require('../controllers/productosController');

const multer = require('multer');
const path = require('path');

let sessionUserCheck = require('../middlewares/sessionUserCheck');
let subidaValidator = require('../validators/subidaValidator');

let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/imagenProducto')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage})

/*ruta de todos los productos*/
router.get('/', controller.listar);



/*ruta para el admin*/ 
router.get('/admn', controller.listarAdmn)

/*ruta del buscador*/
router.get('/buscar',controller.buscar)

/*rutas de carga de producto*/ 
router.get('/cargaProducto',sessionUserCheck, controller.cargaProducto);
router.post('/cargaProducto',upload.any(),subidaValidator,controller.publicarProducto);

/*ruta al detalle del producto*/
router.get('/detalleProducto/:id',controller.detalleProducto);

/*ruta al carrito de compras */
router.get('/carrito',sessionUserCheck, controller.carrito);
/* router.get('/carrito/:id',sessionUserCheck, controller.carrito); */
router.post('/carrito/:id/agregar',sessionUserCheck, controller.agregarAlCarrito)
router.delete('/borrarProdCarrito/:id',sessionUserCheck, controller.borrarProdCarrito)

/* rutas de armado de pc */
router.delete('/borrarProdCarritoAPC/:id',sessionUserCheck, controller.borrarProdCarritoAPC)
router.post('/carrito/:id/agregarAPC',sessionUserCheck, controller.agregarAlCarritoAPC)

/*ruta de edicion de producto*/
router.get('/EditarProducto/:id',sessionUserCheck, controller.vistaEditar)
router.put('/EditarProducto/:id', upload.any(),controller.guardarEditar)

/*ruta de arma tu pc*/
router.get('/armatupc/:socket',sessionUserCheck, controller.armatupc)

router.get('/:catProducto', controller.catProducto);

router.delete('/delete/:id',sessionUserCheck, controller.delete);

/* una api para consumir datos de productos */
router.get('/api/Productos', controller.apiProd)
router.get('/api/apiCartCant', controller.apiCartCant)


module.exports = router;