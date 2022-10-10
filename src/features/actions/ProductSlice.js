import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiLocal } from "../../api/api";
import { toast } from "react-toastify";
const initialState = {
  productList: [],
  reload: false,
};

export const getProductList = createAsyncThunk("product/get", async () => {
  try {
    const response = await axios.get(`${ApiLocal}/product`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
});
//delete
export const deleteProductItem = createAsyncThunk(
  "product/delete",
  async (params) => {
    try {
      const response = await axios.delete(`${ApiLocal}/product/${params}`);
      if (response.status === 200) {
        toast.warn("Bạn đã xóa thành công");
      }
    } catch (e) {
      toast("có lỗi xảy ra");
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductList.fulfilled, (state, actions) => {
      state.productList = actions.payload;
    });
    builder.addCase(deleteProductItem.fulfilled, (state) => {
      state.reload = !state.reload;
    } )
  },
});
export const selectProductList = (state) => state.product.productList;
export const selectReload = (state) => state.product.reload;
export default productSlice.reducer;
