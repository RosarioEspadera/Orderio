import { uploadDish } from "./modules/UploadPanel.js";

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = document.getElementById("dishImage").files[0];
  const title = document.getElementById("dishTitle").value;
  const price = document.getElementById("dishPrice").value;
  const shop = document.getElementById("dishShop").value;

  const success = await uploadDish({ title, price, shop, file });

  if (success) {
    alert("Dish uploaded successfully!");
    document.getElementById("uploadForm").reset();
  } else {
    alert("Something went wrong during upload.");
  }
});
