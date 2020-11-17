const axios = require('axios')
const apiProvincias = require('./apiProvincias')

const provinciasRequest = {
    getProvincias : function(){
        return axios ({
            ...apiProvincias, //estp hace copy paste del contenido de apiProvincias.js(lo que esta dentro del module)
            method : 'get',
            url : '/provincias'
        })//fin del axios
    }//fin de la funcion
}//fin del const

module.exports = provinciasRequest