
//   formulario
window.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("my-form");
  var button = document.getElementById("my-form-button");
  var status = document.getElementById("my-form-status");
  var modalBody = document.getElementById("modal-body");
  var tituloForm =  document.getElementById("title-form")


  function success() {
    form.reset();
    button.style = "display: none";
    modalBody.style = "display: none" ;
    tituloForm.style= "display: none ";
    status.innerHTML = "Gracias por comunicarte con nosotros!";
 
  
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




/* validaciones */

$('name').addEventListener('blur', () => {
  if(!$('name').value.trim()){
      $('name').classList.add('is-invalid')
      $('error-name').innerHTML = "El nombre es obligatorio"
  }else{
      $('name').classList.remove('is-invalid')
      $('name').classList.add('is-valid')
      $('error-name').innerHTML = null
  }
})

$('lastname').addEventListener('blur', () => {
  if(!$('lastname').value.trim()){
      $('lastname').classList.add('is-invalid')
      $('error-name').innerHTML = "El apellido es obligatorio"
  }else{
      $('lastname').classList.remove('is-invalid')
      $('lastname').classList.add('is-valid')
      $('error-lastname').innerHTML = null
  }
})

$('email').addEventListener('blur', () => {
  if(!$('email').value.trim()){
      $('email').classList.add('is-invalid')
      $('error-email').innerHTML = "El email es obligatorio"
  }else{
      $('email').classList.remove('is-invalid')
      $('email').classList.add('is-valid')
      $('error-email').innerHTML = null
  }
})

$('mens').addEventListener('blur', () => {
  if(!$('mens').value.trim()){
      $('mens').classList.add('is-invalid')
      $('error-mens').innerHTML = "Debes escribir un mensaje"
  }else{
      $('mens').classList.remove('is-invalid')
      $('mens').classList.add('is-valid')
      $('error-mens').innerHTML = null
  }
})