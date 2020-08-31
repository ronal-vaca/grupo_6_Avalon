const fs = require('fs');
const path = require('path')
const bcrypt = require('bcrypt')
let dbUsuarios = require('../data/databaseUsuarios')

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
    },
    agregoUsuario:function(req,res,next){
        let lastID = 1;

        dbUsuarios.forEach(usuario=>{
            if(usuario.id > lastID){
                lastID = usuario.id
            }    
        })  
        let nuevoUsuario={
            id: lastID + 1,
            email: (req.body.email).trim(),
            password: bcrypt.hashSync(req.body.password, 10),
            nombre: req.body.nombre.trim(),
            apellido: req.body.apellido.trim(),
            DNI:Number(req.body.DNI),
            telefono: Number(req.body.telefono)
        }
        console.log(nuevoUsuario)
        dbUsuarios.push(nuevoUsuario);
        fs.writeFileSync(path.join(__dirname,"..",'data',"usuariosDataBase.json"),JSON.stringify(dbUsuarios),'utf-8');
        res.redirect('/');
        
    }
}