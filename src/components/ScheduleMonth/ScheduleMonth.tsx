import { useState, useEffect } from 'react';
import moment from 'moment';

import styles from './ScheduleMonth.module.sass';
import { ScheduleDayItem } from '../ScheduleDayItem';
import { ScheduleDaysPagination } from '../ScheduleDaysPagination';
import { ScheduleDaysHeader } from '../ScheduleDaysHeader';

const ScheduleMonth: React.FC = () => {

  const [daysMonth, setDaysMonth] = useState<moment.Moment[]>([]);
  const [scrollDirection, setScrollDirection] = useState<string>('');
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(true);
  const [scheduleTitle, setScheduleTitle] = useState<string>('');

  const handleScrollDirection = (direction: string, daysMonthList: moment.Moment[]) => {
    setScrollDirection(direction);

    setTimeout(() => {
      setScrollDirection('');
      getScheduleTitle(daysMonthList);
      setDaysMonth(daysMonthList);
    }, 180);
  };

  const getScheduleTitle = (daysList: moment.Moment[]): void => {
    const middleMonth = daysList[15];
    const yearMiddleMonth = middleMonth.year(); 
    const fullMonthMiddleMonth = middleMonth.format('MMMM');
    setScheduleTitle(`${fullMonthMiddleMonth} ${yearMiddleMonth}`);
  }

  const getDaysMonth = (day: moment.Moment): moment.Moment[] => {
    const firstDayOfMonth = day.clone().startOf('month');
    const firstDayOfWeek = firstDayOfMonth.day();
    const diff = firstDayOfWeek === 0 ? -6 : 1 - firstDayOfWeek;
    const startDay = moment(firstDayOfMonth.add(diff, 'day'));
    const daysInMonth = day.daysInMonth();
    const scheduleWeekCount = Math.ceil((daysInMonth + Math.abs(diff)) / 7);
    const scheduleDaysCount = scheduleWeekCount * 7;

    const daysList = Array.from({ length: scheduleDaysCount }, (_, index) => {
      const copyFirstDay = startDay.clone();
      return moment(copyFirstDay).add(index, 'day');
    });
    return daysList;
  };

  const getStartDaysMonth = (): void => {
    const currentDate = moment();
    const daysMonthList = getDaysMonth(currentDate);
    setDaysMonth(daysMonthList);
    getScheduleTitle(daysMonthList);
    setFadeAnimation(true);

    setTimeout(() => {
      setFadeAnimation(false)
    }, 300);
  }

  useEffect(() => {
    getStartDaysMonth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrev = (): void => {
    const currentMonthFirstDay = daysMonth[0];
    const middlePrevMonth = moment(currentMonthFirstDay).add(-15, 'day');
    handleScrollDirection('right', getDaysMonth(middlePrevMonth));
  }

  const handleNext = (): void => {
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
    <div className={styles['schedule-month']}>
      <ScheduleDaysPagination
        handlePrev={handlePrev}
        handleNext={handleNext}
        scheduleTitle={scheduleTitle}
        backToToday={backToToday}
      />
      {
        daysMonth && daysMonth.length ?
          <div className={`${styles['schedule-month-wrap']} ${styles[`rows-${daysMonth.length / 7 || 5}`]}`}>
            <ScheduleDaysHeader mode={'week'} />
            <div className={`${styles['schedule-month-content']} ${getScrollClass()}`}>
              {
                daysMonth.map(item => (
                  <ScheduleDayItem
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

export { ScheduleMonth };