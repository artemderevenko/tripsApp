import { configureStore } from '@reduxjs/toolkit';

import holydayReducer from './holydaySlice';

const store = configureStore({
  reducer: {
    holidays: holydayReducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;