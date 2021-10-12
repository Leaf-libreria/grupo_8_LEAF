window.addEventListener('load', () => {
    const formAddBook = document.getElementById('add-product-form');

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


    titleAddBook.addEventListener('keyup', () => {
        if (titleAddBook.value == '') {
            document.getElementById('titleError').innerText = "Campo obligatorio"
        } else {
            document.getElementById('titleError').innerText = null
        }
        if (titleAddBook.value.trim().length < 2) {
            document.getElementById('titleError').innerText = "Debes ingresar minimo 2 caracteres"
        }
    })
    isbnAddBook.addEventListener('keyup', () => {
        if (isbnAddBook.value == '') {
            document.getElementById('isbnError').innerText = "Campo obligatorio"
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
        } else {
            document.getElementById('formatError').innerText = null
        }
    })
    categoryAddBook.addEventListener('focus', () => {
        if (categoryAddBook.value == '') {
            document.getElementById('categoryError').innerText = "Campo obligatorio"
        } else {
            document.getElementById('categoryError').innerText = null
        }
    })
    authorAddBook.addEventListener('focus', () => {
        if (authorAddBook.value == '') {
            document.getElementById('authorError').innerText = "Campo obligatorio"
        } else {
            document.getElementById('authorError').innerText = null
        }
    })
    editorialAddBook.addEventListener('focus', () => {
        if (editorialAddBook.value == '') {
            document.getElementById('editorialError').innerText = "Campo obligatorio"
        } else {
            document.getElementById('editorialError').innerText = null
        }
    })
    starsAddBook.addEventListener('focus', () => {
        if (starsAddBook.value == '') {
            document.getElementById('starError').innerText = "Campo obligatorio, sólo números"
        } else {
            document.getElementById('starError').innerText = null
        }
    })
    genreAddBook.addEventListener('focus', () => {
        if (genreAddBook.value == '') {
            document.getElementById('genreError').innerText = "Campo obligatorio"
        } else {
            document.getElementById('genreError').innerText = null
        }
    })
    priceAddBook.addEventListener('focus', () => {
        if (priceAddBook.value == '') {
            document.getElementById('priceError').innerText = "Campo obligatorio, sólo números"
        } else {
            document.getElementById('priceError').innerText = null
        }
    })
    pagesAddBook.addEventListener('focus', () => {
        if (pagesAddBook.value == '') {
            document.getElementById('pagesError').innerText = "Campo obligatorio, sólo números"
        } else {
            document.getElementById('pagesError').innerText = null
        }
    })
    sloganAddBook.addEventListener('keyup', () => {
        if (sloganAddBook.value == '') {
            document.getElementById('sloganError').innerText = "Campo obligatorio"
        } else {
            document.getElementById('sloganError').innerText = null
        }
        if (sloganAddBook.value.trim().length < 5) {
            document.getElementById('sloganError').innerText = "Debes ingresar minimo 5 caracteres"
        }
    })
    //campo de imagen
    coverAddBook.addEventListener('change', () => {
        let fileRoute = coverAddBook.value

        var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

        if (coverAddBook.value) {

            if (!allowedExtensions.exec(fileRoute)) {
                document.getElementById('coverError').innerText = 'Las extensiones de archivo permitidas son .jpg/.jpeg/.png/.gif'
                return true
            }
        }
    if(!coverAddBook.value){
        document.getElementById('coverError').innerText = 'Campo obligatorio'
    }
})
synopsisAddBook.addEventListener('keyup', () => {
        if (synopsisAddBook.value == '') {
            document.getElementById('synopsisError').innerText = "Campo obligatorio"
        } else {
            document.getElementById('synopsisError').innerText = null
        }
        if (synopsisAddBook.value.trim().length < 20) {
            document.getElementById('synopsisError').innerText = "Debes ingresar minimo 20 caracteres"
        } else {
            document.getElementById('synopsisError').innerText = null
        }
    })
    formAddBook.addEventListener('submit', e => {
    e.preventDefault();

    let elementosForm = formAddBook.elements;
    let error = false;

    for (let i = 0; i < elementosForm.length - 1; i++) {
        
        if(!elementosForm[i].value){
            elementosForm[i].classList.add('text-danger')
            document.getElementById('addErrores').innerText = 'Todos los campos señalados son obligatorios';
            error = true
        }
    }
    if(!error){
        formAddBook.submit()
    }
})
})