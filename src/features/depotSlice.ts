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
      let check = false;
      state.depotTotal.forEach((item) => {
        if (item.id === action.payload.id) {
          check = true;
          item.quantity += action.payload.quantity;
          return;
        }
      });
      if (!check) {
        state.depotTotal.push(action.payload);
      }
    },
    addDepotHistory: (state, action: PayloadAction<totalProducts>) => {
      state.depotTotal = [];
      state.depotHistory.push(action.payload);
    },
    resetDepotHistory: (state) => {
      state.depotHistory = [];
    },
  },
});

export const { addToDepot, addDepotHistory, resetDepotHistory } =
  depotSlice.actions;
export const depotSelector = (state: RootState) => state.depots;
export default depotSlice.reducer;
