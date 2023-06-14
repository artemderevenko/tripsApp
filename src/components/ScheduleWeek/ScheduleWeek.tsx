import { useState, useEffect } from 'react';
import moment from 'moment';

import styles from './ScheduleWeek.module.sass';
import { ScheduleDayItem } from '../ScheduleDayItem';
import { ScheduleDaysPagination } from '../ScheduleDaysPagination';
import { ScheduleDaysHeader } from '../ScheduleDaysHeader';                        

const ScheduleWeek: React.FC = () => {

  const [daysWeek, setDaysWeek] = useState<moment.Moment[]>([]);
  const [scrollDirection, setScrollDirection] = useState<string>('');
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(true);
  const [scheduleTitle, setScheduleTitle] = useState<string>('');

  const handleScrollDirection = (direction: string, daysList: moment.Moment[]) => {
    setScrollDirection(direction);

    setTimeout(() => {
      setScrollDirection('');
      getScheduleTitle(daysList);
      setDaysWeek(daysList);
    }, 180);
  };

  const getScheduleTitle = (daysList: moment.Moment[]): void => {
    const firstDay = daysList[0];
    const lastDay = daysList[daysList.length - 1];
    const yearFirstDay = firstDay.year(); 
    const fullMonthFirstDay = firstDay.format('MMMM');
    const yearLastDay = lastDay.year(); 
    const fullMonthLastDay = lastDay.format('MMMM');
    let scheduleTitle = `${fullMonthFirstDay} ${yearFirstDay}`;

    if (yearFirstDay === yearLastDay && fullMonthFirstDay !== fullMonthLastDay) { 
      scheduleTitle = `${firstDay.format('MMM')} - ${lastDay.format('MMM')} ${yearFirstDay}`
    }

    if (yearFirstDay !== yearLastDay && fullMonthFirstDay !== fullMonthLastDay) { 
      scheduleTitle = `${firstDay.format('MMM')} ${yearFirstDay} - ${lastDay.format('MMM')} ${yearLastDay}`
    }

    setScheduleTitle(scheduleTitle);
  }

  const getStartDaysWeek = (): void => {
    const currentDate = moment(); 
    const getFirstDayWeek = currentDate.startOf('week');
    const daysList = Array.from({ length: 7 }, (_, index) => {
      const copyFirstDay = getFirstDayWeek.clone();
      return moment(copyFirstDay).add(index, 'day');
    })

    setDaysWeek(daysList);
    getScheduleTitle(daysList);
    setFadeAnimation(true);

    setTimeout(() => {
      setFadeAnimation(false)
    }, 300);
  }

  useEffect(() => {
    getStartDaysWeek()
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);

  const handlePrev = (): void => {
    const daysList = Array.from({ length: 7 }, (_, index) => {
      const copyFirstDay = daysWeek[0].clone();
      return moment(copyFirstDay).add(index - 7, 'day');
    });

    handleScrollDirection('right', daysList);
  }

  const handleNext = (): void => {
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
    <div className={styles['schedule-week']}>
      <ScheduleDaysPagination
        handlePrev={handlePrev}
        handleNext={handleNext}
        scheduleTitle={scheduleTitle}
        backToToday={backToToday}
      />
      {
        daysWeek && daysWeek.length ?
          <div className={styles['schedule-week-wrap']}>
            <ScheduleDaysHeader mode={'week'} />
            <div className={`${styles['schedule-week-content']} ${getScrollClass()}`}>
              {
                daysWeek.map(item => (
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

export { ScheduleWeek };