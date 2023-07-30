const diseñoCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";

    //Este tramo lo que hace es crear el header del carrito de compras
    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-titulo">Carrito</h1>
    `;
    modalContainer.append(modalHeader);

    const modalBtn = document.createElement("i")
    modalBtn.className = "fa-solid fa-xmark close"

    modalBtn.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })
    modalHeader.append(modalBtn);

    //Este tramo lo que hace es crear el main del carrito.
    carrito.forEach((product)=>{
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>$ ${product.precio}</p>
        <i class="fa-solid fa-minus restar"></i>
        <p>Cantidad: ${product.cantidad}</p>
        <i class="fa-solid fa-plus sumar"></i>
        <p>Total: $ ${product.cantidad * product.precio}</p>
        <i class="fa-solid fa-trash eliminar-producto"></i>
        `
        modalContainer.append(carritoContent);

        //Este tramo lo que hago es sumar y restar los valores de la cantidades.
        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener("click", () =>{
            if(product.cantidad !== 1){
                product.cantidad--;
            }
            saveLocal();
            diseñoCarrito();
        })

        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () =>{
            product.cantidad++;
            saveLocal();
            diseñoCarrito()
        })

        /*Este código está configurando un evento de clic en un elemento con la clase eliminar-producto dentro de un contenedor con el ID carritoContent*/
        let eliminar = carritoContent.querySelector(".eliminar-producto")
        eliminar.addEventListener("click", () =>{
            eliminarProducto(product.id)
        })
    });

    //Este codigo lo que hace es sumar el total de la compra y crea el footer del carrito.
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalFinal = document.createElement("div")
    totalFinal.className = "total-content"
    totalFinal.innerHTML = `<h3>Total a pagar: $ ${total}</h3>`
    modalContainer.append(totalFinal)
}

carritoCompra.addEventListener("click",diseñoCarrito)

// Este codigo lo que hace es eliminar el producto que esta en el carrito de compras
const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id)

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId; 
    })
    contadorCarrito();
    saveLocal();
    diseñoCarrito();
};

/*Este tramo de codigo lo que hace es que aparezca el globo del carrito con la cantidad de productos y que la cantidad se almacene el localstorage*/
const contadorCarrito = () => {
    cantidadCarrito.style.display = "block"

    const carritoLength = carrito.length
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}
contadorCarrito();