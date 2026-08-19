const products = [

    {
        id: 1,
        name: "Luffy Sunset Oversized Tee",
        price: 1500,
        image: "images/shirt1.jpg"
    },

];


/* SHOW PRODUCTS */

function showProducts() {

    const container =
        document.getElementById("products");


    container.innerHTML = "";


    products.forEach(product => {

        const card =
            document.createElement("div");


        card.className =
            "product";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>


                <p>
                    Original anime-inspired
                    streetwear
                </p>


                <div class="price">
                    $${product.price.toFixed(2)}
                </div>


                <button
                    class="add-button"
                    onclick="addToCart(${product.id})"
                >
                    ADD TO CART
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}




            
/* START WEBSITE */

showProducts();

updateCart();
