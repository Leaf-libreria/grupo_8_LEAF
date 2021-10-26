window.addEventListener('load', () => {
let btn = document.querySelector('.logout')

btn.click= function(e){
  e.preventDefault();
  function ActivarTiempo() {
    //se activa el método alert luego de 2 segundos
    setTimeout(
      function () {
        form.submit();
      },
      3000,
      Swal.fire({
        icon: "success",
        title: 'Inicio de sesion exitoso',
        width: 600,
        padding: '3em',
        showConfirmButton: false,
        background: '#ffff url(https://www.animationsoftware7.com/img/agifs/leaf_fall_1.gif)',
      })
    );
  }
  ActivarTiempo();
  
}
    
})