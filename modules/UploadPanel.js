import { supabase } from "./supabaseClient.js";
import { v4 as uuidv4 } from "https://esm.sh/uuid";

export async function uploadImage(file) {
  const filePath = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("dish-images")
    .upload(filePath, file);

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

 const { data } = supabase.storage
  .from("dish-images")
  .getPublicUrl(filePath);

const imageUrl = data.publicUrl;

  return imageUrl;
}

export async function uploadDish({ title, price, shop, file }) {
  const image_url = await uploadImage(file);
  if (!image_url) return;

  const id = uuidv4(); // Optional: can be auto-generated via Supabase

  const { error } = await supabase
    .from("dishes")
    .insert([{ id, title, price, shop, image_url }]);

  if (error) {
    console.error("Insert error:", error.message);
    return false;
  }

  return true;
}
