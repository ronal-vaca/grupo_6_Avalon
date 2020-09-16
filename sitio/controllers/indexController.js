let dbProducto = require('../data/database')

module.exports={
    home:function(req, res) {    //siempre en ese orden req, res, next con sus respectivos espacios sino da error nose porqe by:emi
      let ofertas = dbProducto.filter(producto => {
         return producto.categoria == "oferta"
      })
      let masVendido = dbProducto.filter(producto => {
        return producto.categoria == "mas-vendido"
      })
      let mejorProducto = dbProducto.filter(producto => {
      return producto.categoria == "mejor-producto"
      })
      res.render('index',{
        title: "Avalon",
        ofertas: ofertas,
        masVendido: masVendido,
        mejorProducto: mejorProducto,
        user:req.session.user
      });

    }
}