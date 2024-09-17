import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 bg-orange-100 flex items-center justify-center relative">
        <div className="absolute top-4 left-4 text-lg font-bold text-orange-400">
          Your Logo
        </div>
      </div>
      <div className="absolute z-10 inset-0 flex items-center justify-center p-4 md:p-0">
        <div className="max-w-md w-full p-6 md:p-8 rounded-3xl shadow-wrapShadow bg-white">
          <div className="flex">
            <div className="w-8/12">
              <h1 className="text-[20px] md:text-[40px] font-medium text-black">
                Sign up
              </h1>
            </div>
            <div className="w-1/3">
              <span className="text-xs text-[#8D8D8D] hover:text-gray-800">
                Have an Account?{" "}
              </span>
              <h1
                onClick={() => navigate("/")}
                className="text-[#E48700] text-xs cursor-pointer"
              >
                Sign in
              </h1>
            </div>
          </div>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              gender: "",
              state: "",
              city: "",
              country: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form Data", values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="mt-8 ">
                <div className="flex flex-col-reverse md:flex-col">
                  <div className="flex h-96 overflow-scroll flex-col mt-7 md:mt-0">
                    {/* First Name */}
                    <div className="mb-6">
                      <label
                        htmlFor="firstName"
                        className="block text-xs md:text-xs"
                      >
                        Enter your first name
                      </label>
                      <Field
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs placeholder:text-[#808080] h-8"
                        placeholder="First Name"
                      />
                      {errors?.firstName && touched?.firstName && (
                        <div className="text-status-danger-800 text-left text-xs mt-1 pl-1">
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                    {/* Last Name */}
                    <div className="mb-6">
                      <label
                        htmlFor="lastName"
                        className="block text-xs md:text-xs"
                      >
                        Enter your last name
                      </label>
                      <Field
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs placeholder:text-[#808080] h-8"
                        placeholder="Last Name"
                      />
                      {errors?.lastName && touched?.lastName && (
                        <div className="text-status-danger-800 text-left text-xs mt-1 pl-1">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                    {/* Email */}
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block text-xs md:text-xs"
                      >
                        Enter your email address
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs placeholder:text-[#808080] h-8"
                        placeholder="Email"
                      />
                      {errors?.email && touched?.email && (
                        <div className="text-status-danger-800 text-left text-xs mt-1 pl-1">
                          {errors.email}
                        </div>
                      )}
                    </div>
                    {/* Gender */}
                    <div className="mb-6">
                      <label
                        htmlFor="gender"
                        className="block text-xs md:text-xs"
                      >
                        Select your gender
                      </label>
                      <Field
                        as="select"
                        id="gender"
                        name="gender"
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs placeholder:text-[#808080] h-8"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Field>
                      {errors?.gender && touched?.gender && (
                        <div className="text-status-danger-800 text-left text-xs mt-1 pl-1">
                          {errors.gender}
                        </div>
                      )}
                    </div>
                    {/* State */}
                    <div className="mb-6">
                      <label
                        htmlFor="state"
                        className="block text-xs md:text-xs"
                      >
                        Enter your state
                      </label>
                      <Field
                        type="text"
                        id="state"
                        name="state"
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs placeholder:text-[#808080] h-8"
                        placeholder="State"
                      />
                      {errors?.state && touched?.state && (
                        <div className="text-status-danger-800 text-left text-xs mt-1 pl-1">
                          {errors.state}
                        </div>
                      )}
                    </div>
                    {/* City */}
                    <div className="mb-6">
                      <label
                        htmlFor="city"
                        className="block text-xs md:text-xs"
                      >
                        Enter your city
                      </label>
                      <Field
                        type="text"
                        id="city"
                        name="city"
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs placeholder:text-[#808080] h-8"
                        placeholder="City"
                      />
                      {errors?.city && touched?.city && (
                        <div className="text-status-danger-800 text-left text-xs mt-1 pl-1">
                          {errors.city}
                        </div>
                      )}
                    </div>
                    {/* Country */}
                    <div className="mb-6">
                      <label
                        htmlFor="country"
                        className="block text-xs md:text-xs"
                      >
                        Enter your country
                      </label>
                      <Field
                        type="text"
                        id="country"
                        name="country"
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs placeholder:text-[#808080] h-8"
                        placeholder="Country"
                      />
                      {errors?.country && touched?.country && (
                        <div className="text-status-danger-800 text-left text-xs mt-1 pl-1">
                          {errors.country}
                        </div>
                      )}
                    </div>
                    {/* Submit Button */}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-[#E48700] hover:bg-[#e5921d] text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e5921d]"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="w-1/2 bg-white hidden md:flex items-center justify-center relative">
        {/* Add additional design or image */}
      </div>
    </div>
  );
};

export default SignUpForm;
