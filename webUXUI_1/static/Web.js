const menu_img = document.querySelector('.menu_img');
const nav_ul = document.querySelector('.nav_ul');

menu_img.addEventListener('click', function () {
    nav_ul.classList.toggle('nav_ul1')
})




const nav_carrito = document.querySelector('.nav_carrito');
const carrito1 = document.querySelector('.carrito');

nav_carrito.addEventListener('click', function () {
    carrito1.classList.toggle('carrito1')
})




const carrito = document.querySelector('#carrito');
const table_car = document.querySelector('#table_car tbody');
const vaciar_carrito = document.querySelector('#vaciar_carrito');
const lista_imgs = document.querySelector('#lista_imgs');
let imgCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    lista_imgs.addEventListener('click', agregar_img);

    // Eliminar "img" del "carrito"
    carrito.addEventListener('click', eliminarImg);

    document.addEventListener('DOMContentLoaded', () => {
        imgCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        // el contenido del carrito se cargará en el "localStorage", el que no se borrará cuando se actualice la página.

        carritoHTML();
        // cuando se actualice la página se cargará en el "HTML" el contenido guardado en el "localStorage"
    });

    // Vaciar el "carrito"
    vaciar_carrito.addEventListener('click', () => {
        imgCarrito = [];
        // resetea el arreglo (vacia el "carrito")

        limpiarHTML();
        // limpia el contenido en HTML

        sincronizarStorage();
        // limpia tambien el contenido guardado en el "localStorage"

        // console.log('vacio');
    })
}

function agregar_img(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar_carrito')) {
        imgSeleccionado = e.target.parentElement.parentElement;
        leerDatosImg(imgSeleccionado);
    };
};

function eliminarImg(e) {
    if(e.target.classList.contains('borrar_img')) {
        const imgId = e.target.getAttribute('data-id');
        // console.log(e.target.getAttribute('data-id'));

        const existe = imgCarrito.some(img => (img.id === imgId && img.cantidad > 1));
        // "some" encuentra "ids" que son iguales y sean en cantidad mayor a "1"

        if(existe) {
            // si "some" es igual "True" se ejecutará "imgs"
            const imgs = imgCarrito.map(img => {
                if(img.id === imgId) {
                    img.cantidad--;
                }
                return img;
                // si los "ids" son iguales se les restaran en "1"
            });

            imgCarrito = [...imgs];
            // ejecuta la creación del nuevo arreglo como resultado del "map"
        } else {
            imgCarrito = imgCarrito.filter(img => img.id !== imgId);
        }

        // imgCarrito = imgCarrito.filter(img => img.id !== imgId);
        // console.log(imgCarrito);

        carritoHTML();
        // ejecuta el eliminar el "img" del carrito en HTML
    }
    // console.log(e.target.classList);
}

function leerDatosImg(img) {
    // crear un objeto
    infoImg = {
        imagen: img.querySelector('img').src,
        nombre: img.querySelector('h5').textContent,
        precio: img.querySelector('.precio span').textContent,
        id: img.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    } 

    const existe = imgCarrito.some(img => img.id === infoImg.id);
    // el metodo "some" recorre los elementos del "carrito" para saber si existe otro "id" igual seleccionado, creando la variable "img", si existe responderá "True".
    // console.log(existe);

    if(existe) {
        // Actualizar la cantidad
        // Si "some" es "True" continuará a la variable "imgs"
        const imgs = imgCarrito.map( img => {
            // el metodo "map" recorre los elementos del "carrito" para crear otro arreglo que se llamará "imgs"
            if(img.id === infoImg.id) {
                img.cantidad++;
                return img;
                // se busca el "id" duplicado y se incremetará en la "cantidad", para luego "return" al "img" (elemento) actualizado, los que no cumplen esta condición irán a "else".
            } else {
                return img;
            }
        });
        
        imgCarrito = [...imgs]
        // entrega como resultado el "img" (elemento) actualizado.

    } else {
        imgCarrito = [...imgCarrito, infoImg];
    }

    // imgCarrito = [...imgCarrito, infoImg];
    // para agregar un nuevo elemento seleccionado
    // console.log(imgCarrito);

    carritoHTML();
    // llama a la funcion para ejecutar
}

