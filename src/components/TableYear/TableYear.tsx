import { useState, useEffect } from 'react';
import moment from 'moment';

import styles from './TableYear.module.sass';
import { MONTHS_LIST as monthsList } from '../../constants/monthsList';
import { TableDaysPagination } from '../TableDaysPagination';
import { TableMonthItem } from '../TableMonthItem';

const TableYear: React.FC = () => {
  const [year, setYear] = useState<number>();
  const [scrollDirection, setScrollDirection] = useState<string>('');
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);

  const getStartYear = (): void => {
    setYear(moment().year());
    setFadeAnimation(true);

    setTimeout(() => {
      setFadeAnimation(false)
    }, 300);
  }

  useEffect(() => {
    getStartYear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScrollDirection = (direction: string, nextYear: number) => {
    setScrollDirection(direction);

    setTimeout(() => {
      setScrollDirection('');
      setYear(nextYear);
    }, 180);
  };

  const clickPrev = (): void => {
    handleScrollDirection('right', year ? year - 1 : moment().year());
  }

  const clickNext = (): void => {
    handleScrollDirection('left', year ? year + 1 : moment().year());
  }

  const getScrollClass = (): string => {
    return `${scrollDirection === 'right' ? styles['scroll-right'] : ''} ${scrollDirection === 'left' ? styles['scroll-left'] : ''} ${fadeAnimation ? styles['fade'] : ''}`
  }

  const backToToday = (): void => {
    getStartYear()
  }

  return (
    <div className={styles['table-year']}>
      <TableDaysPagination
        clickPrev={clickPrev}
        clickNext={clickNext}
        tableTitle={`${year}`}
        backToToday={backToToday}
      />
      {
        monthsList && monthsList.length ?
          <div className={styles['table-year-wrap']}>
            <div className={`${styles['table-year-content']} ${getScrollClass()}`}>
              {
                monthsList.map(month => (
                  <TableMonthItem
                    key={`month-${month.value}`}
                    month={month}
                    year={year || moment().year()}
                  />
                ))
              }
            </div>
          </div> : null
      }
    </div>
  )
};

export { TableYear };