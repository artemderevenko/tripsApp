import { useState, useEffect } from 'react';
import moment from 'moment';
import { collection, getDocs, DocumentData } from "firebase/firestore";

import styles from './ScheduleWeek.module.sass';
import stylesWeekRow from '../ScheduleWeekRow/ScheduleWeekRow.module.sass';
import { ScheduleDaysPagination } from '../ScheduleDaysPagination';
import { ScheduleDaysHeader } from '../ScheduleDaysHeader';
import { ITour } from '../../types/tour';
import { setTours } from '../../store/slices/toursSlice';
import { database } from '../../firebase';
import { useAppDispatch, useAppdSelector } from '../../hooks/reduxHook';
import { ScheduleWeekRow } from '../ScheduleWeekRow';

const ScheduleWeek: React.FC = () => {
  const [daysWeek, setDaysWeek] = useState<moment.Moment[]>([]);
  const [scrollDirection, setScrollDirection] = useState<string>('');
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(true);
  const [scheduleTitle, setScheduleTitle] = useState<string>('');

  const dispatch = useAppDispatch();
  const tours = useAppdSelector(state => state.tours.list);

  useEffect(() => {
    getStartDaysWeek();
    getTourList();
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);

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
    const currentDateDay = currentDate.day();
    const getFirstDayWeek = currentDate.startOf('week').add(currentDateDay === 0 ? -6 : 1, 'day');
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

  const getTourList = async (): Promise<void> => {
    const db = database;
    try {
      const querySnapshot = await getDocs(collection(db, 'tours'));
      const tourList: DocumentData[] = querySnapshot.docs.map((doc) => doc.data());
      const typedTourList: ITour[] = tourList as ITour[];
      if (tourList && tourList.length) {
        dispatch(setTours(typedTourList));
      } else {
        dispatch(setTours([]));
      }
    } catch (error) {
      dispatch(setTours([]));
    }
  }

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
    return `${scrollDirection === 'right' ? stylesWeekRow['scroll-right'] : ''} ${scrollDirection === 'left' ? stylesWeekRow['scroll-left'] : ''} ${fadeAnimation ? stylesWeekRow['fade'] : ''}`
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
            <ScheduleWeekRow 
            tours={tours}
            daysWeek={daysWeek}
            className={getScrollClass()}
            />
          </div> : null
      }
    </div>
  )
};

export { ScheduleWeek };