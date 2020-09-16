var express = require('express');
var router = express.Router();
const controller = require('../controllers/indexController')

router.get('/', controller.home);

// ======> MIDDLEWARES <======= //

const cookieCheck = require('../middlewares/cookieCheck');

// ======> CONTROLADORES <======= //

const controller = require('../controllers/indexController'); //requiero el controlador para que se haga cargo de la lógica

// ======> RUTAS <======= //

router.get('/', cookieCheck,controller.index);


module.exports = router;
