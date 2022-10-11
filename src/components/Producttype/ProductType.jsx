import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProductTypeList,
  getProductTypeList,
  selectReload,
  deleteProductType
} from "../../features/actions/ProductTypeSlice";
import TypeModal from "./TypeModal";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

function ProductType() {
  const dispatch = useDispatch();
  const productTypeList = useSelector(selectProductTypeList);
  const reload = useSelector(selectReload);
  const [openModal, setopenModal] = useState(false);
  const [editType, seteditType] = useState(null);

  useEffect(() => {
    dispatch(getProductTypeList());
    return () => {};
  }, [reload, dispatch]);
  const changeModal = () => {
    setopenModal((openModal) => (openModal = !openModal));
  };

  const addNewType = () => {
    changeModal();
    seteditType(null);
  };

  const configType = (data) => {
    changeModal();
    seteditType(data);
  };
  const deleteType = (id) => {
    if (window.confirm("Bạn có muốn xóa?")) {
      dispatch(deleteProductType(id));
    }
  };
  const renderProductList = () => {
    if(productTypeList){
    const res = productTypeList.map((item, index) => (
      <tr key={index}>
        <td className="border text-center">{index + 1}</td>
        <td className="border text-center">{item.name}</td>
        <td className="border text-center">{item.description}</td>
        <td className="border text-center">
          <button
            className=" border rounded px-2 py-2 my-2 mx-1 bg-orange-400"
            onClick={() => configType(item)}
          >
            <AiOutlineEdit />
          </button>
          <button
            className="border rounded px-2 py-2 my-2 mx-1 bg-red-500"
            onClick={() => deleteType(item.id)}
          >
            <AiOutlineDelete />
          </button>
        </td>
      </tr>
    ));
    return res;
    } else return (<div>Not found</div>)
  };
  return (
    <div className="border mx-2 my-2">
      <div className="border mx-2 my-2 rounded">
        <p className="font-bold mx-2 text-xl">Danh sách loại sản phẩm</p>
        <button
          className="px-2 py-2  mx-2 my-2 border rounded bg-lime-600 leading-tight text-white font-bold"
          onClick={addNewType}
        >
          <p>Thêm mới</p>
        </button>
      </div>
      <div className="mb-2">
        <div className="mx-2">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border">Index</th>
                <th className="border">Tên</th>
                <th className="border">Mô tả</th>
                <th className="border">Hành động</th>
              </tr>
            </thead>
            <tbody>{renderProductList()}</tbody>
          </table>
        </div>
      </div>
      <div>
        <TypeModal open={openModal} hide={changeModal} editType={editType} />
      </div>
    </div>
  );
}

export default ProductType;
