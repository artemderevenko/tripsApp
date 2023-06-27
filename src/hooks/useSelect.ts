import { useState } from 'react';

import { ISelectOption } from '../types/selectOption';

interface IUseSelectProps {
  initialValue: string;
  name: string;
}

interface IUseSelectResult {
  value: string;
  name: string;
  isValid: boolean;
  textError: string;
  onChange: (e: ISelectOption) => void;
  onBlur: () => void;
  onCheckError: () => void,
}

export const useSelect = ({
  initialValue,
  name,
}: IUseSelectProps): IUseSelectResult => {
  const [value, setValue] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [textError, setTextError] = useState<string>('');

  const onChange = (e: ISelectOption): void => {
    setValue(e.value);
    
    if (e.value) {
      setTextError('');
      setIsValid(true);
    }
  }

  const onBlur = () => {
    onCheckError()
  }

  const onCheckError = () => {
    if (!value) {
      setTextError(`${name} required`);
      setIsValid(false);
    } else {
      setTextError('');
      setIsValid(true);
    }
  }

  return {
    value,
    name,
    onChange,
    onBlur,
    onCheckError,
    isValid,
    textError,
  };
};