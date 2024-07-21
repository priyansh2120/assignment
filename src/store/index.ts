import { configureStore } from '@reduxjs/toolkit';
import coinsReducer from './coinSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    coins: coinsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
