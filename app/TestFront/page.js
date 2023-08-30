"use client";
import ErrorToast from "@/Components/SharedUI/Toast/ErrorToast";
import SuccesToast from "@/Components/SharedUI/Toast/SuccesToast";
import ProductCard from "@/Components/ProductCard";
import React from "react";
import Pagination from "@/Components/SharedUI/Pagination";
import { revalidateTag } from "next/cache";

function CreateProductWithImage({ searchParams }) {
  const handleSubmit = async (FormData) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}Products/CreateOneProductWithImage`,
        {
          method: "POST",
          body: FormData,
        }
      );
      console.log(response);
      let responce2 = await response.json();
      console.log(responce2);

      if (
        response.status === 201 ||
        response.status === 200 ||
        response.status.ok
      ) {
        SuccesToast("Başarılı");
      } else {
        responce2&&responce2.map((item,key)=>{
          return ErrorToast(item.value.length>2?item.value[1]:item.value[0]);
        });
      }
    } catch (ex) {
      alert(JSON.stringify(ex));
    }
  };

  return (
    <>
      <div className="flex flex-col p-4  border-2 rounded">
        <h2 className="text-xl font-semibold mb-4">
          Create Product with Image
        </h2>
        <form action={handleSubmit} className="">
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="Name"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block font-medium mb-1">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="Price"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block font-medium mb-1">
              Price:
            </label>
            <input
              type="number"
              id="stock"
              name="Stock"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="images" className="block font-medium mb-1">
              Images:
            </label>
            <input
              type="file"
              id="images"
              name="ProductImages"
              multiple
              className="w-full p-2 border rounded"
            />
          </div>

          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Create Product
          </button>
        </form>
      </div>
      <div></div>
    </>
  );
}

export default CreateProductWithImage;
