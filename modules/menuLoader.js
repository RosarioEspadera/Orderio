import { supabase } from "./supabaseClient.js";

async function fetchDishes() {
  const { data, error } = await supabase
    .from("dishes")
    .select("*");

  if (error) {
    console.error("Supabase fetch error:", error);
    return [];
  }

  return data;
}

async function renderDishes() {
  const dishes = await fetchDishes();
  menuGrid.innerHTML = "";

  dishes.forEach(dish => {
    const card = document.createElement("div");
    card.className = "dish-card";
    card.innerHTML = `
      <img src="${dish.image_url}" alt="${dish.title}" />
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
