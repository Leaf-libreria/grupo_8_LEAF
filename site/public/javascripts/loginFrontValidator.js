let regExEmail =
  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

  let mostrar = document.getElementById('mostrar')
  let contraseñai = document.getElementById('password')
  mostrar.addEventListener('click', (e)=>{
      e.preventDefault
      if(contraseñai.type == "password"){
          contraseñai.type = "text";
      }else{
          contraseñai.type = "password";
      }
  })

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
        "Debes ingresar un email válido";
      email.classList.add("text-danger");
    } else if (!email.value) {
      document.getElementById("errorEmail").innerText =
        "Éste email no está registrado";
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

});
