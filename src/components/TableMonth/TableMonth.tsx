import { useState, useEffect } from 'react';
import moment from 'moment';

import styles from './TableMonth.module.sass';
import { TableDayItem } from '../TableDayItem';
import { TableDaysPagination } from '../TableDaysPagination';
import { TableDaysHeader } from '../TableDaysHeader';

const TableMonth: React.FC = () => {

  const [daysMonth, setDaysMonth] = useState<moment.Moment[]>([]);
  const [scrollDirection, setScrollDirection] = useState<string>('');
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(false);
  const [tableTitle, setTableTitle] = useState<string>('');

  const handleScrollDirection = (direction: string, daysMonthList: moment.Moment[]) => {
    setScrollDirection(direction);

    setTimeout(() => {
      setScrollDirection('');
      getTableTitle(daysMonthList);
      setDaysMonth(daysMonthList);
    }, 180);
  };

  const getTableTitle = (daysList: moment.Moment[]): void => {
    const middleMonth = daysList[15];
    const yearMiddleMonth = middleMonth.year(); 
    const fullMonthMiddleMonth = middleMonth.format('MMMM');
    setTableTitle(`${fullMonthMiddleMonth} ${yearMiddleMonth}`);
  }

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

  const getStartDaysMonth = (): void => {
    const currentDate = moment();
    const daysMonthList = getDaysMonth(currentDate);
    setDaysMonth(daysMonthList);
    getTableTitle(daysMonthList);
    setFadeAnimation(true);

    setTimeout(() => {
      setFadeAnimation(false)
    }, 300);
  }

  useEffect(() => {
    getStartDaysMonth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    return `${scrollDirection === 'right' ? styles['scroll-right'] : ''} ${scrollDirection === 'left' ? styles['scroll-left'] : ''} ${fadeAnimation ? styles['fade'] : ''}`
  }

  const backToToday = (): void => {
    getStartDaysMonth()
  }

  return (
    <div className={styles['table-month']}>
      <TableDaysPagination
        clickPrev={clickPrev}
        clickNext={clickNext}
        tableTitle={tableTitle}
        backToToday={backToToday}
      />
      {
        daysMonth && daysMonth.length ?
          <div className={`${styles['table-month-wrap']} ${styles[`rows-${daysMonth.length / 7 || 5}`]}`}>
            <TableDaysHeader mode={'week'} />
            <div className={`${styles['table-month-content']} ${getScrollClass()}`}>
              {
                daysMonth.map(item => (
                  <TableDayItem
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