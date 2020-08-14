var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('CarritoDeCompras', {
      title: "Carrito de compras"
    });
  });

module.exports = router;