function carritoHTML() {

    limpiarHTML();

    imgCarrito.forEach( img => {

        const {imagen, nombre, precio, cantidad, id} = img;
        const row = document.createElement('tr');  

        row.innerHTML = `
            
            <td><img src="${imagen}" height="45"></td>
            <td><p>${nombre}</p></td>
            <td><p>${precio}</p></td>
            <td><p>${cantidad}</p></td>
            <td><p class="borrar_img" data-id="${id}"> x </p></td>
        `;
    // <td><img src="${img.imagen}" width="50"></td>

        table_car.appendChild(row);
    });

    // Agregar el "carrito" al storage (para que al actualizar la página no se borre el contenido del "carrito").
    sincronizarStorage();
}

function sincronizarStorage() {

    localStorage.setItem('carrito', JSON.stringify(imgCarrito));
    // el contenido del "carrito" se almacenará en el "localStorage"
}


function limpiarHTML() {

    // table_car.innerHTML = ""
    // metodo simple para limpiar el "carrito" desde el HTML.

    while(table_car.firstChild) {
        table_car.removeChild(table_car.firstChild);
    }
    // metodo mas complejo para eliminar el "carrito" y el recomendable.
}




const slider = document.querySelector("#container_images");
let containerImg = document.querySelectorAll(".container_img");
let containerImgLast = containerImg[containerImg.length -1];

const buttonPrev = document.querySelector("#buttonPrev");
const buttonNext = document.querySelector("#buttonNext");

slider.insertAdjacentElement('afterbegin', containerImgLast);

function nextImg() {
    let containerImgFirst = document.querySelectorAll(".container_img") [0];
    slider.style.marginLeft = "-100%";
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('beforeend', containerImgFirst);
    slider.style.marginLeft = "0%";
    }, 500);
    // "500" = 0.5s (medio segundo) por el transition 
}

buttonNext.addEventListener('click', function(){
    nextImg();
});

function prevImg() {
    let containerImg = document.querySelectorAll(".container_img");
    let containerImgLast = containerImg[containerImg.length -1];
    slider.style.marginLeft = "0";
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('afterbegin', containerImgLast);
    slider.style.marginLeft = "-100%";
    }, 500);
    // "500" = 0.5s (medio segundo) por el transition 
}

buttonPrev.addEventListener('click', function(){
    prevImg();
});

setInterval(function(){
    nextImg();
}, 5000);
// slider automatico cada 5 segundos




// const menu_img1 = document.querySelector('.menu_img1');
// const nav_user = document.querySelector('.nav_user');

// menu_img1.addEventListener('click', function () {
//     nav_user.classList.toggle('nav_user1');
// });







// function App() {}

//     window.onload = function(event) {
//         var app = new App();
//         window.app = app;
//     }

//     App.prototype.processingButton = function(event) {

//         const btn = event.currentTarget;
//         const carouselList = event.currentTarget.parentNode;
//         const track = event.currentTarget.parentNode.querySelector('#track');
//         const carousel = track.querySelectorAll('.carousel');

//         const carouselWidth = carousel[0].offsetWidth;

//         const trackWidth = track.offsetWidth;
//         const listWidth = carouselList.offsetWidth;

//         track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0,-2) *-1);
//         btn.dataset.button == "button_prev" ? prevAction(leftPosition,carouselWidth, track) : nextAction(leftPosition, trackWidth, listWidth, carouselWidth, track);
//     }

//     let prevAction = (leftPosition, carouselWidth, track) => {
        
//         if (leftPosition > 0) {
//             track.style.left = `${-1 * (leftPosition - carouselWidth)}px`;
//         }
//     }

//     let nextAction = (leftPosition, trackWidth, listWidth, carouselWidth, track) => {

//         if (leftPosition < (trackWidth - listWidth)) {
//             track.style.left = `${-1 * (leftPosition + carouselWidth)}px`;
//         }
//     }