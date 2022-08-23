const menu_mobile = document.querySelector('.menu-mobile');

const icon_menu = document.querySelector('.icon-menu');

// que se oscuresca cuando se abra menu
const dark_screen = document.querySelector('.dark-screen');


/* menu opciones deskop  */

const btn_menu = document.querySelector('.options p');

const menu_pegable = document.querySelector('.options-menu');

btn_menu.addEventListener('click', function (){

        cerrar_abrir_menus(menu_pegable);

});


/*  menu carrito de compras  */

const img_carshop = document.querySelector('.options img');

const menu_mycar = document.querySelector('.shoping-car-products');

img_carshop.addEventListener('click', function (){

            cerrar_abrir_menus(menu_mycar);
      } );


/* cerrar cariito de compras  desde sui flecha*/
const btn_orden_salir = document.querySelector('.title-container');

btn_orden_salir.addEventListener('click', () => menu_mycar.classList.toggle('inactive'));





/*  menu opciones mobile   */


icon_menu.addEventListener('click', function (){

    cerrar_abrir_menus(menu_mobile);



});


/*  lista de productos */
let list_productos = [];

//api
const API_URL = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=200';

//funcion asincrona api request
async function obtener_productos(){

    const response = await fetch(API_URL);
    return await response.json();
}

//funcion uqe guarda los productos en una lista
const  save_productos = async (url)=>{

    try {
        const products = await fetch(url);

        list_productos = await products.json();



    }catch (error) {
        console.log(error);
    }

}
 save_productos(API_URL).then(function (){

     mostrar_productos(list_productos );

     abrir_cargar_product_detail(list_productos);
 });






/*  mostrar productos por categorias  */

/* obtengo a todos los objetos con clase btn_categoria */
const btn_categoria = document.querySelectorAll('.btn-categoria');


// recorro el array de todos los botones


btn_categoria.forEach(function (btn){

    btn.addEventListener('click', function (){


        let categoria = btn.querySelector('a').innerText;



        mostrar_productos(list_productos, categoria );

        menu_mobile.classList.add('inactive');



        abrir_cargar_product_detail();


    });

});



// cerrar ventana detail y menus de productos al hacer click fuera de ellos


document.addEventListener('click', function (e){

    //contador para saber cuantos menus estan cerrados
    let contador_menus_cerrados = 0;

    console.log(e.target);

//cuando toquemos la ventana oscura o el navbar cerramos los menus
    if (e.target === dark_screen || e.target.nodeName === 'NAV' || e.target.classList.contains('product-detail-close')
        || e.target === document.querySelector('.product-detail-close img')){

        for (menu of list_menus) {

            if (!menu.classList.contains('inactive')) {

                menu.classList.add('inactive');

                console.log("cerrar menus");
            }

        }
    }





// vemos si algun menu esta abierto y si lo esta activamos la ventana oscura y contamos los menus cerrados
        for (menu of list_menus) {

            if (!menu.classList.contains('inactive')) {
                dark_screen.classList.remove('inactive');
                console.log('dark screen activa');
            }else {
                contador_menus_cerrados++;
            }


        }



    //si el contador de menus dice que todos los menus estan cerrados entonce desactivamos la ventana oscura


    if (contador_menus_cerrados === list_menus.length) {

        dark_screen.classList.add('inactive');
        console.log('dark screen cerrado');
    }



} );


//abrir produc detail

const product_detail = document.querySelector('.product-detail-container');







//funcion para que en cada categoria se cargue el foreach con los productos nuevos y se pueda abrir el menu de detalles
function abrir_cargar_product_detail(lista){


    // abrir producto detail al hacer click en el producto
    let list_productos_container = document.querySelectorAll('.card-product');


    list_productos_container.forEach(function (producto){

        producto.addEventListener('click', function (e){

            const btn_add_cart = producto.querySelector('.product-info--card-product figure img');

            if (e.target !== btn_add_cart){

                cerrar_abrir_menus(product_detail);
            }



        //abrimos menu al dar clic en producto


            //obtenemos el index del producto seleccionado
            const id = producto.querySelector('.product-info--card-product').id -1;


            //cargamos los destalles del prodycto seleccionado
            const img_producto = lista[id].images[0];
            const precio_producto = lista[id].price;
            const nombre_producto = lista[id].title;
            const description_producto = lista[id].description;


            //cargamos los detalles del producto en el detalle
            document.querySelector('.product-detail-container').innerHTML = `

               <div class="product-detail">
                   <div class="product-detail-close">
                       <img src="./icons/icon_close.png" alt="close">
                   </div>
                   <img src="${img_producto}" alt="${nombre_producto}">
                   <div class="product-info">
                       <p>$${precio_producto}</p>
                       <p>${nombre_producto}</p>
                       <p>${description_producto}</p>
                       <button class="primary-button add-to-cart-button">
                           <img src="./icons/bt_add_to_cart.svg" alt="add to cart">
                           Add to cart
                       </button>
                   </div>
               </div>
            `;


            let total = 0;
            if (e.target === btn_add_cart || e.target.classList.contains('add-to-cart-button')){
                console.log('agregar al carrito');
                const shopping_cart_container = document.querySelector('.container-orders');
                let html_product_Car = `
                
                 <div class="shopping-cart hover">
                    <figure>
                        <img src="${img_producto}" alt="${nombre_producto}">
                    </figure>
                    <p>${nombre_producto}</p>
                    <p id="precio_producto">$${precio_producto}</p>
                    <img src="./icons/icon_close.png" alt="close">
                </div>
                
                
                `;

                shopping_cart_container.innerHTML += html_product_Car;



            }


        });





    });

}




// funcios para que los menus despegables se cierren y se abran


    const list_menus = document.querySelectorAll('.menu-despegable');



    function cerrar_abrir_menus(menu_abrir) {



        list_menus.forEach(function (menu){



            if (menu !== menu_abrir){
                menu.classList.add('inactive');


            }else if( menu === product_detail){

                menu.classList.remove('inactive');

            }
            else {
                menu_abrir.classList.toggle('inactive');


            }

        } );

    }


/* funcion para mostar productos en html segun categoria*/
function mostrar_productos(productos, categoria){

    let Html_container_products = '';


    categoria = categoria || 'All';

    for (producto of productos) {

        if (categoria === 'All' ) {
            Html_container_products += `
            
                <div class="card-product" >
    
    
                    <img src="${producto.images[0]}" alt="${producto.description}">
    
                    <div class="product-info--card-product" id="${producto.id}">
    
                        <div>
    
                            <p>$${producto.price}</p>
                            <p>${producto.title}</p>
    
                        </div>
    
                        <figure>
                            <img class="add-to-cart-button" src="icons/bt_add_to_cart.svg" alt="">
                        </figure>
                    </div>
                </div>
                
            
            `;
        }else if (producto.category.name === categoria) {

            Html_container_products += `
            
                <div class="card-product" >
    
    
                    <img src="${producto.images[0]}" alt="${producto.description}">
    
                    <div class="product-info--card-product" id="${producto.id}">
    
                        <div>
    
                            <p>$${producto.price}</p>
                            <p>${producto.title}</p>
    
                        </div>
    
                        <figure>
                            <img class="add-to-cart-button" src="icons/bt_add_to_cart.svg" alt="">
                        </figure>
                    </div>
                </div>
                
            
            `;

            
        }
    }
    document.querySelector('.container-products').innerHTML = Html_container_products;



}




