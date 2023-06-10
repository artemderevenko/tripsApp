import { useState, useEffect } from 'react';
import moment from 'moment';

import styles from './TableWeek.module.sass';
import { TableDayItem } from '../TableDayItem';
import { TableDaysPagination } from '../TableDaysPagination';
import { TableDaysHeader } from '../TableDaysHeader';                        

const TableWeek: React.FC = () => {

  const [daysWeek, setDaysWeek] = useState<moment.Moment[]>([]);
  const [scrollDirection, setScrollDirection] = useState<string>('');
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(false);
  const [tableTitle, setTableTitle] = useState<string>('');

  const handleScrollDirection = (direction: string, daysList: moment.Moment[]) => {
    setScrollDirection(direction);

    setTimeout(() => {
      setScrollDirection('');
      getTableTitle(daysList);
      setDaysWeek(daysList);
    }, 180);
  };

  const getTableTitle = (daysList: moment.Moment[]): void => {
    const firstDay = daysList[0];
    const lastDay = daysList[daysList.length - 1];
    const yearFirstDay = firstDay.year(); 
    const fullMonthFirstDay = firstDay.format('MMMM');
    const yearLastDay = lastDay.year(); 
    const fullMonthLastDay = lastDay.format('MMMM');
    let tableTitle = `${fullMonthFirstDay} ${yearFirstDay}`;

    if (yearFirstDay === yearLastDay && fullMonthFirstDay !== fullMonthLastDay) { 
      tableTitle = `${firstDay.format('MMM')} - ${lastDay.format('MMM')} ${yearFirstDay}`
    }

    if (yearFirstDay !== yearLastDay && fullMonthFirstDay !== fullMonthLastDay) { 
      tableTitle = `${firstDay.format('MMM')} ${yearFirstDay} - ${lastDay.format('MMM')} ${yearLastDay}`
    }

    setTableTitle(tableTitle);
  }

  const getStartDaysWeek = (): void => {
    const currentDate = moment();
    const getFirstDayWeek = currentDate.startOf('week');

    const daysList = Array.from({ length: 7 }, (_, index) => {
      const copyFirstDay = getFirstDayWeek.clone();
      return moment(copyFirstDay).add(index + 1, 'day');
    })

    setDaysWeek(daysList);
    getTableTitle(daysList);
    setFadeAnimation(true);

    setTimeout(() => {
      setFadeAnimation(false)
    }, 300);
  }

  useEffect(() => {
    getStartDaysWeek()
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);

  const clickPrev = (): void => {
    const daysList = Array.from({ length: 7 }, (_, index) => {
      const copyFirstDay = daysWeek[0].clone();
      return moment(copyFirstDay).add(index - 7, 'day');
    });

    handleScrollDirection('right', daysList);
  }

  const clickNext = (): void => {
    const daysList = Array.from({ length: 7 }, (_, index) => {
      const copyFirstDay = daysWeek[daysWeek.length - 1].clone();
      return moment(copyFirstDay).add(index + 1, 'day');
    });

    handleScrollDirection('left', daysList);
  }

  const getScrollClass = (): string => {
    return `${scrollDirection === 'right' ? styles['scroll-right'] : ''} ${scrollDirection === 'left' ? styles['scroll-left'] : ''} ${fadeAnimation ? styles['fade'] : ''}`
  }

  const backToToday = (): void => {
    getStartDaysWeek()
  }

  return (
    <div className={styles['table-week']}>
      <TableDaysPagination
        clickPrev={clickPrev}
        clickNext={clickNext}
        tableTitle={tableTitle}
        backToToday={backToToday}
      />
      {
        daysWeek && daysWeek.length ?
          <div className={styles['table-week-wrap']}>
            <TableDaysHeader mode={'week'} />
            <div className={`${styles['table-week-content']} ${getScrollClass()}`}>
              {
                daysWeek.map(item => (
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

export { TableWeek };