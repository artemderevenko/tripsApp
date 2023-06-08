import { ReactNode } from 'react';
import { ICustomSelectOption } from './customSelectOption';
import { ICalendarModeOption } from './calendarModeOption';

export interface ICustomSelect {
  selectIcon?: ReactNode,
  placeholder?: string,
  selectValue: ICustomSelectOption | null | '' | undefined,
  selectOptions: ICustomSelectOption[] | [],
  positionDropDown?: string,
  onChange: (value: ICalendarModeOption) => void,
};