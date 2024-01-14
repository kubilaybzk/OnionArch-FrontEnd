"use client";

import ClassNames from "@/libs/ClassNames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLink({ name, linkhref,isActive }) {


  return (
    <Link
      key={name}
      href={linkhref ? linkhref : "/"}
      className={ClassNames(
        isActive
          ? "bg-Primary text-white"
          : "text-gray-600 hover:bg-PrimaryHover hover:text-white",
        "rounded-md px-3 py-2 text-sm font-medium"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {name}
    </Link>
  );
}
