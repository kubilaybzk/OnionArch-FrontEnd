import React from "react";
import ProductForm from "@/Components/ProductForm";
import ProductList from "@/Components/ProductList";
import UploadImages from "@/Components/UploadImages";
export default function CreateProduct() {
  return (
    <>
      {" "}
      <ProductForm />
      <UploadImages />
      <ProductList />
    </>
  );
}
