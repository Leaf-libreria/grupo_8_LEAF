window.addEventListener('load', () => {
    const formAddBook = document.getElementById("mod-product-form");

    let titleAddBook = document.getElementById('title');
    let isbnAddBook = document.getElementById('isbn');
    let stockAddBook = document.getElementById('stock');
    let formatAddBook = document.getElementById('format');
    let categoryAddBook = document.getElementById('category');
    let authorAddBook = document.getElementById('author');
    let editorialAddBook = document.getElementById('editorial');
    let starsAddBook = document.getElementById('stars');
    let genreAddBook = document.getElementById('genre');
    let priceAddBook = document.getElementById('price');
    let pagesAddBook = document.getElementById('pages');
    let sloganAddBook = document.getElementById('slogan');
    let coverAddBook = document.getElementById('cover');
    let synopsisAddBook = document.getElementById('synopsis');
    let titleError=document.getElementById('titleError');
    let coverError=document.getElementById('coverError');
    let sloganError =  document.getElementById('sloganError');

    titleAddBook.addEventListener('keyup', () => {
        if (titleAddBook.value == '') {
            titleError.innerText = "Campo obligatorio"
        } else if (titleAddBook.value.trim().length < 2) {
            titleError.innerText = "Debes ingresar minimo 2 caracteres"
        }else {
            titleError.innerText = null
        }
    })
    isbnAddBook.addEventListener('keyup', () => {
        if (isbnAddBook.value == '') {
            document.getElementById('isbnError').innerText = "Campo obligatorio"
        } else if (isbnAddBook.value.length < 13) {
            document.getElementById('isbnError').innerText = "El isbn debe tener 13 numeros"
        } else {
            document.getElementById('isbnError').innerText = null
        }
    })
    stockAddBook.addEventListener('keyup', () => {
        if (stockAddBook.value == '') {
            document.getElementById('stockError').innerText = "Campo obligatorio, sólo números"
        } else {
            document.getElementById('stockError').innerText = null
        }
    })
    formatAddBook.addEventListener('focus', () => {
        if (formatAddBook.value == '') {
            document.getElementById('formatError').innerText = "Campo obligatorio"
        }
    })
    formatAddBook.addEventListener('change',()=>{
            if (formatAddBook.value !== ''){
                document.getElementById('formatError').innerText = null
            }
        })
    categoryAddBook.addEventListener('focus', () => {
        if (categoryAddBook.value == '') {
            document.getElementById('categoryError').innerText = "Campo obligatorio"
        } 
    })
    categoryAddBook.addEventListener('change',()=>{
            if (categoryAddBook.value !== ''){
                document.getElementById('categoryError').innerText = null
            }
        })
    authorAddBook.addEventListener('focus', () => {
        if (authorAddBook.value == '') {
            document.getElementById('authorError').innerText = "Campo obligatorio"
        } 
    })
    authorAddBook.addEventListener('change',()=>{
            if (authorAddBook.value !== ''){
                document.getElementById('authorError').innerText = null
            }
        })
    editorialAddBook.addEventListener('focus', () => {
        if (editorialAddBook.value == '') {
            document.getElementById('editorialError').innerText = "Campo obligatorio"
        } 
    })
    editorialAddBook.addEventListener('change',()=>{
            if (editorialAddBook.value !== ''){
                document.getElementById('editorialError').innerText = null
            }
        })
    starsAddBook.addEventListener('focus', () => {
        if (starsAddBook.value == '') {
            document.getElementById('starError').innerText = "Campo obligatorio, sólo números"
        } 
    })
    starsAddBook.addEventListener('change',()=>{
            if (starsAddBook.value !== ''){
                document.getElementById('starError').innerText = null
            }
        })
    genreAddBook.addEventListener('focus', () => {
        if (genreAddBook.value == '') {
            document.getElementById('genreError').innerText = "Campo obligatorio"
        } 
    })
    genreAddBook.addEventListener('change',()=>{
            if (genreAddBook.value !== ''){
                document.getElementById('genreError').innerText = null
            }
        })
    priceAddBook.addEventListener('keyup', () => {
        if (priceAddBook.value == '') {
            document.getElementById('priceError').innerText = "Campo obligatorio, sólo números"
        } else {
            document.getElementById('priceError').innerText = null
        }
    })
    pagesAddBook.addEventListener('keyup', () => {
        if (pagesAddBook.value == '') {
            document.getElementById('pagesError').innerText = "Campo obligatorio, sólo números"
        } else {
            document.getElementById('pagesError').innerText = null
        }
    })
    sloganAddBook.addEventListener('keyup', () => {
        if (sloganAddBook.value == '') {
            sloganError.innerText = "Campo obligatorio"
        } else if(sloganAddBook.value.trim().length < 5) {
            sloganError.innerText = "Debes ingresar minimo 5 caracteres"
        }else {
            sloganError.innerText = null
        }
      
    })
    //campo de imagen
    coverAddBook.addEventListener('change', () => {
        let fileRoute = coverAddBook.value

        var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

       

            if (!allowedExtensions.exec(fileRoute)) {
                coverError.innerText = 'Las extensiones de archivo permitidas son .jpg/.jpeg/.png/.gif'
                return true
            }
        
})


synopsisAddBook.addEventListener('keyup', () => {
        if (synopsisAddBook.value == '') {
            document.getElementById('synopsisError').innerText = "Campo obligatorio"
        } else if (synopsisAddBook.value.trim().length < 20) {
            document.getElementById('synopsisError').innerText = "Debes ingresar minimo 20 caracteres"
        } else {
            document.getElementById('synopsisError').innerText = null
        }
    })
   

   


      
    

})