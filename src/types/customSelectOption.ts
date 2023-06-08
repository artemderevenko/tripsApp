import { ReactNode } from 'react';

export interface ICustomSelectOption {
  optionRenderer?: ReactNode,
  value: string | number,
  label: string
};