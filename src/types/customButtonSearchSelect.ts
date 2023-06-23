import { ReactNode } from 'react';

import { ISelectOption } from './selectOption';

export interface TCustomButtonSearchSelect {
  selectOptions: ISelectOption[] | [],
  positionDropDown?: string,
  onChange: (value: ISelectOption) => void,
  onBlur?: (value?:any) => void,
  className?: string,
  icon?: ReactNode,
  label: string,
};