import { useEffect, useState } from 'react';

import styles from './TourSeatLayout.module.sass';
import { PageHeader } from '../PageHeader';
import { CustomButtonSelect } from '../CustomButtonSelect';
import { TRANSPORT_TYPE_OPTIONS as transportTypeOptions } from '../../constants/selectOptions';
import { ISelectOption } from '../../types/selectOption';

interface ITourSeatLayout {
  // children: ReactNode,
};

const TourSeatLayout: React.FC<ITourSeatLayout> = ({ }) => {
  const [transportType, setTransportType] = useState<string | number>(transportTypeOptions && transportTypeOptions[0] ? transportTypeOptions[0].value : '');

  const getTransportTypeValue = (value: string | number, options: ISelectOption[]) => {
    if (value && options && options.length) {
      return options.filter(option => option.value === value)[0]
    }
  }

  return (
    <div className={styles['seat-layout']}>
      <PageHeader align={'between'}>
        <div className={styles['block-title']}>Passenger Seating Plan</div>
        <CustomButtonSelect
          selectValue={getTransportTypeValue(transportType, transportTypeOptions)}
          selectOptions={transportTypeOptions}
          onChange={(option) => setTransportType(option.value)}
          className={styles['transport-type']}
        />
      </PageHeader>
      <div>
        
      </div>
    </div>
  )
};

export { TourSeatLayout };