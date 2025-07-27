import { supabase } from "./supabaseClient.js";
import { v4 as uuidv4 } from "https://esm.sh/uuid";

/** 📤 Upload image to Supabase Storage */
export async function uploadImage(file) {
  // Validate file type and size
  if (!file?.type?.startsWith("image/")) {
    alert("Only image files are allowed.");
    return null;
  }
  if (file.size === 0) {
    alert("Cannot upload an empty file.");
    return null;
  }

  const cleanName = file.name.replace(/[^\w.-]/g, "_");
  const filePath = `${Date.now()}-${cleanName}`;

  console.log("Uploading image:", filePath);

  const { error: uploadError } = await supabase.storage
    .from("dish-images")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    alert("Image upload failed. See console for details.");
    console.error("Upload error:", uploadError.message);
    return null;
  }

  const { data: publicData } = supabase.storage
    .from("dish-images")
    .getPublicUrl(filePath);

  const imageUrl = publicData?.publicUrl || null;
  if (!imageUrl) {
    alert("Image URL could not be retrieved.");
    return null;
  }

  return imageUrl;
}

/** 🍽️ Upload dish metadata to `dishes` table */
export async function uploadDish({ title, price, shop, file }) {
  const image_url = await uploadImage(file);
  if (!image_url) return false;

  const id = uuidv4(); // Optional override

  const { error: insertError } = await supabase
    .from("dishes")
    .insert([{ id, title, price, shop, image_url }]);

  if (insertError) {
    alert("Dish creation failed due to permission or RLS issues.");
    console.error("Insert error:", insertError.message);
    return false;
  }

  alert("Dish uploaded successfully 🎉");
  console.log("Dish inserted successfully ✅");
  return true;
}
