import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Pizza } from "../data/menu-items";
import { formatPrice } from "../utils/price-utils";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface CartState {
  items: Array<
    Pizza & {
      quantity: number;
    }
  >;
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Pizza>) => {
      const matchingPizza = state.items.find((item) => {
        return item.id === action.payload.id;
      });
      if (!matchingPizza) {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        matchingPizza.quantity++;
      }
    },
    removeItem: (state, action: PayloadAction<Pizza>) => {
      const matchingPizza = state.items.find((item) => {
        return item.id === action.payload.id;
      });
      if (matchingPizza) {
        matchingPizza.quantity--;
      }
      if (matchingPizza?.quantity == 0) {
        state.items = state.items.filter(
          (item) => item.id !== matchingPizza.id,
        );
      }
    },
    deleteFromCart: (state, action: PayloadAction<Pizza>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addItem, removeItem, deleteFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectItemQuantity = (item: Pizza) => {
  return (state: RootState) => {
    const matchingPizza = state.cart.items.find(
      (pizzaItem) => pizzaItem.id === item.id,
    );
    return matchingPizza ? matchingPizza.quantity : 0;
  };
};

export const selectPizzasCount = (state: RootState) => {
  return state.cart.items.reduce((acc, next) => {
    return next.quantity + acc;
  }, 0);
};

export const selectCartTotal = (state: RootState) => {
  const total = state.cart.items.reduce((acc, next) => {
    return next.price * next.quantity + acc;
  }, 0);
  return formatPrice(total);
};

export default persistReducer(
  {
    key: "cart",
    storage,
  },
  cartSlice.reducer,
);
