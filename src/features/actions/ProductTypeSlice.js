import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiLocal } from "../../api/api";
import axios from "axios";
import {toast} from "react-toastify"
const initialState = {
  productTypeList: [],
  reload: false,
};
export const getProductTypeList = createAsyncThunk(
  "productType/get",
  async () => {
    try {
      const response = await axios.get(`${ApiLocal}/product/type`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  }
);
export const createproductType = createAsyncThunk(
  "productType/create",
  async (params) => {
    try {
      const response = await axios.post(`${ApiLocal}/product/type`, params);
      if (response.status === 200) {
        toast("Tạo thành công");
      }
    } catch (error) {
      console.error(error);
    }
  }
);
export const updateProductType = createAsyncThunk(
  "productType/update",
  async (params) => {
    try {
      const {id , name, description} = params;
      const data = {name : name, description : description};
      const response = await axios.patch(`${ApiLocal}/product/type/${id}`, data);
      if (response.status === 200) {
        toast.success("update product type sucess");
      }
    } catch (error) {
      console.error(error);
    }
  }
);
export const deleteProductType = createAsyncThunk(
  "productType/delete",
  async (params) => {
    try {
      const response = await axios.delete(`${ApiLocal}/product/type/${params}`);
      if (response.status === 200) {
        toast.warn("delete product type sucess");
      }
    } catch (error) {
      console.error(error);
    }
  }
);



const productTypeSlice = createSlice({
  name: "productType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductTypeList.fulfilled, (state, actions) => {
      state.productTypeList = actions.payload;
    });
    builder.addCase(deleteProductType.fulfilled, (state) => {
      state.reload = !state.reload;
    });
    builder.addCase(createproductType.fulfilled, (state) => {
      state.reload = !state.reload;
    });
    builder.addCase(updateProductType.fulfilled, (state) => {
      state.reload = !state.reload;
    });
}});
export const selectProductTypeList = (state) =>
  state.productType.productTypeList;
export const selectReload = (state) => state.productType.reload;
export default productTypeSlice.reducer;
