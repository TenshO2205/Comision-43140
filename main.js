//Clase del Producto
class Producto {
  constructor(nombre,precio){
    this.nombre = nombre;
    this.precio = precio;
  }
};

//Clase del CarritoDeCompras

class CarritoDeCompras {
  constructor(){
    this.productos = []
  }

  //Funcion flecha que agregar producto al carrito.
  agregarProducto = () => {
    let nombre = prompt('Ingrese el nombre del producto')
    let precio = parseFloat(prompt('Ingrese el precio del producto'))

    //Instancia de la clase de Producto.
    let nuevoProducto = new Producto(nombre, precio)
    this.productos.push(nuevoProducto)

    alert(`Producto agregado al carrito: ${nombre}`)
  };

  //Funcion flecha que muestra los productos dentro del carrito de compras.
  mostrarCarrito = () => {
    if(this.productos.length === 0){
      alert('El carrito esta vacio.')
    } else {
      let mensaje = 'Productos en el carrito:\n'
      let total = 0

      this.productos.forEach((producto) =>{
        mensaje += producto.nombre + ' - Precio: $' + producto.precio.toFixed(2) + '\n'
        total += producto.precio
      })

      alert(mensaje)
    }
  };

  //Funcion flecha para poder buscar un producto en el carrito que se almacena dentro del array.
  buscarProducto = () => {
    let nombre = prompt('Ingrese el nombre del producto a buscar:')
    let encontrado = this.productos.some((producto) => producto.nombre === nombre)

    if(encontrado){
      alert(`El producto: ${nombre} se encuentra en el carrito.`)
    } else{
      alert(`El producto ${nombre} no se encuentra en el carrito.`)
    }
  };

  //Funcion que elimina un producto del carrito
  eliminarProducto = () => {
    let nombre = prompt('Ingrese el nombre del producto a eliminar')
    let indice = this.productos.findIndex((producto) => producto.nombre === nombre)

    if(indice !== -1){
      this.productos.splice(indice, 1)
      alert(`Producto eliminado del carrito: ${nombre}`)
    } else{
      alert(`El producto ${nombre} no se encuentra en el carrito.`)
    }
  };

//funcion que filtra los productos del carrito segun un criterio de busqueda
filtrarProductos = () =>{
  let filtro = prompt('Ingrese el filtro para buscar productos:')
  let productosFiltrados = this.productos.filter((producto) => producto.nombre.includes(filtro))
  
  if(productosFiltrados.length === 0){
    alert('No se encontraron productos que coincidan con el filtro.')
  } else{
    let mensaje = 'Productos encontrados:\n'
    let total = 0

    productosFiltrados.forEach((producto) =>{
      mensaje += producto.nombre + ' - Precio: $' + producto.precio.toFixed(2) + '\n'
      total += producto.precio
    })
    alert(mensaje)
  }
};

//Calcula el total de la compra.
calcularTotalCompra = () =>{
  let total = this.productos.reduce((acumulador,producto) => acumulador + producto.precio, 0)

  alert(`El total de la compra es: $${total.toFixed(2)}`)
};
};

//Instancia de CarritoDeCompras
const carrito = new CarritoDeCompras();

//Aca comienza la ejecucion del carrito de compras.
let ejecutarCarrito = true;
while(ejecutarCarrito){
  let opcion = prompt(`Seleccione una opcion:\n1) Agregar producto al carrito\n2) Mostrar carrito\n3) Buscar producto\n4) Eliminar Producto\n5) Filtrar productos\n6) Calcular total de la compra\n7) Salir`)
  
  //convierto el valor de la variable opcion en un número entero
  let opcionNumero = parseInt(opcion)

  switch(opcionNumero){
    case 1:
      carrito.agregarProducto()
      break;
    
    case 2:
      carrito.mostrarCarrito()
      break;

    case 3:
      carrito.buscarProducto()
      break;

    case 4:
      carrito.eliminarProducto()
      break;

    case 5:
      carrito.filtrarProductos()
      break;

    case 6:
      carrito.calcularTotalCompra()
      break;

    case 7:
      ejecutarCarrito = false
      break;

    default:
      alert('Opcion invalida. Seleccione una opcion valida.')
  }

};