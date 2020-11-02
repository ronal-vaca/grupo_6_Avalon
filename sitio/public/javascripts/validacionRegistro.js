//Esta validacion es para el front-end
window.onload = function(){
    //Elementos capturados
    let formulario = document.getElementById('idFormulario');
    let inputEmail = document.getElementById('idEmail');
    let inputPass = document.getElementById('idPass');
    let inputPass2 = document.getElementById('idPass2');
    let inputNombre = document.getElementById('idNombre');
    let inputApellido = document.getElementById('idApellido');
    //Errores de los inputs
    let errEmail = document.getElementById('errEmail');
    let errPass = document.getElementById('errPass');
    let errPass2 = document.getElementById('errPass2');
    let errName = document.getElementById('errName');
    let errApe = document.getElementById('errApe');
    //Expresiones regulares
    let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    function validacionRegistro(){
        let errores = [];
        //Email tenga un formato de tipo email
        if(!regexEmail.test(inputEmail.value)){
            //hubo un error
            inputEmail.classList.add('is-invalid')
            errEmail.classList.add('invalid-feedback')
            errEmail.innerHTML = "El email debe ser de formato email"
            //cargo error a la variable
            errores.push("El email debe ser de formato email")
        }else{
            inputEmail.classList.remove('is-invalid')
            inputEmail.classList.add('is-valid')
            errEmail.classList.remove('invalid-feedback')
            errEmail.innerHTML = ''
        }
        //Contraseña tenga como minimo 6 caracteres y maximo 12
        if(inputPass.value.length < 6 || inputPass.value.length > 12){
            inputPass.classList.add('is-invalid')
            errPass.classList.add('invalid-feedback')
            errPass.innerHTML = "Debe ingresar una contraseña con un min de 6 caracteres y max 12"
            //cargo error a la variable
            errores.push("Debe ingresar una contraseña con un min de 6 caracteres y max 12")
        }else{
            inputPass.classList.remove('is-invalid')
            inputPass.classList.add('is-valid')
            errPass.classList.remove('invalid-feedback')
            errPass.innerHTML = ''
        }
        //Verifico que las contraseñas coincidan
        if(inputPass2.value != inputPass.value){
            inputPass2.classList.add('is-invalid')
            errPass2.classList.add('invalid-feedback')
            errPass2.innerHTML = "Las contraseñas no coinciden"
            //cargo error a la variable
            errores.push("Las contraseñas no coinciden")
        }else if(inputPass2.value =="" && inputPass.value == ""){
            inputPass2.classList.add('is-invalid')
            errPass2.classList.add('invalid-feedback')
            errPass2.innerHTML = "Las contraseñas no deben estar en blanco"
            //cargo error a la variable
            errores.push("Las contraseñas no deben estar en blanco")
        }else{
            inputPass2.classList.remove('is-invalid')
            inputPass2.classList.add('is-valid')
            errPass2.classList.remove('invalid-feedback')
            errPass2.innerHTML = ''
        }
        //El nombre y appelido debe ser mayor a 1
        if(inputNombre.value.length < 1){
            inputNombre.classList.add('is-invalid')
            errName.classList.add('invalid-feedback')
            errName.innerHTML = "Escriba un nombre valido"
            //cargo error a la variable
            errores.push("Escriba un nombre valido")
        }else{
            inputNombre.classList.remove('is-invalid')
            inputNombre.classList.add('is-valid')
            errPass2.classList.remove('invalid-feedback')
            errPass2.innerHTML = ''
        }
        if(inputApellido.value.length < 1){
            inputApellido.classList.add('is-invalid')
            errApe.classList.add('invalid-feedback')
            errApe.innerHTML = "Escriba un apellido valido"
            //cargo error a la variable
            errores.push("Escriba un apellido valido")
        }else{
            inputApellido.classList.remove('is-invalid')
            inputApellido.classList.add('is-valid')
            errApe.classList.remove('invalid-feedback')
            errApe.innerHTML = ''
        }
        return errores
    }
    formulario.onsubmit = (e)=>{
        e.preventDefault()
        let errores = validacionRegistro()
        if(!errores.length > 0){
            formulario.submit()
        }
    }
}