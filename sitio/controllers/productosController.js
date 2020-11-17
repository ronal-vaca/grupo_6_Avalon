let db = require('../database/models')
const { Op } = require("sequelize");

const Sequelize = require('sequelize')
const fs = require('fs');
const path = require('path')
/* let dbProducto = require('../data/database');//json */
const { rawListeners } = require('process');
const {validationResult, body} = require('express-validator');



module.exports = {
    listar: (req, res) => {
        db.Productos.findAll()
            .then(resultado => {
                res.render('productos', {
                    title: "Nuestros productos",
                    dbProducto: resultado,
                    user: req.session.user
                })
            })
            .catch(error => {
                console.log(error);
            })
    },/*
    listar:function(req, res){
        res.render('productos',{
            title:"Nuestros productos",
            dbProducto:db.Productos,
            user:req.session.user
        });
    },*/
    listarAdmn: function (req, res) {
        db.Productos.findAll()
            .then(resultado => {
                res.render('productosAdmin', {
                    title: "Nuestros productos",
                    dbProducto: resultado,
                    user: req.session.user
                })
            })
            .catch(error => {
                console.log(error);
            })

        /*  res.render('productosAdmin',{
              title:"Productos",
              dbProducto:dbProducto,
              user:req.session.user
          });*/
    },
    buscar: function (req, res) {
        /*let buscar = req.query.buscar;
        let resultados = [];
        dbProducto.forEach(function (producto) {
            if (producto.nombre.toLowerCase().includes(buscar.toLowerCase())) {
                resultados.push(producto)
            }
        })
        res.render('productos', {
            title: "Resultados de la busqueda",
            dbProducto: resultados,
            user: req.session.user
        })*/
        db.Productos.findAll({
            where:{
                nombre:{
                    [Op.substring]:req.query.buscar
                }
            }
        })
        .then(resultado=>{
            res.render('productos', {
                title: "Resultados de la busqueda",
                dbProducto: resultado,
                user: req.session.user
            })
        })

    },

    cargaProducto: function (req, res) {
        db.Categorias.findAll()
        .then(respuesta=>{
            res.render('productAdd', {
            title: 'Carga de producto',
            categorias: respuesta,
            user: req.session.user
            });
        })
        
    },
    detalleProducto: function (req, res) {
        let id = req.params.id;
        /* let producto = dbProducto.filter(producto => {
            return producto.id == id
        })
        res.render('detalleProducto', {
            title: "Detalle del Producto",
            producto: producto[0],
            user: req.session.user
        }); */
        /* db.Productos.findOne({where:{id:id}}) este es el que funciona
        .then(resultado=>{
            res.render('detalleProducto', {
                title: "Detalle del Producto",
                producto: resultado,
                user: req.session.user
            });
        }) */
        let productoElegido = db.Productos.findOne({where:{id:id}})
        let productosSimilares = db.Productos.findAll({ order: Sequelize.literal('rand()'), limit: 6 }) //obtengo 3 productos aleatorios de la base de datos para mostrar en la vista
        Promise.all([productoElegido,productosSimilares])
        .then(resultado=>{
            let caracteristicas = resultado[0].caracteristicas.split(",")
            let adicionales = resultado[0].adicionales.split(",")
            res.render('detalleProducto', {
                title: "Detalle del Producto",
                caracteristicas: caracteristicas,
                adicionales: adicionales,
                producto: resultado[0],
                similares: resultado[1],
                user: req.session.user
            });
        })
    },
    catProducto: function (req, res) {
        let catProducto = req.params.catProducto
        /* res.render('catProductos', {
            title: "Avalon",
            catProducto: catProducto,
            dbProducto: dbProducto,
            user: req.session.user
        }) */
        db.Productos.findAll({include:[{association:"Categorias"}]})
        .then(resultado=>{
            /* res.send(resultado) */
            let categoria=[];
            resultado.forEach(element => {
                if(element.Categorias.id == catProducto){
                    categoria.push(element.Categorias.nombre)
                }
            });
            let categoria2 = [...new Set(categoria)];
            res.render('catProductos', {
                title: "Avalon",
                catProducto: catProducto,//producto
                categoria: categoria2,//categoria (mouse, teclado, monitor, etc...)
                dbProducto: resultado,
                user: req.session.user
            })
        .catch(errors=>{
            console.log(errors)
        })
        })
    },
    carrito: function (req, res) {
        /* let idProducto = req.params.id; */
        /* res.render('CarritoDeCompras', {
            title: "Carrito de compras",
            dbProducto: dbProducto,
            idProducto: idProducto,
            user: req.session.user
        }); */
        db.Carritos.findAll({include:[{association:"producto"},{association:"usuario"}]})
        .then(resultado=>{
            /* res.send(resultado) */
            res.render('CarritoDeCompras', {
                title: "Carrito de compras",
                dbProducto: resultado,
                /* idProducto: idProducto, */
                user: req.session.user
            });
        })
    },
    agregarAlCarrito: function(req,res){
        db.Carritos.create({
            cantidad:req.body.cantidad,
            id_producto:req.params.id,
            id_usuario:req.session.user.id
        })
        .then(result => {
            console.log(result)
            res.redirect('/productos/admn')
        })
        .catch(errors=>{
            console.log(errors)
        })
    },
    agregarAlCarritoAPC: function(req,res){
        db.Carritos.create({
            cantidad:req.body.cantidad,
            id_producto:req.params.id,
            id_usuario:req.session.user.id
        })
        .then(result => {
            console.log(result)
            /* res.redirect('/productos/admn') */
        })
        .catch(errors=>{
            console.log(errors)
        })
    },
    publicarProducto: function(req,res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
        db.Productos.create({
            nombre: req.body.nombre.trim(),
            precio: Number(req.body.precio),
            descuento: Number(req.body.descuento),
            descripcion: req.body.descripcion,
            imagen: (req.files[0]) ? req.files[0].filename : "productoMuestra.png",
            categoria_id: req.body.categoriaProducto,
            caracteristicas: req.body.caract1 + ","+ req.body.caract2+ "," + req.body.caract3 + ","+ req.body.caract4 + "," + req.body.caract5 + "," + req.body.caract6,
            adicionales: req.body.adicional1 + "," + req.body.adicional2 + "," + req.body.adicional3 + "," + req.body.adicional4 + "," + req.body.adicional5
        })
        .then(result => {
            console.log(result)
            res.redirect('/productos/admn')
        })
        .catch(errors=>{
            console.log(errors)
        })
        }else{
            res.render("productAdd",{
                title:'Carga de producto',
                user: req.session.user,
                old:req.body,
                errors:errors.mapped()
            })
        }
    },
    vistaEditar: function (req, res) {
        let idProducto = req.params.id;

        /* res.render('EditarProducto', {
            title: "Edicion de producto",
            idProducto: idProducto,
            dbProducto: dbProducto,
            user: req.session.user
        }) */
        /* let idProducto = db.Productos.findByPk(req.params.id);
        let categorias = db.Categorias.findAll(); */

        let categorias = db.Categorias.findAll()
        let productos = db.Productos.findAll()
        Promise.all([categorias,productos])
            .then(resultado => {
                res.render('EditarProducto', {
                    title: "Edicion de producto",
                    idProducto: idProducto,
                    categorias: resultado[0],
                    dbProducto: resultado[1],
                    user: req.session.user
                })
            })
            .catch(error => {
                console.log(error);
        })
    },
    guardarEditar: function (req, res) {
       /*  let idProducto = req.params.id;
        dbProducto.forEach(function (producto) {
            if (producto.id == idProducto) {
                producto.id = Number(idProducto);
                producto.nombre = req.body.nombre;
                producto.precio = Number(req.body.precio);
                producto.descuento = Number(req.body.descuento);
                producto.categoriaProducto = req.body.categoriaProducto;
                producto.descripcion = req.body.descripcion;
                producto.imagen = (req.files[0] ? req.files[0].filename : producto.imagen)
            }
        })
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'productosDataBase.json'), JSON.stringify(dbProducto), 'utf-8') */
        db.Productos.update({
            nombre : req.body.nombre,
            precio : Number(req.body.precio),
            descuento : Number(req.body.descuento),
            categoria_id : req.body.categoriaProducto,
            descripcion : req.body.descripcion,
            imagen : (req.files[0] ? req.files[0].filename : req.session.user.imagen)
        },{
            where:{
                id:req.params.id
            }
        })
        .then(result=>{
            res.redirect('/productos/detalleProducto/'+ req.params.id)
        })
        .catch(errores=>{
            console.log(errores)
        })
        
    },
    borrarProdCarrito: (req,res)=>{
        db.Carritos.destroy({
            where:{
                id:req.params.id
            }
        })
        res.redirect('/productos/carrito')
    },
    borrarProdCarritoAPC: (req,res)=>{
        db.Carritos.destroy({
            where:{
                id:req.params.id
            }
        })
    },
    delete: (req, res) => {
        /* let borrar;
        dbProducto.forEach((producto) => {
            if (producto.id == productodelete) {
                borrar = dbProducto.indexOf(producto)
            }
        })
        dbProducto.splice(borrar, 1)
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'productosDataBase.json'), JSON.stringify(dbProducto), 'utf-8') */
        db.Productos.destroy({
            where:{
                id:req.params.id
            }
        })
        res.redirect('/productos/admn');
    },
    armatupc:function(req,res){
        let socket = req.params.socket;
        let productos = db.Productos.findAll()
        let carrito = db.Carritos.findAll({include:[{association:"producto"},{association:"usuario"}]})
        Promise.all([productos,carrito])
        .then(data=>{
            res.render('ArmaTuPC', {
                title: "Armando tu PC",
                socket: socket,
                dbProducto: data[0],
                carrito: data[1],
                user: req.session.user
            })
        })
    },
    apiProd:function(req,res){
        db.Productos.findAll()
        .then(data=>{
            res.json(data)
        })
    }
}