const items = [
  { name: "Apples", price: 100, image: "apples.jpg" },
  { name: "Banana", price: 40, image: "banana.jpg" },
  { name: "Butter", price: 70, image: "butter.jpg" },
  { name: "Cheese", price: 150, image: "cheese.jpg" },
  { name: "Grapes", price: 120, image: "grapes.jpg" },
  { name: "Mango", price: 150, image: "mango.jpg" },
  { name: "Milk", price: 55, image: "milk.jpg" },
  { name: "Oil", price: 250, image: "oil.jpg" },
  { name: "Oranges", price: 60, image: "oranges.jpg" },
  { name: "Paneer", price: 120, image: "paneer.jpg" },
  { name: "Pulses", price: 80, image: "pulses.jpg" },
  { name: "Rice", price: 80, image: "rice.jpg" },
  { name: "Sugar", price: 45, image: "sugar.jpg" },
  { name: "Wheat-Flour", price: 90, image: "wheat-flour.jpg" },
  { name: "Yoghurt", price: 45, image: "yogurt.jpg" },
];

let cart = {};

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const cartCount = document.getElementById("cartCount");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalDisplay = document.getElementById("cartTotal");

  // Render products
  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-white p-4 rounded-lg shadow hover:shadow-xl transition hover:scale-105";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-full h-32 object-cover rounded mb-3" />
      <h3 class="font-semibold text-md">${item.name}</h3>
      <p class="text-sm text-gray-600 mb-2">₹${item.price}</p>
      <button class="add-to-cart bg-green-600 text-white px-3 py-1 rounded w-full hover:bg-green-700 transition" data-index="${index}">
        Add to Cart
      </button>
    `;

    main.appendChild(card);
  });

  // Add to cart
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const index = e.target.getAttribute("data-index");
      const item = items[index];

      if (cart[item.name]) {
        cart[item.name].qty++;
      } else {
        cart[item.name] = { ...item, qty: 1 };
      }

      updateCartDisplay();
      openCart();
    }
  });

  // Update cart UI
  function updateCartDisplay() {
    const cartEntries = Object.values(cart);
    cartItemsContainer.innerHTML = "";
    let total = 0;
    let count = 0;

    if (cartEntries.length === 0) {
      cartItemsContainer.innerHTML = `<p class="text-center text-gray-500">Your cart is empty.</p>`;
    }

    cartEntries.forEach((item) => {
      total += item.price * item.qty;
      count += item.qty;

      const div = document.createElement("div");
      div.className = "flex items-center justify-between border-b pb-2";

      div.innerHTML = `
        <div class="flex items-center gap-3">
          <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded" />
          <div>
            <h4 class="font-semibold">${item.name}</h4>
            <p class="text-sm text-gray-600">₹${item.price} × ${item.qty}</p>
          </div>
        </div>
        <div class="flex flex-col items-end gap-1">
          <div class="flex gap-2 items-center">
            <button class="text-xl px-2 bg-gray-200 rounded decrease" data-name="${item.name}">−</button>
            <span>${item.qty}</span>
            <button class="text-xl px-2 bg-gray-200 rounded increase" data-name="${item.name}">+</button>
          </div>
          <button class="text-xs text-red-600 hover:underline remove" data-name="${item.name}">Remove</button>
        </div>
      `;

      cartItemsContainer.appendChild(div);
    });

    cartTotalDisplay.textContent = `Total: ₹${total}`;
    cartCount.textContent = count;
  }

  // Handle cart button clicks
  cartItemsContainer.addEventListener("click", (e) => {
    const name = e.target.getAttribute("data-name");
    if (!name) return;

    if (e.target.classList.contains("increase")) {
      cart[name].qty++;
    } else if (e.target.classList.contains("decrease")) {
      cart[name].qty--;
      if (cart[name].qty <= 0) {
        delete cart[name];
      }
    } else if (e.target.classList.contains("remove")) {
      delete cart[name];
    }

    updateCartDisplay();
  });

  // Open/Close Cart
  function openCart() {
    cartSidebar.classList.remove("translate-x-full");
  }

  function closeCart() {
    cartSidebar.classList.add("translate-x-full");
  }

  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", closeCart);
});
