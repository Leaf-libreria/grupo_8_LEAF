

    let contenidoArticulos = document.getElementById('contenedorDeProductos');
    let article = document.querySelector('article');
    let imagen = document.querySelector('#img-cart');
    let contInfo = document.querySelector('.contenido');
    let titulo = document.querySelector('#title');
    let btnEliminar = document.querySelector('.eliminar');
    let cantidad = document.getElementById('quantity');
    let subtotal = document.querySelector('.subtotal');
    let valorProvincia = document.getElementById('precioProvincia');
    let PrecioFinal = document.getElementById('precio-total');
    let finalizarCompra = document.getElementById('btn-next-buy');
    let cantidadTotalProductos = document.querySelector('.cantProductCart');
    let botonAgregar = document.querySelectorAll('.btn-cart');

   
       

   botonAgregar.forEach(boton => {
    boton.addEventListener('click', (item)=>{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Libro agregado al carrito correctamente',
            showConfirmButton: false,
            timer: 1500
          })
       })
   });
 
    
   
   
    
    
    // url base
    const urlBase = window.origin;

    // mostrar cantidad
    const mostrarCantidad = carrito => {
        var cantidad = 0;
        var precio = 0;
        var total = 0;
        carrito.forEach(item => {
            cantidad =  parseInt(cantidad) + parseInt(item.cantidad)
            precio =parseInt(precio) + parseInt(item.price) 
            total = parseInt(total) + parseInt(item.total)
        })
        cantidadTotalProductos.innerText = parseInt(cantidad)
      
        PrecioFinal.innerHTML = parseInt(total)
      
    
        if(cantidad == 0){
    
            contenidoArticulos.style.display = 'none';
            finalizarCompra.classList.add('disabled');
        }else{
           
            contenidoArticulos.style.display = "contenedorDeProductos";
         
            finalizarCompra.classList.remove('disabled');
        }
    }
    
    const mostrarProductos = carrito => {
        contenidoArticulos.innerHTML = ""
        carrito.forEach(item => {
            let product = `
            <article class="productos-agregados">
            <img src="/images/${item.imagen}" alt="">
            <div class="contenido">
              <h3>${item.nombre}</h3>
              <!-- cancelar -->
              <div class="eliminar">
              <p class="precio"> Precio: <i class="fas fa-dollar-sign"></i> ${item.precio}</p>
              </div>
              <div class="cantidad">
                <a class="text-danger h5" onClick="quitarItem(event,${item.id})"><i class="fas fa-minus-square"></i></a>
                <span id="cantidad${item.id}" class="h5">${item.cantidad}<span>
                <a class="text-success h5" onClick="agregarItem(event,${item.id})"><i class="fas fa-plus-square"></i></a>
                </div>
                <section class="subtotal">
                <div>   <p class="precio"> Subtotal: <i class="fas fa-dollar-sign"></i>
               ${item.total}</p>
                </div>
              </section>
             
                `;
            contenidoArticulos.innerHTML += product
         
        });
        return false
    }
    
   
    
    // mostrar
    const show = async () => {
        try {
            let response = await fetch(urlBase + '/api/carts/show')
            let result = await response.json();
            mostrarCantidad(result.data);
            mostrarProductos(result.data);
        } catch (error) {
            console.log(error);
        }
    }
  
    const agregarItem = async (e,id) => {
        e.preventDefault()
        try {
            let response = await fetch(urlBase + '/api/carts/add/' + id)
            let result = await response.json();
            mostrarCantidad(result.data);
            mostrarProductos(result.data);
    
        } catch (error) {
            console.log(error)
    
        }
        console.log('producto ' + id + ' agregado!!')
    }


    const quitarItem = async (e,id) => {
        e.preventDefault()
            try {
                let response = await fetch(urlBase + '/api/carts/remove/' + id)
                let result = await response.json();
                mostrarCantidad(result.data);
                mostrarProductos(result.data);
        
            } catch (error) {
                console.log(error)
        
            }
           
        }
    
    
    
    show()


