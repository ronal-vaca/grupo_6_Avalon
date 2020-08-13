var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {    //siempre en ese orden req, res, next con sus respectivos espacios sino da error nose porqe by:emi
  res.render('index', {
    title: "Avalon"
  });
});

module.exports = router;
