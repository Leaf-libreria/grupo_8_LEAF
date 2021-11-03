 //renderiza la imagen
 window.addEventListener("load", function () {
  //  formulario
    let form = document.getElementById("add-carousel-image");
    // contenedor donde queremos mostrar la imagen
    const $image = document.getElementById("image");
    // input/archivo
    const $file = document.getElementById("carouselImage");
   let image
    function renderImage(formData) {
      const file = formData.get("carouselImage");
     image = URL.createObjectURL(file);
      $image.setAttribute("src", image);
      console.log(image.valueOf)
    }
   
   
    $file.addEventListener("change", (e) => {
      var data = new FormData(form);
      renderImage(data);
      
    });
   })