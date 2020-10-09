module.exports = (sequelize,dataTypes)=>{
    let alias = "Historiales"
    let cols = {
        id:{
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        fecha:{
            type:dataTypes.DATEONLY(),
            allowNull:false
        },
        precio:{
            type:dataTypes.INTEGER(7),
            allowNull:false
        },
        cantidad:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        precio_total:{
            type:dataTypes.INTEGER(7),
            allowNull:false
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
        tableName: "HistorialDeCompras",
        timestamps: true,
        underscored: true
    }

    const HistorialCompra = sequelize.define(alias,cols,config)

    HistorialCompra.associate = function(models){
        HistorialCompra.belongsTo(models.Usuarios,{
            as:"usuario",
            foreignKey:"id_usuario"
        })
        HistorialCompra.belongsTo(models.Productos,{
            as:"producto",
            foreignKey:"id_producto"
        })
    }
    return HistorialCompra
}