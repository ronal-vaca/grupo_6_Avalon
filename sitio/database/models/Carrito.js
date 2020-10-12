module.exports = (sequelize,dataTypes)=>{
    let alias = "Carritos"
    let cols = {
        id:{
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        cantidad:{
            type:dataTypes.INTEGER(11),
            allowNull:false,
            defaultValue:'0'
        },

        id_producto:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        id_usuario:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        }
    }
    let config = {
        tableName: "carrito",
        timestamps: false,
        underscored: true
    }

    const Carrito = sequelize.define(alias,cols,config)

    Carrito.associate = function(models){
        Carrito.belongsTo(models.Usuarios,{
            as:"usuario",
            foreignKey:"id_usuario"
        })
        Carrito.belongsTo(models.Productos,{
            as:"producto",
            foreignKey:"id_producto"
        })
    }
    return Carrito
}