import { useEffect, useState } from 'react';
import axios from 'axios';

import { PageHeader } from '../components/PageHeader';
import { CustomSelect } from '../components/CustomSelect';
import { IHoliday } from '../types/holiday';
import { CALENDAR_MODE_OPTIONS as calendarModeOptions, CALENDAR_MODE as mode } from '../constants/selectOptions';
import { ICalendarModeOption } from '../types/calendarModeOption';
import { TableWeek } from '../components/TableWeek';
import { TableMonth } from '../components/TableMonth';
import { TableYear } from '../components/TableYear';

const Events: React.FC = () => {
  const [holidayList, setHolidayList] = useState<IHoliday[]>([]);
  const [calendarMode, setCalendarMode] = useState('week');

  const fetchHolidayList = async () => {
    const countryCode = 'ua';
    const response = await axios.get<IHoliday[]>(`https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`);
    const holidays = response && response.data ? response.data : [];

    setHolidayList(holidays.map(holiday => ({
      date: holiday.date,
      localName: holiday.localName,
      name: holiday.name
    })));
  };

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
          <TableWeek /> : null
      }
      {
        calendarMode === mode.month ?
          <TableMonth /> : null
      }
      {
        calendarMode === mode.year ?
          <TableYear /> : null
      }
    </>
  )
};

export default Events;