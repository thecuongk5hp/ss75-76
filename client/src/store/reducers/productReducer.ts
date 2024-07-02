import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cart, Product } from "../../interface";

const initialState = {
  products: [] as Product[],
  carts: [] as Cart[],
};

export const getProducts: any = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const response = await axios.get("http://localhost:8080/products");
    return response.data;
  }
);

export const getCarts: any = createAsyncThunk("carts/getAllCarts", async () => {
  const response = await axios.get("http://localhost:8080/carts");
  return response.data;
});

export const addProductToCart: any = createAsyncThunk(
  "carts/addProductToCart",
  async (cart: Cart) => {
    const response = await axios.post("http://localhost:8080/carts", cart);
    return response.data;
  }
);

export const updateCartProduct: any = createAsyncThunk(
  "carts/updateCartProduct",
  async (cart: Cart) => {
    const response = await axios.put(
      `http://localhost:8080/carts/${cart.id}`,
      cart
    );
    return response.data;
  }
);

export const removeCartProduct: any = createAsyncThunk(
  "carts/removeCartProduct",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/carts/${id}`);
    return id;
  }
);

const productsReducer = createSlice({
  name: "productsReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getCarts.fulfilled, (state, action) => {
        state.carts = action.payload;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.carts.push(action.payload);
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        const index = state.carts.findIndex(
          (cart) => cart.id === action.payload.id
        );
        if (index !== -1) {
          state.carts[index] = action.payload;
        }
      })
      .addCase(removeCartProduct.fulfilled, (state, action) => {
        state.carts = state.carts.filter((cart) => cart.id !== action.payload);
      });
  },
});

export default productsReducer.reducer;