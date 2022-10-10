import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiLocal } from "../../api/api";
import { toast } from "react-toastify";
const initialState = {
  unitList: [],
  reload: false,
};

export const getUnitListTemp = createAsyncThunk("unit/getUnit", async () => {
  const unitResult = await axios.get(`${ApiLocal}/unit`);
  return unitResult.data;
  //get unit list and change state.unitList
});

//Delete Unit
export const deleteUnit = createAsyncThunk(
  "unit/deleteUnit",
  async (params) => {
    try {
      const res = await axios.delete(`${ApiLocal}/unit/${params}`);
      if (res.status === 200) {
        toast.success("delete success");
      }
    } catch (e) {
      console.error(e);
    }
  }
);

//Thêm unit
export const addNewUnit = createAsyncThunk("unit/addUnit", async (params) => {
  try {
    const res = await axios.post(`${ApiLocal}/unit`, params);
    if (res.status === 200) {
      toast.success("Bạn đã thêm thành công!");
    }
  } catch (e) {
    console.error(e);
  }
});

//Sửa unit
export const updateUnitItem = createAsyncThunk(
  "unit/updateUnit",
  async (params) => {
    let { id, name, description } = params;
    let data = { name: name, description: description };
    try {
      const res = await axios.patch(`${ApiLocal}/unit/${id}`, data);
      if (res.status === 200) {
        toast("Update success");
      }
    } catch (e) {
      console.error(e);
    }
  }
);

export const unitSlice = createSlice({
  name: `unit`,
  initialState,
  reducers: {},
  extraReducers: {
    //gọi api và render ra list unit
    [getUnitListTemp.fulfilled]: (state, actions) => {
      state.unitList = actions.payload;
    }, // khi thành công thì gán kết quả trả về vào unitlist
    [deleteUnit.fulfilled]: (state) => {
      state.reload = !state.reload;
      //sau khi xóa thành công thì reload trang.
    },
    [addNewUnit.fulfilled]: (state) => {
      state.reload = !state.reload;
      //nhu ben trên
    },
    [updateUnitItem.fulfilled]: (state) => {
      state.reload = !state.reload;
    },
  },
});

export const selectUnit = (state) => state.unit.unitList;
export const selectReload = (state) => state.unit.reload;
export default unitSlice.reducer;
