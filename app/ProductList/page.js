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

  let Basket = await GetBasketItems(session.accessToken);
  console.log(Basket);
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
      {/* <div className="flex flex-col max-w-xl mx-auto">
      {JSON.stringify(Basket)}
        {Basket.map((item, key) => {
          return <>
          <div key={key} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
           
          <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" className="w-full rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">Name</h2>
              <p className="mt-1 text-xs text-gray-700">{item.price}</p>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
                <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">Price <b>TL</b></p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div></>;
        })}
        
      </div>*/}
    </>
  );
}

export default CreateProductWithImage;
