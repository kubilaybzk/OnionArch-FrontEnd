import React from "react";

import DeleteProductButton from "./DeleteProductButton";
import Image from "next/image";
import EditProductButton from "./EditProductButton";

export default function ProductCard({ item, keyValue }) {
  return (
    <article
      key={keyValue}
      className="relative flex flex-col overflow-hidden rounded-lg border"
    >
      <div className="aspect-square relative overflow-hidden p-4 ">
        {item.productImageFiles[0] ? (
          <Image
            fill
            className="h-full p-4 w-full object-contain  border-2 border-black  rounded-lg transition-all duration-300 group-hover:scale-125"
            src={`${process.env.IMAGE_URL}${item.productImageFiles[0].path}`}
            placeholder="blur"
            blurDataURL="public/son.png"
            alt=""
          />
        ) : (
          <Image
            fill
            className="h-full p-4 w-full object-contain  border-2 border-black  rounded-lg transition-all duration-300 group-hover:scale-125"
            src={"/son.png"}
            placeholder="blur"
            blurDataURL="public/son.png"
            alt=""
          />
        )}
      </div>
      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
        <div className="mb-2 flex flex-col">
          <p className="mr-3 text-sm font-medium flex flex-row gap-3">
            <b>Name:</b>
            {item.name}
          </p>
          <p className="mr-3 text-sm font-medium flex flex-row gap-3">
            <b>Price:</b>
            {item.price}
          </p>
          <p className="mr-3 text-sm font-medium flex flex-row gap-3">
            <b>Stock:</b>
            {item.stock}
          </p>
        </div>
      </div>
      <DeleteProductButton id={item.id} />
      <EditProductButton ID={item.id} />
    </article>
  );
}
