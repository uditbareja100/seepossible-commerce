import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice"; // Import your slice reducers
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
