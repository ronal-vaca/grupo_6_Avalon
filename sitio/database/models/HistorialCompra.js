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
    }
    let config = {
        tableName: "HistorialDeCompras",
        timestamps: true,
        underscored: true
    }

    const HistorialCompra = sequelize.define(alias,cols,config)

    return HistorialCompra
}