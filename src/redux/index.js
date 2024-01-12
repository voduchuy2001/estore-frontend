import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productSlice from "./productSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userSliceReducer);
const persistedProductReducer = persistReducer(persistConfig, productSlice);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    product: persistedProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
