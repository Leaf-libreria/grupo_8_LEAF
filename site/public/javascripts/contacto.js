
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