import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
  reviews: []
};

export const fetchAllShoppingProducts = createAsyncThunk(
  "/products/fetchAllShoppingProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
    );

    return result?.data;
  }
);

export const fetchAllProductReviews = createAsyncThunk(
  "/products/fetchAllProductReviews",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/reviews`
    );

    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
    );

    // console.log(result?.data)

    return result?.data;
  }
);

const shopProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShoppingProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllShoppingProducts.fulfilled, (state, action) => {
        state.isLoading = false, 
        state.productList = action.payload.data;
      })
      .addCase(fetchAllShoppingProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      }).addCase(fetchAllProductReviews.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProductReviews.fulfilled, (state, action) => {
        state.isLoading = false, 
        state.reviews = action.payload.data;
      })
      .addCase(fetchAllProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        // console.log(action.payload.data)
        state.isLoading = false, 
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const {setProductDetails} = shopProductSlice.actions

export default shopProductSlice.reducer;
