const dbUsuario = require('../data/databaseUsuarios');

const {check,validationResult,body} = require('express-validator');

module.exports = [

    check('nombre')
    .isLength({
        min:1
    })
    .withMessage('Debes ingresar tu nombre'),

    check('apellido')
    .isLength({
        min:1
    })
    .withMessage('Debes ingresar tu apellido'),

    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    body('email')
    .custom(function(value){
        for(let i = 0; i<dbUsuario.length;i++){
            if(dbUsuario[i].email == value){
                return false
            }
        }
        return true
    })
    .withMessage('Este mail ya está registrado'),

    check('password')
    .isLength({
        min:6,
        max:12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    body('password2')
    .custom(function(value,{req}){
        if(value != req.body.password){
            return false
        }
        return true
    })
    .withMessage('Las contraseñas no coinciden')/*, 
    check('bases')
    .isString('on')
    .withMessage('Debe aceptar las bases y condiciones') */
]