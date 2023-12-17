import ErrorToast from "@/Components/SharedUI/Toast/ErrorToast";
import SuccesToast from "@/Components/SharedUI/Toast/SuccesToast";
import { headers } from "next/headers";
import ProductCard from "@/Components/ProductCard";
import React from "react";
import Pagination from "@/Components/SharedUI/Pagination";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { GetAllProducts } from "@/libs/BackendApi";
import { Backend_URL } from "@/libs/Constants";
import ShowToastOnServer from "@/libs/ShowErrorMessage";
import { toast } from "react-toastify";
import ErrorTostClient from "@/libs/ErrorTostClient";

class AtomicState {
  constructor() {
    this.messages = [];
    this.Type = "";
  }

  addMessage(message, Type) {
    this.messages.push(message);
    this.Type = Type;
  }

  getMessages() {
    const messages = this.messages;
    const Type = this.Type;
    return { Type, messages };
  }

  clearAllMessages() {
    this.messages = []; // messages dizisini boşalt
    this.Type = ""; // Type özelliğini boşalt
  }
}

const state = new AtomicState();

async function CreateProductWithImage({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/Login?callbackUrl=/CreateProduct");
  }
  //Todo 1: Burada gelen verileri client tarafına çevirmemiz gerekiyor.
  const handleSubmit = async (FormData) => {
    "use server";
    state.clearAllMessages();
    try {
      const response = await fetch(
        `${Backend_URL}Products/CreateOneProductWithImage`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: FormData,
        }
      );
      //Backend'den gelen erorların listesi.
      let BackEndResponce = await response.json();

      state.clearAllMessages();

      if (
        response.status === 201 ||
        response.status === 200 ||
        response.status.ok
      ) {
        state.Type = "Succes";
        state.addMessage(BackEndResponce.message, "Succes");
      } else if (response.status === 500) {
        state.addMessage([BackEndResponce.message]);
      } else {
        state.Type = "Error";
        BackEndResponce.forEach((error) => {
          state.addMessage(error, "Error");
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    revalidateTag("Products");
  };

  const headersList = headers();
  const header_url = headersList.get("x-invoke-path") || "";
  const CurrentPage = searchParams.Page || "0";

  let Products = await GetAllProducts(CurrentPage, 12, true, "Products");
  let result = state.getMessages();

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
              Stock:
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
      <div className="grid mt-12 grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8 max-w-[1200px] mx-auto">
        {Products &&
          Products.products.map((item, key) => {
            return (
              <ProductCard item={item} key={key} keyValue={key} admin={true} />
            );
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
      </div>
      <ErrorTostClient result={result} />
    </>
  );
}

export default CreateProductWithImage;
