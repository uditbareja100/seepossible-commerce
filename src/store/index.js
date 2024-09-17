import {
  configureStore,
  createAction,
  combineReducers,
} from "@reduxjs/toolkit";
import productsReducer from "./productsSlice"; // Import your slice reducers
import cartReducer from "./cartSlice";

// Create a reset action
export const resetState = createAction("resetState");

// Combine all the reducers
const appReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

// Root reducer that handles the reset state
export const rootReducer = (state, action) => {
  if (action.type === resetState.type) {
    state = undefined; // This clears all the state
  }
  return appReducer(state, action);
};

// Configure the store with the rootReducer
const store = configureStore({
  reducer: rootReducer,
});

export default store;
