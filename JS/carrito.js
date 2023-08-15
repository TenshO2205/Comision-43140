// Funcion para diseñar y mostrar el carrito de compras
const diseñoCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";

    // Este tramo lo que hace es crear el header del carrito de compras
    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-titulo">Carrito</h1>
    `;
    modalContainer.append(modalHeader);
    // Este tramo crea el boton del cierre del carrito
    const modalBtn = document.createElement("i")
    modalBtn.className = "fa-solid fa-xmark close"

    modalBtn.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })
    modalHeader.append(modalBtn);

    // Este tramo lo que hace es crear el main del carrito.
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

        // Este tramo lo que hago es sumar y restar los valores de la cantidades.
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

        // Evento que se usa para eliminar productos del carrito
        let eliminar = carritoContent.querySelector(".eliminar-producto")
        eliminar.addEventListener("click", () =>{
            eliminarProducto(product.id)
        })
    });

    // Este tramo lo que hace es sumar el total de la compra y crea el footer del carrito.
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalFinal = document.createElement("div")
    totalFinal.className = "total-content"
    totalFinal.innerHTML = `
    <h3>Total a pagar: $ ${total}</h3>
    <button class="btn-total">Comprar</button>
    `;
    modalContainer.append(totalFinal)

    // Evento de compra al boton de compra
    const comprarBtn = totalFinal.querySelector(".btn-total");
    comprarBtn.addEventListener("click", () =>{
        if(carrito.length === 0){
            comprarBtn.addEventListener("click", () =>{
                Swal.fire({
                    icon: 'error',
                    title: 'No tienes productos en el carrito!',
                })
            })
        } else{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Compra realizada, muchas gracias!',
                showConfirmButton: false,
                timer: 1500
            })
            vaciarCarrito();
        }
    });
}


// Funcion para vaciar el carrito
const vaciarCarrito = () => {
    carrito = []; // Vacia el carrito
    saveLocal(); // Guarda cambios en localStorage
    diseñoCarrito(); // Actualiza la visualización del carrito
    contadorCarrito(); // Actualiza el contador del carrito
};

// Muestra el carrito al hacer clic en el carrito del header
carritoCompra.addEventListener("click",diseñoCarrito)

// Este tramo lo que hace es eliminar el producto que esta en el carrito de compras
const eliminarProducto = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esto eliminará el producto del carrito',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#008000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        backdrop: 'rgba(180,148,188,0.8)'
    }).then((result) => {
        if (result.isConfirmed) {
            const foundIndex = carrito.findIndex((element) => element.id === id);
            Swal.fire(
                'Borrado',
                'Producto eliminado del carrito!',
                'success',
            )

            if (foundIndex !== -1) {
                carrito.splice(foundIndex, 1);
                contadorCarrito();
                saveLocal();
                diseñoCarrito();
            }
        }
    });
};

// Funcion para actulizar el contador del carrito
const contadorCarrito = () => {
    cantidadCarrito.style.display = "block"

    const carritoLength = carrito.length
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}
contadorCarrito();