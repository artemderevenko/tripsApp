import { configureStore } from '@reduxjs/toolkit';

import holydayReducer from './slices/holydaySlice';
import userReducer from './slices/userSlice';
import clientsReducer from './slices/clientsSlice';
import managersReducer from './slices/managersSlice';
import tourReducer from './slices/tourSlice';

const store = configureStore({
  reducer: {
    holidays: holydayReducer,
    user: userReducer,
    clients: clientsReducer,
    managers: managersReducer,
    tour: tourReducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;