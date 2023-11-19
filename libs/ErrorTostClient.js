"use client";
import ErrorToast from "@/Components/SharedUI/Toast/ErrorToast";
import SuccesToast from "@/Components/SharedUI/Toast/SuccesToast";
import React from "react";

export default function ErrorTostClient({ result }) {
  if (result.Type === "Error") {
    result.messages.map((item) => ErrorToast(item.value.toString()));
  } else if (result.Type === "Succes") {
    result.messages.map((item)=>SuccesToast(item));
  } else {
    return result.messages.map((item) => ErrorToast(item.toString()));
  }
}
