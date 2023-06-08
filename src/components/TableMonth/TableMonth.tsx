import { useState, useEffect } from 'react';
import moment from 'moment';

import styles from './TableMonth.module.sass';
import { TableWeekDay } from '../TableWeekDay';
import { TableDaysPagination } from '../TableDaysPagination';
import { TableDaysHeader } from '../TableDaysHeader';

const TableMonth: React.FC = () => {

  const [daysMonth, setDaysMonth] = useState<moment.Moment[]>([]);
  const [scrollDirection, setScrollDirection] = useState<string>('');
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(false);

  const handleScrollDirection = (direction: string, getDaysMonth: moment.Moment[]) => {
    setScrollDirection(direction);

    setTimeout(() => {
      setScrollDirection('');
      setDaysMonth(getDaysMonth);
    }, 180);
  };

  const getDaysMonth = (day: moment.Moment): moment.Moment[] => {
    const firstDayOfMonth = day.clone().startOf('month');
    const firstDayOfWeek = firstDayOfMonth.day();
    const diff = firstDayOfWeek === 0 ? -6 : 1 - firstDayOfWeek;
    const startDay = moment(firstDayOfMonth.add(diff, 'day'));
    const daysInMonth = day.daysInMonth();
    const tableWeekCount = Math.ceil((daysInMonth + Math.abs(diff)) / 7);
    const tableDaysCount = tableWeekCount * 7;

    const daysList = Array.from({ length: tableDaysCount }, (_, index) => {
      const copyFirstDay = startDay.clone();
      return moment(copyFirstDay).add(index, 'day');
    });
    return daysList;
  };

  useEffect(() => {
    const currentDate = moment();
    const daysMonthList = getDaysMonth(currentDate);
    setDaysMonth(daysMonthList);
  }, []);

  const clickPrev = (): void => {
    const currentMonthFirstDay = daysMonth[0];
    const middlePrevMonth = moment(currentMonthFirstDay).add(-15, 'day');
    handleScrollDirection('right', getDaysMonth(middlePrevMonth));
  }

  const clickNext = (): void => {
    const currentMonthLastDay = daysMonth[daysMonth.length - 1];
    const middleNextMonth = moment(currentMonthLastDay).add(15, 'day');
    handleScrollDirection('left', getDaysMonth(middleNextMonth));
  }

  const getScrollClass = (): string => {
    return `${scrollDirection === 'right' ? styles['scroll-right'] : ''} ${scrollDirection === 'left' ? styles['scroll-left'] : ''}`
  }

  const backToToday = (): void => {
    const currentDate = moment();
    const daysMonthList = getDaysMonth(currentDate);
    setDaysMonth(daysMonthList);
    setFadeAnimation(true);

    setTimeout(() => {
      setFadeAnimation(false)
    }, 180);
  }

  return (
    <div className={styles['table-month']}>
      <TableDaysPagination
        clickPrev={clickPrev}
        clickNext={clickNext}
        tableTitle={'Janvar'}
        backToToday={backToToday}
      />
      {
        daysMonth && daysMonth.length ?
          <div className={`${styles['table-month-wrap']} ${styles[`rows-${daysMonth.length / 7 || 5}`]}`}>
            <TableDaysHeader />
            <div className={`${styles['table-month-content']} ${getScrollClass()}`}>
              {
                daysMonth.map(item => (
                  <TableWeekDay
                    key={item.format()}
                    date={item}
                  />))
              }
            </div>
          </div> : null
      }
    </div>
  )
};

export { TableMonth };