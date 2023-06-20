import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IClient } from '../../types/client';

interface IClientsState {
  list: IClient[] | [],
};

const initialState: IClientsState = {
  list: [],
}

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClient: (state, actions: PayloadAction<IClient[] | []>) => {
      state.list = actions.payload
    },
    addClient: (state, actions: PayloadAction<IClient>) => {
    },
    removeClient: (state) => {
    },
  },
});

export const { setClient, addClient, removeClient } = clientsSlice.actions;
export default clientsSlice.reducer;