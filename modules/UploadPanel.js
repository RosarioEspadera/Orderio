import { supabase } from "./supabaseClient.js";
import { v4 as uuidv4 } from "https://esm.sh/uuid";

/** 📤 Upload image to Supabase Storage */
export async function uploadImage(file) {
  const cleanName = file.name.replace(/[^\w.-]/g, "_");
  const filePath = `${Date.now()}-${cleanName}`;

  console.log("Uploading image:", filePath);
  console.log("File type:", file?.type, "Size:", file?.size);

  const { error: uploadError } = await supabase.storage
    .from("dish-images")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error("Upload error:", uploadError.message);
    return null;
  }

  const { data: publicData } = supabase.storage
    .from("dish-images")
    .getPublicUrl(filePath);

  return publicData?.publicUrl || null;
}

/** 🍽️ Upload dish metadata to `dishes` table */
export async function uploadDish({ title, price, shop, file }) {
  const image_url = await uploadImage(file);
  if (!image_url) return false;

  const id = uuidv4(); // Optional: Supabase can auto-generate

  const { error: insertError } = await supabase
    .from("dishes")
    .insert([{ id, title, price, shop, image_url }]);

  if (insertError) {
    console.error("Insert error:", insertError.message);
    return false;
  }

  console.log("Dish inserted successfully ✅");
  return true;
}
