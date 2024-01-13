"use client";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import NavLink from "./NavLink";
import ClassNames from "@/libs/ClassNames";
import Image from "next/image";
import ProfileDropDown from "./ProfileDropDown";
import { signOut } from "next-auth/react";
import Link from "next/link";

let navigation = [
  {
    name: "HomePage",
    PathName: "/",
  },
  {
    name: "AddProduct",
    PathName: "/CreateProduct",
  },
  {
    name: "Basket",
    PathName: "/BasketList",
  },
  {
    name: "ProductList",
    PathName: "/ProductList",
  },
];

const userNavigation = [
  { name: "Your Profilek", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function HeaderV2() {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex flex-row">
                    {/* Logo */}
                    <Link href={"/"} className="flex items-center">
                      <div className="flex-shrink-0 flex flex-row align-middle items-center gap-4">
                        <div className="relative h-8 w-8">
                          <Image
                            className="h-8 w-8"
                            src="/son.png"
                            fill
                            alt="Your Company"
                          />
                        </div>
                        <span className="self-center text-xl font-semibold whitespace-nowrap ">
                          Kubilay<b className="text-Yellow">Bzk</b>
                        </span>
                      </div>
                    </Link>
                    {/* NavLinks*/}
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item, key) => (
                          <NavLink
                            name={item.name}
                            linkhref={item.PathName}
                            key={key}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Kullanıcı dropdown butonu*/}
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <ProfileDropDown />
                    </div>
                  </div>
                  {/* Menü butonu*/}
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
              {/* Mobil Menü*/}
              <Disclosure.Panel className="md:hidden absolute bg-white w-[calc(100%-2rem)] z-50">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={ClassNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-black hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>

                <div className="border-t border-gray-700 pb-3 pt-4">
                  {session?.user ? (
                    <>
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <div className="relative w-8 h-8 rounded-full">
                            <Image
                              className="h-8 w-8 rounded-full"
                              src={"/profile.png"}
                              fill
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="ml-3 justify-center items-start flex flex-col gap-2 ">
                          <div className="text-base font-medium leading-none text-black">
                            {session?.user.name}
                          </div>
                          <div className="text-sm font-medium leading-none text-black">
                            {session?.user.email}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        {userNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                        <Disclosure.Button
                          as="button"
                          onClick={() => signOut()}
                          className="block w-full text-start rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white"
                        >
                          Çıkış Yap
                        </Disclosure.Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col">
                      <Disclosure.Button
                        as="a"
                        href={"/Login"}
                        className="block w-full text-start rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white"
                      >
                        Giriş Yap
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="a"
                        href={"/Signup"}
                        className="block w-full text-start rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white"
                      >
                        Kayıt Ol
                      </Disclosure.Button>
                    </div>
                  )}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
