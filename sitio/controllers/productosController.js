const fs = require('fs');
const path = require('path')
let dbProducto = require('../data/database')


module.exports={
    listar:function(req, res){
        res.render('productos',{
            title:"Nuestros productos",
            dbProducto:dbProducto
        });
    },
    buscar:function(req,res){
        let buscar = req.query.buscar;
        let resultados = [];
        dbProducto.forEach(function(producto){
            if(producto.nombre.toLowerCase().includes(buscar.toLowerCase())){
                resultados.push(producto)
            }
        })
        res.render('productos',{
            title:"Resultados de la busqueda",
            dbProducto:resultados
        })
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
        res.render('catProductos',{
            title:catProducto.toUpperCase(),
            catProducto:catProducto,
            dbProducto:dbProducto
        })
    }
}