import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Pizza } from "../data/menu-items";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { randAlphaNumeric } from "@ngneat/falso";
import { createOrderId } from "../utils/order-utils";

export type Order = {
  id: string;
  items: Array<
    Pizza & {
      quantity: number;
    }
  >;
  total: number;
  creditCardNum: string;
  state: "ready" | "pending";
};

interface OrdersState {
  items: Array<Order>;
}

const initialState: OrdersState = {
  items: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<Order>) => {
      const maskedNumber = action.payload.creditCardNum.replace(
        /\d(?=(?:\D*\d){4})/g,
        "*",
      );
      console.log({ maskedNumber });
      const newOrder = {
        ...action.payload,
        creditCardNum: maskedNumber,
      };
      state.items.push(newOrder);
      return state;
    },
    removeOrder: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { createOrder, removeOrder } = ordersSlice.actions;

export const selectOrders = (state: RootState) => state.orders.items;

export const selectOrder = (id: string) => {
  return (state: RootState) => {
    const matchingPizza = state.orders.items.find(
      (pizzaItem) => pizzaItem.id === id,
    );
    return matchingPizza ? matchingPizza : null;
  };
};

export default persistReducer(
  {
    key: "orders",
    storage,
  },
  ordersSlice.reducer,
);
