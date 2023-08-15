// Aca almaceno los ID en variables.
const shopContainer = document.getElementById("shop-container");
const carritoCompra = document.getElementById("carrito-compra");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const filterButtons = document.querySelectorAll("#filters button");
const containerTittle = document.getElementById("containerTittle")
const searchInput = document.getElementById("searchInput");
let currentSearch = ""; // Variable para almacenar el término de búsqueda actual

// Array que almacena los productos en el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Variable para almacenar la categoria actual seleccionada
let currentCategory = "all";

// Función asincronica para obtener y mostrar productos
const getProducts = async () =>{

  const response = await fetch("data.json")
  const data = await response.json()

// Limpia el contenido del contenedor de productos
  shopContainer.innerHTML = "";

// Titulo principal que cambia depende en que categoria estemos
  const title = currentCategory === "all" ? "Todos los Productos" : `${currentCategory}`;
  const titleMain = document.createElement("h2")
  titleMain.className = "titulo"
  titleMain.innerText = `${title}`
  containerTittle.innerHTML = "";
  containerTittle.append(titleMain)

// Itera a traves de cada producto en los datos
  data.forEach((product) => {

  // Filtra los productos segun la categoría y el término de búsqueda
  if ((currentCategory === "all" || product.category === currentCategory) &&
  (currentSearch === "" || product.nombre.toLowerCase().includes(currentSearch))) {

    // Aca en este tramo lo que hago es crear la card y colocarlo en el main
    let content = document.createElement('div')
    content.className = 'card'
    content.innerHTML = `
    <img src="${product.img}" alt=${product.nombre}">
    <div class="container-info">
    <h3 class="titulo">${product.nombre}</h3>
    <p>$${product.precio}</p>
    </div>
    `;
    shopContainer.append(content);
  
    let comprar = document.createElement("button");
    comprar.innerText = "Agregar al carrito";
    comprar.className = "btn-carrito";
  
    content.append(comprar);

  // Evento al boton para agregar productos al carrito
    comprar.addEventListener("click", () => {

      // Verifica si el producto ya esta en el carrito
      const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

      // Si el producto ya esta en el carrito, incrementa su cantidad
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          img: product.img,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
        });
        Toastify({
          text: "Producto Agregado",
          duration: 1500,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #b494bc, #cacaca)",
            color: "#000000"
          },
          onClick: function(){}
        }).showToast();
        // Actualiza el contador del carrito y guarda en el almacenamiento local
        contadorCarrito();
        saveLocal();
      }
    });
    }
  });
}

// Evento a los botones de filtrado de categoria
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Actualiza la categoria actual y obtiene los productos actualizados
    currentCategory = button.getAttribute("data-category");
    getProducts();
  });
});

// Evento de entrada al campo de busqueda
searchInput.addEventListener("input", () => {
  // Actualiza el termino de busqueda actual y obtiene los productos actualizados
  currentSearch = searchInput.value.toLowerCase().trim();
  getProducts();
});

getProducts();

// Funcion para guardar el carrito en el almacenamiento local
const saveLocal = () =>{
  localStorage.setItem("carrito", JSON.stringify(carrito))
};