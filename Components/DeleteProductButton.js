"use client";
import { DeleteProduct } from "@/libs/BackendApi";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function DeleteProductButton({ id }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  async function handleDelete(id) {
    alert(id);
    setIsFetching(true);
    // Perform the deletion on the server
    let result = await DeleteProduct(id);
    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without losing client-side browser or React state.
      router.refresh();
    });
  }

  return <button onClick={() => handleDelete(id)}>
    
  </button>;
}
