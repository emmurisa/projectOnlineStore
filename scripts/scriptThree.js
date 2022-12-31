const URL = 'https://fakestoreapi.com/products'


const globalProducts = [];
const categoriesArray = [];

fetch(URL)
    .then((promise) => promise.json())
    .then(
        function (result) {
            createpage(result)
        }
    );

function createpage(data) {
    //console.log(data)

    //El siguiente codigo toma la informacion general del array de productos proveniente del API 
    //Y almacena las categorias que son distintas en un nuevo array
    let valorExiste = false;
    for (let i = 0; i < data.length; i++) {        
        globalProducts.push(data[i]);
        categoriesArray.forEach(element => {
            valorExiste = (data[i].category === element) ? true : false;
        });
        if (valorExiste === false) {
            categoriesArray.push(data[i].category)
        }
    }
    // console.log(globalProducts);

    // El siguiente codigo se encarga de insertar las categorias en la pagina como objetos HTML
    categoriesArray.forEach(elemento => {
        let parentNode = document.getElementById("dropdownMenu");
        let newCategoryElement = document.createElement("p");
        newCategoryElement.className = "categoryImported";
        newCategoryElement.innerText = elemento.toUpperCase();
        parentNode.appendChild(newCategoryElement);
    });

    //El siguiente codigo se encarga de actualizar el array de productos mostrados en la pagina principal de acuerdo a la categoria elegida por el usuario.

    document.querySelectorAll(".categoryImported").forEach(e => {
        e.addEventListener("click", elem => {

            selectedProductsArray = data.filter(e => e.category === elem.path[0].innerText.toLowerCase());

            //Producto Uno
            document.getElementById("productOne").innerText = selectedProductsArray[0].title.slice(0, 29);

            //Producto Dos
            document.getElementById("productTwo").innerText = selectedProductsArray[1].title.slice(0, 29);

            //Producto Tres
            document.getElementById("productThree").innerText = selectedProductsArray[2].title.slice(0, 29);

            //Producto Cuatro
            document.getElementById("productFour").innerText = selectedProductsArray[3].title.slice(0, 29);
        })
    })
    
}


const URLTwo = 'https://fakestoreapi.com/carts'

const orders = [];

fetch(URLTwo)
    .then((promise) => promise.json())
    .then(
        function (result) {
            createpageTwo(result)
        }
    );

function createpageTwo(carts) {

    let ramdomNumber = Math.floor(Math.random(100) * 7);
    //console.log(ramdomNumber)
    //console.log(carts[ramdomNumber]);

    
    
    function searchProductById(id) {
        for (let index = 0; index <= id; index++) {            
            if (id === globalProducts[index].id) {
                //console.log(globalProducts[index]);
                return globalProducts[index]
            }            
        }
    }
    
    //searchProductById(ramdomNumber+1);    

    const carElected = carts[ramdomNumber];
    //console.log(carElected.products);

    let totalAmount = 0;
    carElected.products.forEach(element => {
        totalAmount += parseFloat(searchProductById(element.productId).price); 
        //console.log(totalAmount);


        parentNode = document.getElementById("productsContainer");
        let summaryContainer = document.createElement("div");
        summaryContainer.className = "summaryContainer"; 

        let productImageContainer = document.createElement("div");
        productImageContainer.className = "productImageContainer";


        let productImage = document.createElement("img");
        productImage.className = "productImage";
        productImage.src = searchProductById(element.productId).image;

        let productInfoContainer = document.createElement("div");
        productInfoContainer.className = "productInfoContainer";

        let productName = document.createElement("h5");
        productName.className = "productName";
        productName.innerText = searchProductById(element.productId).title;


        let productDescription = document.createElement("p");
        productDescription.className = "productCharacteristics";
        productDescription.innerText = searchProductById(element.productId).description.slice(0, 140);

        let amountContainer = document.createElement("div");
        amountContainer.className = "amountContainer";

        let quantityLabels = document.createElement("p");
        quantityLabels.className = "quantityLabels";
        quantityLabels.innerText = `Cantidad: ${element.quantity} Uni`;   


        productImageContainer.appendChild(productImage); 
        summaryContainer.appendChild(productImageContainer); 

        productInfoContainer.appendChild(productName); 
        productInfoContainer.appendChild(productDescription);
        summaryContainer.appendChild(productInfoContainer); 

        amountContainer.appendChild(quantityLabels);        
        summaryContainer.appendChild(amountContainer);

        parentNode.appendChild(summaryContainer);

    document.getElementById('totalAmount').innerText = `Total: $ ${totalAmount}`

    });

    document.getElementById('submitPurchase').addEventListener("click", () => {
        window.alert("Orden procesada con exito, usted recibira un email con un resumen de los detalles de la compra.. Muchas Gracias!!");

    })

}