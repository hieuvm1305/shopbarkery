import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUnit,
  getUnitListTemp,
  selectReload,
  selectUnit,
} from "../../features/actions/UnitSlice";
import UnitModal from "./UnitModal";

function Unit() {
  const dispatch = useDispatch();
  const unitList = useSelector(selectUnit);
  const reload = useSelector(selectReload);
  const [isOpenModal, setisOpenmodal] = useState(false);
  const [editUnitItem, seteditUnitItem] = useState(null);

  useEffect(() => {
    dispatch(getUnitListTemp());
  }, [reload, dispatch]);

  const changeStatusModal = () => {
    setisOpenmodal((isOpenModal) => (isOpenModal = !isOpenModal));
  };
  const addNewUnit = () => {
    changeStatusModal();
    seteditUnitItem(null);
  };

  const updateUnitItem = (item) => {
    changeStatusModal();
    seteditUnitItem(item);
  };
  const deleteItem = async (id) => {
    if (window.confirm("Bạn có muốn xóa?")) {
      dispatch(deleteUnit(id));
    }
  };
  // viết component table để render tất cả các bảng
  //wait...
  const renderUnitList = () => {
    if(unitList){
    let res = unitList.map((item, index) => (
      <div className="border grid grid-cols-7 mx-2" key={index}>
        <div className="col-span-1 text-center border">
          <p>{index + 1}</p>
        </div>
        <div className="col-span-2 border">
          <p className="p-2">{item.name}</p>
        </div>
        <div className="col-span-3 border">
          <p className="p-2">{item.description}</p>
        </div>
        <div className="col-span-1 text-center border">
          <button
            className="border px-2 py-2 rounded bg-teal-700 text-white font-bold"
            onClick={() => updateUnitItem(item)}
          >
            Sửa
          </button>
          <button
            className="border px-2 py-2 rounded bg-red-500 text-white font-bold"
            onClick={() => deleteItem(item.id)}
          >
            Xóa
          </button>
        </div>
      </div>
    ));
    return res;
    } else {
      return (<div><h3>Error</h3></div>)
    }
  };

  return (
    <div className="border mx-3 mt-3 rounded">
      <div className="w-full ml-2 my-2">
        <button
          className="px-2 py-2 border h-full bg-green-300 rounded"
          onClick={addNewUnit}
        >
          Thêm mới
        </button>
      </div>
      <UnitModal
        open={isOpenModal}
        hide={changeStatusModal}
        editItem={editUnitItem}
      />
      <div className="mb-2">
        <div className="border grid grid-cols-7 mx-2">
          <div className="col-span-1 text-center border">Index</div>
          <div className="col-span-2  text-center border">Tên</div>
          <div className="col-span-3  text-center border">Mô tả</div>
          <div className="col-span-1  text-center border">Hành động</div>
        </div>
        {renderUnitList()}
      </div>
    </div>
  );
}

export default Unit;



