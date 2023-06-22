import styles from './TourSeatLayout.module.sass';
import { PageHeader } from '../PageHeader';
import { CustomButtonSelect } from '../CustomButtonSelect';
import { TRANSPORT_TYPE_OPTIONS as transportTypeOptions } from '../../constants/selectOptions';
import { useGetSelectOption } from '../../hooks/useGetSelectOption';
import { SeatLayoutMinibus19 } from '../SeatLayoutMinibus19';
import { SeatLayoutBus35 } from '../SeatLayoutBus35';
import { useAppDispatch, useAppdSelector } from '../../hooks/reduxHook';
import { changeTourInfo } from '../../store/slices/tourSlice';

const TourSeatLayout: React.FC = ({ }) => {
  const dispatch = useAppDispatch();
  const { transportType } = useAppdSelector(state => state.tour);

  const getSeatLayoutBox = () => {
    switch (transportType) {
      case transportTypeOptions[0].value:
        return <SeatLayoutMinibus19 />;

      case transportTypeOptions[1].value:
        return <SeatLayoutBus35 />;
    }
  }

  return (
    <div className={styles['seat-layout']}>
      <PageHeader align={'between'}>
        <div className={styles['block-title']}>Passenger Seating Plan</div>
        <CustomButtonSelect
          selectValue={useGetSelectOption(transportType, transportTypeOptions)}
          selectOptions={transportTypeOptions}
          onChange={(option) => dispatch(changeTourInfo({ fieldName: 'transportType', value: option.value }))}
          className={styles['transport-type']}
        />
      </PageHeader>
      <div className={styles['seat-layout-box']}>
        {getSeatLayoutBox()}
      </div>
    </div>
  )
};

export { TourSeatLayout };