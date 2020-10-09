module.exports = (sequelize,dataTypes)=>{
    let alias = "Productos"
    let cols = {
        id:{
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        precio:{
            type:dataTypes.INTEGER(7),
            allowNull:false
        },
        descuento:{
            type:dataTypes.INTEGER(100),
            allowNull:false,
            defaultValue:'NULL'
        },
        descripcion:{
            type:dataTypes.STRING(500),
            allowNull:false,
            defaultValue:'NULL'
        },
        imagen:{
            type:dataTypes.STRING(500),
            allowNull:false,
            defaultValue:'NULL'
        },
        categoria_id:{
            type:dataTypes.INTEGER(11),
            allowNull:false,
            defaultValue:'NULL'
        }
    }
    let config = {
        tableName : "productos",
        timestamps:false
    }

    const Producto = sequelize.define(alias,cols,config);

    return Producto
}