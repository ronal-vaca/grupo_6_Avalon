window.onload = function(){

    //capturo 
let form = document.getElementById("formulario");
let nombre = document.getElementById("nombre");
let precio = document.getElementById("precio");
let descuento = document.getElementById("descuento");
let descripcion = document.getElementById("descripcion");

//capturo errores


let errorNombre = document.getElementById("errorNombre");
let errorPrecio = document.getElementById("errorPrecio");
let errorDescuento = document.getElementById("errorDescuento");
let errorDescripcion = document.getElementById("errorDescripcion");

function validacionProductAdd(){
    let errores= [];

    if(nombre.value.length < 5 || nombre.value == ""){
        nombre.classList.add('is-invalid')
        errorNombre.classList.add('invalid-feedback')
        errorNombre.innerHTML = "Debe ingresar un nombre con un min de 5 caracteres"
        //cargo error a la variable
        errores.push("Debe ingresar un nombre con un min de 5 caracteres")
    }else{
        nombre.classList.remove('is-invalid')
        nombre.classList.add('is-valid')
        errorNombre.classList.remove('invalid-feedback')
        errorNombre.innerHTML = ''
    }
    if(precio.value <= 0){
       precio.classList.add('is-invalid')
        errorPrecio.classList.add('invalid-feedback')
        errorPrecio.innerHTML = "Debe ingresar un precio"
        //cargo error a la variable
        errores.push("Debe ingresar un precio")
    }else{
        precio.classList.remove('is-invalid')
        precio.classList.add('is-valid')
        errorPrecio.classList.remove('invalid-feedback')
        errorPrecio.innerHTML = ''
    }
    if(descuento.value < 0){
        descuento.classList.add('is-invalid')
         errorDescuento.classList.add('invalid-feedback')
         errorDescuento.innerHTML = "No debe ingresar un descuento negativo"
         //cargo error a la variable
         errores.push("No debe ingresar un descuento negativo")
     }else{
         descuento.classList.remove('is-invalid')
         descuento.classList.add('is-valid')
         errorDescuento.classList.remove('invalid-feedback')
         errorDescuento.innerHTML = ''
     }
     if(descripcion.value.length < 20){
        descripcion.classList.add('is-invalid')
        errorDescripcion.classList.add('invalid-feedback')
        errorDescripcion.innerHTML = "La descripcion debe tener al menos 20 caracteres"
         //cargo error a la variable
         errores.push("La descripcion debe tener al menos 20 caracteres")
     }else{
        descripcion.classList.remove('is-invalid')
        descripcion.classList.add('is-valid')
         errorDescripcion.classList.remove('invalid-feedback')
         errorDescripcion.innerHTML = ''
     }

    return errores;
} 
form.onsubmit = (e)=>{
    e.preventDefault()
    let errores = validacionProductAdd()
    if(!errores.length > 0){
        form.submit()
    }
}
}