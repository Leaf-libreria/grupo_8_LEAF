let regexPassword =
  /^(?=.*\d)(?=.*?[#?!@$%^&*-])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

window.addEventListener("load", function () {
  //capturo el formulario
  const formRegister = $("register-form");

  //chequea si el email ya existe
  const verificarEmail = async () => {
    try {
      //hago la consulta
      const response = await fetch("/api/users/emails");
      //capturo el resultado y lo convierto en objeto
      const result = await response.json();
      return result.emails;
    } catch (error) {
      console.log(error);
    }
  };

  //campo email

  $("email").addEventListener("keyup", async () => {
    if (!regexEmail.test($("email").value)) {
      $("email").classList.add("text-danger");
      $("error-email").innerHTML = "Debes ingresar un email válido";
    } else {
      let emails = await verificarEmail();
      let results;

      emails.forEach((email) => {
        if ($("email").value === email) {
          results = true;
        } else {
          results = false;
        }
      });

      if (results) {
        $("email").classList.add("text-danger");
        $("error-email").innerHTML = "El email ingresado ya esta registrado";
      } else {
        $("email").classList.remove("text-danger");
       
        $("error-email").innerHTML = null;
      }
    }
  });

  //campo nombre
  $("name").addEventListener("keyup", () => {
    if (!$("name").value.trim()) {
      $("name").classList.add("text-danger");
      $("error-name").innerHTML = "El nombre es obligatorio";
    } else if ($("name").value.trim().length < 2) {
      $("name").classList.add("text-danger");
      $("error-name").innerHTML = "El nombre debe tener al menos 2 caracteres";
    } else {
      $("name").classList.remove("text-danger");
     
      $("error-name").innerHTML = null;
    }
  });

  //campo apellido
  $("lastname").addEventListener("keyup", () => {
    if (!$("lastname").value.trim()) {
      $("lastname").classList.add("text-danger");
      $("error-lastname").innerHTML = "El apellido es obligatorio";
    } else if ($("lastname").value.trim().length < 2) {
      $("lastname").classList.add("text-danger");
      $("error-lastname").innerHTML =
        "El apellido debe tener al menos 2 caracteres";
    } else {
      $("lastname").classList.remove("text-danger");
   
      $("error-lastname").innerHTML = null;
    }
  });

  //campo de imagen
  $("formFile").addEventListener("change", () => {
    let fileRoute = $("formFile").value;

    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

    if ($("formFile").value) {
      if (!allowedExtensions.exec(fileRoute)) {
        $("formFile").classList.add("text-danger");
        $("error-image").innerHTML =
          "Las extensiones de archivo permitidas son .jpg/.jpeg/.png/.gif";
        return true;
      }

      $("formFile").classList.remove("text-danger");
  
      $("error-image").innerHTML = null;
    }
    $("formFile").classList.remove("text-danger");

    $("error-image").innerHTML = null;
  });

  //campo contraseña
  $("password").addEventListener("keyup", () => {
    if (!$("password").value) {
      $("requisitos-password").innerHTML =
        "La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula, una minúscula y un carácter especial (#?!@$%^&*-)";
    } else if (!regexPassword.test($("password").value)) {
      $("requisitos-password").innerHTML = null;
      $("password").classList.add("text-danger");
      $("error-password").innerHTML =
        "La contraseña ingresada no cumple con los requisitos";
    } else {
      $("password").classList.remove("text-danger");
   
      $("error-password").innerHTML = null;
    }
  });

  //campo confirmar contraseña
  $("confirmarContrasenia").addEventListener("keyup", () => {
    if ($("password").value.trim() !== $("confirmarContrasenia").value.trim()) {
      $("confirmarContrasenia").classList.add("text-danger");
      $("error-confirmarContrasenia").innerHTML =
        "Las contraseñas no coinciden";
    } else {
      $("confirmarContrasenia").classList.remove("text-danger");
      $("error-confirmarContrasenia").innerHTML = null;
    }
  });

  //campo de politicas
  $("politicas").addEventListener("click", () => {
    $("politicas").classList.remove("text-danger");
    $("error-politicas").innerHTML = null;
  });

  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    var error = false;

    //campo de politicas
    if (!$("politicas").checked) {
      $("politicas").classList.add("text-danger");
      $("error-politicas").innerHTML =
        "Debes aceptar las politicas de privacidad";
      error = true;
    }
    // input name
    if ($("name").value.trim() == "") {
      $("name").classList.add("text-danger");
      $("error-name").innerHTML = "El nombre es obligatorio";
      error = true;
    }
    // input lastname
    if ($("lastname").value.trim() == "") {
      $("lastname").classList.add("text-danger");
      $("error-lastname").innerHTML = "Debes ingresar un apellido";
      error = true;
    }

    // input email
    if ($("email").value.trim() == "") {
      $("email").classList.add("text-danger");
      $("error-email").innerHTML = "Debes ingresar un email";
      error = true;
    }
    // input password
    if ($("password").value.trim() == "") {
      $("password").classList.add("text-danger");
      $("error-password").innerHTML = "Debes ingresar una contraseña";

      error = true;
    }

    // input confirm password
    if (!$("confirmarContrasenia").value) {
      $("confirmarContrasenia").classList.add("text-danger");
      $("error-confirmarContrasenia").innerHTML =
        "Debes ingresar una contraseña";

      error = true;
    }
    if (!error) {
      formRegister.submit();
    }
  });
});
