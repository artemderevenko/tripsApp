import { DAYS_OF_WEEK as daysOfWeek } from '../../constants/daysOfWeek';
import styles from './TableDaysHeader.module.sass';

interface ITableDaysHeader {
  mode: string,
}

const TableDaysHeader: React.FC<ITableDaysHeader> = ({ mode }) => {
  return (
    <div className={styles[`day-names-header-${mode}`]}>
      {
        daysOfWeek && daysOfWeek.length ?
          daysOfWeek.map(day => {
            return (<div
              key={day.label}
              className={styles[`day-name-${mode}`]}
            >
              {day.label}
            </div>)
          }) : null
      }
    </div>
  )
};

export { TableDaysHeader };