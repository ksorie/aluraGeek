import {servicesProducts } from "../servicess/product-services.js";

const productContainer =document.querySelector("[data-product]"); /*Capuramos el div que estamos usando del producto*/ 
const form =document.querySelector("[data-form]"); /*Capuramos el formulario*/ 
const deleteProduct = document.querySelector(".product-grid");


/* Crear dinamicamente toda la estructura HTML*/
function createCard({name, price, image,id}){ /*{} para  destructurar para ahorrar codigo para no poner product.name etc*/
    const card =document.createElement("div");
    card.classList.add("card");
    card.innerHTML=`
    <div class="product-grid">
            <div class="product-card">
                    <img src="${image}" class="img-product">
            </div>    
            <div class="card-container-info">
                    <p>${name}</p>
                    <div class="price-items">
                        <p>$ ${price}</p>
                        <button class="delete-button" data-id="${id}" ><img src="/img/icons8-trash-26.png" 
                        alt="Delete" class="img-delete"></button>
                    </div>
            </div>
    </div>
    `;
    return card;

};
/**Seguir rederizando */
const renderProducts = async ()=>{
    try {
        const listProduct = await servicesProducts.productList();
        listProduct.forEach((product) => {  /*Foreach , va aentrar y recorrer mi lista para renderizar */
            const productCard = createCard(product);  /*Por cada prodcuto se creo una constante y resive createCard y esta recibe los argumentos(name, price etc) */
            productContainer.appendChild(productCard); 
        });
    } catch (error) {
        console.log(error);
    }
}

/* formulario */
form.addEventListener("submit", async(event)=>{
    event.preventDefault(); //previene o evite que el formulario trae por defecto que cuando hace submit se resetea

    //Capturamos los datos del formulario, el valor de los campo por eso el .value al final
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    //Estos valores capturados necesitamos enviarlos a la API externo
    try {
        const newProduct = await servicesProducts.createProduct(name, price, image);
        const newCard = createCard(newProduct); // newCard recibe la funcion de createCard y este recibe como parametro newProduct la que acabamos de hacer para enviar el producto
        productContainer.appendChild(newCard);
    } catch (error) {
        console.log(error);
    }
});

//Eliminar producto

/*listProduct.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
      const productDiv = event.target.closest('.product-grid'); // Selecciona el div padre del botón
      if (productDiv) {
        productDiv.remove(); // Elimina el producto del DOM
      }
    }
  });
 */

renderProducts();