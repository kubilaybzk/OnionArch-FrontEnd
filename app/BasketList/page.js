import { GetBasketItems } from "@/libs/BackendApi";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import BasketListItem from "@/Components/BasketList/BasketListItem";
import Link from "next/link";
import FormatMoney from "@/utils/FormatMoney";
export default async function BasketList() {
  const AccessToken = await getServerSession(authOptions);

  if (!AccessToken) {
    redirect("/Login?callbackUrl=/BasketList");
  }

  let BasketItemList = await GetBasketItems(AccessToken.accessToken);

  return (
    <>
      <div className="h-screen  pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">
          Alışveriş Sepetiniz
        </h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {BasketItemList.basketItems.length > 0 ? (
              BasketItemList.basketItems.map((item, key) => {
                return <BasketListItem EachBasketItem={item} key={key} />;
              })
            ) : (
              <div className="w-full border-2 h-full flex flex-col justify-center items-center">
                <ShoppingCartIcon className="text-sm w-24 h-2w-24 text-red-500" />
                <span className="text-lg font-bold">
                  Sepetiniz şuan malesef <b className="text-Primary">Boş</b> !
                </span>
                <span className="text-md w-10/12 text-center mt-3">
                  Alışverişe devam etmek isterseniz aşağıda bulunan button
                  üzerinden <b className="text-Primary">Önerilen ve Fırsat </b>
                  ürünlerini görebilirsiniz.
                </span>

                <Link
                  href="#"
                  className="mt-4 bg-Primary text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Önerilen Ürünler
                </Link>
              </div>
            )}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <h1 className="text-xl font-bold mb-4">Sepet Özeti</h1>
            <hr className="my-4" />
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Sepet Tutarı</p>
              <p className="text-gray-700">
                {BasketItemList.totalProductPrice
                  ? FormatMoney(BasketItemList.totalProductPrice)
                  : " 0 "}
                ₺
              </p>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Ürün İndirimleri</p>
              <p className="text-gray-700">
                {BasketItemList.totalDiscount
                  ? FormatMoney(BasketItemList.totalDiscount)
                  : " 0 "}
                ₺
              </p>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Kargo</p>
              <p className="text-gray-700">
                {BasketItemList.CargoPrice
                  ? FormatMoney(BasketItemList.CargoPrice)
                  : " 0 "}
                ₺
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Toplam Tutar</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  {BasketItemList.totalPrice
                    ? FormatMoney(BasketItemList.totalPrice)
                    : " 0 "}
                  ₺
                </p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-Primary py-1.5 font-medium text-blue-50 hover:bg-PrimaryHover">
              Sepeti Onayla
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
