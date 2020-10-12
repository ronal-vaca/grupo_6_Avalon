//----------MODULOS-----------
var express = require('express');
var router = express.Router();
//-------CONTROLADORES--------
const controller = require('../controllers/usersController');
//-------VALIDACIONES---------
let loginValidator = require('../validators/loginValidator');
let registerValidator = require('../validators/registerValidator');

//-------MIDDLEWARES------
const multerAvatar = require('../middlewares/multerAvatar');
let sessionUserCheck = require('../middlewares/sessionUserCheck');




//-------RUTAS------------
router.get('/iniciarSesion', controller.iniciarSesion);                  //vista del login
router.post('/iniciarSesion', loginValidator, controller.processLogin);  //validacion del login 

router.get('/registro', controller.registro);
router.post('/registro',  multerAvatar.any(),registerValidator, controller.processRegister);

router.get('/perfil',sessionUserCheck, controller.perfil);
router.put('/editarPerfil/:id',multerAvatar.any(),controller.editarPerfil);

router.get('/cerrarsesion', controller.cerrarsesion);

module.exports = router;
