import React from "react";
import { Modal, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { createproductType } from "../../features/actions/ProductTypeSlice";
function TypeModal(props) {
  const dispatch = useDispatch();
  const [productType, setproductType] = useState({name: "", description: ""});
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
  };

  useEffect(() => {
    if (props.editType) {
      setproductType({
        id: props.editType.id,
        name: props.editType.name,
        description: props.editType.description,
      });
    }
    return () => {};
  }, [props.editType]);
  const closeModal = () => {
    setproductType({ name: "", description: "" });
    props.hide();
  };

  const addNewType = () => {
    let data = {...productType};
    dispatch(createproductType(data));
    props.hide();
  };
  const updateType = () => {
    props.hide();
  };
  return (
    <div>
      <Modal open={props.open} onClose={props.hide}>
        <Box sx={style}>
          <div>
            <div className="mb-2">
              <label>
                Tên <i className="text-red-600">*</i>
              </label>
              <input
                type={"text"}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={productType.name}
                onChange={(e) => {
                  setproductType({ ...productType, name: e.target.value });
                }}
              />
            </div>
            <div className="mb-2">
              <label>
                Mô tả <i className="text-red-600">*</i>
              </label>
              <input
                type={"text"}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={productType.description}
                onChange={(e) => {
                  setproductType({ ...productType, description: e.target.value });
                }}
              />
            </div>
            <div>
              <button
                className="px-2 py-2 bg-green-400 font-bold rounded mr-2"
                onClick={props.editType ? updateType : addNewType}
              >
                Lưu
              </button>
              <button
                className="px-2 py-2 bg-slate-500 font-bold rounded mr-2"
                onClick={closeModal}
              >
                Hủy
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default TypeModal;
