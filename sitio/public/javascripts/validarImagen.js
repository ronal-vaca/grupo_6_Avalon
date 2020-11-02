function validarImagen(obj){
    var uploadFile = obj.files[0];

    if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos');
        return;
    }

    if (!(/\.(jpg|png|gif|jpeg)$/i).test(uploadFile.name)) {
        alert('El archivo a adjuntar no es una imagen.\n Solo se admiten imagenes con extension .jpg, .jpeg, .png y .gif');
        location.reload();
    }                
}

