const menu_mobile = document.querySelector('.menu-mobile');

const icon_menu = document.querySelector('.icon-menu');

/* menu opciones deskop  */

const btn_menu = document.querySelector('.options p');

const menu_pegable = document.querySelector('.options-menu');

btn_menu.addEventListener('click', function (){

        activar_desactivar(menu_pegable);
        menu_mycar.classList.add('inactive');
        menu_mobile.classList.add('inactive');
});


/*  menu carrito de compras  */

const img_carshop = document.querySelector('.options img');

const menu_mycar = document.querySelector('.product-detail');

img_carshop.addEventListener('click', function (){

            activar_desactivar(menu_mycar);
            menu_pegable.classList.add('inactive');

            menu_mobile.classList.add('inactive');

} );


/* cerrar cariito de compras */
const btn_orden_salir = document.querySelector('.title-container');

btn_orden_salir.addEventListener('click', () => activar_desactivar(menu_mycar));


/*cerrar menu mobile cuando abra el carrito*/




/*  menu opciones mobile   */


icon_menu.addEventListener('click', function (){

    activar_desactivar(menu_mobile);
    menu_mycar.classList.add('inactive');
    menu_pegable.classList.add('inactive');


});


/*  lista de productos */
let list_productos = [];

list_productos.push({
    nombre: 'labial',
    precio: 50,
    image:'/products_img/product1.jpg',
    categoria: 'electronics'
});

list_productos.push({
    nombre: 'labial',
    precio: 10,
    image:'/products_img/product1.jpg',
    categoria: 'furniture'
});

list_productos.push({
    nombre: 'labial',
    precio: 10,
    image:'/products_img/product1.jpg',
    categoria: 'toys'
});

list_productos.push({
    nombre: 'labial',
    precio: 50,
    image:'/products_img/product2.jpg',
    categoria: 'electronics'
});

list_productos.push({
    nombre: 'labial',
    precio: 10,
    image:'/products_img/product1.jpg',
    categoria: 'furniture'
});

list_productos.push({
    nombre: 'labial',
    precio: 10,
    image:'/products_img/product1.jpg',
    categoria: 'toys'
});
list_productos.push({
    nombre: 'labial',
    precio: 50,
    image:'/products_img/product1.jpg',
    categoria: 'electronics'
});

list_productos.push({
    nombre: 'labial',
    precio: 10,
    image:'/products_img/product1.jpg',
    categoria: 'furniture'
});

list_productos.push({
    nombre: 'labial',
    precio: 10,
    image:'/products_img/product1.jpg',
    categoria: 'toys'
});
list_productos.push({
    nombre: 'labial',
    precio: 50,
    image:'/products_img/product1.jpg',
    categoria: 'electronics'
});

list_productos.push({
    nombre: 'labial',
    precio: 10,
    image:'/products_img/product1.jpg',
    categoria: 'furniture'
});

list_productos.push({
    nombre: 'labial',
    precio: 10,
    image:'/products_img/product2.jpg',
    categoria: 'toys'
});


/* llamamos funcion para que muestre los productos de todas las categorias*/
mostrar_productos(list_productos, 'all');



/*  mostrar productos por categorias  */

/* obtengo a todos los objetos con clase btn_categoria */
const btn_categoria = document.querySelectorAll('.btn-categoria');



// recorro el array de todos los botones


btn_categoria.forEach(function (btn){

    btn.addEventListener('click', function (){

        let categoria = btn.querySelector('a').innerText.toLowerCase();

        console.log(categoria);

        mostrar_productos(list_productos, categoria);
    });

});


/* funcion para activar o desactivar menu*/
function  activar_desactivar ( elementoHtml){

       elementoHtml.classList.toggle('inactive');

}



/* funcion para mostar productos en html segun categoria*/
function mostrar_productos(productos, categoria){

    let Html_container_products = '';

    for (producto of productos){

        if (categoria === 'all' || producto.categoria === null){


            Html_container_products += `

            <div class="card-product">
                <img src="${producto.image}" alt="${producto.nombre}">
                            
                <div class="product-info">
                
                    <div>
                    
                        <p>$${producto.precio}</p>
                        <p>${producto.nombre}</p>
                        
                    </div>
                        <figure>
                            <img src="icons/bt_add_to_cart.svg" alt="">
                        </figure>
                    </div>
            </div>
        `;
        }else if (producto.categoria === categoria){


            Html_container_products += `

            <div class="card-product">
                <img src="${producto.image}" alt="${producto.nombre}">
                            
                <div class="product-info">
                
                    <div>
                    
                        <p>$${producto.precio}</p>
                        <p>${producto.nombre}</p>
                        
                    </div>
                        <figure>
                            <img src="icons/bt_add_to_cart.svg" alt="">
                        </figure>
                    </div>
            </div>
        `;
        }

    }

      document.querySelector('.container-products').innerHTML = Html_container_products;
}
