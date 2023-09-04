"use client";
import { DeleteProduct } from "@/libs/BackendApi";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { TrashIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

export default function DeleteProductButton({ id,AccessToken }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  async function handleDelete(id) {
    setIsFetching(true);
    // Perform the deletion on the server
    let result = await DeleteProduct(id,AccessToken).then(setIsFetching(false));

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without losing client-side browser or React state.
      router.refresh();
    });
  }

  return (
    <button
      className="bg-indigo-300 hover:bg-indigo-500 p-2 flex flex-row items-center justify-center"
      onClick={() => handleDelete(id)}
    >
      {isFetching ? (
        <ArrowPathIcon className="text-sm w-6 h-6 text-white animate-spin" />
      ) : (
        <TrashIcon className="text-sm w-6 h-6 text-white" />
      )}
    </button>
  );
}
