import { useState, useEffect } from 'react';
import moment from 'moment';

import styles from './TableWeek.module.sass';
import { TableWeekDay } from '../TableWeekDay';
import { TableDaysPagination } from '../TableDaysPagination';
import { TableDaysHeader } from '../TableDaysHeader';

const TableWeek: React.FC = () => {

  const [daysWeek, setDaysWeek] = useState<moment.Moment[]>([]);
  const [scrollDirection, setScrollDirection] = useState<string>('');

  const handleScrollDirection = (direction: string, getDaysWeek: moment.Moment[]) => {
    setScrollDirection(direction);

    setTimeout(() => {
      setScrollDirection('');
      setDaysWeek(getDaysWeek);
    }, 180);
  };

  const getStartDaysWeek = (): void => {
    const currentDate = moment();
    const getFirstDayWeek = currentDate.startOf('week');

    const getDaysWeek = Array.from({ length: 7 }, (_, index) => {
      const copyFirstDay = getFirstDayWeek.clone();
      return moment(copyFirstDay).add(index + 1, 'day');
    })

    setDaysWeek(getDaysWeek);
  }

  useEffect(() => {
    getStartDaysWeek()
  }, []);

  const clickPrev = (): void => {
    const getDaysWeek = Array.from({ length: 7 }, (_, index) => {
      const copyFirstDay = daysWeek[0].clone();
      return moment(copyFirstDay).add(index - 7, 'day');
    });

    handleScrollDirection('right', getDaysWeek);
  }

  const clickNext = (): void => {
    const getDaysWeek = Array.from({ length: 7 }, (_, index) => {
      const copyFirstDay = daysWeek[daysWeek.length - 1].clone();
      return moment(copyFirstDay).add(index + 1, 'day');
    });

    handleScrollDirection('left', getDaysWeek);
  }

  const getScrollClass = (): string => {
    return `${scrollDirection === 'right' ? styles['scroll-right'] : ''} ${scrollDirection === 'left' ? styles['scroll-left'] : ''}`
  }

  const backToToday = (): void => {
    getStartDaysWeek()
  }

  return (
    <div className={styles['table-week']}>
      <TableDaysPagination
        clickPrev={clickPrev}
        clickNext={clickNext}
        tableTitle={'Janvar'}
        backToToday={backToToday}
      />
      {
        daysWeek && daysWeek.length ?
          <div className={styles['table-week-wrap']}>
            <TableDaysHeader />
            <div className={`${styles['table-week-content']} ${getScrollClass()}`}>
              {
                daysWeek.map(item => (
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

export { TableWeek };