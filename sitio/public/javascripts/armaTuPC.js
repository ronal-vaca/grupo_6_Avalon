let elDiv = document.getElementById('productos')
function peticion(socket,categoriaId){ /* la categoria id es si es procesador, mother, ram en el parametro viene como un numero */
    fetch('http://localhost:3001/productos/api/Productos')
    .then(data=>{ return data.json()})
    .then(response=>{
        elDiv.innerHTML = " " /* elimino para evitar que se acumulen los productos */
        response.forEach(producto => {
            if (producto.socket == socket && producto.CategoriaId == categoriaId) {
                document.getElementById('productos').innerHTML +=
                `
                <div class="col-md-6 col-lg-3">
                    <div class="tarjetaDeProducto efectoBox" style="height:345px;">
                        <figure class="d-flex justify-content-center d-flex align-items-center">
                            <img src="/images/imagenProducto/${producto.imagen}" class="img-fluid" alt="...">
                        </figure>
                        <div class="card-body" style="padding: 5px 5px;">
                            <h1>${producto.nombre}</h1>
                            <p style="color:green; font-size:17px;">$ ${(producto.precio - producto.precio * producto.descuento / 100).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>   
                            <form action="/productos/carrito/${producto.id}/agregarAPC" method="POST">
                                <button class="btn btn-primary" onclick="desmarcar()">+</button>
                            </form>
                        </div>
                    </div>
                </div>
                `
            }
        })
    })
    .catch(err=>{
        console.log(err)
    })
}
/* ESTO ES PARA PRODUCTOS SIN SOCKET */
function peticion1(categoriaId){ /* la categoria id es si es procesador, mother, ram en el parametro viene como un numero */
    fetch('http://localhost:3001/productos/api/Productos')
    .then(data=>{ return data.json()})
    .then(response=>{
        elDiv.innerHTML = " " /* elimino para evitar que se acumulen los productos */
        response.forEach(producto => {
            if (producto.CategoriaId == categoriaId) {
                document.getElementById('productos').innerHTML +=
                `
                <div class="col-md-6 col-lg-3">
                    <div class="tarjetaDeProducto efectoBox" style="height:345px;">
                        <figure class="d-flex justify-content-center d-flex align-items-center">
                            <img src="/images/imagenProducto/${producto.imagen}" class="img-fluid" alt="...">
                        </figure>
                        <div class="card-body" style="padding: 5px 5px;">
                            <h1>${producto.nombre}</h1>
                            <p style="color:green; font-size:17px;">$ ${(producto.precio - producto.precio * producto.descuento / 100).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>   
                            <form action="/productos/carrito/${producto.id}/agregarAPC" method="POST">
                                <button class="btn btn-primary" onclick="desmarcar()">+</button>
                            </form>
                        </div>
                    </div>
                </div>
                `
            }
        })
    })
    .catch(err=>{
        console.log(err)
    })
}
function desmarcar(){
    setTimeout(function(){
    window.location.reload()
    }, 1000)
}
