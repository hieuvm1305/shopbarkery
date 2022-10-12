import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductList,
  deleteProductItem,
  selectProductList,
  selectReload,
} from "../../features/actions/ProductSlice";
import ProductModal from "./ProductModal";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
function Product() {
  const dispatch = useDispatch();
  const productList = useSelector(selectProductList);
  const reload = useSelector(selectReload);
  const [openModal, setopenModal] = useState(false);
  const [productItem, setproductItem] = useState(null);
  
  useEffect(() => {
    dispatch(getProductList());
    return () => {};
  }, [reload, dispatch]);
  const deleteProduct = (id) => {
    if (window.confirm("Bạn có muốn xóa?")) {
      dispatch(deleteProductItem(id));
    }
  };
  //change status modal
  const changeModal = () => {
    setopenModal((openModal) => (openModal = !openModal));
  };

  //addnew
  const addNewProduct = () => {
    changeModal();
    setproductItem(null);
  };
  //update
  const updateProductItem = (data) => {
    changeModal();
    setproductItem(data);
  };
  const renderProductList = () => {
    if(productList){
    let res = productList.map((item, index) => (
      <div className="border rounded" key={index}>
        <img
          src={item.images && `${process.env.REACT_APP_IMAGE_URL}${item.images.split(";")[0]}`}
          alt="/"
          className="rounded"
        ></img>
        <p className="m-1">{item.name}</p>
        <p className="m-1">{item.description}</p>
        <p className="m-1">
          {item.unitPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
          / {item.unit}
        </p>
        <div>
          <button
            className=" border rounded px-2 py-2 my-2 mx-1 bg-orange-400"
            onClick={()=> updateProductItem(item)}
          >
            <AiOutlineEdit />
          </button>
          <button
            className="border rounded px-2 py-2 my-2 mx-1 bg-red-500"
            onClick={() => deleteProduct(item.id)}
          >
            <AiOutlineDelete />
          </button>
        </div>
      </div>
    ));
    return res;
  }else{
    return (<div>Not found</div>)
  }
  };
  return (
    <div className="m-2">
      <div>
        <p>Danh sách sản phẩm</p>
        <button
          className="border rounded px-2 py-2 bg-blue-400 text-white font-bold text-xl "
          onClick={addNewProduct}
        >
          Thêm mới
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 my-2">{renderProductList()}</div>
      <ProductModal
        open={openModal}
        hide={changeModal}
        productItem={productItem}
      />
    </div>
  );
}

export default Product;
