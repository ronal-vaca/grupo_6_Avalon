let localidades = document.getElementById('localidadesSel')
function dameLocalidades(){
    let provincia = document.getElementById('provinciasSel').value
    fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&campos=id,nombre&max=100`)
    .then(data=>{
        return data.json()
    })
    .then(respuesta=>{
        for (let i = localidades.options.length; i >= 0; i--) {   //con esto elimino los options para evitar que se me acumulen en el caso de que cambia a cada rato el select de provincias
            localidades.remove(i)
        }
        respuesta.municipios.forEach(element => {
            localidades.innerHTML += `<option value='${element.nombre}'>${element.nombre}</option>` //cargo todas las localidades en el input siguiente al de provincias ATENCION +=
        });
    })
}