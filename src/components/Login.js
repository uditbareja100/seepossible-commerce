import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUsername } from "../store/productsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [authStatus, setAuthStatus] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: values?.username,
        password: values?.password,
      });
      localStorage.setItem("authToken", response?.data?.token);
      setAuthStatus("Logged in successfully");
      dispatch(setUsername(response?.data?.firstName));
      // toast.success("Logged in successfully!");
      setTimeout(() => {
        navigate("/"); // Redirect after showing toast
      }, 1000); // Adjust timing if necessary
      // navigate("/");
    } catch (error) {
      setAuthStatus("Login failed");
      setErrors({ submit: "Invalid credentials" });
    }
    setSubmitting(false);
  };

  useEffect(() => {
    const authState = localStorage.getItem("authToken");
    if (authState) {
      setAuthStatus("Already logged in");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 bg-orange-100 flex items-center justify-center relative">
        <div className="absolute top-4 left-4 text-lg font-bold text-orange-400">
          Your Logo
        </div>
      </div>
      <div className="absolute z-10 inset-0 flex items-center justify-center p-4 md:p-0">
        <div className="max-w-md w-full p-6 md:p-8 rounded-3xl shadow-wrapShadow bg-white">
          <div className="flex justify-between">
            <div className="w-3/4">
              <h2 className="text-[20px] text-black">Welcome to Lorem</h2>
              <h1 className="text-[40px] md:text-[55px] font-medium text-black">
                Sign in
              </h1>
            </div>
            <div className="w-1/4 text-sm">
              No Account?{" "}
              <span
                className="text-[#E48700] cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </div>
          </div>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form className="mt-8">
                <div className="mb-6">
                  <label htmlFor="username" className="block text-sm">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 h-14"
                    placeholder="Enter your Username"
                  />
                </div>
                <div className="mb-6 relative">
                  <label htmlFor="password" className="block text-sm">
                    Password
                  </label>
                  <Field
                    type={showPassword ? "password" : "text"}
                    name="password"
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 h-14"
                    placeholder="Enter your password"
                  />
                  <div
                    className="absolute top-12 right-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiFillEye size={20} color="#9CA3AF" />
                    ) : (
                      <AiFillEyeInvisible size={20} color="#9CA3AF" />
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#E48700] hover:bg-[#e5921d] text-white font-semibold rounded-md shadow focus:outline-none"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
                {errors.submit && (
                  <div className="mt-4 text-red-600 text-sm">
                    {errors.submit}
                  </div>
                )}
                {authStatus && (
                  <div
                    className={`mt-4 text-sm ${
                      authStatus.includes("failed")
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {authStatus}
                  </div>
                )}
              </Form>
            )}
          </Formik>
          <div className="my-6 text-center text-gray-500">OR</div>
          <div className="flex justify-between">
            <button className="bg-[#FFF4E3] text-[#B87514] py-2 px-4 rounded-lg flex items-center space-x-2 w-full">
              <FaGoogle className="mr-2" /> Sign in with Google
            </button>
            <button className="bg-[#F6F6F6] py-2 px-4 rounded-lg flex items-center justify-center ml-3">
              <FaFacebookF />
            </button>
            <button className="bg-[#F6F6F6] py-2 px-4 rounded-lg flex items-center justify-center ml-3">
              <FaApple />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
