"use client";

import ClassNames from "@/libs/ClassNames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLink({ name, linkhref }) {
  let PathName = usePathname();

  let isActive = PathName === linkhref;

  return (
    <Link
      key={name}
      href={linkhref ? linkhref : "/"}
      className={ClassNames(
        isActive
          ? "bg-gray-900 text-white"
          : "text-gray-600 hover:bg-gray-700 hover:text-white",
        "rounded-md px-3 py-2 text-sm font-medium"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {name}
    </Link>
  );
}
