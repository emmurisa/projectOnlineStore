
const URL = 'https://fakestoreapi.com/products'

let categoriesArray = [];

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
    //Y almacena las categorias que son distintas en un nuevo arra
    let valorExiste = false;
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i].category)
        categoriesArray.forEach(element => {
            valorExiste = (data[i].category === element) ? true : false;
        });
        if (valorExiste === false) {
            categoriesArray.push(data[i].category)
        }
    }
    //   console.log(categoriesArray);

    // El siguiente codigo se encarga de insertar las categorias en la pagina como objetos HTML

    categoriesArray.forEach(elemento => {
        let parentNode = document.getElementById("dropdownMenu");
        let newCategoryElement = document.createElement("p");
        newCategoryElement.className = "categoryImported";
        // newCategoryElement.href = "https://www.amazon.com/ref=nav_logo";
        // newCategoryElement.target = "_blank";
        newCategoryElement.innerText = elemento.toUpperCase();
        // console.log(newCategoryElement.innerText);
        parentNode.appendChild(newCategoryElement);
    });

    //El siguiente codigo se encarga de actualizar el array de productos mostrados en la pagina principal de acuerdo a la categoria elegida por el usuario.    

    document.querySelectorAll(".categoryImported").forEach(e => {
        e.addEventListener("click", elem => {
            
            selectedProductsArray = data.filter(e => e.category === elem.path[0].innerText.toLowerCase()); 

            //Producto Uno
            document.getElementById("productOneName").innerText = selectedProductsArray[0].title.slice(5, 29);
            document.getElementById("productOnePrice").innerText = `$ ${selectedProductsArray[0].price}`;
            document.getElementById("productOneImage").src = selectedProductsArray[0].image;

            //Producto Dos
            document.getElementById("productTwoName").innerText = selectedProductsArray[1].title.slice(5, 29);
            document.getElementById("productTwoPrice").innerText = `$ ${selectedProductsArray[1].price}`;
            document.getElementById("productTwoImage").src = selectedProductsArray[1].image;

            //Producto Tres
            document.getElementById("productThreeName").innerText = selectedProductsArray[2].title.slice(5, 29);
            document.getElementById("productThreePrice").innerText = `$ ${selectedProductsArray[2].price}`;
            document.getElementById("productThreeImage").src = selectedProductsArray[2].image;

            //Producto Cuatro
            document.getElementById("productFourName").innerText = selectedProductsArray[3].title.slice(5, 29);
            document.getElementById("productFourPrice").innerText = `$ ${selectedProductsArray[3].price}`;
            document.getElementById("productFourImage").src = selectedProductsArray[3].image;
           

        })
    })

        //Vista de productos generales activa por defecto
        //Producto Uno
        document.getElementById("productOneName").innerText = data[0].title.slice(0, 28);
        document.getElementById("productOnePrice").innerText = `$ ${data[0].price}`;
        document.getElementById("productOneImage").src = data[0].image;

        //Producto Dos
        document.getElementById("productTwoName").innerText = data[5].title.slice(5, 29);
        document.getElementById("productTwoPrice").innerText = `$ ${data[5].price}`;
        document.getElementById("productTwoImage").src = data[5].image;

        //Producto Tres
        document.getElementById("productThreeName").innerText = data[10].title.slice(7, 32);
        document.getElementById("productThreePrice").innerText = `$ ${data[10].price}`;
        document.getElementById("productThreeImage").src = data[10].image;

        //Producto Cuatro
        document.getElementById("productFourName").innerText = data[15].title.slice(9, 32);
        document.getElementById("productFourPrice").innerText = `$ ${data[15].price}`;
        document.getElementById("productFourImage").src = data[15].image;


        document.querySelectorAll(".addButton").forEach(e => {
            e.addEventListener("click", elem => {

                let contenedor = document.getElementById("dropdownCar");
                let addedMessage = document.createElement("p");
                addedMessage.innerText = "Agregado ✓";

                contenedor.appendChild(addedMessage);

                setTimeout(function(){ contenedor.removeChild(addedMessage); }, 3000);

            })
        })            
}

 //El siguiente codigo se encarga de actualizar el array de productos mostrados en la pagina principal de acuerdo a la categoria elegida por el usuario.
    
    // document.addEventListener("click", myFunction);

    // function myFunction() {
    // document.getElementById("demo").innerHTML = "Hello World";
    // }

    // let productCategories = document.querySelector("#dropdownMenu");

    // productCategories.addEventListener("click", myFunction);

    // function myFunction() {
    //     console.log(productCategories);
    // }

//El siguiente codigo es una prueba con la idea de agregar al DOM los productos que provengan del API independientemente de que varie la cantidad. (Error para actualizar al cambiar categoria)

    //console.log(selectedProductsArray);
            // console.log(data.filter(e => e.category === "jewelery"));                        

            // selectedProductsArray.forEach(elemento => {           

            //     let parentNode = document.querySelector(".productsContainer");
            //     let newDivElement = document.createElement("div");
            //     newDivElement.className = "products";

            //     let newAnchorProduct = document.createElement("a");
            //     newAnchorProduct.className = "anchorProduct";
            //     newAnchorProduct.href = "./indexTwo.html";
            //     newAnchorProduct.target = "_blank"                

            //     let newImgProduct = document.createElement("img");
            //     newImgProduct.className = "productsImage";
            //     newImgProduct.src = elemento.image;

            //     let newProductInfoCont = document.createElement("div");
            //     newProductInfoCont.className = "productInfoContainer";

            //     let nameLabel = document.createElement("p");
            //     nameLabel.className = "productName";
            //     nameLabel.innerText = elemento.title.slice(5, 29);

            //     let priceLabel = document.createElement("p");
            //     priceLabel.className = "productPrice"
            //     priceLabel.innerText = `$ ${elemento.price}`;

            //     let addButton = document.createElement("button")
            //     addButton.className = "addButton";
            //     addButton.innerText = "Agregar"; 

            //     newAnchorProduct.appendChild(newImgProduct);
            //     newDivElement.appendChild(newAnchorProduct);                                
            //     parentNode.appendChild(newDivElement);
                
            //     newProductInfoCont.appendChild(nameLabel);
            //     newProductInfoCont.appendChild(priceLabel);
            //     newProductInfoCont.appendChild(addButton);
            //     newDivElement.appendChild(newProductInfoCont);      
                
            // });
            // console.log("Esto es lo que cargo "+parentNode.childNodes);