const $ = id => document.getElementById(id);
let regexEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regexPassword = /^(?=.*\d)(?=.*?[#?!@$%^&*-])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;



window.addEventListener("load", function () {
    //capturo el formulario
    const formRegister = $('register-form');

    //chequea si el email ya existe
    const verificarEmail = async () => {
        try {
            //hago la consulta
            const response = await fetch('/api/users/emails');
            //capturo el resultado y lo convierto en objeto
            const result = await response.json()
            return result.emails;

        } catch (error) {
            console.log(error);
        }

    }

    //campo email

    $('email').addEventListener('blur', async() => {
        if (!regexEmail.test($('email').value)) {
            $('email').classList.add('is-invalid');
            $('error-email').innerHTML = "Debes ingresar un email valido";
        } else {

            let emails = await verificarEmail();
            let results;
          
            emails.forEach(email=> {
                if ($('email').value === email) {
                    results = true
                } else {
                    results = false
                }
            });


            if (results) {
                $('email').classList.add('is-invalid');
                $('error-email').innerHTML = "El email ingresado ya esta registrado";
            } else {
                $('email').classList.remove('is-invalid');
                $('email').classList.add('is-valid');
                $('error-email').innerHTML = null;
            }
        }
    })

    //campo nombre
    $('name').addEventListener('blur', () => {
        if (!$('name').value.trim()) {
            $('name').classList.add('is-invalid')
            $('error-name').innerHTML = "El nombre es obligatorio"

        } else if ($('name').value.trim().length < 2) {
            $('name').classList.add('is-invalid')
            $('error-name').innerHTML = "El nombre debe tener al menos 2 caracteres"
        }
        else {
            $('name').classList.remove('is-invalid')
            $('name').classList.add('is-valid')
            $('error-name').innerHTML = null;
        }
    })

    //campo apellido
    $('lastname').addEventListener('blur', () => {
        if (!$('lastname').value.trim()) {
            $('lastname').classList.add('is-invalid')
            $('error-lastname').innerHTML = "El apellido es obligatorio"

        } else if ($('lastname').value.trim().length < 2) {
            $('lastname').classList.add('is-invalid')
            $('error-lastname').innerHTML = "El apellido debe tener al menos 2 caracteres"
        }
        else {
            $('lastname').classList.remove('is-invalid')
            $('lastname').classList.add('is-valid')
            $('error-lastname').innerHTML = null;
        }
    })

    //campo de imagen
    $('formFile').addEventListener('change', () => {
        let fileRoute =  $('formFile').value
       
        var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;       
         
        if ($('formFile').value) {
    
    
          if (!allowedExtensions.exec(fileRoute)) {
            $('formFile').classList.add('is-invalid')
            $('error-image').innerHTML = 'Las extensiones de archivo permitidas son .jpg/.jpeg/.png/.gif'
            return true
          }

         
          $('formFile').classList.remove('is-invalid')
          $('formFile').classList.add('is-valid')
          $('error-image').innerHTML = null;

        }
        $('formFile').classList.remove('is-invalid')
            $('formFile').classList.add('is-valid')
            $('error-image').innerHTML = null;
      })
  
      
   

    //campo contraseña
    $('password').addEventListener('blur', () => {
        if (!$('password').value) {
            $('requisitos-password').innerHTML = "La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula, una minúscula y un carácter especial (#?!@$%^&*-)"
        }
        else if (!regexPassword.test($('password').value)) {
            $('requisitos-password').innerHTML = null;
            $('password').classList.add('is-invalid')
            $('error-password').innerHTML = "La contraseña ingresada no cumple con los requisitos"
        } else {
            $('password').classList.remove('is-invalid')
            $('password').classList.add('is-valid')
            $('error-password').innerHTML = null;
        }
    })

    //campo confirmar contraseña
    $('confirmarContrasenia').addEventListener('blur', () => {
        if ($('password').value.trim() !== $('confirmarContrasenia').value.trim()) {
            $('confirmarContrasenia').classList.add('is-invalid')
            $('error-confirmarContrasenia').innerHTML = "Las contraseñas no coinciden"
        } else {
            $('confirmarContrasenia').classList.remove('is-invalid')
            $('confirmarContrasenia').classList.add('is-valid')
            $('error-confirmarContrasenia').innerHTML = null;
        }
    })

    //campo de politicas
    $('politicas').addEventListener('click', () => {

        $('politicas').classList.toggle('is-valid');
        $('politicas').classList.remove('is-invalid');
        $('error-politicas').innerHTML = null;
    })


    formRegister.addEventListener('submit', e => {
        e.preventDefault();

        let elementosForm = formRegister.elements;
        let error = false;

        for (let i = 0; i < elementosForm.length - 1; i++) {
            if (elementosForm[i].value) {
                elementosForm[i].classList.add('is-invalid')
                $('error-general').innerHTML = 'Los campos señalados son obligatorios';
                error = true;
            }

        }
        //campo de politicas
        if (!$('politicas').checked) {
            $('politicas').classList.add('is-invalid')
            $('error-politicas').innerHTML = "Debes aceptar las politicas de privacidad";
            error = true;
        }
        if (!error) {
            formRegister.submit()
        }
    })
})