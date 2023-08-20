"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../SharedUI/Pagination";
import { useSearchParams } from "next/navigation";
import ProductCard from "../ProductCard";
import { GetAllProducts } from "@/libs/BackendApi";

export default function ProductList() {
  const [datas, setDatas] = useState();
  const searchParams = useSearchParams();
  const page = searchParams.get("Page") ? searchParams.get("Page") : 0;
  const size = searchParams.get("Size") ? searchParams.get("Size") : 8;

  useEffect(() => {
    async function GetData() {
      let datas = await GetAllProducts(page, size);
      setDatas(datas);
    }
    GetData();
  }, [page]);

  return (
    <>
      <div className="grid grid-cols-1 mt-12 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 max-w-[1200px] mx-auto">
        {datas &&
          datas.products.map((item, key) => {
            return <ProductCard item={item} key={key} keyValue={key} />;
          })}
      </div>
      <Pagination
        hasNext={datas ? datas.hasNext : false}
        hasPrev={datas ? datas.hasPrev : 0}
        totalCount={datas ? datas.totalCount : 0}
        totalPageSize={datas ? datas.totalPageSize : 0}
        currentPage={datas ? datas.currentPage : 0}
        pagesize={datas ? datas.pagesize : 0}
        pathName={"/CreateProduct"}
      />
    </>
  );
}
