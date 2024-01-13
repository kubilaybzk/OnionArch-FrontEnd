import React from "react";

import DeleteProductButton from "./DeleteProductButton";
import Image from "next/image";
import EditProductButton from "./EditProductButton";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddBasketButton from "./AddBasketButton";
import FormatMoney from "@/utils/FormatMoney";

export default async function ProductCard({ item, keyValue, admin = false }) {
  const session = await getServerSession(authOptions);
  let ShowCaseImage = (item) => {
    let result = item.filter((p) => p.showcase == true);
    return result[0].path;
  };
  return (
    <article
      key={keyValue}
      className="relative flex flex-col overflow-hidden rounded-lg border"
    >
      <div className="aspect-square relative overflow-hidden p-4 ">
        <Image
          fill
          className="h-full p-4 w-full object-contain  border-2 border-gray-600 rounded-br-none rounded-bl-none  rounded-lg transition-all duration-300 group-hover:scale-125"
          src={
            ShowCaseImage(item.productImageFiles) != null
              ? `http://localhost:5031/${ShowCaseImage(item.productImageFiles)}`
              : `/son.png`
          }
          placeholder="blur"
          blurDataURL="public/son.png"
          alt=""
        />
      </div>
      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
        <div className="mb-2 flex flex-col w-full">
          <p className="mr-3 text-md h-[50px] TextOverFlow-2 text- font-semibold text-center w-full flex flex-row gap-3">
            {item.name}
          </p>

          <div className="flex flex-row mt-3 justify-between items-center align-middle">
            <div className=" flex flex-col justify-center items-center align-middle px-3 py-2 bg-red-500 text-white font-bold rounded">
              <span className="text-sm">%20</span>
              <span className="text-[10px]">indirim</span>
            </div>
            <div className="flex flex-col justify-center items-center text-center">
              <p className="mr-3 line-through text-gray-500 text-xs font-extrabold flex flex-row gap-1">
                {FormatMoney(item.price)} <b>₺</b>
              </p>
              <p className="mr-3 text-base font-extrabold flex flex-row gap-1">
                {FormatMoney((item.price * 20) / 100)} <b>₺</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      {admin ? (
        <>
          <DeleteProductButton id={item.id} AccessToken={session.accessToken} />
          <EditProductButton
            AccessToken={session.accessToken}
            ID={item.id}
            Price={item.price}
            Stock={item.stock}
            Name={item.name}
          />
        </>
      ) : (
        <AddBasketButton id={item.id} AccessToken={session.accessToken} />
      )}
    </article>
  );
}
