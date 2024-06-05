import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { persistStore } from "redux-persist";
import ordersReducer from "./ordersSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
