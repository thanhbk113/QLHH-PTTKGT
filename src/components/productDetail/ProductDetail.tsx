import { Add, ArrowDropDownCircle, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Fab,
  Menu,
  MenuItem,
  Modal,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { addToDepot } from "../../features/depotSlice";
import {
  addNewProduct,
  decreaseQuantity,
  increaseQuantity,
  productSelector,
  receiveProducts,
  sortProducts,
} from "../../features/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { dataHome, Input, MenuIp, product, styleBox } from "../../share";
import "./productDetail.scss";

const ProductDetail = () => {
  const dispath = useAppDispatch();
  const products = useAppSelector(productSelector);
  useEffect(() => {
    dispath(receiveProducts(dataHome));
  }, []);

  const options = ["Phù hợp nhất", "Sắp xếp theo giá", "Sắp xếp theo ngày"];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);
  const [newProduct, setNewProduct] = useState<product>({
    day: 0,
    id: 0,
    img: "",
    price: 0,
    quantity: 0,
  });
  const handleMenuItemClick = (
    event: React.ChangeEvent<EventTarget>,
    index: number
  ) => {
    switch (index) {
      case 0:
        dispath(receiveProducts(dataHome));
        break;
      case 1:
        dispath(sortProducts(1));
        break;
      case 2:
        dispath(sortProducts(2));
        break;
      default:
        break;
    }
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openMd, setopenMd] = React.useState(false);

  const handleAddNewProduct = (newProduct: product) => {
    if (
      !newProduct.id ||
      !newProduct.day ||
      !newProduct.img ||
      !newProduct.price ||
      !newProduct.quantity
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (products.productSp.find((item) => item.id === newProduct.id)) {
      toast.error("Sản phẩm này đã tồn tại");
      return;
    }
    toast.success("Thêm sản phẩm thành công");
    dispath(addNewProduct(newProduct));
    setopenMd(false);
  };

  const [ipDepot, setIpDepot] = useState<number>(0);
  return (
    <div className="productDetail">
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
            sx={{ width: "18.1rem" }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <div className="menuOption">
        <h4>Sắp xếp theo:</h4>
        <div className="sortContainer" onClick={handleClickListItem}>
          <h3>{options[selectedIndex]}</h3>
          <ArrowDropDownCircle />
        </div>
      </div>
      <h1> Đồng hồ mới nhất</h1>
      <div className="cardContainer">
        {products.productSp.map((d) => (
          <Card key={d.id}>
            <h4>New</h4>
            <img src={d.img} alt="" />
            <CardContent>
              <div className="info">
                <div className="left">
                  <h2>Số lượng {d.quantity}</h2>
                  <h2>Smart Watch {d.id}</h2>
                  <h2>Ngày nhập: {d.day}</h2>
                </div>
                <h2>Giá: ${d.price}</h2>
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={() => {
                  if (window.confirm("bạn có chắc chắn muốn xóa")) {
                    let t = products.productSp.filter(
                      (item) => item.id !== d.id
                    );
                    dispath(receiveProducts(t));
                    toast.success(`Xóa thành công Smart Watch ${d.id}`);
                  }
                }}
              >
                <Delete />
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  dispath(decreaseQuantity({ id: d.id, quantity: 1 }))
                }
              >
                -
              </Button>

              <MenuIp>
                <Input
                  placeholder="Nhập số lượng"
                  sx={{
                    ml: 1,
                  }}
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setIpDepot(e.target.valueAsNumber)
                  }
                />
                <Button
                  sx={{
                    color: "white",
                  }}
                  onClick={() => {
                    if (ipDepot > d.quantity) {
                      toast.error("Số lượng bạn nhập lớn hơn số lượng hiện có");
                      return;
                    }
                    if (!ipDepot || ipDepot <= 0) {
                      toast.error("Vui lòng nhập số lượng hợp lệ");
                      return;
                    }
                    dispath(addToDepot({ ...d, quantity: ipDepot }));
                    dispath(decreaseQuantity({ id: d.id, quantity: ipDepot }));
                    toast.success("Thêm vào kho thành công");
                  }}
                >
                  Thêm vào kho
                </Button>
              </MenuIp>
              <Button
                variant="contained"
                onClick={() => dispath(increaseQuantity(d.id))}
              >
                +
              </Button>
            </CardActions>
          </Card>
        ))}
        <Fab onClick={() => setopenMd(true)}>
          <Add />
        </Fab>
        <Modal open={openMd} onClose={() => setopenMd(false)}>
          <Box sx={styleBox}>
            <Input
              type="number"
              placeholder="Id"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewProduct({ ...newProduct, id: e.target.valueAsNumber })
              }
            />
            <Input
              type="text"
              placeholder="Ảnh minh họa"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewProduct({ ...newProduct, img: e.target.value })
              }
              value={newProduct.img}
            />
            <Input
              type="number"
              placeholder="Ngày nhập"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewProduct({ ...newProduct, day: e.target.valueAsNumber })
              }
            />
            <Input
              type="number"
              placeholder="Giá"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewProduct({ ...newProduct, price: e.target.valueAsNumber })
              }
            />
            <Input
              type="number"
              placeholder="Số lượng"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewProduct({
                  ...newProduct,
                  quantity: e.target.valueAsNumber,
                })
              }
            />
            <Button
              variant="contained"
              onClick={() => handleAddNewProduct(newProduct)}
            >
              Thêm sản phẩm
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ProductDetail;
