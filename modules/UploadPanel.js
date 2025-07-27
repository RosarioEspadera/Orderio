import { supabase } from "./supabaseClient.js";

export async function uploadImage(file) {
  const filePath = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("dish-images")
    .upload(filePath, file);

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const imageUrl = `https://ivbjlarqgmungywotsqu.supabase.co/storage/v1/object/public/dish-images/${filePath}`;
  return imageUrl;
}
