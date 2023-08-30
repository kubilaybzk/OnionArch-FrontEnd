import Pagination from "@/Components/SharedUI/Pagination";
import React from "react";
import { headers } from "next/headers";
import ProductCard from "@/Components/ProductCard";

async function GetData(CurrentPage) {
  let data = await fetch(
    `${process.env.BACKEND_URL}Products/GetAll?Page=${CurrentPage}`,
    {
      cache: "no-cache",
    }
  );
  let datas2 = await data.json();
  return datas2;
}

export default async function ProductListPage({ params, searchParams }) {
  const headersList = headers();
  const header_url = headersList.get("x-invoke-path") || "";
  const CurrentPage = searchParams.Page || "0";
  let datas = await GetData(CurrentPage);
  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 max-w-[1200px] mx-auto">
        {datas &&
          datas.products.map((item, key) => {
            return <ProductCard item={item} keyValue={key} />;
          })}
      </div>
      <div className="w-full flex flex-row justify-center items-center mt-4">
        <Pagination
          hasNext={datas ? datas.hasNext : false}
          hasPrev={datas ? datas.hasPrev : 0}
          totalCount={datas ? datas.totalCount : 0}
          totalPageSize={datas ? datas.totalPageSize : 0}
          currentPage={datas ? datas.currentPage : 0}
          pagesize={datas ? datas.pagesize : 0}
          pathName={header_url}
        />
      </div>
    </>
  );
}
