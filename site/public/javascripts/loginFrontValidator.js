let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;


window.addEventListener('load', () => {

    let listEmails;
    const emailVerify = async () => {
        try {

            const response = await fetch("/api/users/emails");
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    emailVerify().then(array => {
        listEmails = array
    })

    const form = document.getElementById('formLogin');

    const email = document.getElementById('email');

    const pass = document.getElementById('password');

    email.addEventListener('keyup', (e) => {

        if (email.value == '') {
            document.getElementById('errorEmail').innerHTML = "El email es obligatorio"
            email.classList.add('text-danger small')

        } else if (!regExEmail.test(email.value)) {
            document.getElementById('errorEmail').innerHTML = "Debes ingresar un email vàlido"
            email.classList.add('text-danger small')

        } else if (!listEmails.includes(email.value)) {
            document.getElementById('errorEmail').innerHTML = "Èste email no està registrado"
            email.classList.add('text-danger small')
        } else {
            document.getElementById('errorEmail').innerHTML = null;
            email.classList.remove('text-danger small')
        }
    })

    pass.addEventListener('keyup', (e) => {

        if (pass.value == '') {
            document.getElementById('errorPassword').innerHTML = 'La contraseña es obligatoria'
            pass.classList.add('text-danger small')
        } else {
            document.getElementById('errorPassword').innerHTML = null
            pass.classList.remove('text-danger small')
        }
    })
form.addEventListener('submit', e => {
    e.preventDefault();

    let elementosForm = form.elements;
    let error = false;

    for (let i = 0; i < elementosForm.length - 1; i++) {
        
        if(!elementosForm[i].value){
            elementosForm[i].classList.add('text-danger small')
            document.getElementById('errorEmpty').innerHTML = 'Los campos señalados son obligatorios';
            error = true
        }
    }
    if(!error){
        form.submit()
    }
})
    })
