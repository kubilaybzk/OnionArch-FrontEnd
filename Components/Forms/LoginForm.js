"use client";
import { Formik } from "formik";
import { SigInSchema } from "@/libs/FormValidations/SignInFormValidations";
import { LoginFormRequest } from "@/libs/Requests/LoginLogOut";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-full flex-1">
        <div className="mx-auto w-full lg:max-w-xs">
          <Formik
            initialValues={{
              UserNameOrEmail: "Kubilaysf",
              Password: "Aa1223412.",
            }}
            validationSchema={SigInSchema}
            onSubmit={(values, { setSubmitting }) => {
              LoginFormRequest(values, callbackUrl, { setSubmitting });
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
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col relative">
                    <input
                      disabled={isSubmitting}
                      type="text"
                      name="UserNameOrEmail"
                      placeholder="UserNameOrEmail"
                      className={`w-full ${
                        isSubmitting ? "opacity-50" : "opacity-100"
                      } px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white
                               `}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.UserNameOrEmail}
                    />
                    <span className="text-xs text-red-500 absolute -top-4 w-full z-50">
                      {errors.UserNameOrEmail &&
                        touched.UserNameOrEmail &&
                        errors.UserNameOrEmail}
                    </span>
                  </div>

                  <div className="flex flex-col relative">
                    <input
                      disabled={isSubmitting}
                      type="password"
                      name="Password"
                      placeholder="Password"
                      className={`w-full ${
                        isSubmitting ? "opacity-50" : "opacity-100"
                      } px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white
                               `}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Password}
                    />
                    <span className="text-xs text-red-500 absolute -top-4 w-full z-50">
                      {errors.Password && touched.Password && errors.Password}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    {isSubmitting && (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    Giriş Yap
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
