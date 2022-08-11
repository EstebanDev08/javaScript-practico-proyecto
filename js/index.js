const menu = document.querySelector('.options p');

const menu_pegable = document.querySelector('.options-menu');

const menu_mobile = document.querySelector('.menu-mobile');

const icon_menu = document.querySelector('.icon-menu');


menu.addEventListener('click', () => activar_desactivar(menu_pegable));
icon_menu.addEventListener('click', () => activar_desactivar(menu_mobile));



function  activar_desactivar ( elementoHtml){

        elementoHtml.classList.toggle('inactive');

}