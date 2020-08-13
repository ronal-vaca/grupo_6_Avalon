var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('detalleProducto', {
      title: "Detalle de producto"
    });
  });

module.exports = router;