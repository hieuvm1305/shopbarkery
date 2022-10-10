import React from "react";
import { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUnit, getUnitListTemp } from "../../features/actions/UnitSlice";
import {
  createIngredientItem,
  updateIngredientItem,
} from "../../features/actions/IngredientSlice";

function IngredientModal(props) {
  const dispatch = useDispatch();
  const unitList = useSelector(selectUnit);
  const [ingredientItem, setingredientItem] = useState({
    id: "",
    name: "",
    idUnit: 0,
    quantity: 0,
    description: "",
    warningThreshold: "",
    unit: "",
  });

  useEffect(() => {
    dispatch(getUnitListTemp());
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    if (props.editItem) {
      setingredientItem({
        id: props.editItem.id,
        name: props.editItem.name,
        idUnit: props.editItem.idUnit,
        quantity: props.editItem.quantity,
        description: props.editItem.description,
        warningThreshold: props.editItem.warningThreshold,
        unit: props.editItem.unit,
      });
    }
    return () => {
    };
  }, [props.editItem]);
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

  const closeModal = () => {
    setingredientItem({
      id: "",
      name: "",
      idUnit: 0,
      quantity: 0,
      description: "",
      warningThreshold: "",
      unit: "",
    });
    props.hide();
  };
  const updateItem = () => {
    let data = {...ingredientItem};
    console.log(data)
    dispatch(updateIngredientItem(data));
    setingredientItem({
      id: "",
      name: "",
      idUnit: 0,
      description: "",
      warningThreshold: "",
      unit: "",
    });
    props.hide();
  };
  const addNewItem = () => {
    let data = { ...ingredientItem };
    dispatch(createIngredientItem(data));
    setingredientItem({
      id: "",
      name: "",
      idUnit: 0,
      quanity: 0,
      description: "",
      warningThreshold: "",
      unit: "",
    });
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
                onChange={(e) => {
                  setingredientItem({
                    ...ingredientItem,
                    name: e.target.value,
                  });
                }}
                value={ingredientItem.name}
              />
            </div>
            <div className="mb-2">
              <label>
                Mô tả <i className="text-red-600">*</i>
              </label>
              <input
                type={"text"}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => {
                  setingredientItem({
                    ...ingredientItem,
                    description: e.target.value,
                  });
                }}
                value={ingredientItem.description}
              />
            </div>
            <div className="mb-2">
              <label>
                Đơn vị tính <i className="text-red-600">*</i>
              </label>
              <select
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => {
                  setingredientItem({
                    ...ingredientItem,
                    idUnit: e.target.value,
                  });
                }}
                defaultValue={ingredientItem.unit}
              >
                {unitList.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label>
                Tồn kho <i className="text-red-600">*</i>
              </label>
              <input
                type={"text"}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) =>
                  setingredientItem({
                    ...ingredientItem,
                    warningThreshold: e.target.value,
                  })
                }
                value={ingredientItem.warningThreshold}
              />
            </div>

            <div>
              <button
                className="px-2 py-2 bg-green-400 font-bold rounded mr-2"
                onClick={props.editItem ? updateItem : addNewItem}
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

export default IngredientModal;
