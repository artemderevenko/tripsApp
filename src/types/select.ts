import { ISelectOption } from './selectOption';
import { ICalendarModeOption } from './calendarModeOption';

export interface ISelect {
  placeholder?: string,
  selectValue: ISelectOption | null | '' | undefined,
  selectOptions: ISelectOption[] | [],
  positionDropDown?: string,
  onChange: (value: ICalendarModeOption) => void,
  onBlur?: (value?:any) => void,
  className?: string,
};