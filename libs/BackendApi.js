"use client";
import { toast } from "react-toastify";

export async function AddProduct({ values }) {
  alert(JSON.stringify(values));
  let PostData2 = await fetch(
    `http://localhost:7039/api/Products/CreateOneProduct?Name=${values.Name}&Stock=${values.Stock}&Price=${values.Price}`,
    { method: "POST" }
  );
  console.log(PostData2);
  let PostData = await PostData2.json();
  console.log(PostData);

  if (!PostData2.ok) {
    if (PostData2.status === 400) {
      {
        PostData.map((item, key) =>
          toast.error(item.value[0], (key = { key }), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            key: { key },
          })
        );
      }
    }
  } else {
    toast.success("Ürün başarıyla Eklendi", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return PostData;
}

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

export default { DeleteProduct, AddProduct };
