import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pizza } from "../data/menu-items";
import { RootState } from "./store";
import { formatPrice } from "../utils/price-utils";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type CartItem = Pizza & {
  quantity: number;
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Pizza>) => {
      const matchingPizza = state.items.find(existingItem => {
        return existingItem.id === action.payload.id;
      });
      if (!matchingPizza) {
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      } else {
        matchingPizza.quantity++;
      }
    },
    removeItem: (state, action: PayloadAction<Pizza>) => {
      const matchingPizza = state.items.find(existingItem => {
        return existingItem.id === action.payload.id;
      });
      matchingPizza!.quantity--;
      if (matchingPizza!.quantity === 0) {
        state.items = state.items.filter(item => {
          return item.id !== matchingPizza!.id;
        })
      }
    },
    deleteItem: (state, action: PayloadAction<Pizza>) => {
      state.items = state.items.filter(item => {
        return item.id !== action.payload.id;
      })
    },
    resetCart: (state) => {
      state.items = [];
    }
  }
});

export const { addItem, removeItem, deleteItem, resetCart } = cartSlice.actions;

const cartReducer = cartSlice.reducer;

export const selectCartItems = (state: RootState) => {
  return state.cart.items;
}

export const selectItemQuantity = (item: Pizza) => {
  return (state: RootState) => {
    const matchingCartItem = state.cart.items.find(existingItem => {
      return existingItem.id === item.id;
    });
    return matchingCartItem?.quantity || 0;
  }
}

export const selectPizzasCount = (state: RootState) => {
  return state.cart.items.reduce((acc, nextItem) => {
    return acc + nextItem.quantity;
  }, 0)
}

export const selectCartTotal = (state: RootState) => {
  const total = state.cart.items.reduce((acc, nextItem) => {
    return acc + (nextItem.quantity * nextItem.price);
  }, 0);
  return formatPrice(total);
}

export default persistReducer({
  key: 'cart',
  storage
}, cartReducer);