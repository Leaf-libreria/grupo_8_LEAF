window.addEventListener("load", function(){
    let formulario = document.querySelector("#register-form");

    formulario.addEventListener("submit", function(e){
        e.preventDefault();

        let campoNombre = document.querySelector("#name");
        
        if(campoNombre.value == ""){
            alert("El campo de nombre tiene que estar completo")
        }
    })
})