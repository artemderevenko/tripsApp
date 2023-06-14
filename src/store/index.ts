import { configureStore } from '@reduxjs/toolkit';

import holydayReducer from './slices/holydaySlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    holidays: holydayReducer,
    user: userReducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;