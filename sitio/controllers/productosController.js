const fs = require('fs');
const path = require('path')
let dbProducto = require('../data/database')


module.exports={
    listar:function(req, res){
        res.render('productos',{
            title:"Nuestros productos"
        });
    },
    cargaProducto:function(req, res) {
        res.render('productAdd', { title: 'Avalon Productos' });
    },
    detalleProducto: function(req, res) {
        res.render('detalleProducto', {
          title: "Detalle de producto"
        });
    },
    carrito:function(req, res) {
        res.render('CarritoDeCompras', {
          title: "Carrito de compras"
        });
    },
    catProducto:function(req,res){
        let catProducto = req.params.catProducto
        res.render('productos',{
            title:catProducto.toUpperCase(),
            catProducto:catProducto,
            dbProducto:dbProducto
        })
    }
}