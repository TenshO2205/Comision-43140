//Aca almaceno los ID en variables.
const shopContainer = document.getElementById("shop-container");
const carritoCompra = document.getElementById("carrito-compra");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Aca lo que hago es crear las cards para poner los productos
productos.forEach((product) =>{
  let content = document.createElement('div')
  content.className = 'card'
  content.innerHTML = `
  <img src="${product.img}">
  <h3 class="titulo">${product.nombre}</h3>
  <p class="precio">$ ${product.precio}</p>
  `

  shopContainer.append(content);

  let comprar = document.createElement("button")
  comprar.innerText = "Agregar al carrito"
  comprar.className = "AgregarAlCarrito";

  content.append(comprar);

  //Este tramo de codigo esta manejando el evento de clic en el botón de comprar
  comprar.addEventListener("click",() =>{
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
    if(repeat){
      carrito.map((prod) =>{
        if(prod.id === product.id){
          prod.cantidad++;
        }
      })
    } else{
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      });
    };
    contadorCarrito()
    saveLocal()
  })
})

//Creo una variable para el localStorage.
const saveLocal = () =>{
  localStorage.setItem("carrito", JSON.stringify(carrito))
}