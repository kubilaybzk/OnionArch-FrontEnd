import ProductList from "@/Components/ClientSideFileUpload/ProductList";
import ErrorToast from "@/Components/SharedUI/Toast/ErrorToast";
import SuccesToast from "@/Components/SharedUI/Toast/SuccesToast";
import { headers } from "next/headers";
import ProductCard from "@/Components/ProductCard";
import React from "react";
import Pagination from "@/Components/SharedUI/Pagination";
import { revalidateTag } from "next/cache";

async function CreateProductWithImage({ params, searchParams }) {
  const handleSubmit = async (FormData) => {
    "use server";
    // const formData = new FormData();
    // formData.append("Name", product.Name);
    // formData.append("Price", product.Price);
    // formData.append("Stock", product.Stock);
    // for (let i = 0; i < imageFiles.length; i++) {
    //   formData.append("files", imageFiles[i]);
    // }

    try {
      const response = await fetch(
        "http://localhost:7039/api/Products/CreateOneProductWithImage",
        {
          method: "POST",
          body: FormData,
        }
      );

      if (response.status === 201) {
        SuccesToast("Başarılı");
      } else {
        ErrorToast("Error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    revalidateTag("Products");
  };
  const headersList = headers();
  const header_url = headersList.get("x-invoke-path") || "";
  const CurrentPage = searchParams.Page || "0";
  let rest = await fetch(
    `http://localhost:7039/api/Products/GetAll?Page=${CurrentPage}`,
    {
      cache: "no-cache",
      next: {
        tags: ["Products"],
      },
    }
  );
  let Products = await rest.json();

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
      {/* <div className="grid mt-12 grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8 max-w-[1200px] mx-auto">
        {Products &&
          Products.products.map((item, key) => {
            return <ProductCard item={item} keyValue={key} />;
          })}
      </div>
      <div className="w-full flex flex-row justify-center items-center mt-4">
        <Pagination
          hasNext={Products ? Products.hasNext : false}
          hasPrev={Products ? Products.hasPrev : 0}
          totalCount={Products ? Products.totalCount : 0}
          totalPageSize={Products ? Products.totalPageSize : 0}
          currentPage={Products ? Products.currentPage : 0}
          pagesize={Products ? Products.pagesize : 0}
          pathName={header_url}
        />
      </div> */}
      <div>
    
        {JSON.stringify(Products.products.$values[0].name)}
      </div>
    </>
  );
}

export default CreateProductWithImage;
