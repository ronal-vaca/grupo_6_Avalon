window.onload = function () {

  let formulario = document.getElementById("formulario");

  let cantidad = document.getElementById("cantidad");

  let errCantidad = document.getElementById("errCantidad");


  function validacionDetalle() {
    let errores = [];
    if (cantidad.value <= 0 || cantidad.value == undefined) {
      errCantidad.innerHTML = "Para agregar un producto al carrito la cantidad debe ser uno o mas";
      errores.push("cantidad");
    }
    return errores
  }

  formulario.onsubmit = (e) => {
    e.preventDefault();
    let errores = validacionDetalle();
    if (!errores.length > 0) {
      formulario.submit();
    }
  };
};
