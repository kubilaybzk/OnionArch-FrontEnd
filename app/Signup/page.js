"use client";
// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  SignUpFormValidations,
  SignupSchema,
} from "@/libs/FormValidations/SignUpFormValidations";

const Basic = () => (
  <div className="flex flex-col justify-center items-center align-middle h-screen">
    <Formik
      initialValues={{
        NameSurname: "",
        UserName: "",
        email: "",
        password: "",
        Confirmpassword: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col w-full mx-auto gap-2 p-4 max-w-7xl border-2 border-black rounded">
          <div className="relative">
            <Field
              type="text"
              name="NameSurname"
              className={`${
                errors.NameSurname ? "border-red-600" : ""
              }  w-full p-2 border rounded mt-4`}
              placeholder="Name Surname"
            />

            <ErrorMessage
              name="NameSurname"
              component="div"
              className="text-sm text-red-600 h-5 absolute -top-1 left-0"
            />
          </div>
          <div className="relative">
            <Field
              type="text"
              name="UserName"
             className={`${
                errors.UserName ? "border-red-600" : ""
              }  w-full p-2 border rounded mt-4`}
              placeholder="UserName"
            />
            <ErrorMessage
              name="UserName"
              component="div"
              className="text-sm text-red-600 h-5 absolute -top-1 left-0"
            />
          </div>
          <div className="relative">
            <Field
              type="email"
              name="email"
             className={`${
                errors.email ? "border-red-600" : ""
              }  w-full p-2 border rounded mt-4`}
              placeholder="E-Mail"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-sm text-red-600 h-5 absolute -top-1 left-0"
            />
          </div>
          <div className="relative">
            <Field
              type="password"
              name="password"
             className={`${
                errors.password ? "border-red-600" : ""
              }  w-full p-2 border rounded mt-4`}
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-sm text-red-600 h-5 absolute -top-1 left-0"
            />
          </div>
          <div className="relative">
            <Field
              type="password"
              name="Confirmpassword"
             className={`${
                errors.Confirmpassword ? "border-red-600" : ""
              }  w-full p-2 border rounded mt-4`}
              placeholder=" Confirm Password"
            />
            <ErrorMessage
              name="Confirmpassword"
              component="div"
              className="text-sm text-red-600 h-5 absolute -top-1 left-0"
            />
          </div>
          <button
            className="bg-blue-500 text-white mt-4 py-2 px-4 rounded hover:bg-blue-600"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Basic;
