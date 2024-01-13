import ErrorToast from "@/Components/SharedUI/Toast/ErrorToast";
import SuccesToast from "@/Components/SharedUI/Toast/SuccesToast";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Backend_URL } from "./Constants";

export async function AddProduct({ values }) {
  let PostData2 = await fetch(
    `${Backend_URL}Products/CreateOneProduct?Name=${values.Name}&Stock=${values.Stock}&Price=${values.Price}`,
    { method: "POST" }
  );

  let PostData = await PostData2.json();

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
    `${Backend_URL}Products/DeleteProductById?id=${id}`,
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

export async function GetAllProducts(page, size, Revalidate, RevalidateTag) {
  let data = await fetch(
    `${Backend_URL}Products/GetAll?Page=${page}&Size=${size}`,
    Revalidate
      ? {
          cache: "no-cache",
          next: {
            tags: [RevalidateTag],
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      : {}
  );
  let datas2 = await data.json();
  return datas2;
}

export async function updateProduct(updateData, AccessToken) {
  try {
    const request = await fetch(`${Backend_URL}Products/UpdateProductById`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${AccessToken}`,
      },
      body: JSON.stringify(updateData),
    });

    let responce = await request.json();

    return request.ok;
  } catch (error) {
    return false;
  }
}

export async function AddBasketAsync(ProductID, ProductQuantity, AccessToken) {
  const data = {
    productId: ProductID,
    quantity: ProductQuantity,
  };

  const request = await fetch(`${Backend_URL}Baskets/AddItemToBasket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${AccessToken}`,
    },
    body: JSON.stringify(data),
  });

  let result = await request.json();

  console.log(request);
  return result;
}

export async function GetBasketItems(AccessToken) {
  const url = "http://localhost:5031/api/Baskets/GetBasketItems";
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${AccessToken}`,
    },
    next: {
      tags: ["BasketListRevalidate"],
    },
  });

  let result = await response.json();
  return result;
}

export async function RemoveBasketItems(AccessToken, basketItemId) {
  let request = await fetch(
    `${Backend_URL}Baskets/RemoveBasketItem?BasketItemId=${basketItemId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${AccessToken}`,
      },
    }
  );

  return request;
}

export async function UpdateQuanityBasketItems(
  AccessToken,
  ProductID,
  ProductQuantity
) {
  const data = {
    basketItemId: ProductID,
    quantity: ProductQuantity,
  };

  const request = await fetch(`${Backend_URL}Baskets/UpdateQuantity`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${AccessToken}`,
    },
    body: JSON.stringify(data),
  });

  let result = await request.json();
  console.log(result.status);
  return result.status;
}

export default {
  DeleteProduct,
  AddProduct,
  GetAllProducts,
  updateProduct,
  AddBasketAsync,
  GetBasketItems,
};
