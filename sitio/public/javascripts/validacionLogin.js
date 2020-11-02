window.onload = function(){
    let formulario = document.getElementById('idFormulario');
    let inputEmail = document.getElementById('idEmail');
    let inputPass = document.getElementById('idPass');
//Errores de los inputs
    let errEmail = document.getElementById('errEmail');
    let errPass = document.getElementById('errPass');

    let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    function validacionLogin(){
        let errores = [];
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
        return errores
    }
    formulario.onsubmit = (e)=>{
        e.preventDefault()
        let errores = validacionLogin()
        if(!errores.length > 0){
            formulario.submit()
        }
    }
}