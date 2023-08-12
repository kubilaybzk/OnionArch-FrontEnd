"use client";
import { toast } from "react-toastify";

export async function DeleteProduct(id) {
  console.log(id);
  let responce = await fetch(
    `http://localhost:7039/api/Products/DeleteProductById?id=${id}`,
    { method: "DELETE" }
  );
  let result = await responce.json();

  if (result) {
    toast.success("Ürün başarıyla Silindi", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    
  } else {
    toast.error("Ürün silinemedi."),
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      };
  }

  return result;
}

export default { DeleteProduct };
