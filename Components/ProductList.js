"use client";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [datas, setDatas] = useState();
  const searchParams = useSearchParams();
  const page = searchParams.get("Page") ? searchParams.get("Page") : 0;
  const size = searchParams.get("Size") ? searchParams.get("Size") : 8;
  

  useEffect(() => {
    async function GetData() {
      let data = await fetch(
        `http://localhost:7039/api/Products/GetAll?Page=${page}&Size=${size}`,
        {}
      );
      let datas2 = await data.json();
      setDatas(datas2);
    }
    GetData();
  }, [page]);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 max-w-[1200px] mx-auto">
        {datas &&
          datas.products.map((item, key) => {
            return <ProductCard item={item} key={key} keyValue={key}  />;
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
