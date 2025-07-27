// Sample dish data – replace with Supabase fetch later
const dishes = [
  {
    title: "Flat White",
    price: "₱110",
    shop: "Rio’s Café",
    image: "https://github.com/RosarioEspadera/OrderCafe/blob/main/public/images/FlatWhite.png"
  },
  {
    title: "Steak",
    price: "₱180",
    shop: "Rio’s Café",
    image: "https://github.com/RosarioEspadera/OrderCafe/blob/main/public/images/Steak.png"
  }
];

const categories = ["Rice Meals", "Drinks", "Vegetarian"];

const cart = [];
const menuGrid = document.getElementById("menuGrid");
const categoryTabs = document.getElementById("categoryTabs");
const floatingCart = document.getElementById("floatingCart");

function renderCategories() {
  categoryTabs.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    categoryTabs.appendChild(btn);
  });
}

function renderDishes() {
  menuGrid.innerHTML = "";
  dishes.forEach(dish => {
    const card = document.createElement("div");
    card.className = "dish-card";
    card.innerHTML = `
      <img src="${dish.image}" alt="${dish.title}" />
      <h2>${dish.title}</h2>
      <p>${dish.price} · ${dish.shop}</p>
      <button>Add to Cart</button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      cart.push(dish);
      updateCart();
    });
    menuGrid.appendChild(card);
  });
}

function updateCart() {
  floatingCart.textContent = `🛒 ${cart.length} items`;
}

renderCategories();
renderDishes();
