import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../store/cartSlice";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: addToCartProducts } = useSelector((state) => state.cart);
  const { usernname } = useSelector((state) => state.products);
  return (
    <div className="p-4 h-screen flex flex-col">
      <div className="flex h-auto justify-between">
        <span>LOGO</span>
        <div className="flex gap-2 mb-4">
          Welcome, <span>{usernname}</span>|
          <button
            // className="bg-gray-300"
            onClick={() => {
              localStorage.removeItem("authToken");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <h1 className="text-2xl flex justify-between font-semibold mb-4">
        Your Cart
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Go To Product
        </button>
      </h1>
      {/* {addToCartProducts.length > 0 ? ( */}
      <div
        className=" h-full overflow-scroll"
        style={{
          maxHeight: "calc(100vh - 20px)",
        }}
      >
        {addToCartProducts.length > 0 && (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-left text-gray-600">
                  Name
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-600">
                  Image
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-600">
                  Rating
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-600">
                  Price
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {addToCartProducts.length > 0 &&
                addToCartProducts.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex h-full justify-between items-end  mt-10">
        <span>Cookie Policy - Legal Notice</span>
        <span>Copyright @2021.</span>
        <span className="flex justify-between gap-5">
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
        </span>
      </div>
    </div>
  );
};

export default Cart;
const ProductRow = ({ product }) => {
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(removeFromCart(product));
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2 border-b">{product.title}</td>
      <td className="px-4 py-2 border-b">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-12 h-12 object-cover rounded"
        />
      </td>
      <td className="px-4 py-2 border-b">
        {Array(Math.round(product.rating))
          .fill("★")
          .map((star, index) => (
            <span key={index} className="text-yellow-500">
              {star}
            </span>
          ))}
      </td>
      <td className="px-4 py-2 border-b">${product.price}</td>
      <td className="px-4 py-2 border-b">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={removeItem}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};
