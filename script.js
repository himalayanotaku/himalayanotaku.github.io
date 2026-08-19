const products = [

    {
        id: 1,
        name: "Shadow Ronin Tee",
        price: 25,
        image: "images/shirt1.jpg"
    },

    {
        id: 2,
        name: "Cyber Neko Tee",
        price: 27,
        image: "images/shirt2.jpg"
    },

    {
        id: 3,
        name: "Moon Samurai Tee",
        price: 25,
        image: "images/shirt3.jpg"
    },

    {
        id: 4,
        name: "Demon Spirit Tee",
        price: 29,
        image: "images/shirt4.jpg"
    }

];


let cart = [];


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


/* ADD TO CART */

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );


    cart.push(product);


    updateCart();

}


/* UPDATE CART */

function updateCart() {

    const items =
        document.getElementById(
            "cart-items"
        );


    const count =
        document.getElementById(
            "cart-count"
        );


    const totalElement =
        document.getElementById(
            "cart-total"
        );


    count.textContent =
        cart.length;


    if (cart.length === 0) {

        items.innerHTML = `
            <p class="empty">
                Your cart is empty.
            </p>
        `;


        totalElement.textContent =
            "0.00";


        return;

    }


    let total = 0;


    items.innerHTML = "";


    cart.forEach(
        (product, index) => {

            total += product.price;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "cart-item";


            item.innerHTML = `

                <strong>
                    ${product.name}
                </strong>

                <p>
                    $${product.price.toFixed(2)}
                </p>

                <button
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            `;


            items.appendChild(item);

        }
    );


    totalElement.textContent =
        total.toFixed(2);

}


/* REMOVE FROM CART */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* OPEN CART */

document
    .getElementById("cart-button")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("cart")
                .classList
                .add("open");

        }
    );


/* CLOSE CART */

document
    .getElementById("close-cart")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("cart")
                .classList
                .remove("open");

        }
    );


/* ORDER BUTTON */

document
    .getElementById("order-button")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            let message =
                "Your order contains:\n\n";


            cart.forEach(product => {

                message +=
                    product.name +
                    " - $" +
                    product.price +
                    "\n";

            });


            alert(message);

        }
    );


/* START WEBSITE */

showProducts();

updateCart();
