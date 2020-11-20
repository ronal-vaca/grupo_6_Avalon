const db = require('../database/models');

module.exports = (req, res, next) => {
    let pedido = () => {
        db.Carritos.findAll({
            where: {
                id_usuario: req.session.user.id
            }
        })
        .then(result => {
            console.log(result);
            res.locals.carritoCant = result.length;
            next()
        })
        .catch(err => {
            res.locals.carritoCant = 0;
            next()
        })
    }

    if (req.session.user) {
        pedido()
    } else {
        res.locals.carritoCant = 0
        next()
    }
}