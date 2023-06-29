import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRANSPORT_TYPE_OPTIONS as transportTypeOptions } from '../../constants/selectOptions';

import { ITour } from '../../types/tour';
import { ITourist } from '../../types/tourist';

interface IChangeInfoPayload {
  fieldName: string;
  value: string | number | null;
};

interface IPaymentPayload {
  clientId: string;
  payment: string;
};

const initialState: ITour = {
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  location: '',
  cost: '',
  managerId: '',
  insurance: '',
  transportType: transportTypeOptions && transportTypeOptions[0] ? transportTypeOptions[0].value : '',
  touristsList: [],
}

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setTour: (state, actions: PayloadAction<ITour>) => {

    },
    changeTourInfo: (state, actions: PayloadAction<IChangeInfoPayload>) => {
      state[actions.payload.fieldName] = actions.payload.value
    },
    resetToDefault: () => {
      return initialState
    },
    addTourist: (state, actions: PayloadAction<ITourist>) => {
      state.touristsList = [
        ...state.touristsList,
        actions.payload
      ]
    },
    deleteTourist: (state, actions: PayloadAction<string>) => {
      state.touristsList = state.touristsList.filter(tourist => tourist.clientId !== actions.payload);
    },
    changePayment: (state, actions: PayloadAction<IPaymentPayload>) => {
      state.touristsList = state.touristsList.map(tourist => {
        if (tourist.clientId === actions.payload.clientId) {
          return { ...tourist, paymentAmount: Number(actions.payload.payment)}
        } else { return tourist}
      });
    },
  },
});

export const { setTour, changeTourInfo, resetToDefault, addTourist, deleteTourist, changePayment } = tourSlice.actions;
export default tourSlice.reducer;