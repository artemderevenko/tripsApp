import moment from 'moment';

import { DAYS_OF_WEEK as daysOfWeek } from '../../constants/daysOfWeek';
import styles from './TableDaysHeader.module.sass';

const TableDaysHeader: React.FC = () => {
  return (
    <div className={styles['table-days-header']}>
      {
        daysOfWeek && daysOfWeek.length ?
          daysOfWeek.map(day => {
            return (<div
              key={day.label}
              className={styles['day-week']}
            >
              {day.label}
            </div>)
          }) : null
      }
    </div>
  )
};

export { TableDaysHeader };