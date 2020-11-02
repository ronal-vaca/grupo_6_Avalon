const db = require('../database/models')

const {check,validationResult,body} = require('express-validator');

module.exports = [
    check('nombre')
    .isLength({
        min:5
    })
    .withMessage('Debes ingresar el nombre del producto'),

    check('precio')
    .isDecimal({
        min:1
    })
    .withMessage('El producto debe tener un precio numerico'),

    check('descripcion')
    .isLength({
        min:20
    })
    .withMessage('Debes ingresar una descripcion')
]