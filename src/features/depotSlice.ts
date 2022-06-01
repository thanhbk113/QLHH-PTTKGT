import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../hooks/store";
import { product, totalProducts } from "../share";

const initialState: {
  depotTotal: product[];
  depotHistory: totalProducts[];
} = {
  depotTotal: [],
  depotHistory: [],
};

const depotSlice = createSlice({
  initialState,
  name: "depot",
  reducers: {
    addToDepot: (state, action: PayloadAction<product>) => {
      let check = false; // 1
      state.depotTotal.forEach((item) => {
        // n
        if (item.id === action.payload.id) {
          // 1
          check = true; // 1
          item.quantity += action.payload.quantity; // 1
          return; // 1
        }
      });
      if (!check) {
        // 1
        state.depotTotal.push(action.payload); // 1
      }
    }, // => 1+n+1+1+1+1+1
    addDepotHistory: (state, action: PayloadAction<totalProducts>) => {
      state.depotTotal = []; // 1
      state.depotHistory.push(action.payload); // 1
    }, // => 1+1
    resetDepotHistory: (state) => {
      state.depotHistory = []; // 1
    }, // =>1
  }, // => 1+1
});

export const { addToDepot, addDepotHistory, resetDepotHistory } =
  depotSlice.actions;
export const depotSelector = (state: RootState) => state.depots;
export default depotSlice.reducer;
