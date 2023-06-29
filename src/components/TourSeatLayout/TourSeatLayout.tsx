import { useState } from 'react';

import styles from './TourSeatLayout.module.sass';
import { PageHeader } from '../PageHeader';
import { CustomButtonSelect } from '../CustomButtonSelect';
import { TRANSPORT_TYPE_OPTIONS as transportTypeOptions } from '../../constants/selectOptions';
import { useGetSelectOption } from '../../hooks/useGetSelectOption';
import { SeatLayoutMinibus19 } from '../SeatLayoutMinibus19';
import { SeatLayoutBus35 } from '../SeatLayoutBus35';
import { useAppDispatch, useAppdSelector } from '../../hooks/reduxHook';
import { changeTransportType } from '../../store/slices/tourSlice';
import { ISelectOption } from '../../types/selectOption';
import { INotify } from '../../types/notify';
import { Notification } from '../Notification';

const TourSeatLayout: React.FC = ({ }) => {
  const [notify, setNotify] = useState<INotify>({ type: '', text: '' });

  const dispatch = useAppDispatch();
  const { transportType, touristsList } = useAppdSelector(state => state.tour);

  const getSeatLayoutBox = () => {
    switch (transportType) {
      case transportTypeOptions[0].value:
        return <SeatLayoutMinibus19 />;

      case transportTypeOptions[1].value:
        return <SeatLayoutBus35 />;
    }
  }

  const handlerChangeTransportType = (option: ISelectOption): void => {
    if (touristsList.length > option.seats) {
      return setNotify({ type: 'warning', text: 'The number of seats of the selected transport is less than the number of tourists.' });
    }

    dispatch(changeTransportType({ transportType: option.value, seats: option.seats }))
  }

  return (
    <div className={styles['seat-layout']}>
      <PageHeader align={'between'}>
        <div className={styles['block-title']}>Passenger Seating Plan</div>
        <CustomButtonSelect
          selectValue={useGetSelectOption(transportType, transportTypeOptions)}
          selectOptions={transportTypeOptions}
          onChange={handlerChangeTransportType}
          className={styles['transport-type']}
        />
      </PageHeader>
      <div className={styles['seat-layout-box']}>
        {getSeatLayoutBox()}
      </div>
      {
        notify && notify.text ?
          <Notification
            type={notify.type}
            message={notify.text}
            afterHide={() => setNotify({ type: '', text: '' })}
          /> : null
      }
    </div>
  )
};

export { TourSeatLayout };