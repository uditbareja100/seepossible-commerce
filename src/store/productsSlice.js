import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    usernname: "",
  },
  reducers: {
    setProducts(state, action) {
      console.log(action.payload, "aman");
      state.items = action.payload;
    },
    setLoading(state) {
      state.status = "loading";
    },
    setError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    setUsername(state, action) {
      state.usernname = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError, setUsername } =
  productsSlice.actions;
export default productsSlice.reducer;
