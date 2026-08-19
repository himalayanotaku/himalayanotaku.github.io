const products = [
  {id:1, name:"Himalayan Otaku Classic", price:1499, label:"YOUR DESIGN HERE"},
  {id:2, name:"Akatsuki Street Tee", price:1599, label:"AKATSUKI"},
  {id:3, name:"Jujutsu Street Tee", price:1599, label:"JUJUTSU"},
  {id:4, name:"Himalayan Anime Tee", price:1499, label:"HIMALAYAN"}
];

let cart = JSON.parse(localStorage.getItem("ho_cart") || "[]");

function renderProducts() {
  document.getElementById("products").innerHTML = products.map(p => `
    <article class="product">
      <div class="product-img">${p.label}</div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="price">Rs. ${p.price.toLocaleString()}</div>
        <select class="size-select" id="size-${p.id}">
          <option value="S">Size S</option>
          <option value="M" selected>Size M</option>
          <option value="L">Size L</option>
          <option value="XL">Size XL</option>
          <option value="XXL">Size XXL</option>
        </select>
        <button class="btn add" onclick="addToCart(${p.id})">ADD TO CART</button>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const size = document.getElementById(`size-${id}`).value;
  cart.push({...product, size});
  saveCart();
  openCart();
}

function saveCart() {
  localStorage.setItem("ho_cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  document.getElementById("cartCount").textContent = cart.length;
  const items = document.getElementById("cartItems");
  if (!cart.length) {
    items.innerHTML = "<p class='small'>Your cart is empty.</p>";
  } else {
    items.innerHTML = cart.map((item, i) => `
      <div class="cart-row">
        <div><strong>${item.name}</strong><br><span class="small">Size ${item.size} • Rs. ${item.price.toLocaleString()}</span></div>
        <button class="remove" onclick="removeItem(${i})">Remove</button>
      </div>
    `).join("");
  }
  document.getElementById("cartTotal").textContent = cart.reduce((sum, x) => sum + x.price, 0).toLocaleString();
}

function removeItem(index) {
  cart.splice(index,1);
  saveCart();
}

function openCart() {
  document.getElementById("cartModal").classList.add("show");
  updateCart();
}

function closeCart(e) {
  if (!e || e.target.id === "cartModal") document.getElementById("cartModal").classList.remove("show");
}

function orderOnWhatsApp() {
  if (!cart.length) return alert("Your cart is empty.");
  const phone = "977XXXXXXXXXX"; // Replace with your WhatsApp number
  const lines = cart.map(x => `• ${x.name} — Size ${x.size} — Rs. ${x.price}`).join("\n");
  const total = cart.reduce((sum,x) => sum+x.price,0);
  const message = `Namaste Himalayan Otaku! I want to order:\n\n${lines}\n\nTotal: Rs. ${total}\n\nName:\nAddress:\nPhone:`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
}

function toggleMenu() {
  document.getElementById("nav").classList.toggle("open");
}

document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
updateCart();
