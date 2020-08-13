var express = require('express')
var router = express.Router();

router.get('/', function(req,res,next){
    res.render('iniciarsesion',{
        title:"Iniciar sesion"
    });
});

module.exports = router;