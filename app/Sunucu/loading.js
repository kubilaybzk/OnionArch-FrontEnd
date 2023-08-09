

import React from "react";




export default function loading() {
    let datas = new Array(8);
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 max-w-[1200px] mx-auto">
      {datas &&
        datas.map((item, key) => {
          return (
            <article
              key={key}
              className="relative flex flex-col overflow-hidden rounded-lg border"
            >
              <div className="aspect-square overflow-hidden p-4 ">
                <img
                  className="h-full w-full object-contain  border-2 border-black  rounded-lg transition-all duration-300 group-hover:scale-125"
                  src="https://kubilaybzk.dev/_next/image?url=%2Fsonv2.png&w=1920&q=75"
                  alt=""
                />
              </div>
              <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex flex-col">
                  <p className="mr-3 text-sm font-medium flex flex-row gap-3">
                    <b>Name:</b>
                    ss
                  </p>
                  <p className="mr-3 text-sm font-medium flex flex-row gap-3">
                    <b>Price:</b>
                    ss
                  </p>
                  <p className="mr-3 text-sm font-medium flex flex-row gap-3">
                    <b>Stock:</b>
                    ss
                  </p>
                </div>
              </div>
            </article>
          );
        })}
    </div>
  );
}
