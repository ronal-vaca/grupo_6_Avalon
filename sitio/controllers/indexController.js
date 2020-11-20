/* let dbProducto = require('../data/database')//json viejo */


let db = require('../database/models')//db mysql
const { Op } = require("sequelize");
module.exports={
    home:function(req, res) {    //siempre en ese orden req, res, next con sus respectivos espacios sino da error nose porqe by:emi

      let ProdVendido = db.Productos.findAll({where:{
        masvendido:1
      },
      limit:3
      })
      let oferta = db.Productos.findAll({where:{
        descuento:{
          [Op.gt]:0
        } 
      },
      limit:3
      })
      let ProdMejor = db.Productos.findAll({where:{
        mejorproducto:1
      },
      limit:3
      })

      Promise.all([ProdVendido,oferta,ProdMejor])//en el caso que todas las promesas se cumplan
      .then(resultado=>{
        res.render('index',{
        title: "Avalon",
        ofertas: resultado[1],
        masVendido: resultado[0],
        mejorProducto: resultado[2],
        user:req.session.user
        });
      })
    }
}