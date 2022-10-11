import React from "react";
import { Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUnit, getUnitListTemp } from "../../features/actions/UnitSlice";
import {
  selectIngredient,
  getIngredientList,
} from "../../features/actions/IngredientSlice";
import {
  selectProductTypeList,
  getProductTypeList,
} from "../../features/actions/ProductTypeSlice";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createProductItem } from "../../features/actions/ProductSlice";
function ProductModal({ open, hide, productItem }) {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 3,
    borderRadius: "5px",
    maxheight: "100%",
    overflowY: "auto",
  };
  const [product, setproduct] = useState({
    name: "",
    description: "",
    idUnit: "",
    unitPrice: "",
    types: [],
    ingredientObjArr: [],
    fileBase64ObjArr: [],
  });
  //Material select
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();
  const dispatch = useDispatch();
  const unitList = useSelector(selectUnit);
  const ingredientList = useSelector(selectIngredient);
  const productTypeList = useSelector(selectProductTypeList);
  useEffect(() => {
    dispatch(getUnitListTemp());
    dispatch(getIngredientList());
    dispatch(getProductTypeList());
    return () => {};
  }, [dispatch]);
  const [temp, settemp] = useState([]);

  useEffect(() => {
    if (productItem) {
      setproduct({
        id: productItem.id,
        name: productItem.name,
        description: productItem.description,
        unitPrice: productItem.unitPrice,
        unit: productItem.unit,
        images: productItem.images.split(";"),
      });
    }
    return () => {};
  }, [productItem]);
  const closeModal = () => {
    hide();
  };
  const [amountIngre, setamountIngre] = useState(0);
  const handleChangeTypes = (e) => {
    const {
      target: { value },
    } = e;
    setproduct({
      ...product,
      types: typeof value === "string" ? value.split(";") : value,
    });
    console.log(product.types);
  };
  const handleUploadFile = (e) => {
    const filesPreview = [];
    const fileBase64ObjArr = [];
    for (let file of e.target.files) {
      const name = v4();
      filesPreview.push({
        url: URL.createObjectURL(file),
        name,
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        fileBase64ObjArr.push({
          base64: reader.result,
          name,
        });
      };
      reader.onerror = function (error) {
        toast.error("Upload ảnh lỗi!");
      };
    }
    settemp([...filesPreview]);
    setproduct({ ...product, fileBase64ObjArr: fileBase64ObjArr });
  };
  const changeAmountIngredient = (e) => {
    setamountIngre(e.target.value);
  };
  //changeingre
  const [ingreName, setingreName] = useState("");
  const handleChangeIngre = (e) => {
    setingreName(e.target.value);
  };
  const addNewIngre = () => {
    if (ingreName && amountIngre) {
      let data = {
        idIngredient: ingreName,
        amount: amountIngre,
        isCreated: true,
        isDeleted: false,
        isModified: false,
      };
      setproduct({
        ...product,
        ingredientObjArr: [...product.ingredientObjArr, data],
      });
      setamountIngre("");
      setingreName("");
    }
  };

  const saveProduct = () => {
    let data = { ...product };
    if (window.confirm("Bạn có thêm sản phẩm không")) {
      dispatch(createProductItem(data));
      setproduct({
        name: "",
        description: "",
        idUnit: "",
        unitPrice: "",
        types: [],
        ingredientObjArr: [],
        fileBase64ObjArr: [],
      });
      settemp([]);
    }
  };
  return (
    <div>
      <Modal open={open} onClose={hide}>
        <Box sx={style}>
          <div className=" grid gap-y-3">
            <div className="border-b text-2xl font-bold my-2">Sản phẩm</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label>Tên sản phẩm</label>
                <input
                  type="text"
                  className="w-full border rounded py-2 px-3 leading-tight"
                  onChange={(e) => {
                    setproduct({ ...product, name: e.target.value });
                  }}
                />
              </div>
              <div>
                <label>Mô tả</label>
                <input
                  type="text"
                  className="w-full border rounded py-2 px-3 leading-tight"
                  onChange={(e) => {
                    setproduct({ ...product, description: e.target.value });
                  }}
                />
              </div>
              <div>
                <label>Đơn vị tính</label>
                <select
                  className="w-full border rounded h-10 py-2 px-3 "
                  onChange={(e) => {
                    setproduct({ ...product, idUnit: e.target.value });
                  }}
                >
                  {" "}
                  <option></option>
                  {unitList &&
                    unitList.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label>Đơn giá</label>
                <input
                  type="text"
                  className="w-full border rounded h-10 py-2 px-3 leading-tight"
                  onChange={(e) => {
                    setproduct({ ...product, unitPrice: e.target.value });
                  }}
                />
              </div>
            </div>

            <div>
              <FormControl className="w-full">
                <InputLabel id="type">Thể loại sản phẩm</InputLabel>
                <Select
                  labelId="type"
                  id="type-name"
                  multiple
                  value={product.types}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                  onChange={handleChangeTypes}
                >
                  {productTypeList &&
                    productTypeList.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item.id}
                        style={getStyles(item.name, product.types, theme)}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <input
                type="file"
                className="w-full border rounded py-2 px-3 leading-tight"
                multiple
                onChange={handleUploadFile}
              ></input>
              <div className="grid grid-cols-4">
                {temp &&
                  temp.map((item, index) => (
                    <div key={index}>
                      <img src={item["url"]} alt="" className="max-h-40" />
                    </div>
                  ))}
              </div>
            </div>
            <div className="border-b">
              <h4>Danh sách nguyên liệu</h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="">Nguyên liệu</label>
                <select
                  className="w-full border rounded py-2 px-3 h-10 leading-tight "
                  onChange={handleChangeIngre}
                >
                  <option></option>
                  {ingredientList &&
                    ingredientList.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="">
                <label>Số lượng</label>
                <input
                  type="text"
                  className="w-full border rounded py-2 px-3 h-10 leading-tight"
                  onChange={changeAmountIngredient}
                />
              </div>
              <div className="relative">
                <div className="absolute bottom-0 left-0">
                  <button
                    className="border rounded px-3 py-2 h-10 bg-green-400 text-white font-bold leading-tight"
                    onClick={addNewIngre}
                  >
                    + Thêm mới
                  </button>
                </div>
              </div>
            </div>
            <div></div>
            <div>
              <button
                className="border rounded px-2 py-2 bg-green-500 font-bold mx-2 text-white"
                onClick={saveProduct}
              >
                Lưu
              </button>
              <button
                className="border rounded px-2 py-2 bg-slate-300 font-bold mx-2"
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

export default ProductModal;
