"use client";

import React, { useState, Fragment } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
import SuccesToast from "./SharedUI/Toast/SuccesToast";
import ErrorToast from "./SharedUI/Toast/ErrorToast";
export default function EditProductButton({ ID }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function EditProduct(e) {
    e.preventDefault();

    // Formdaki input elemanlarına doğrudan erişim sağlayın,
    const name = e.target.elements.Name.value;
    const price = e.target.elements.Price.value;
    const stock = e.target.elements.Stock.value;

    // Ürün verilerini bir nesne içinde toplayın
    const updateData = {
      ID: ID,
      Name: name,
      Price: price,
      Stock: stock,
      // Diğer güncellenecek özellikleri de ekleyebilirsiniz
    };

    const body = await JSON.stringify(updateData);

    // PUT isteği göndermek için fetch kullanın
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}Products/UpdateProductById`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: body, // Veriyi JSON formatına dönüştürüp gönderin
        }
      );
      SuccesToast("BAŞARILI");
    } catch (error) {
      ErrorToast("BAŞARISIZ");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-center  flex flex-row justify-between w-100 items-center bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <PencilSquareIcon className="text-xl text-white w-6 h-6" />
        <span>Düzenle</span>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    <div className="flex flex-col">
                      <form onSubmit={(e) => EditProduct(e)} className="">
                        <div className="mb-4">
                          <label
                            htmlFor="name"
                            className="block font-medium mb-1"
                          >
                            İD:
                          </label>
                          <input
                            type="text"
                            id="ID"
                            name="ID"
                            disabled
                            value={ID ? ID : null}
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="name"
                            className="block font-medium mb-1"
                          >
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
                          <label
                            htmlFor="price"
                            className="block font-medium mb-1"
                          >
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
                          <label
                            htmlFor="price"
                            className="block font-medium mb-1"
                          >
                            Price:
                          </label>
                          <input
                            type="number"
                            id="stock"
                            name="Stock"
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        <button className="bg-green-500 text-white py-2 px-4 rounded w-full hover:bg-green-600">
                          Düzenle
                        </button>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
