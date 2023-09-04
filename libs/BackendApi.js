import ErrorToast from "@/Components/SharedUI/Toast/ErrorToast";
import SuccesToast from "@/Components/SharedUI/Toast/SuccesToast";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
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

export async function DeleteProduct(id, AccessToken) {
  let responce = await fetch(
    `http://localhost:61850/api/Products/DeleteProductById?id=${id}`,
    {
      method: "DELETE",

      headers: {
        authorization: `Bearer ${AccessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  let result = await responce.json();

  if (result) {
    SuccesToast("Ürün başarıyla Silindi");
  } else {
    ErrorToast("Ürün silinemedi.");
  }

  return result;
}

export async function GetAllProducts(page, size) {
  let data = await fetch(
    `http://localhost:61850/api/Products/GetAll?Page=${page}&Size=${size}`,
    {}
  );
  let datas2 = await data.json();
  return datas2;
}

export async function updateProduct(updateData, AccessToken) {
  console.log(AccessToken);
  console.log(updateData);
  try {

    const request = await fetch(
      `http://localhost:61850/api/Products/UpdateProductById`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${AccessToken}`,
        },
        body: JSON.stringify(updateData),
      }
    );

    console.log(request);
    let responce = await request.json();
    console.log(responce);
    
    return request.ok;
  } catch (error) {
    return false;
  }
}

export default { DeleteProduct, AddProduct, GetAllProducts, updateProduct };
