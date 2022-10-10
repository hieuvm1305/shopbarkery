import React from "react";
import { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { addNewUnit, updateUnitItem } from "../../features/actions/UnitSlice";

function UnitModal(props) {
  const dispatch = useDispatch();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [unit, setunit] = useState({
    name: "",
    description: "",
  });
  useEffect(() => {
    if (props.editItem) {
      setunit({
        id: props.editItem.id,
        name: props.editItem.name,
        description: props.editItem.description,
      });
    }
    return () => {
      setunit({ name: "", description: "" });
    };
  }, [props.editItem]);

  const closeModal = () => {
    props.hide();
  };
  const addNewUnitItem = () => {
    let data = { ...unit };
    dispatch(addNewUnit(data));
    setunit({ name: "", description: "" });
    setTimeout(props.hide(), 2000);
  };
  const updateUnit = () => {
    let data = { ...unit };
    dispatch(updateUnitItem(data));
    setunit({ name: "", description: "" });
    props.hide();
  };
  return (
    <div>
      <Modal open={props.open} closeAfterTransition onClose={props.hide}>
        <Box sx={style}>
          <div>
            <div className="mb-2">
              <label>
                Tên <i className="text-red-600">*</i>
              </label>
              <input
                type={"text"}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={unit.name}
                onChange={(e) => {
                  setunit({ ...unit, name: e.target.value });
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
                value={unit.description}
                onChange={(e) =>
                  setunit({ ...unit, description: e.target.value })
                }
              />
            </div>

            <div>
              {props.editItem ? (
                <button
                  onClick={updateUnit}
                  className="px-2 py-2 bg-green-400 font-bold rounded mr-2"
                >
                  Cập nhật
                </button>
              ) : (
                <button
                  onClick={addNewUnitItem}
                  className="px-2 py-2 bg-green-400 font-bold rounded mr-2"
                >
                  Lưu
                </button>
              )}

              <button
                onClick={closeModal}
                className="px-2 py-2 bg-slate-500 font-bold rounded mr-2"
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

export default UnitModal;
