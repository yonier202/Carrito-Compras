const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const ContnedorCarrito = document.querySelector('#lista-carrito tbody');

let articulosCarrito=[];

cargarEventListener();

function cargarEventListener() {
    //agregar curso al presionar agregar curso
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //mostrar los cursos de local storage
    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    } );

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito=[];

        LimpiarHTML();
    } );
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('agregar-carrito')){
        const CursoSeleccionado = e.target.parentElement.parentElement;
        console.log(CursoSeleccionado);
        LeerDatosCurso(CursoSeleccionado);
    }

}

//Lee el contenido del curso seleccionado

function LeerDatosCurso(curso){
    console.log(curso);

    //Curso Seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisar si un elemnto existe en el carrito
    const existe = articulosCarrito.some( curso =>{
        return curso.id === infoCurso.id;
    });
    if (existe) {
        // Actualizamos la cantidad 
        const cursos = articulosCarrito.map(curso =>{
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            }else{
                return curso; //retorna los que no son los duplicados
            }
        });

        articulosCarrito=[...cursos];
    }else{
        //Agrega elementos al arreglo
    articulosCarrito=[...articulosCarrito, infoCurso];
    }

    carritoHTML(); //iterar sobre el carrito y mostrar su html
}

//Muestra Carrito en el Html

function carritoHTML(){
    //limpiar el html
    LimpiarHTML();
    //Recorre el carrito y genera el html
    articulosCarrito.forEach( curso=>{
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                ${curso.cantidad}
            </td>
            <td>
                <a href='#' class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
        `;
        //agrega el HTML del carrito en el tbody
        ContnedorCarrito.appendChild(row);
    });
    //agregar carrito al storage
    sincronizarLocalstorage();
}
function sincronizarLocalstorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}


//eliminar el cuso en el tbody
function LimpiarHTML (){
    while(ContnedorCarrito.firstChild){
        ContnedorCarrito.removeChild(ContnedorCarrito.firstChild);
    }
}

function eliminarCurso(e){
    console.log(e);
    if (e.target.classList.contains('borrar-curso')) {
        const idCursoEliminar = e.target.getAttribute('data-id');

        //eliminar del arreglo de articulos Carrtio por el 'sata-id'

        articulosCarrito = articulosCarrito.filter(curso => {
            return curso.id !== idCursoEliminar;
        })
    }

    carritoHTML();
}








