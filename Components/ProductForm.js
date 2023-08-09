"use client";

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";



async function SubmitForm(values, { setSubmitting }) {
  if (
    values.Name === null ||
    values.Stock === null ||
    values.Price === null ||
    values.Name === "" ||
    values.Stock === "" ||
    values.Price === ""
  ) {
    toast.error("Lütfen Alanları Doldurun"),
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      };
  } else {
    try {
      let PostData2 = await fetch(
        `http://localhost:7039/api/Products/CreateOneProduct?Name=${values.Name}&Stock=${values.Stock}&Price=${values.Price}`,
        { method: "POST" }
      );

      let PostData = await PostData2.json();

      if (!PostData2.ok) {
        if (PostData2.status === 400) {
          {
            PostData.map((item, key) =>
              toast.error(item.value[0], (key = { key }), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                key: { key },
              })
            );
          }
        }
      } else {
        toast.success("Ürün başarıyla Eklendi", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setApiSucces(true);
    } catch (error) {
      throw new error("Bir hata oluştu", JSON.stringify(error));
    } finally {
      setSubmitting(false);
    }
  }
}

export default function ProductForm() {
  const [apiErrors, setApiErrors] = useState([]);
  const [apiSucces, setApiSucces] = useState(null);

  return (
    <div>
      <Formik
        initialValues={{ Name: "", Price: "", Stock: "" }}
        onSubmit={(values, { setSubmitting }) =>
          SubmitForm(values, { setSubmitting, setApiErrors, setApiSucces })
        }
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.Name === null || values.Name.length === 0 || values.Price === null ||values.Stock === null ) {
        //     errors.Name = "Bu alan boş bırakılamaz";
        //   }
        //   else if (values.Name.length < 2) {
        //     errors.Name = "Name değeri 2 karakterden küçük olamaz.";
        //   }
        //   else if (parseInt(values.Price) < 0) {
        //     errors.Stock = "Name değeri 0'dan küçük olamaz.";
        //   }
        //   else if (parseInt(values.Stock) < 0) {
        //     errors.Price = "Name değeri 0'dan küçük olamaz.";
        //   }

        //   return errors;
        // }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            className="w-full flex flex-col gap-6 p-12 mx-auto max-w-xl"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-1 flex-col relative">
              <input
                className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                type="Name"
                name="Name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Name}
              />
              <span className="absolute  top-10 text-sm ml-3 text-red-400">
                {errors.Name}
              </span>
            </div>
            <div className="flex flex-1 flex-col relative">
              <input
                className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                type="Price"
                name="Price"
                placeholder="Price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Price}
              />
              <span className="absolute  top-10 text-sm ml-3 text-red-400">
                {errors.Price}
              </span>
            </div>
            <div className="flex flex-1 flex-col relative">
              <input
                className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                type="Stock"
                name="Stock"
                placeholder="Stock"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Stock}
              />
              <span className="absolute  top-10 text-sm ml-3 text-red-400">
                {errors.Stock}
              </span>
            </div>
            <button
              className="text-white border-2 h-[40px] rounded-md bg-indigo-300"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
