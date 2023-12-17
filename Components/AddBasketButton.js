"use client";
import { AddBasketAsync } from "@/libs/BackendApi";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { TrashIcon, ArrowPathIcon, PlusIcon } from "@heroicons/react/24/solid";

export default function AddBasketButton({ id, AccessToken }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  let [size, setSize] = useState(0);

  async function AddBassketClick(id) {
    setIsFetching(true);
    // Perform the deletion on the server

    let result = await AddBasketAsync(id, size, AccessToken).then(
      setIsFetching(false)
    );

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without losing client-side browser or React state.
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      <div className="inline-flex items-center mt-2 w-full justify-center">
        <button
          onClick={() => setSize(size == 0 ? 0 : size--)}
          className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
        >
          -
        </button>
        <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
          {size}
        </div>
        <button
          onClick={() => setSize((size = size + 1))}
          className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
        >
          +
        </button>
      </div>

      <button
        className="bg-indigo-300 hover:bg-indigo-500 p-2 flex flex-row items-center justify-center w-full"
        onClick={() => AddBassketClick(id)}
      >
        {isFetching ? (
          <ArrowPathIcon className="text-sm w-6 h-6 text-white animate-spin" />
        ) : (
          <PlusIcon className="text-sm w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
