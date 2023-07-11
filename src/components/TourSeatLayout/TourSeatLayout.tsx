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
import { CustomModal } from '../CustomModal';
import { IChangeTransportTypePayload } from '../../types/changeTransportTypePayload';
import { useNotify } from '../../hooks/useNotify';
import buttonStyles from '../CustomButtonSelect/CustomButtonSelect.module.sass';

const TourSeatLayout: React.FC = ({ }) => {
  const { setNotify } = useNotify();
  const [showChangeTransportModal, setShowChangeTransportModal] = useState<boolean>(false);
  const [transportInfo, setTransportInfo] = useState<IChangeTransportTypePayload>({ transportType: '', seats: 0 });

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

  const confirmTransportChange = () => {
    dispatch(changeTransportType(transportInfo));
    setTransportInfo({ transportType: '', seats: 0 });
    setShowChangeTransportModal(false);
    setNotify({ isActive: true, message: 'Transport type changed successfully!', type: 'success' });
  }

  const handlerChangeTransportType = (option: ISelectOption): void => {
    if (transportType === option.value) return;
    
    if (touristsList.length > option.seats) {
      return setNotify({ isActive: true, type: 'warning', message: 'The number of seats of the selected transport is less than the number of tourists.' });
    }
    
    setTransportInfo({ transportType: option.value, seats: option.seats });
    setShowChangeTransportModal(true);
  }

  const cancelTransportChange = () => {
    setTransportInfo({ transportType: '', seats: 0 });
    setShowChangeTransportModal(false);
  }

  return (
    <div className={styles['seat-layout']}>
      <PageHeader align={'between'}>
        <div className={styles['block-title']}>Passenger Seating Plan</div>
        <CustomButtonSelect
          selectValue={useGetSelectOption(transportType, transportTypeOptions)}
          selectOptions={transportTypeOptions}
          onChange={handlerChangeTransportType}
          className={buttonStyles['long']}
          id="transport-hide-in-pdf"
        />
      </PageHeader>
      <div className={styles['seat-layout-box']}>
        {getSeatLayoutBox()}
      </div>
      {
        showChangeTransportModal ?
          <CustomModal
            title={'Confirm transport change'}
            onClose={cancelTransportChange}
            buttonsList={[
              {
                onButtonClick: cancelTransportChange,
                buttonText: 'Cancel',
                type: 'cancel',
              },
              {
                onButtonClick: confirmTransportChange,
                buttonText: 'Confirm',
                type: 'confirm',
              }
            ]}
          >
            <div>
              Once the mode of transport is changed, the previous <br /> 
              seating chart will be cleared.
            </div>
          </CustomModal> : null
      }
    </div>
  )
};

export { TourSeatLayout };