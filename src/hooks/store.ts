import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import depotReducer from "../features/depotSlice";
import productReducer from "../features/productSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    depots: depotReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
