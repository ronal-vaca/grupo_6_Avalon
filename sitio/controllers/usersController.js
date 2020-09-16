const fs = require('fs');
const path = require('path')
const bcrypt = require('bcrypt')
let dbUsuarios = require('../data/databaseUsuarios')
const {validationResult, body} = require('express-validator');

module.exports={
    iniciarSesion:function(req, res){
        res.render('iniciarsesion',{
            title:"Iniciar sesion"
        });
    },
    processLogin:function(req,res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
            dbUsuarios.forEach(usuario=>{
                if(usuario.email == req.body.email){
                    req.session.user = {
                        id:usuario.id,
                        nick:usuario.nombre + ' ' + usuario.apellido,
                        rol:usuario.rol,
                        email:usuario.email,
                        avatar:usuario.avatar
                    }
                }
            })
            if(req.body.recordar){
                res.cookie('userAvalon',req.session.user,{maxAge:1000*60*2})
            }
            return res.redirect('/')
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
          title: "Registro"
        });
    },
    processRegister:function(req,res,next){
        let errors = validationResult(req);
        let lastID = 0;
        if(dbUsuarios.length > 0){
            dbUsuarios.forEach(usuario=>{
                if(usuario.id > lastID){
                    lastID = usuario.id
                }
            })
        } 

        if(errors.isEmpty()){
            let nuevoUsuario={
                id: lastID + 1,
                email: (req.body.email).trim(),
                password: bcrypt.hashSync(req.body.password, 10),
                nombre: req.body.nombre.trim(),
                apellido: req.body.apellido.trim(),
                DNI:Number(req.body.DNI),
                telefono: Number(req.body.telefono)
            }

            dbUsuarios.push(nuevoUsuario);
            
            fs.writeFileSync(path.join(__dirname,"..",'data',"usuariosDataBase.json"),JSON.stringify(dbUsuarios),'utf-8');
            return res.redirect('/');
        }else{
            res.render('registro',{
                title:"registro",
                errors:errors.mapped(),
                old:req.body,
                user:req.session.user
            })
        }
        


        
    }
}