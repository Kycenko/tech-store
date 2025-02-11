import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import initialGoodsSlice from '../features/initialGoods/initialGoodsSlice';
import usersSlice from '../features/initialUsers/initialUsersSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { goodsApi } from '../goodsApi';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  initialGoods: initialGoodsSlice,
  users: usersSlice,
  [goodsApi.reducerPath]: goodsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(goodsApi.middleware),
});

export const persistor = persistStore(store);
export default store;
