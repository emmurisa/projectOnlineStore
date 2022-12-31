const URL = 'https://fakestoreapi.com/products'

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
    let categoriesArray = [];
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

            document.querySelectorAll(".products").forEach(e => {
                e.addEventListener("click", elem => {                    

                    let array = data.filter(checkAdult);
                    function checkAdult(d) {
                        return d.title.slice(0, 29) === elem.path[0].innerText;
                    }
                    document.getElementById("productName").innerText = array[0].title;
                    document.getElementById("productDescription").innerText = array[0].description;
                    document.getElementById("productImage").src = array[0].image;
                    document.getElementById("productId").innerText = `- Id: ${array[0].id}`;
                    document.getElementById("productCategory").innerText = `- Category: ${array[0].category}`;
                    document.getElementById("productRate").innerText = `- Rate: ${array[0].rating.rate}`;
                    document.getElementById("productCount").innerText = `- Count: ${array[0].rating.count}`;

                })
            })
        })
    })

    //Primer producto del API cargado en el DOM as a default product

    document.getElementById("productName").innerText = data[0].title;
    document.getElementById("productDescription").innerText = data[0].description;
    document.getElementById("productImage").src = data[0].image;
    document.getElementById("productId").innerText = `- Id: ${data[0].id}`;
    document.getElementById("productCategory").innerText = `- Category: ${data[0].category}`;
    document.getElementById("productRate").innerText = `- Rate: ${data[0].rating.rate}`;
    document.getElementById("productCount").innerText = `- Count: ${data[0].rating.count}`;

    //Codigo encargado de mostrar la leyenda de agregado al clickear el boton de agregar producto.
    document.getElementById("addButton").addEventListener("click", elem => {

        let contenedor = document.getElementById("dropdownCar");
        contenedor.display = "block";
        let addedMessage = document.createElement("p");
        addedMessage.innerText = "Agregado ✓";
        contenedor.appendChild(addedMessage);

        setTimeout(function () { contenedor.removeChild(addedMessage); }, 3000);

    })

}

// Prueba para agregar todas las categorias en el DOM (error dado que al elegir diferente categoria no reemplaza las anteriores)            
            // selectedProductsArray.forEach(e => {
            //     console.log(e.title);
            //     let subMenu = document.getElementById("dropdownTwoMenu");
            //     // let newDivProduct = document.createElement("div");
            //     // newDivProduct.className = "dropdownTwo-content";

            //     let newProduct = document.createElement("p");
            //     newProduct.innerText = e.title.slice(5, 29);

            //     // newDivProduct.appendChild(newProduct);
            //     subMenu.appendChild(newProduct);
            // });
            

//Otra opcion para cargar las imagenes de los productos seleccionados
// data.forEach(element => {
//     console.log(element.title.slice(0, 29));
//     if (element.title.slice(0, 29) === elem.path[0].innerText) {
//         document.getElementById("productImage").src = element.image;

//     }

// });
