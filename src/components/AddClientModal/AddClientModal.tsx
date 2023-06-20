import { useState } from 'react';

import styles from './AddClientModal.module.sass';
import { CustomInput } from '../CustomInput';
import { CustomModal } from '../CustomModal';
import { CustomSelect } from '../CustomSelect';
import { SEX_OPTIONS as sexOptions } from '../../constants/selectOptions';
import { IPerson } from '../../types/person';
import { IClient } from '../../types/client';
import moment from 'moment';

interface IAddClientModal {
  onClose: () => void,
  onAddClient: (client: IPerson) => void,
  data?: IClient, 
}

const AddClientModal: React.FC<IAddClientModal> = ({ onClose, onAddClient, data={} }) => {
  const [firstName, setFirstName] = useState<string>(data && data.firstName ? data.firstName : '');
  const [name, setName] = useState<string>(data && data.name ? data.name : '');
  const [surname, setSurname] = useState<string>(data && data.surname ? data.surname : '');
  const [birth, setBirth] = useState<string>(data && data.birth ? data.birth : '');
  const [sex, setSex] = useState<string>(data && data.sex ? data.sex : '');
  const [passport, setPassport] = useState<string>(data && data.passport ? data.passport : '');
  const [firstNameError, setFirstNameError] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [surnameError, setSurnameError] = useState<string>('');
  const [birthError, setBirthError] = useState<string>('');
  const [sexError, setSexError] = useState<string>('');
  const [passportError, setPassportError] = useState<string>('');

  const checkFirstNameError = () => {
    if (!firstName) {
      setFirstNameError('First name required');
      return true;
    }
    setFirstNameError('');
    return false;
  }

  const checkNameError = () => {
    if (!name) {
      setNameError('Name required');
      return true;
    }
    setNameError('');
    return false;
  }

  const checkSurnameError = () => {
    if (!surname) {
      setSurnameError('Surname required');
      return true;
    }
    setSurnameError('');
    return false;
  }

  const checkBirthError = () => {
    const birthDate = moment(birth, 'DD/MM/YYYY', true);
    const isValidFormat = birthDate.isValid();
    const isPast = birthDate.isSameOrBefore(moment());

    if (!birth) {
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
    if (!value) {
      setSexError('Sex is required');
      return true;
    }
    setSexError('');
    return false;
  }

  const checkPassportError = () => {
    if (!passport) {
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
    const nameError = checkNameError();
    const surnameError = checkSurnameError();
    const birthError = checkBirthError();
    const sexError = checkSexError(sex);
    const passportError = checkPassportError();

    if (!firstNameError && !nameError && !surnameError && !birthError && !sexError && !passportError) {
      onAddClient({ ...data, firstName, name, surname, birth, sex, passport });
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
      title={'Add new client'}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={checkNameError}
              placeholder="Name"
              textError={nameError}
            />
          </div>
          <div className={styles['input-row']}>
            <CustomInput
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              onBlur={checkSurnameError}
              placeholder="Surname"
              textError={surnameError}
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

export { AddClientModal };