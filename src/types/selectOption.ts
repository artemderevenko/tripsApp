import { ReactNode } from 'react';

export interface ISelectOption {
  optionRenderer?: ReactNode;
  value: string;
  label: string;
};