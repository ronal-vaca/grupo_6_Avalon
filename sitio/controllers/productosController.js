let db = require('../database/models')
const { Op } = require("sequelize");

const fs = require('fs');
const path = require('path')
/* let dbProducto = require('../data/database');//json */
const { rawListeners } = require('process');



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
        res.render('productAdd', {
            title: 'Carga de producto',
            user: req.session.user
        });
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
        db.Productos.findOne({where:{
            id:id
        }}).then(resultado=>{
            res.render('detalleProducto', {
                title: "Detalle del Producto",
                producto: resultado,
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
        db.Productos.findAll()
        .then(resultado=>{
            res.render('catProductos', {
                title: "Avalon",
                catProducto: catProducto,
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
    agregarAlCarrito: function(req,res,next){
        db.Carritos.create({
            cantidad:req.body.cantidad,
            id_producto:req.params.id,
            id_usuario:req.session.user.id
        })
        .then(result => {
            console.log(result)
            res.redirect('/productos')
        })
        .catch(errors=>{
            console.log(errors)
        })
    },
    publicarProducto: function(req,res,next){
        /* let lastID = 1;

        dbProducto.forEach(producto => {
            if (producto.id > lastID) {
                lastID = producto.id
            }
        }) */
        /* let nuevoProducto={
            id: lastID + 1,
            nombre: req.body.nombre.trim(),
            precio: Number(req.body.precio),
            descuento: Number(req.body.descuento),
            categoriaProducto: req.body.categoriaProducto,
            descripcion: req.body.descripcion,
            imagen: (req.files[0]) ? req.files[0].filename : "productoMuestra.png"
        };
        dbProducto.push(nuevoProducto);
        fs.writeFileSync(path.join(__dirname,"..",'data',"productosDataBase.json"),JSON.stringify(dbProducto),'utf-8'); */
        db.Productos.create({
            nombre: req.body.nombre.trim(),
            precio: Number(req.body.precio),
            descuento: Number(req.body.descuento),
            descripcion: req.body.descripcion,
            imagen: (req.files[0]) ? req.files[0].filename : "productoMuestra.png",
            categoria_id: req.body.categoriaProducto
        })
        .then(result => {
            console.log(result)
            res.redirect('/productos/admn')
        })
        .catch(errors=>{
            console.log(errors)
        })
        /* res.redirect('/productos'); */
    },
    vistaEditar: function (req, res, next) {
        let idProducto = req.params.id;

        /* res.render('EditarProducto', {
            title: "Edicion de producto",
            idProducto: idProducto,
            dbProducto: dbProducto,
            user: req.session.user
        }) */
        /* let idProducto = db.Productos.findByPk(req.params.id);
        let categorias = db.Categorias.findAll(); */

        db.Productos.findAll()
            .then(resultado => {
                res.render('EditarProducto', {
                    title: "Edicion de producto",
                    idProducto: idProducto,
                    dbProducto: resultado,
                    user: req.session.user
                })
            })
            .catch(error => {
                console.log(error);
        })
    },
    guardarEditar: function (req, res, next) {
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
    borrarProdCarrito: (req,res,next)=>{
        db.Carritos.destroy({
            where:{
                id:req.params.id
            }
        })
        res.redirect('/productos/carrito')
    },
    delete: (req, res) => {
        let productodelete = req.params.id;
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
    }
}