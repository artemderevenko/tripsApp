import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRANSPORT_TYPE_OPTIONS as transportTypeOptions } from '../../constants/selectOptions';

import { ITour } from '../../types/tour';
import { ITourist } from '../../types/tourist';

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
    changeTourInfo: (state, actions) => {
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
  },
});

export const { setTour, changeTourInfo, resetToDefault, addTourist } = tourSlice.actions;
export default tourSlice.reducer;