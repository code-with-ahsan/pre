import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "./cartSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  creditCardNum: string;
  state: 'ready' | 'pending';
}

interface OrderState {
  items: Order[]
};

const initialState: OrderState = {
  items: []
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<Order>) => {
      const maskedCCRegex = /\d(?=(?:\D*\d){4})/g;
      const maskedCCNumber = action.payload.creditCardNum.replace(
        maskedCCRegex,
        '*'
      );
      const newOrder: Order = {
        ...action.payload,
        creditCardNum: maskedCCNumber
      }
      state.items.push(newOrder);
    },
    removeOrder: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
    }
  }
});

export const { createOrder, removeOrder } = ordersSlice.actions;

const ordersReducer = ordersSlice.reducer;

export default persistReducer({
  key: 'orders',
  storage
}, ordersReducer);