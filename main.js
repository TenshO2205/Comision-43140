let total = 0;
let cantidadProductos = 0;

function agregarProducto(){

    let nombre = prompt('Ingrese el nombre del producto');
    let precio = parseInt(prompt('Ingrese el precio del producto'));

    total += precio;
    cantidadProductos++;

    alert('Producto agregado al carrito');

}

function eliminarProducto(){

    if(cantidadProductos > 0){

        let confirmacion = confirm('Esto eliminara todos los productos del carrito, deseas continuar?');

        if(confirmacion == true){
            total = 0
            cantidadProductos = 0;
            alert('Se elimino los productos del carrito');
        }

    }

    else{
        alert('El carrito esta vacio, no hay nada por eliminar');
    }

}

function calcularTotal(){

    alert('El total de la compra es: $' + total.toFixed(2));

}

function mostrarCarrito(){

    if(cantidadProductos > 0){
        alert('Cantidad de productos en el carrito: ' + cantidadProductos);
    }

    else{
        alert('El carrito esta vacio');
    }

}

let ejecutarCarrito = true;

while(ejecutarCarrito){
    
    let opcion = prompt('Seleccione una opcion:\n1- Agregar producto al carrito\n2- Eliminar producto\n3- Calcular total\n4- Mostrar Carrito\n5- Salir');

    if(isNaN(opcion)){
        alert('Tiene que colocar los numeros 1, 2, 3, 4 o 5!')
    }

    else if(opcion === '1'){
        agregarProducto()
    }

    else if(opcion === '2'){
        eliminarProducto()
    }

    else if(opcion === '3'){
        calcularTotal()
    }

    else if(opcion === '4'){
        mostrarCarrito()
    }

    else if(opcion === '5'){
        ejecutarCarrito = false;
    }

    else{
        alert('Opcion invalida, seleccione una opcion valida.')
    }

}