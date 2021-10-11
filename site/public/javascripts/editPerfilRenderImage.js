 //renderiza la imagen
 window.addEventListener("load", function () {
    let form = document.getElementById("edit-perfil-form");
    const $image = document.getElementById("image");
    const $file = document.getElementById("imagenPerfil");
   let image
    function renderImage(formData) {
      const file = formData.get("image");
     image = URL.createObjectURL(file);
      $image.setAttribute("src", image);
      console.log(image.valueOf)
    }
   
   
    $file.addEventListener("change", (e) => {
      var data = new FormData(form);
      renderImage(data);
      
    });
   })