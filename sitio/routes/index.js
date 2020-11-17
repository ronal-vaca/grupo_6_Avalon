var express = require('express');
var router = express.Router();
var apiProvincias = require('../request/provincias')

const controller = require('../controllers/indexController');

router.get('/', controller.home);

// ======> MIDDLEWARES <======= //

const cookieCheck = require('../middlewares/cookieCheck');

// ======> RUTAS <======= //

router.get('/', cookieCheck,controller.home);

router.get('/provincias', function(req,res,next){
    apiProvincias.getProvincias()
    .then(respuesta=>{
        console.log(respuesta)
        res.json(respuesta.data)
    })
})


module.exports = router;
