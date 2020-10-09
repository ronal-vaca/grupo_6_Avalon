module.exports = (sequelize, dataTypes) => {

    let alias = "Usuarios"

    let cols = {
        id:{
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        apellido:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email:{
            type: dataTypes.STRING(250),
            allowNull: false
        },
        password:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        dni : {
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        telefono:{
            type:dataTypes.INTEGER(20),
            allowNull:false
        },
        avatar : {
            type:dataTypes.STRING(500),
            allowNull:false,
            defaultValue:'dafault.png'
        },
        rol : {
            type:dataTypes.STRING(45),
            allowNull:false,
            defaultValue:'user'
        }
    }

    let config = {
        tableName: "usuarios",
        timestamps: false
    }

    const Usuario = sequelize.define(alias,cols,config)

    return Usuario
}