const fs = require('fs');
const path = require('path')
module.exports={
    home:function(req, res) {    //siempre en ese orden req, res, next con sus respectivos espacios sino da error nose porqe by:emi
        res.render('index',{
          title: "Avalon"
        });
    }
}