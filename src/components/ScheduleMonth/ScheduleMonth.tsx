import { useState, useEffect } from 'react';
import moment from 'moment';
import { collection, getDocs, DocumentData } from "firebase/firestore";

import styles from './ScheduleMonth.module.sass';
import stylesWeekRow from '../ScheduleWeekRow/ScheduleWeekRow.module.sass';
import { ScheduleDaysPagination } from '../ScheduleDaysPagination';
import { ScheduleDaysHeader } from '../ScheduleDaysHeader';
import { ITour } from '../../types/tour';
import { setTours } from '../../store/slices/toursSlice';
import { database } from '../../firebase';
import { useAppDispatch, useAppdSelector } from '../../hooks/reduxHook';
import { ScheduleWeekRow } from '../ScheduleWeekRow';

const ScheduleMonth: React.FC = () => {
  const [daysWeek, setDaysWeek] = useState<Array<[] | moment.Moment[]>>([]);
  const [daysMonth, setDaysMonth] = useState<moment.Moment[]>([]);
  const [scrollDirection, setScrollDirection] = useState<string>('');
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(true);
  const [scheduleTitle, setScheduleTitle] = useState<string>('');

  const dispatch = useAppDispatch();
  const tours = useAppdSelector(state => state.tours.list);

  useEffect(() => {
    getStartDaysMonth();
    getTourList();
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);

  const handleScrollDirection = (direction: string, daysMonthList: moment.Moment[]) => {
    setScrollDirection(direction);

    setTimeout(() => {
      setScrollDirection('');
      getScheduleTitle(daysMonthList);
      setDaysMonth(daysMonthList);
      setDaysWeek(getWeeksList(daysMonthList, 7))
    }, 180);
  };

  const getWeeksList = (daysMonthList: moment.Moment[], chunkSize: number): Array<[] | moment.Moment[]> => {
    if (!daysMonthList || !daysMonthList.length) return [];

    const result = [];
    for (let i = 0; i < daysMonthList.length; i += chunkSize) {
      result.push(daysMonthList.slice(i, i + chunkSize));
    }
    return result;
  }

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
    setDaysWeek(getWeeksList(daysMonthList, 7))
    getScheduleTitle(daysMonthList);
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
    return `${scrollDirection === 'right' ? stylesWeekRow['scroll-right'] : ''} ${scrollDirection === 'left' ? stylesWeekRow['scroll-left'] : ''} ${fadeAnimation ? stylesWeekRow['fade'] : ''}`
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
            {
              daysWeek && daysWeek.length ?
                daysWeek.map((weekData, index) => (<ScheduleWeekRow
                  key={`week-${index}`}
                  tours={tours}
                  daysWeek={weekData}
                  className={`${stylesWeekRow['grid-item']} ${getScrollClass()}`}
                />)) : null
            }
          </div> : null
      }
    </div>
  )
};

export { ScheduleMonth };