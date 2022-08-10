let menu = document.querySelector('.options');

let menu_pegable = document.querySelector('.options-menu');


menu.addEventListener('click', () => activar_desactivar(menu_pegable));




function  activar_desactivar ( elementoHtml){

        elementoHtml.classList.toggle('inactive');

}