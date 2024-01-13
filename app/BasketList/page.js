import {
  GetBasketItems,
  RemoveBasketItems,
  UpdateQuanityBasketItems,
} from "@/libs/BackendApi";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import BasketListItem from "@/Components/BasketList/BasketListItem";
export default async function BasketList() {
  const AccessToken = await getServerSession(authOptions);

  if (!AccessToken) {
    redirect("/Login?callbackUrl=/BasketList");
  }

  let BasketItemList = await GetBasketItems(AccessToken.accessToken);

  return (
    <>
      <div class="h-screen  pt-20">
        <h1 class="mb-10 text-center text-2xl font-bold">
          Alışveriş Sepetiniz
        </h1>
        <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div class="rounded-lg md:w-2/3">
            {BasketItemList &&
              BasketItemList.map((item, key) => {
                return <BasketListItem EachBasketItem={item} key={key} />;
              })}
          </div>

          <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div class="mb-2 flex justify-between">
              <p class="text-gray-700">Subtotal</p>
              <p class="text-gray-700">$129.99</p>
            </div>
            <div class="flex justify-between">
              <p class="text-gray-700">Shipping</p>
              <p class="text-gray-700">$4.99</p>
            </div>
            <hr class="my-4" />
            <div class="flex justify-between">
              <p class="text-lg font-bold">Total</p>
              <div class="">
                <p class="mb-1 text-lg font-bold">$134.98 USD</p>
                <p class="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
