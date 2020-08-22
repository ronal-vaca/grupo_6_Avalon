const fs = require('fs');
const path = require('path')
module.exports={
    iniciarSesion:function(req, res){
        res.render('iniciarsesion',{
            title:"Iniciar sesion"
        });
    },
    registro:function(req, res) {
        res.render('registro', {
          title: "Registro"
        });
    }
}