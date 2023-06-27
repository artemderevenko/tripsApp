import { useState } from 'react';

import { useValidation } from './useValidation';
import { IValidations } from '../types/validations';

interface IUseInputProps {
  initialValue: string;
  name: string;
  validations?: IValidations;
}

interface IUseInputResult {
  value: string;
  name: string;
  isValid?: boolean;
  textError?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onCheckError: () => void,
}

export const useInput = ({
  initialValue,
  name,
  validations={},
}: IUseInputProps): IUseInputResult => {
  const [value, setValue] = useState<string>(initialValue);
  const [checkError, setCheckError] = useState<boolean>(false);

  const validation = useValidation({ 
    initialValue: value, 
    name, 
    validations,
    checkError, 
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (checkError) { setCheckError(false) }
    setValue(e.target.value);
  }

  const onBlur = () => {
    setCheckError(true)
  }

  const onCheckError = () => {
    setCheckError(true)
  }

  return {
    value,
    name,
    onChange,
    onBlur,
    onCheckError,
    ...validation,
  };
};