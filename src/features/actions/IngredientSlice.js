import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { ApiLocal } from "../../api/api";

const initialState = {
  ingedientList: [],
  reload: false,
};

export const getIngredientList = createAsyncThunk("ingredient", async () => {
  try {
    const response = await axios.get(`${ApiLocal}/ingredient`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const deleteIngredientItem = createAsyncThunk(
  "ingredient/delete",
  async (params) => {
    try {
      const response = await axios.delete(`${ApiLocal}/ingredient/${params}`);
      if (response.status === 200) {
        toast("delete ingredient success");
      }
    } catch (error) {
      console.error(error);
    }
  }
);
export const createIngredientItem = createAsyncThunk(
  "ingredient/create",
  async (params) => {
    try {
      const response = await axios.post(`${ApiLocal}/ingredient`, params);
      if (response.status === 200) {
        toast("create ingredient success");
      }
    } catch (error) {
      console.error(error);
      toast("có lỗi xảy ra")
    }
  }
);
//
export const updateIngredientItem = createAsyncThunk(
  "ingredient/update",
  async (params) => {
    try {
      let { id, name, idUnit, description, warningThreshold } = params;
      let data = {
        name: name,
        idUnit: idUnit,
        quanity: 0,
        description: description,
        warningThreshold: warningThreshold,
      };
      const response = await axios.patch(`${ApiLocal}/ingredient/${id}`, data);
      if (response.status === 200) {
        toast("update success");
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const ingredientSlice = createSlice({
  name: `ingredient`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredientList.fulfilled, (state, actions) => {
      state.ingedientList = actions.payload;
    });
    builder.addCase(deleteIngredientItem.fulfilled, (state) => {
      state.reload = !state.reload;
    });
    builder.addCase(createIngredientItem.fulfilled, (state) => {
      state.reload = !state.reload;
    });
    builder.addCase(updateIngredientItem.fulfilled, (state) => {
      state.reload = !state.reload;
    });
  },
});

export const selectIngredient = (state) => state.ingredient.ingedientList;
export const selectReload = (state) => state.ingredient.reload;
export default ingredientSlice.reducer;
