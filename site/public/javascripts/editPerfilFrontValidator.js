const $ = id => document.getElementById(id);


window.addEventListener("load",()=>{

    //campo nickname
    $('nickname').addEventListener('keyup', () => {
        if ($('nickname').value.trim().length < 2) {
            $('nickname').classList.add('is-invalid')
            $('error-nickname').innerHTML = "El nickname debe tener al menos 2 caracteres"
        }
        else {
            $('nickname').classList.remove('is-invalid')
            $('nickname').classList.add('is-valid')
            $('error-nickname').innerHTML = null;
        }
    })
    //campo nombre
    $('nombre').addEventListener('keyup', () => {
        if (!$('nombre').value.trim()) {
            $('nombre').classList.add('is-invalid')
            $('error-nombre').innerHTML = "El nombre es obligatorio"

        } else{
            $('nombre').classList.remove('is-invalid')
            $('nombre').classList.add('is-valid')
            $('error-nombre').innerHTML = null;
        }
        if ($('nombre').value.trim().length < 2) {
            $('nombre').classList.add('is-invalid')
            $('error-nombre').innerHTML = "El nombre debe tener al menos 2 caracteres"
        }
        else {
            $('nombre').classList.remove('is-invalid')
            $('nombre').classList.add('is-valid')
            $('error-nombre').innerHTML = null;
        }
    })

    //campo apellido
    $('apellido').addEventListener('keyup', () => {
        if (!$('apellido').value.trim()) {
            $('apellido').classList.add('is-invalid')
            $('error-apellido').innerHTML = "El apellido es obligatorio"

        } else {

            $('apellido').classList.remove('is-invalid')
            $('apellido').classList.add('is-valid')
            $('error-apellido').innerHTML = null;
        }
        
        if ($('apellido').value.trim().length < 2) {
            $('apellido').classList.add('is-invalid')
            $('error-apellido').innerHTML = "El apellido debe tener al menos 2 caracteres"
        }
        else {
            $('apellido').classList.remove('is-invalid')
            $('apellido').classList.add('is-valid')
            $('error-apellido').innerHTML = null;
        }
    })

    //campo de imagen
    $('imagenPerfil').addEventListener('change', () => {
        let fileRoute = $('imagenPerfil').value

        var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

        if ($('imagenPerfil').value) {


            if (!allowedExtensions.exec(fileRoute)) {
                $('imagenPerfil').classList.add('is-invalid')
                $('error-image').innerHTML = 'Las extensiones de archivo permitidas son .jpg/.jpeg/.png/.gif'
                return true
            }


            $('imagenPerfil').classList.remove('is-invalid')
            $('imagenPerfil').classList.add('is-valid')
            $('error-image').innerHTML = null;

        }
        $('imagenPerfil').classList.remove('is-invalid')
        $('imagenPerfil').classList.add('is-valid')
        $('error-image').innerHTML = null;
    })



    form.addEventListener('submit', e => {
        for (let i = 0; i < elementosForm.length - 1; i++) {

            if (!elementosForm[i].value) {
                elementosForm[i].classList.add('text-danger')
                $('errorEmpty').innerText = 'Los campos señalados son obligatorios';
                error = true
            }
        }
        if (!error) {
            form.submit()
        }
    })
})