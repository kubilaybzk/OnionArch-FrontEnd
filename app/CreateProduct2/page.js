import React from "react";
import ProductForm from "@/Components/ClientSideFileUpload/ProductForm";
import ProductList from "@/Components/ClientSideFileUpload/ProductList";
import UploadImages from "@/Components/ClientSideFileUpload/UploadImages";
export default function CreateProduct() {
  return (
    <>
      <ProductForm />
      <UploadImages />
      <ProductList />
    </>
  );
}
