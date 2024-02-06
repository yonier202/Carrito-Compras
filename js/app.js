const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const ContnedorCarrito = document.querySelector('#lista-carrito tbody');

let articulosCarrito=[];

cargarEventListener();

function cargarEventListener() {
    //agregar curso al presionar agregar curso
    listaCursos.addEventListener('click', agregarCurso);
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

    //Agrega elementos al arreglo
    articulosCarrito=[...articulosCarrito, infoCurso];

    carritoHTML();
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
}
//eliminar el cuso en el tbody
function LimpiarHTML (){
    while(ContnedorCarrito.firstChild){
        ContnedorCarrito.removeChild(ContnedorCarrito.firstChild);
    }
}
