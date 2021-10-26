let regExEmail =
  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

window.addEventListener("load", () => {
  const emailVerify = async () => {
    try {
      const response = await fetch("/api/users/emails");
      const result = await response.json();
      return result.emails;
    } catch (error) {
      console.log(error);
    }
  };

  emailVerify();

  const form = document.getElementById("formLogin");

  const email = document.getElementById("email");

  const pass = document.getElementById("password");

  email.addEventListener("keyup", () => {
    if (email.value == "") {
      document.getElementById("errorEmail").innerText =
        "El email es obligatorio";
      email.classList.add("text-danger");
    } else if (!regExEmail.test(email.value)) {
      document.getElementById("errorEmail").innerText =
        "Debes ingresar un email vàlido";
      email.classList.add("text-danger");
    } else if (!email.value) {
      document.getElementById("errorEmail").innerText =
        "Èste email no està registrado";
      email.classList.add("text-danger");
    } else {
      document.getElementById("errorEmail").innerText = null;
      email.classList.remove("text-danger");
    }
  });

  pass.addEventListener("keyup", () => {
    if (pass.value == "") {
      document.getElementById("errorPassword").innerText =
        "La contraseña es obligatoria";
      pass.classList.add("text-danger");
    } else {
      document.getElementById("errorPassword").innerText = null;
      pass.classList.remove("text-danger");
    }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let elementosForm = form.elements;
    let error = false;

    for (let i = 0; i < elementosForm.length - 1; i++) {
      if (!elementosForm[i].value) {
        elementosForm[i].classList.add("text-danger");
        document.getElementById("errorEmpty").innerText =
          "Los campos señalados son obligatorios";
        error = true;
      }
    }
    if (!error) {
      function ActivarTiempo() {
        //se activa el método alert luego de 2 segundos
        setTimeout(
          function () {
            form.submit();
          },
          4000,
          Swal.fire({
            icon: "success",
            title: 'Inicio de sesion exitoso',
            width: 600,
            padding: '3em',
            showConfirmButton: false,
            background: '#ffff url(https://www.animationsoftware7.com/img/agifs/leaf_fall_1.gif)',
          })
        );
      }
      ActivarTiempo();
    }
  });
});
