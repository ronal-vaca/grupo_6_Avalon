var express = require('express');
var router = express.Router();

const controller = require('../controllers/indexController');

router.get('/', controller.home);

// ======> MIDDLEWARES <======= //

const cookieCheck = require('../middlewares/cookieCheck');

// ======> RUTAS <======= //

router.get('/', cookieCheck,controller.home);


module.exports = router;
