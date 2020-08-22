var express = require('express');
var router = express.Router();
const controller = require('../controllers/usersController');



router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/iniciarSesion', controller.iniciarSesion);
router.get('/registro', controller.registro);

module.exports = router;
