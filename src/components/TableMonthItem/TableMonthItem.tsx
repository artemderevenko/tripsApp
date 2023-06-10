import { useState, useEffect } from 'react';
import moment from 'moment';

import styles from './TableMonthItem.module.sass';
import { TableDaysHeader } from '../TableDaysHeader';

interface ITableMonthItem {
  month: any,
  year: number,
}

const TableMonthItem: React.FC<ITableMonthItem> = ({ month, year }) => {
  const [daysMonth, setDaysMonth] = useState<(moment.Moment | null)[]>([]);

  useEffect(() => {
    getDaysMonth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const getDaysMonth = (): void => {
    const date = moment();
    const firstDayOfMonth = date.year(year).month(month.value).date(1);
    const firstDayOfWeek = firstDayOfMonth.day();
    const diff = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    const emptyArray = Array.from({ length: diff }, () => null);
    const daysInMonth = firstDayOfMonth.daysInMonth();

    const daysList = Array.from({ length: daysInMonth }, (_, index) => {
      const copyFirstDay = firstDayOfMonth.clone();
      return moment(copyFirstDay).add(index, 'day');
    });

    setDaysMonth([
      ...emptyArray,
      ...daysList,
    ]);
  };

  const getScrollClass = (): string => {
    return ``
  }

  return (
    <div className={styles['table-month-item']}>
      <div className={styles['month-name']}>{month.label}</div>
      <TableDaysHeader mode={'month'} />
      {
        daysMonth && daysMonth.length ?
          <div className={styles['month-days-list']}>
            {
              daysMonth.map((item, index) => {
                return item ?
                  <div
                    key={item.format()}
                    className={`${styles['month-days-item']} ${getScrollClass()}`}
                  >
                    <div className={styles['date-button']}>
                      {item.format('D')}
                    </div>
                  </div> :

                  <div
                    key={`empty-day-${month.value}-${index}`}
                    className={styles['month-days-item']}
                  />
              }
              )
            }
          </div> : null
      }
    </div>
  )
};

export { TableMonthItem };