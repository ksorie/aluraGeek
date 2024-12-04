const BASE_URL ="https://674fd772bb559617b2703b65.mockapi.io/products";

const productList = async ()=>{
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error al listar producto: ", error)
    }
}
/*Crear producto */
const createProduct = async (name, price, image)=>{
    try {
        const response = await fetch(BASE_URL,{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({name, price, image}),
        });
        const data =await response.json();
        return data;
    } catch (error) {
        console.log("Error al crear producto", error)
    }
    form.reset(); //borramos datos del formuulario
}



/*-------------- */
export const servicesProducts ={
    productList,createProduct,
};