let regexPassword =
  /^(?=.*\d)(?=.*?[#?!@ $%^&*-])(?=.*[A-Z])(?=.*[a-z])\S{8,16} $/;

window.addEventListener("load", function () {
  //capturo el formulario
  const formRegister = document.getElementById("register-form");

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

   document.getElementById("email").addEventListener("keyup", async () => {
    if (!regexEmail.test( document.getElementById("email").value)) {
       document.getElementById("email").classList.add("text-danger");
       document.getElementById("error-email").innerHTML = "Debes ingresar un email válido";
    } else {
      let emails = await verificarEmail();
      let results;

      emails.forEach((email) => {
        if ( document.getElementById("email").value === email) {
          results = true;
        } else {
          results = false;
        }
      });

      if (results) {
         document.getElementById("email").classList.add("text-danger");
         document.getElementById("error-email").innerHTML = "El email ingresado ya esta registrado";
      } else {
         document.getElementById("email").classList.remove("text-danger");
       
         document.getElementById("error-email").innerHTML = null;
      }
    }
  });

  //campo nombre
   document.getElementById("name").addEventListener("keyup", () => {
    if (! document.getElementById("name").value.trim()) {
       document.getElementById("name").classList.add("text-danger");
       document.getElementById("error-name").innerHTML = "El nombre es obligatorio";
    } else if ( document.getElementById("name").value.trim().length < 2) {
       document.getElementById("name").classList.add("text-danger");
       document.getElementById("error-name").innerHTML = "El nombre debe tener al menos 2 caracteres";
    } else {
       document.getElementById("name").classList.remove("text-danger");
     
       document.getElementById("error-name").innerHTML = null;
    }
  });

  //campo apellido
   document.getElementById("lastname").addEventListener("keyup", () => {
    if (! document.getElementById("lastname").value.trim()) {
       document.getElementById("lastname").classList.add("text-danger");
       document.getElementById("error-lastname").innerHTML = "El apellido es obligatorio";
    } else if ( document.getElementById("lastname").value.trim().length < 2) {
       document.getElementById("lastname").classList.add("text-danger");
       document.getElementById("error-lastname").innerHTML =
        "El apellido debe tener al menos 2 caracteres";
    } else {
       document.getElementById("lastname").classList.remove("text-danger");
   
       document.getElementById("error-lastname").innerHTML = null;
    }
  });

  //campo de imagen
   document.getElementById("formFile").addEventListener("change", () => {
    let fileRoute =  document.getElementById("formFile").value;

    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

    if ( document.getElementById("formFile").value) {
      if (!allowedExtensions.exec(fileRoute)) {
         document.getElementById("formFile").classList.add("text-danger");
         document.getElementById("error-image").innerHTML =
          "Las extensiones de archivo permitidas son .jpg/.jpeg/.png/.gif";
        return true;
      }

       document.getElementById("formFile").classList.remove("text-danger");
  
       document.getElementById("error-image").innerHTML = null;
    }
     document.getElementById("formFile").classList.remove("text-danger");

     document.getElementById("error-image").innerHTML = null;
  });

  //campo contraseña
   document.getElementById("password").addEventListener("keyup", () => {
    if (! document.getElementById("password").value) {
       document.getElementById("requisitos-password").innerHTML =
        "La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula, una minúscula y un carácter especial (#?!@$%^&*-)";
    } else if (!regexPassword.test( document.getElementById("password").value)) {
       document.getElementById("requisitos-password").innerHTML = null;
       document.getElementById("password").classList.add("text-danger");
       document.getElementById("error-password").innerHTML =
        "La contraseña ingresada no cumple con los requisitos";
    } else {
       document.getElementById("password").classList.remove("text-danger");
   
       document.getElementById("error-password").innerHTML = null;
    }
  });

  //campo confirmar contraseña
   document.getElementById("confirmarContrasenia").addEventListener("keyup", () => {
    if ( document.getElementById("password").value.trim() !==  document.getElementById("confirmarContrasenia").value.trim()) {
       document.getElementById("confirmarContrasenia").classList.add("text-danger");
       document.getElementById("error-confirmarContrasenia").innerHTML =
        "Las contraseñas no coinciden";
    } else {
       document.getElementById("confirmarContrasenia").classList.remove("text-danger");
       document.getElementById("error-confirmarContrasenia").innerHTML = null;
    }
  });

  //campo de politicas
   document.getElementById("politicas").addEventListener("click", () => {
     document.getElementById("politicas").classList.remove("text-danger");
     document.getElementById("error-politicas").innerHTML = null;
  });

  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    var error = false;

    //campo de politicas
    if (! document.getElementById("politicas").checked) {
       document.getElementById("politicas").classList.add("text-danger");
       document.getElementById("error-politicas").innerHTML =
        "Debes aceptar las politicas de privacidad";
      error = true;
    }
    // input name
    if ( document.getElementById("name").value.trim() == "") {
       document.getElementById("name").classList.add("text-danger");
       document.getElementById("error-name").innerHTML = "El nombre es obligatorio";
      error = true;
    }
    // input lastname
    if ( document.getElementById("lastname").value.trim() == "") {
       document.getElementById("lastname").classList.add("text-danger");
       document.getElementById("error-lastname").innerHTML = "Debes ingresar un apellido";
      error = true;
    }

    // input email
    if ( document.getElementById("email").value.trim() == "") {
       document.getElementById("email").classList.add("text-danger");
       document.getElementById("error-email").innerHTML = "Debes ingresar un email";
      error = true;
    }
    // input password
    if ( document.getElementById("password").value.trim() == "") {
       document.getElementById("password").classList.add("text-danger");
       document.getElementById("error-password").innerHTML = "Debes ingresar una contraseña";

      error = true;
    }

    // input confirm password
    if (! document.getElementById("confirmarContrasenia").value) {
       document.getElementById("confirmarContrasenia").classList.add("text-danger");
       document.getElementById("error-confirmarContrasenia").innerHTML =
        "Debes ingresar una contraseña";

      error = true;
    }
    if (!error) {
      formRegister.submit();
    }
  });
});
