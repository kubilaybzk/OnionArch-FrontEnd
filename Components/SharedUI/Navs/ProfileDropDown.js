"use client";
import React from "react";
import { Fragment } from "react";
import { useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import ClassNames from "@/libs/ClassNames";
import { UserIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";

export default function ProfileDropDown() {
  const { data: session, status } = useSession();
  return (
    <div>
      {session?.user ? (
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="relative flex max-w-xs justify-center items-center rounded-md  px-4 py-2  text-sm  border border-gray-300">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <div className="relative w-8 h-8 rounded-full">
                <Image
                  className="h-8 w-8 rounded-full"
                  src={"/profile.png"}
                  fill
                  alt=""
                />
              </div>
              <span
                className={ClassNames(
                  status === "loading"
                    ? "h-4 bg-gray-300 rounded-full  w-24 ml-1"
                    : "h-4   rounded-full  w-24 text-md ml-1"
                )}
              >
                {status !== "loading" ? (
                  <div className="flex flex-col -mt-2 ">
                    <span className="text-[15px] max-w-[92px] truncate font-semibold">
                      Hesabım
                    </span>
                    <span className="text-[10px] -mt-1.5 ">
                      {session?.user.name}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item key={"Login"}>
                {({ active }) => (
                  <Link
                    href={"/Profile"}
                    className={ClassNames(
                      active ? "bg-gray-300 text-white" : "",
                      "block px-4 py-2 text-sm text-black"
                    )}
                  >
                    Profilim
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item key={"Signup"}>
                {({ active }) => (
                  <Link
                    href={"/Orders"}
                    className={ClassNames(
                      active ? "bg-gray-300 text-white" : "",
                      "block px-4 py-2 text-sm text-black"
                    )}
                  >
                    Siparişlerim
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item key={"Signup"}>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={ClassNames(
                      active ? "bg-gray-300 w-full text-white text-start" : "",
                      "block px-4 py-2 text-sm text-black w-full text-start"
                    )}
                  >
                    Çıkış Yap
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="relative flex max-w-xs justify-center items-center rounded-md  px-4 py-2  text-sm  border border-gray-300">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <div className="relative w-8 h-8 rounded-full">
                <UserIcon className=" text-white fill-White rounded-full bg-gray-300" />
              </div>
              <span
                className={ClassNames(
                  status === "loading"
                    ? "h-4 bg-gray-300 rounded-full  w-24 ml-1"
                    : "h-4   rounded-full  w-24 text-md ml-1"
                )}
              >
                {status !== "loading" ? (
                  <div className="flex flex-col -mt-2 ">
                    <span className="text-[15px] font-semibold">Giriş Yap</span>
                    <span className="text-[10px] -mt-1.5">veya Kayıt Ol</span>
                  </div>
                ) : (
                  ""
                )}
              </span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item key={"Login"}>
                {({ active }) => (
                  <Link
                    href={"/Login"}
                    className={ClassNames(
                      active ? "bg-gray-300 text-white" : "",
                      "block px-4 py-2 text-sm text-black"
                    )}
                  >
                    Giriş Yap
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item key={"Signup"}>
                {({ active }) => (
                  <Link
                    href={"/Signup"}
                    className={ClassNames(
                      active ? "bg-gray-300 text-white" : "",
                      "block px-4 py-2 text-sm text-black"
                    )}
                  >
                    Kayıt ol
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  );
}
