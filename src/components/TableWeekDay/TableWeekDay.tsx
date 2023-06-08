import moment from 'moment';

import styles from './TableWeekDay.module.sass';

interface ITableWeekDay {
  date: moment.Moment,
}

const TableWeekDay: React.FC<ITableWeekDay> = ({ date }) => {

  const monthDate = date.format('D');

  const getTodayClass = (date: moment.Moment): boolean => {
    const today = moment();
    return today.format('D-M-YY') === date.format('D-M-YY');
  }

  const isToday = getTodayClass(date);

  return (
    <div className={styles['day']}>
      <div className={styles['month-date']}>
        <div className={`${styles['month-date-button']} ${isToday ? styles['month-date-button-today'] : ''}`}>
          {monthDate}
        </div>
      </div>
    </div>
  )
};

export { TableWeekDay };