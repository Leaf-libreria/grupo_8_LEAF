window.addEventListener('load', () =>{
    let btnEliminar = document.querySelector('.admin-btn-eliminar');
    btnEliminar.addEventListener('click', (e)=>{
       Swal.fire('¿Estás seguro? Esta acción no se puede deshacer')
        
    })
})