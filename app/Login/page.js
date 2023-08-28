"use client";
import React from "react";
import { Formik } from "formik";

const Basic = () => (
  <div className="flex flex-col justify-center items-center m-auto
    max-w-7xl border-2 border-black rounded-md p-4">
    <h1 className="text-3xl text-center font-bold mb-12">Giriş Yap</h1>
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 3));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className="flex flex-col w-full mx-auto">
          <div className="">
            <label htmlFor="email" className="block font-medium">
              E-Mail:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full p-2 border rounded"
              onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
            />
          </div>
          <span className="text-sm text-red-600 h-5">
            {errors.email && touched.email && errors.email}
          </span>
          <div className="">
            <label htmlFor="password" className="block font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border rounded"
              onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
            />
          </div>
          <span className="text-sm text-red-600 h-5">
            {errors.password && touched.password && errors.password}
          </span>
          <button
            className="bg-blue-500 text-white mt-4 py-2 px-4 rounded hover:bg-blue-600"
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

export default Basic;
