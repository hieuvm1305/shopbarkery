import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIngredient,
  selectReload,
  getIngredientList,
  deleteIngredientItem,
} from "../../features/actions/IngredientSlice";
import IngredientModal from "./IngredientModal";

function Ingredient() {
  const dispatch = useDispatch();
  const ingredientList = useSelector(selectIngredient);
  const reload = useSelector(selectReload);
  const [isopenModal, setisopenModal] = useState(false);
  const [editIngredientItem, seteditIngredientItem] = useState(null);

  useEffect(() => {
    dispatch(getIngredientList());
    return () => {};
  }, [reload, dispatch]);

  const changeStatusModal = () => {
    setisopenModal((isopenModal) => (isopenModal = !isopenModal));
  };

  const deleteIngredient = (id) => {
    if (window.confirm("Bạn có muốn xóa?")) {
      dispatch(deleteIngredientItem(id));
    }
  };

  const addNewIngredient = () => {
    changeStatusModal();
    seteditIngredientItem(null);
  };

  const updateIngredient = (data) => {
    changeStatusModal();
    seteditIngredientItem(data);
  };

  const renderIngredientList = () => {
    if (ingredientList) {
      let res = ingredientList.map((item, index) => (
        <div className="border grid grid-cols-10 mx-2" key={index}>
          <div className="col-span-1 text-center border">
            <p className="p-2">{index + 1}</p>
          </div>
          <div className="col-span-1 text-center border">
            <p className="p-2">{item.name}</p>
          </div>
          <div className="col-span-1 text-center border">
            <p className="p-2">{item.unit}</p>
          </div>
          <div className="col-span-2 text-center border">
            <p className="p-2">{item.description}</p>
          </div>
          <div className="col-span-2 text-center border">
            <p className="p-2">{item.quantity}</p>
          </div>
          <div className="col-span-2 text-center border">
            <p className="p-2">{item.warningThreshold}</p>
          </div>
          <div className="col-span-1 text-center border">
            <button
              className="border px-2 py-2 rounded bg-teal-700 text-white font-bold m-1"
              onClick={() => updateIngredient(item)}
            >
              Sửa
            </button>
            <button
              className="border px-2 py-2 rounded bg-red-500 text-white font-bold m-1"
              onClick={() => deleteIngredient(item.id)}
            >
              Xóa
            </button>
          </div>
        </div>
      ));
      return res;
    } else return (<div>Not found</div>);
  };

  return (
    <div className="border mx-3 mt-3 rounded">
      <div className="w-full ml-2 my-2">
        <button
          className="px-2 py-2 border h-full bg-green-300 rounded"
          onClick={addNewIngredient}
        >
          Thêm mới
        </button>
      </div>
      <div className="mb-2">
        <div className="border grid grid-cols-10 mx-2">
          <div className="col-span-1 text-center border">Index</div>
          <div className="col-span-1 text-center border">Tên</div>
          <div className="col-span-1 text-center border">Đơn vị</div>
          <div className="col-span-2 text-center border">Mô tả</div>
          <div className="col-span-2 text-center border">Số lượng tồn kho</div>
          <div className="col-span-2 text-center border">Ngưỡng cảnh báo</div>
          <div className="col-span-1 text-center border">Hành động</div>
        </div>
        {renderIngredientList()}
      </div>
      <div>
        <IngredientModal
          open={isopenModal}
          hide={changeStatusModal}
          editItem={editIngredientItem}
        />
      </div>
    </div>
  );
}

export default Ingredient;
