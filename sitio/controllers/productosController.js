const fs = require('fs');
const path = require('path')
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
    }
}