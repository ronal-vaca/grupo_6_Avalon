console.log('conectado')

let pcArmada = document.getElementById('13');
let caractYadicionales = document.getElementById('caractYadicionales')



function PCArmada(){
    let select = document.getElementById('select').value
    if(select == 13){
    caractYadicionales.innerHTML = `
    <div class="col-12 productosMargen"><h6>Caracteristicas tecnicas</h6></div>
    <div class="col-12 productosMargen"><input type="text" class="form-control" name="caract1" id="caract1" placeholder="Mother"></div>
    <div class="col-12 productosMargen"><input type="text" class="form-control" name="caract2" id="caract2" placeholder="Procesador"></div>
    <div class="col-12 productosMargen"><input type="text" class="form-control" name="caract3" id="caract3" placeholder="Memoria RAM"></div>
    <div class="col-12 productosMargen"><input type="text" class="form-control" name="caract4" id="caract4" placeholder="Disco / SSD"></div>
    <div class="col-12 productosMargen"><input type="text" class="form-control" name="caract5" id="caract5" placeholder="Fuente"></div>
    <div class="col-12 productosMargen"><input type="text" class="form-control" name="caract6" id="caract6" placeholder="Placa de video"></div>
    <div class="col-12 productosMargen"><h6>Perifericos</h6></div>
    <div class="col-12 productosMargen"><input type="text" class="form-control" name="adicional1" id="adicional1" placeholder="Monitor"></div>
    <div class="col-12 productosMargen"><input type="text" class="form-control" name="adicional2" id="adicional2" placeholder="Teclado"></div>
    <div class="col-12 productosMargen"><input type="text" class="form-control" name="adicional3" id="adicional3" placeholder="Mouse"></div>
    <div class="col-12 productosMargen"><input type="text" class="form-control" name="adicional4" id="adicional4" placeholder="Auricular"></div>
    <div class="col-12 productosMargen"><input type="text" class="form-control" name="adicional5" id="adicional5" placeholder="Gabinete"></div>
    `
    }else{
        if(select != 13){
            caractYadicionales.innerHTML = ' '
        }
    }
}

    
