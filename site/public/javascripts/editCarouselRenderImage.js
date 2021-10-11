 //renderiza la imagen
 window.addEventListener("load", function () {
    let form = document.getElementById("edit-carousel-form");
    const $image = document.getElementById("image");
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