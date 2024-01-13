import { headers } from "next/headers";
import ProductCard from "@/Components/ProductCard";
import React from "react";
import Pagination from "@/Components/SharedUI/Pagination";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { GetAllProducts, GetBasketItems } from "@/libs/BackendApi";
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

  const headersList = headers();
  const header_url = headersList.get("x-invoke-path") || "";
  const CurrentPage = searchParams.Page || "0";

  let Products = await GetAllProducts(CurrentPage, 12, true, "Products");
  let result = state.getMessages();

  let Basket = await GetAllProducts();
  console.log("Basket", Basket);
  return (
    <>
      <div className="grid mt-12 grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8 max-w-[1200px] mx-auto">
        {Products &&
          Products.products.map((item, key) => {
            return <ProductCard item={item} key={key} keyValue={key} />;
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
