let db= require('../database/models');

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
let dbUsuarios = require('../data/databaseUsuarios');
const {validationResult, body} = require('express-validator');

module.exports={
    iniciarSesion:function(req, res){
        res.render('iniciarsesion',{
            title:"Iniciar sesion",
            user:req.session.user
        });
    },
    processLogin:function(req,res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
            /* dbUsuarios.forEach(usuario=>{
                if(usuario.email == req.body.email){
                    req.session.user = {
                        id:usuario.id,
                        nick:usuario.apellido,
                        rol:usuario.rol,
                        email:usuario.email,
                        avatar:usuario.avatar
                    }
                }
            }) */
            db.Usuarios.findOne({
                where:{
                    email:req.body.email
                }
            })
            .then(usuario => {
                req.session.user = {
                    id:usuario.id,
                    nick:usuario.apellido,
                    rol:usuario.rol,
                    email:usuario.email,
                    avatar:usuario.avatar
                }
                if(req.body.recordar != undefined){
                    res.cookie('usuarioAvalon',req.session.user,{maxAge:90000})
                }

                res.locals.user = req.session.user
                
                return res.redirect('/')
            })
            
            
        }else{
            return res.render('iniciarsesion',{
                title:"Ingreso de Usuarios",
                css:'index.css',
                errors: errors.mapped(),
                old:req.body,
                user:req.session.user
            })
        }
    },
    registro:function(req, res) {
        res.render('registro', {
          title: "Registro",
          user:req.session.user
        });
    },
    processRegister:function(req,res,next){
        let errors = validationResult(req);
        /* let lastID = 0;
        if(dbUsuarios.length > 0){
            dbUsuarios.forEach(usuario=>{
                if(usuario.id > lastID){
                    lastID = usuario.id
                }
            })
        }  */

        if(errors.isEmpty()){
            /* let nuevoUsuario={
                id: lastID + 1,
                email: (req.body.email).trim(),
                avatar:(req.files[0])?req.files[0].filename:"default.png",
                password: bcrypt.hashSync(req.body.password, 10),
                nombre: req.body.nombre.trim(),
                apellido: req.body.apellido.trim(),
                DNI:Number(req.body.DNI),
                telefono: Number(req.body.telefono),
                rol:"user"
            }

            dbUsuarios.push(nuevoUsuario);
            
            fs.writeFileSync(path.join(__dirname,"..",'data',"usuariosDataBase.json"),JSON.stringify(dbUsuarios),'utf-8'); */
            db.Usuarios.create(
                {

                    email: (req.body.email).trim(),
                    avatar:(req.files[0])?req.files[0].filename:"default.png",
                    password: bcrypt.hashSync(req.body.password, 10),
                    nombre: req.body.nombre.trim(),
                    apellido: req.body.apellido.trim(),
                    dni:Number(req.body.DNI),
                    telefono: Number(req.body.telefono),
                    rol:"user"
                }
            )
            .then(resultado=>{
                console.log(resultado)
                return res.redirect('/users/iniciarSesion');
            })
            .catch(errores => {
                console.log(errores)
            })
            /* return res.redirect('/users/iniciarSesion'); */
        }else{
            res.render('registro',{
                title:"registro",
                errors:errors.mapped(),
                old:req.body,
                user:req.session.user
            })
        }
    },
    /*Usuario: function (req, res) {
        return res.render('Perfil', {
            title: "Editar Perfil",
            user: req.session.user
        });
    },*/
    perfil:(req,res)=>{ 
        if(req.session.user){
            db.Usuarios.findByPk(req.session.user.id)
            .then(user => {
                return res.render('perfil',{
                    title:"Perfil de Usuario",
                    usuario:user,
                    })
                })
        }else{
            return res.redirect('/')
        }
    },
    editarPerfil:(req,res)=>{
        if(req.files[0]){
            if(fs.existsSync(path.join(__dirname,'../public/images/imagenAvatar/'+req.session.user.avatar))){
                fs.unlinkSync(path.join(__dirname,'../public/images/imagenAvatar/'+req.session.user.avatar))
                res.locals.user.avatar = req.files[0].filename
            }

        }
        db.Usuarios.update(
            {
                email: (req.body.email).trim(),
                avatar:(req.files[0])?req.files[0].filename:req.session.user.avatar,
                nombre: req.body.nombre.trim(),
                apellido: req.body.apellido.trim(),
                dni:Number(req.body.DNI),
                telefono: Number(req.body.telefono),
                provincia:req.body.provincia.trim(),
                localidad:req.body.localidad.trim(),
                direccion: req.body.direccion.trim()
            },
            {
                where:{
                    id:req.params.id
                }
            }
        )
        .then( result => {
          console.log(req.session.user)
          return res.redirect('/users/perfil')
          })
        .catch(error => {
            res.send(error)
            console.log(error)
        })
    },
    cerrarsesion:function(req,res){
        req.session.destroy();
        if(req.cookies.usuarioAvalon){
            res.cookie('usuarioAvalon','',{maxAge:-1})
        }
        res.redirect('/')
    }
}