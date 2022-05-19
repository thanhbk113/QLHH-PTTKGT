import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../hooks/store";
import { decreaseProp, product } from "../share";

export const initialState: {
  productSp: product[];
} = {
  productSp: [],
};

const productSlice = createSlice({
  initialState,
  name: "product",
  reducers: {
    sortProducts: (state, action: PayloadAction<number>) => {
      if (action.payload === 1) {
        state.productSp = state.productSp.sort(
          (x: product, y: product) => x.price - y.price
        );
        return;
      }
      state.productSp = state.productSp.sort(
        (x: product, y: product) => x.day - y.day
      );
    },
    receiveProducts: (state, action: PayloadAction<product[]>) => {
      state.productSp = action.payload;
    },
    decreaseQuantity: (state, action: PayloadAction<decreaseProp>) => {
      state.productSp.forEach((item) => {
        if (item.id === action.payload.id) {
          if (item.quantity === action.payload.quantity) {
            if (window.confirm("Bạn có chắc muốn xóa sản phẩm")) {
              state.productSp = state.productSp.filter(
                (item) => item.id !== action.payload.id
              );
            }
            return;
          }

          item.quantity -= action.payload.quantity;
        }
      });
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      state.productSp.forEach((item) => {
        if (item.id === action.payload) {
          item.quantity++;
        }
      });
    },
    addNewProduct: (state, action: PayloadAction<product>) => {
      state.productSp.push(action.payload);
    },
  },
});

export const productSelector = (state: RootState) => state.products;
export const {
  receiveProducts,
  sortProducts,
  decreaseQuantity,
  increaseQuantity,
  addNewProduct,
} = productSlice.actions;
export default productSlice.reducer;
