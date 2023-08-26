"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
export default function Modal({ID}) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
   
        <button
          type="button"
          onClick={openModal}
          className="text-center  flex flex-row justify-between w-100 items-center bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
        
         <PencilSquareIcon className="text-xl text-white w-6 h-6"/>
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
            <div className="fixed inset-0 bg-black bg-opacity-60" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Product
                  </Dialog.Title>
                  <div className="mt-2">
                  <div className="flex flex-col p-4  border-2 rounded">
        <h2 className="text-xl font-semibold mb-4">
          Create Product with Image
        </h2>
        <form   className="">
        <div className="mb-4 hidden">
            <label htmlFor="name" className="block font-medium mb-1">
              id:
            </label>
            <input
              type="text"
              id="ID"
              name="ID"
              value={ID?ID:null}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
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
            <label htmlFor="price" className="block font-medium mb-1">
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
            <label htmlFor="price" className="block font-medium mb-1">
              Price:
            </label>
            <input
              type="number"
              id="stock"
              name="Stock"
              className="w-full p-2 border rounded"
            />
          </div>


          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Create Product
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
