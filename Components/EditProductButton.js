"use client";

import React, { useState, Fragment, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
import SuccesToast from "./SharedUI/Toast/SuccesToast";
import ErrorToast from "./SharedUI/Toast/ErrorToast";
import { updateProduct } from "@/libs/BackendApi";
import ProductImageSelect from "./ProductImageSelect";

export default function EditProductButton({
  ID,
  Price,
  Stock,
  Name,
  AccessToken,
}) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function EditProduct(e) {
    e.preventDefault();

    const { NewName, NewPrice, NewStock } = e.target.elements;

    const updateData = {
      ID,
      Name: NewName?.value ? NewName?.value : Name,
      Price: NewPrice?.value ? NewPrice?.value : Price,
      Stock: NewStock?.value ? NewStock?.value : Stock,
    };

    const isSuccessful = await updateProduct(updateData, AccessToken);

    isSuccessful ? SuccesToast("BAŞARILI") : ErrorToast("BAŞARISIZ");
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
                            htmlFor="ID"
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
                            htmlFor="NewName"
                            className="block font-medium mb-1"
                          >
                            Name:
                          </label>
                          <input
                            type="text"
                            id="NewName"
                            name="NewName"
                            placeholder={Name ? Name : null}
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="NewPrice"
                            className="block font-medium mb-1"
                          >
                            Price:
                          </label>
                          <input
                            type="number"
                            id="NewPrice"
                            placeholder={Price ? Price : null}
                            name="NewPrice"
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="NewStock"
                            className="block font-medium mb-1"
                          >
                            Stock:
                          </label>
                          <input
                            type="number"
                            id="NewStock"
                            name="NewStock"
                            placeholder={Stock ? Stock : null}
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        <ProductImageSelect ID={ID} />

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
