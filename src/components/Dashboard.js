import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../store/productsSlice";
import { addToCart } from "../store/cartSlice";
import { PiShoppingCartSimpleLight, PiShoppingCartFill } from "react-icons/pi";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const aa = useSelector((state) => state.products);
  const { items: addToCartProducts } = useSelector((state) => state.cart);
  console.log(aa, "---");
  const {
    items: products,
    status,
    error,
    usernname,
  } = useSelector((state) => state.products);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    } else {
      fetchProducts(token);
    }
  }, [navigate]);

  const fetchProducts = async (token) => {
    try {
      const response = await axios.get("https://dummyjson.com/auth/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setProducts(response.data.products)); // Use Redux to store products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <span>LOGO</span>
        <div className="flex gap-2 mb-4">
          Welcome, <span>{usernname}</span>|
          <button
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
        Products
        <button
          className="relative bg-blue-500 flex gap-5 text-white px-5 py-3 rounded hover:bg-blue-600"
          onClick={() => navigate("/cart")}
        >
          <span className="mt-1">
            {addToCartProducts?.length > 0 ? (
              <PiShoppingCartFill />
            ) : (
              <PiShoppingCartSimpleLight />
            )}
          </span>
          <span className="absolute ml-6 text-sm ">
            {addToCartProducts?.length}
          </span>
          {"  "}
        </button>
      </h1>
      <div
        className=" bg-red-400 overflow-scroll"
        style={{
          maxHeight: "calc(100vh - 250px)",
        }}
      >
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
            {products.length > 0 ? (
              products.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between  mt-10">
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

export default Dashboard;

const ProductRow = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const discountedPrice = (originalPrice, discountPercent) => {
    return originalPrice * (1 - discountPercent / 100);
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

      <td className="px-4 py-2 border-b">
        <span className="flex gap-1 flex-col ">
          <span className="text-gray-700">
            ${discountedPrice(product?.price, product?.discountPercentage)}
          </span>
          <span className="text-gray-300 line-through">${product?.price}</span>
        </span>
      </td>
      <td className="px-4 py-2 border-b">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </td>
    </tr>
  );
};
