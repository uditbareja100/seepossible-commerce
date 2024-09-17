import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import LoginPage from "./components/Login";
import { ToastContainer } from "react-toastify";

import SignUpForm from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import store from "./store";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("authToken");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <ToastContainer
      // position="top-right"
      // autoClose={5000}
      // hideProgressBar={false}
      />
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
