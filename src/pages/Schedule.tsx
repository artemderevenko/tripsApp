import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import { PageHeader } from '../components/PageHeader';
import { CustomSelect } from '../components/CustomSelect';
import { IHoliday } from '../types/holiday';
import { CALENDAR_MODE_OPTIONS as calendarModeOptions, CALENDAR_MODE as mode } from '../constants/selectOptions';
import { ICalendarModeOption } from '../types/calendarModeOption';
import { ScheduleWeek } from '../components/ScheduleWeek';
import { ScheduleMonth } from '../components/ScheduleMonth';
import { ScheduleYear } from '../components/ScheduleYear';
import { useAppDispatch } from '../hooks/reduxHook';
import { addHolidays } from '../store/slices/holydaySlice';

const Schedule: React.FC = () => {
  const dispatch = useAppDispatch();

  const [calendarMode, setCalendarMode] = useState('week');

  const fetchHolidayList = async () => {
    try {
      const countryCode = 'ua';
      const year = '2023';
      const response = await axios.get<IHoliday[]>(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);

      const holidays = response && response.data ?
        response.data.map(holiday => ({
          date: holiday.date,
          localName: holiday.localName,
          name: holiday.name
        })) : [];

      const sortedHolidaysList = sortByMonth(holidays);

      dispatch(addHolidays(sortedHolidaysList));
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const sortByMonth = (holidays: IHoliday[]): Array<Array<{}> | IHoliday[]> => {
    let listOfMonths: Array<Array<{}> | IHoliday[]> = Array.from({ length: 12 }, () => []);

    holidays.forEach((holiday: IHoliday): void => {
      let month = moment(holiday.date).month();
      if (month || month === 0) {
        listOfMonths[month].push({
          date: holiday.date,
          localName: holiday.localName,
          name: holiday.name
        })
      }
    });

    return listOfMonths;
  }

  const getCalendarModeValue = (value: string, options: ICalendarModeOption[]) => {
    if (value && options && options.length) {
      return options.filter(option => option.value === value)[0]
    }
  }

  const changeCalendarMode = (option: ICalendarModeOption): void => {
    setCalendarMode(option.value)
  }

  useEffect(() => {
    fetchHolidayList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader align={'right'}>
        <CustomSelect
          selectValue={getCalendarModeValue(calendarMode, calendarModeOptions)}
          selectOptions={calendarModeOptions}
          onChange={changeCalendarMode}
        />
      </PageHeader>
      {
        calendarMode === mode.week ?
          <ScheduleWeek /> : null
      }
      {
        calendarMode === mode.month ?
          <ScheduleMonth /> : null
      }
      {
        calendarMode === mode.year ?
          <ScheduleYear /> : null
      }
    </>
  )
};

export default Schedule;