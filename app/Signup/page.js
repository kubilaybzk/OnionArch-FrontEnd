import React from "react";
import Image from "next/image";
import SignUpForm from "@/Components/Forms/SignUpForm";

export default function SignUp() {
  return (
    <>
      <section className="flex justify-center items-center md:min-h-screen">
        <div className="max-w-screen-xl m-0 max-h-screen h-screen md:h-fit bg-white shadow-lg sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 w-full p-6 sm:p-12">
            <div className="relative w-64 h-24 mx-auto">
              <Image alt="logo" sizes="100vh" fill src="/logo.png" />
            </div>
            <SignUpForm />
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat LoginBG"></div>
          </div>
        </div>
      </section>
    </>
  );
}
