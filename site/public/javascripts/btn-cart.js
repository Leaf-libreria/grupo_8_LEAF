


    let contenedores = document.querySelectorAll('.btn-cart-art')
        
   

    contenedores.forEach(contenedor => {
        contenedor.onmouseover= function(){
         
            let cart = document.querySelector('.btn-cart');
                cart.classList.remove('btn-cart-none')
           
        };
       
    });

    
    // contenedores.forEach(contenedor => {
    //     contenedor.onmouseout= function(){
         
    //         carts.forEach(cart => {
    //             cart.classList.add('btn-cart-none')
    //         });
    //     };
       
    // })

