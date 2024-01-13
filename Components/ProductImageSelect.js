"use client";
import React, { useState, Fragment, useEffect } from "react";
import { Backend_URL } from "@/libs/Constants";
import Image from "next/image";
import SuccesToast from "./SharedUI/Toast/SuccesToast";
import ErrorToast from "./SharedUI/Toast/ErrorToast";
import { useSession } from "next-auth/react";
export default function ProductImageSelect({ ID }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/Login?callbackUrl=/Protected/client");
    },
  });

  let [images, setImages] = useState(false);
  let [ShowcaseImage, setShowcaseImage] = useState(false);
  let [work, setWork] = useState(null);

  async function GetProductImages() {
    let request = await fetch(`${Backend_URL}Image/GetAllİmagesById/${ID}`);

    let response = await request.json();

    const ShowcaseObject = response.find((item) => item.Showcase === true);

    setShowcaseImage(ShowcaseObject);

    setImages(response);
  }

  useEffect(() => {
    GetProductImages();
  }, [work]);

  async function SelectShowcaseItem(id) {
    let request = await fetch(`${Backend_URL}Image/SelectShowcaseImage/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (request.ok) {
      SuccesToast("Başarılı bir şekilde değiştirildi");
      setWork(!work);
    } else {
      ErrorToast("Başarısız");
    }
  }

  return (
    <div className="grid grid-cols-8 my-4 gap-4">
      {images &&
        images.map((item, key) => {
          return (
            <div
              key={key}
              className={`flex flex-col border-2 hover:border-PrimaryHover ${
                item.showcase ? "border-Primary" : null
              }`}
              onClick={() => SelectShowcaseItem(item.id)}
            >
              <div className="aspect-square relative overflow-hidden p-4 gap-4 ">
                <Image
                  fill
                  className="border-2 w-full h-full"
                  src={
                    item.path != null
                      ? `http://localhost:5031/${item.path}`
                      : `/son.png`
                  }
                  placeholder="blur"
                  blurDataURL="public/son.png"
                  alt=""
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
