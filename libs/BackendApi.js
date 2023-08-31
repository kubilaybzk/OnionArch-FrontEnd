"use client";
import ErrorToast from "@/Components/SharedUI/Toast/ErrorToast";
import SuccesToast from "@/Components/SharedUI/Toast/SuccesToast";
import { toast } from "react-toastify";

export async function AddProduct({ values }) {
  let PostData2 = await fetch(
    `http://localhost:61850/api/Products/CreateOneProduct?Name=${values.Name}&Stock=${values.Stock}&Price=${values.Price}`,
    { method: "POST" }
  );
  console.log(PostData2);
  let PostData = await PostData2.json();
  console.log(PostData);

  if (!PostData2.ok) {
    if (PostData2.status === 400) {
      {
        PostData.map((item, key) => ErrorToast(item.value[0], key));
      }
    }
  } else {
    SuccesToast("Ürün başarıyla Eklendi");
  }
  return PostData;
}

export async function DeleteProduct(id) {
  console.log(id);
  let responce = await fetch(
    `http://localhost:61850/api/Products/DeleteProductById?id=${id}`,
    { method: "DELETE" }
  );
  let result = await responce.json();

  if (result) {
    SuccesToast("Ürün başarıyla Silindi");
  } else {
    ErrorToast("Ürün silinemedi.");
  }

  return result;
}

export async function GetAllProducts(page,size) {
  let data = await fetch(
    `http://localhost:61850/api/Products/GetAll?Page=${page}&Size=${size}`,
    {}
  );
  let datas2 = await data.json();
  return datas2;
}

export default { DeleteProduct, AddProduct, GetAllProducts };
