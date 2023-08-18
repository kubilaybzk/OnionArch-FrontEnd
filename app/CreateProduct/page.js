"use client";
import ProductList from "@/Components/ProductList";
import ErrorToast from "@/Components/SharedUI/Toast/ErrorToast";
import SuccesToast from "@/Components/SharedUI/Toast/SuccesToast";
import React, { useState } from "react";

function CreateProductWithImage() {
  const [product, setProduct] = useState({
    Name: "",
    Price: 0,
    Stock: 0,
    ProductImages: [], // Array of uploaded images
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImageFiles(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("Name", product.Name);
    formData.append("Price", product.Price);
    formData.append("Stock", product.Stock);
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("files", imageFiles[i]);
    }

    try {
      const response = await fetch(
        "http://localhost:7039/api/Products/CreateOneProductWithImage",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 201) {
        console.log("Product created successfully.");
        SuccesToast("Başarılı");
        setProduct({
          Name: "",
          Price: 0,
          Stock: 0,
          ProductImages: [],
        });
        setImageFiles([]);
      } else {
        ErrorToast("Error");
        console.error("Failed to create product.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="p-4 flex flex-col justify-center items-center align-middle border-2 border-black w-fit mx-auto mt-12 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Create Product with Image
        </h2>
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="Name"
              value={product.Name}
              onChange={handleInputChange}
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
              value={product.Price}
              onChange={handleInputChange}
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
              value={product.Stock}
              onChange={handleInputChange}
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
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Create Product
          </button>
        </form>
      </div>
      <ProductList />
    </>
  );
}

export default CreateProductWithImage;
