let regexEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

//   formulario
window.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("my-form");
  var button = document.getElementById("my-form-button");
  var status = document.getElementById("my-form-status");
  var modalBody = document.getElementById("modal-body");
  var tituloForm =  document.getElementById("title-form")


  function success() {
   
    button.style = "display: none";
    modalBody.style = "display: none" ;
    tituloForm.style= "display: none ";
    status.innerHTML = "Gracias por comunicarte con nosotros!";
    form.reset();
  
  }

  function error() {
    status.innerHTML = "Hubo un problema! Tu mensaje no se ha enviado";
    status.style.color = "red";
    modalBody.style="display: none ";
    tituloForm.style="display: none " ;
    button.style = "display: none ";
  }

  // handle the form submission event

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}



const $ = id => document.getElementById(id);
/* validaciones */

$('nombre').addEventListener('keyup', () => {
  if(!$('nombre').value.trim()){
      $('nombre').classList.add('is-invalid')
      $('error-name').innerHTML = "El nombre es obligatorio"
  }
  else if ($('nombre').value.trim().length < 2) {
    $('nombre').classList.add('is-invalid')
    $('error-name').innerHTML = "El nombre debe tener al menos 2 caracteres"
}else{
      $('nombre').classList.remove('is-invalid')
      $('nombre').classList.add('is-valid')
      $('error-name').innerHTML = null
  }
})

$('apellido').addEventListener('keyup', () => {
  if(!$('apellido').value.trim()){
      $('apellido').classList.add('is-invalid')
      $('error-lastname').innerHTML = "El apellido es obligatorio"
  }
  else if ($('apellido').value.trim().length < 2) {
    $('apellido').classList.add('is-invalid')
    $('error-lastname').innerHTML = "El apellido debe tener al menos 2 caracteres"
}else{
      $('apellido').classList.remove('is-invalid')
      $('apellido').classList.add('is-valid')
      $('error-lastname').innerHTML = null
  }
})

$('email').addEventListener('keyup', () => {
 
    if(!$('email').value.trim()){
      $('email').classList.add('is-invalid')
      $('error-email').innerHTML = "El email es obligatorio"
  }else if (!regexEmail.test($('email').value)) {
        $('email').classList.add('is-invalid');
        $('error-email').innerHTML = "Debes ingresar un email valido";
    
}else{
      $('email').classList.remove('is-invalid')
      $('email').classList.add('is-valid')
      $('error-email').innerHTML = null
  }
})

$('mens').addEventListener('keyup', () => {
  if(!$('mens').value.trim()){
      $('mens').classList.add('is-invalid')
      $('error-mens').innerHTML = "Debes escribir un mensaje"
  }
  else if ($('mens').value.trim().length < 2) {
    $('mens').classList.add('is-invalid')
    $('error-mens').innerHTML = "El mensajedebe tener al menos 20 caracteres"
}else{
      $('mens').classList.remove('is-invalid')
      $('mens').classList.add('is-valid')
      $('error-mens').innerHTML = null
  }
})