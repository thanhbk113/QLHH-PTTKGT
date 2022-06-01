import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
          (x: product, y: product) => x.price - y.price //n
        );
        return;
      }
      state.productSp = state.productSp.sort(
        (x: product, y: product) => x.day - y.day //n
      );
    },
    receiveProducts: (state, action: PayloadAction<product[]>) => {
      state.productSp = action.payload; // 1
    },
    decreaseQuantity: (state, action: PayloadAction<decreaseProp>) => {
      state.productSp.forEach((item) => {
        // n
        if (item.id === action.payload.id) {
          if (item.quantity === action.payload.quantity) {
            state.productSp = state.productSp.filter(
              (item) => item.id !== action.payload.id //n
            );
            return;
          }

          item.quantity -= action.payload.quantity; // 1
        }
      }); //=> //n*n*1=n^2
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      state.productSp.forEach((item) => {
        // n
        if (item.id === action.payload) {
          item.quantity++;
        }
      });
    },
    addNewProduct: (state, action: PayloadAction<product>) => {
      state.productSp.push(action.payload); // 1
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
