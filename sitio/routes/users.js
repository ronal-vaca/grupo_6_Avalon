//----------MODULOS-----------
var express = require('express');
var router = express.Router();
//-------CONTROLADORES--------
const controller = require('../controllers/usersController');
//-------VALIDACIONES---------
let loginValidator = require('../validators/loginValidator');
let registerValidator = require('../validators/registerValidator');

//-------MIDDLEWARES------
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//-------RUTAS------------
router.get('/iniciarSesion', controller.iniciarSesion);                  //vista del login
router.post('/iniciarSesion', loginValidator, controller.processLogin);  //validacion del login 

router.get('/registro', controller.registro);
router.post('/registro', registerValidator, controller.processRegister);


router.get('/cerrarsesion', controller.cerrarsesion);

module.exports = router;
