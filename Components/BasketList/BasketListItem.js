"use client";

import React, { useState } from "react";
import FormatMoney from "@/utils/FormatMoney";
import Image from "next/image";
import { TrashIcon,ArrowPathIcon } from "@heroicons/react/24/solid";
import { RemoveBasketItems, UpdateQuanityBasketItems } from "@/libs/BackendApi";
import SuccesToast from "../SharedUI/Toast/SuccesToast";
import ErrorToast from "../SharedUI/Toast/ErrorToast";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
export default function BasketListItem({ EachBasketItem }) {
  let ShowCaseImage = (item) => {
    let result = item.filter((p) => p.showcase == true);
    return result[0].path;
  };

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/Login?callbackUrl=BasketList");
    },
  });

  let [quantity, setQuantity] = useState(EachBasketItem.quantity);
  let [loading, setLoading] = useState(false);
  let Router = useRouter();

  async function DeleteAsyn(DeletedProductId) {
    let result = await RemoveBasketItems(
      session?.accessToken,
      DeletedProductId
    );
    if (result.ok) {
      SuccesToast("Ürün Sepetinizden başarıyla kaldırıldı");
      Router.refresh();
    } else {
      ErrorToast("Ürün Sepetinizden kaldırılamadı");
    }
  }

  async function UpdateProductQuantity(newProductQuantity, ProductId) {
    setLoading(true);
    let UpdateRequest = await UpdateQuanityBasketItems(
      session?.accessToken,
      ProductId,
      newProductQuantity
    );
    if (UpdateRequest == false) {
      ErrorToast("Güncelleme başarısız");
    } else {
      SuccesToast("Güncelleme başarılı");
      Router.refresh();
    }
    setQuantity(newProductQuantity);
    setLoading(false);
  }

  return (
    <>
      <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        {/* image */}
        <div className="aspect-square sm:w-[140px] sm:h-[100px] relative overflow-hidden p-4 ">
          <Image
            fill
            className="h-full p-4 w-full object-contain  border-2 border-gray-600  rounded-lg transition-all duration-300 group-hover:scale-125"
            src={
              ShowCaseImage(EachBasketItem.product.productImageFiles) != null
                ? `http://localhost:5031/${ShowCaseImage(
                    EachBasketItem.product.productImageFiles
                  )}`
                : `/son.png`
            }
            placeholder="blur"
            blurDataURL="public/son.png"
            alt=""
          />
        </div>
        {/* Product İnfo */}
        <div className="flex flex-col w-full">
          {/* Product Name*/}
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">
                {EachBasketItem.product.name}
              </h2>
            </div>
          </div>
          {/* Product Price and Quantity*/}
          <div className="flex flex-col justify-center items-center gap-4 md:gap-0 sm:flex-row w-full mt-4 px-5 py-3 md:justify-between">
            <div className="flex flex-row flex-1 w-full ">
              <button
                onClick={() =>
                  UpdateProductQuantity(
                    quantity - 1,
                    EachBasketItem.basketItemId
                  )
                }
                className="bg-white flex-1 text-center justify-center md:flex-none rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
              >
                -
              </button>
              <div className="bg-gray-100 flex-1 text-center justify-center md:flex-none border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                {!loading ? quantity :  <ArrowPathIcon className="text-sm w-3 h-3 text-Primary animate-spin" />}
              </div>
              <button
                onClick={() =>
                  UpdateProductQuantity(
                    quantity + 1,
                    EachBasketItem.basketItemId
                  )
                }
                className="bg-white rounded-r flex-1 text-center justify-center md:flex-none border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
              >
                +
              </button>
            </div>
            <div className="flex sm:items-end sm:justify-end flex-1  space-x-4">
              <p className="text-sm text-green-400">
                {FormatMoney(EachBasketItem.product.price)} ₺
              </p>
              <TrashIcon
                onClick={() => DeleteAsyn(EachBasketItem.basketItemId)}
                className="bg-red-500 text-white w-6 h-6 p-1 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
