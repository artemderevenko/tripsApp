import { useState } from 'react';
import moment from 'moment';

import styles from './AddManagerModal.module.sass';
import { CustomInput } from '../CustomInput';
import { CustomModal } from '../CustomModal';
import { CustomSelect } from '../CustomSelect';
import { SEX_OPTIONS as sexOptions } from '../../constants/selectOptions';
import { IPerson } from '../../types/person';
import { IManager } from '../../types/manager';

interface IAddManagerModal {
  onClose: () => void,
  onAddManager: (manager: IPerson) => void,
  data?: IManager, 
}

const AddManagerModal: React.FC<IAddManagerModal> = ({ onClose, onAddManager, data={} }) => {
  const [firstName, setFirstName] = useState<string>(data && data.firstName ? data.firstName : '');
  const [lastName, setLastName] = useState<string>(data && data.lastName ? data.lastName : '');
  const [middleName, setMiddleName] = useState<string>(data && data.middleName ? data.middleName : '');
  const [birth, setBirth] = useState<string>(data && data.birth ? data.birth : '');
  const [sex, setSex] = useState<string>(data && data.sex ? data.sex : '');
  const [passport, setPassport] = useState<string>(data && data.passport ? data.passport : '');
  const [firstNameError, setFirstNameError] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');
  const [middleNameError, setMiddleNameError] = useState<string>('');
  const [birthError, setBirthError] = useState<string>('');
  const [sexError, setSexError] = useState<string>('');
  const [passportError, setPassportError] = useState<string>('');

  const checkFirstNameError = () => {
    if (!firstName.trim().length) {
      setFirstNameError('First name required');
      return true;
    }
    setFirstNameError('');
    return false;
  }

  const checkLastNameError = () => {
    if (!lastName.trim().length) {
      setLastNameError('Last name required');
      return true;
    }
    setLastNameError('');
    return false;
  }

  const checkMiddleNameError = () => {
    if (!middleName.trim().length) {
      setMiddleNameError('Middle name required');
      return true;
    }
    setMiddleNameError('');
    return false;
  }

  const checkBirthError = () => {
    const birthDate = moment(birth, 'DD/MM/YYYY', true);
    const isValidFormat = birthDate.isValid();
    const isPast = birthDate.isSameOrBefore(moment());

    if (!birth.trim().length) {
      setBirthError('Date of birth is required');
      return true;
    }

    if (!isValidFormat) {
      setBirthError('Date of birth must be in DD/MM/YYYY format');
      return true;
    }

    if (!isPast) {
      setBirthError('Date must be in the past');
      return true;
    }
    
    setBirthError('');
    return false;
  }

  const checkSexError = (value: string): boolean => {
    if (!value.trim().length) {
      setSexError('Sex is required');
      return true;
    }
    setSexError('');
    return false;
  }

  const checkPassportError = () => {
    if (!passport.trim().length) {
      setPassportError('Passport required');
      return true;
    }
    setPassportError('');
    return false;
  }

  const setSexValue = (value: string): void => {
    checkSexError(value)
    setSex(value)
  }

  const handleSave = () => {
    const firstNameError = checkFirstNameError();
    const lastNameError = checkLastNameError();
    const middleNameError = checkMiddleNameError();
    const birthError = checkBirthError();
    const sexError = checkSexError(sex);
    const passportError = checkPassportError();

    if (!firstNameError && !lastNameError && !middleNameError && !birthError && !sexError && !passportError) {
      onAddManager({ 
        ...data, 
        firstName: firstName.trim(), 
        lastName: lastName.trim(), 
        middleName: middleName.trim(), 
        birth: birth.trim(), 
        sex: sex.trim(), 
        passport: passport.trim() 
      });
      onClose();
    }
  }

  const getSexOption = () => {
    if (sexOptions && sexOptions.length) {
      const option = sexOptions.filter(item => item.value === sex)[0];
      return option || null;
    }
    return null;
  }

  return (
    <CustomModal
      title={'Add new manager'}
      onClose={onClose}
      buttonsList={[
        {
          onButtonClick: onClose,
          buttonText: 'Cancel',
          type: 'cancel',
        },
        {
          onButtonClick: handleSave,
          buttonText: 'Save',
          type: 'confirm',
        }
      ]}
    >
      <div className={styles['modal-content']}>
        <div className={styles['column']}>
          <div className={styles['input-row']}>
            <CustomInput
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={checkFirstNameError}
              placeholder="First name"
              textError={firstNameError}
            />
          </div>
          <div className={styles['input-row']}>
            <CustomInput
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={checkLastNameError}
              placeholder="Last name"
              textError={lastNameError}
            />
          </div>
          <div className={styles['input-row']}>
            <CustomInput
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              onBlur={checkMiddleNameError}
              placeholder="Middle name"
              textError={middleNameError}
            />
          </div>
        </div>
        <div className={styles['column']}>
          <div className={styles['input-row']}>
            <CustomSelect
              placeholder="Sex"
              selectValue={getSexOption()}
              selectOptions={sexOptions}
              onChange={(option) => setSexValue(option.value)}
              onBlur={() => checkSexError(sex)}
              textError={sexError}
            />
          </div>
          <div className={styles['input-row']}>
            <CustomInput
              type="text"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              onBlur={checkBirthError}
              placeholder="Date of birth"
              textError={birthError}
            />
          </div>
          <div className={styles['input-row']}>
            <CustomInput
              type="text"
              value={passport}
              onChange={(e) => setPassport(e.target.value)}
              onBlur={checkPassportError}
              placeholder="Passport"
              textError={passportError}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  )
};

export { AddManagerModal };