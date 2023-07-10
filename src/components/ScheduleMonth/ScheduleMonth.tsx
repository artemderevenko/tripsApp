import { useState, useEffect } from 'react';
import moment from 'moment';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import styles from './ScheduleMonth.module.sass';
import stylesWeekRow from '../ScheduleWeekRow/ScheduleWeekRow.module.sass';
import stylesPagination from '../ScheduleDaysPagination/ScheduleDaysPagination.module.sass';
import { ScheduleDaysPagination } from '../ScheduleDaysPagination';
import { ScheduleDaysHeader } from '../ScheduleDaysHeader';
import { ITour } from '../../types/tour';
import { setTours } from '../../store/slices/toursSlice';
import { useAppdSelector } from '../../hooks/reduxHook';
import { ScheduleWeekRow } from '../ScheduleWeekRow';
import { ROUTES } from '../../constants/routes';
import { useListFetching } from '../../hooks/useListFetching';

const ScheduleMonth: React.FC = () => {
  const [daysWeek, setDaysWeek] = useState<Array<[] | moment.Moment[]>>([]);
  const [daysMonth, setDaysMonth] = useState<moment.Moment[]>([]);
  const [scrollDirection, setScrollDirection] = useState<string>('');
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(true);
  const [scheduleTitle, setScheduleTitle] = useState<string>('');

  const tours = useAppdSelector(state => state.tours.list);
  const { modeParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dateParam = params.get('date');
  const { fetchData } = useListFetching<ITour>(setTours, 'tours');

  useEffect(() => {
    getStartDaysMonth(dateParam);
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

  const getStartDaysMonth = (date?: string | null): void => {
    const currentDate = date ? moment(date, 'DD/MM/YYYY', true) : moment();;
    const daysMonthList = getDaysMonth(currentDate);
    setDaysMonth(daysMonthList);
    setDaysWeek(getWeeksList(daysMonthList, 7))
    getScheduleTitle(daysMonthList);
    setFadeAnimation(true);

    setTimeout(() => {
      setFadeAnimation(false)
    }, 300);
  }

  const getTourList = () => {
    fetchData();
  }

  const handlePrev = (): void => {
    const currentMonthFirstDay = daysMonth[0];
    const middlePrevMonth = moment(currentMonthFirstDay).add(-15, 'day');
    const days = getDaysMonth(middlePrevMonth);
    const firstDayOfMonth = days[15].startOf('month').format('DD/MM/YYYY');
    handleScrollDirection('right', days);
    navigate(`/${ROUTES.Schedule}${modeParam}?date=${encodeURIComponent(firstDayOfMonth)}`);
  }

  const handleNext = (): void => {
    const currentMonthLastDay = daysMonth[daysMonth.length - 1];
    const middleNextMonth = moment(currentMonthLastDay).add(15, 'day');
    const days = getDaysMonth(middleNextMonth);
    const firstDayOfMonth = days[15].startOf('month').format('DD/MM/YYYY');
    handleScrollDirection('left', days);
    navigate(`/${ROUTES.Schedule}${modeParam}?date=${encodeURIComponent(firstDayOfMonth)}`);
  }

  const getScrollClass = (): string => {
    return `${scrollDirection === 'right' ? stylesWeekRow['scroll-right'] : ''} ${scrollDirection === 'left' ? stylesWeekRow['scroll-left'] : ''} ${fadeAnimation ? stylesWeekRow['fade'] : ''}`
  }

  const backToToday = (): void => {
    getStartDaysMonth();
    navigate(`/${ROUTES.Schedule}${modeParam}`);
  }

  return (
    <div className={styles['schedule-month']}>
      <ScheduleDaysPagination
        handlePrev={handlePrev}
        handleNext={handleNext}
        scheduleTitle={scheduleTitle}
        backToToday={backToToday}
        titleClassName={`${fadeAnimation ? stylesPagination['fade'] : ''}`}
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