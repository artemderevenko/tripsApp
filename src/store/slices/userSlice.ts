import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../types/user';

const initialState: IUser = {
  email: null,
  token: null,
  id: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<IUser>) => {
      state.email = actions.payload.email;
      state.token = actions.payload.token;
      state.id = actions.payload.id;
    },
    removeUser: (state) => {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;