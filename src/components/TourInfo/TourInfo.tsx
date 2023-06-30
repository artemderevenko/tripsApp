import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { collection, getDocs, DocumentData, doc, setDoc, updateDoc } from "firebase/firestore";

import styles from './TourInfo.module.sass';
import { PageHeader } from '../PageHeader';
import { CustomSelect } from '../CustomSelect';
import { CustomInput } from '../CustomInput';
import { CustomButton } from '../CustomButton';
import { useAppDispatch, useAppdSelector } from '../../hooks/reduxHook';
import { changeTourInfo } from '../../store/slices/tourSlice';
import { database } from '../../firebase';
import { IManager } from '../../types/manager';
import { setManagers } from '../../store/slices/managersSlice';
import { INSURANCE_OPTIONS as insuranceOptions } from '../../constants/selectOptions';
import { useGetSelectOption } from '../../hooks/useGetSelectOption';
import { useInput } from '../../hooks/useInput';
import { useSelect } from '../../hooks/useSelect';
import { ISelectOption } from '../../types/selectOption';
import { INotify } from '../../types/notify';
import { Notification } from '../Notification';

const TourInfo: React.FC = ({ }) => {
  const [notify, setNotify] = useState<INotify>({ type: '', text: '' });

  const dispatch = useAppDispatch();
  const managers = useAppdSelector(state => state.managers.list);
  const tour = useAppdSelector(state => state.tour);
  const { name, description, startDate, endDate, location, cost, managerId, insurance, id } = tour;
  const { paramsId } = useParams();

  const nameInput = useInput({
    initialValue: name,
    name: 'Tour name',
    validations: { isEmpty: true }
  });

  const descriptionInput = useInput({
    initialValue: description,
    name: 'Tour description',
  });

  const startDateInput = useInput({
    initialValue: startDate,
    name: 'Start date',
    validations: {
      isEmpty: true,
      isDateFormat: 'DD/MM/YYYY',
      isDateFuture: {
        format: 'DD/MM/YYYY',
        comparedDate: moment().format('DD/MM/YYYY')
      },
      dateAIsBeforeDateB: {
        format: 'DD/MM/YYYY',
        dateA: startDate,
        dateB: endDate,
        nameDateA: 'Start date',
        nameDateB: 'End date',
      },
    }
  });

  const endDateInput = useInput({
    initialValue: endDate,
    name: 'End date',
    validations: {
      isEmpty: true,
      isDateFormat: 'DD/MM/YYYY',
      isDateFuture: {
        format: 'DD/MM/YYYY',
        comparedDate: moment().format('DD/MM/YYYY')
      },
      dateAIsAfterDateB: {
        format: 'DD/MM/YYYY',
        dateA: endDate,
        dateB: startDate,
        nameDateA: 'End date',
        nameDateB: 'Start date',
      },
    }
  });

  const locationInput = useInput({
    initialValue: location,
    name: 'Location',
  });

  const costInput = useInput({
    initialValue: cost,
    name: 'Tour cost',
    validations: cost ? {
      isPrice: true
    } : {}
  });

  const managerSelect = useSelect({
    initialValue: managerId || '',
    name: 'Manager',
  });

  const insuranceSelect = useSelect({
    initialValue: insurance || '',
    name: 'Registration of insurance',
  });

  useEffect(() => {
    getManagerList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getManagerList = async (): Promise<void> => {
    const db = database;
    try {
      const querySnapshot = await getDocs(collection(db, 'managers'));
      const managerList: DocumentData[] = querySnapshot.docs.map((doc) => doc.data());
      const typedManagerList: IManager[] = managerList as IManager[];
      if (managerList && managerList.length) {
        dispatch(setManagers(typedManagerList));
      } else {
        dispatch(setManagers([]));
      }
    } catch (error) {
      dispatch(setManagers([]));
    }
  }

  const getManagerOptions = () => {
    if (managers && managers.length) {
      const options = managers.map(manager => ({
        value: manager.id,
        label: `${manager.firstName} ${manager.lastName} ${manager.middleName} (${manager.passport})`
      }));

      return [
        { value: '', label: 'No manager' },
        ...options
      ];

    } else { return [] }
  }

  const getManagerValue = () => {
    if (managers && managers.length) {
      const option = managers.filter(manager => manager.id === managerId);

      return option && option[0] ?
        {
          value: option[0].id,
          label: `${option[0].firstName} ${option[0].lastName} ${option[0].middleName} (${option[0].passport})`
        } : null;

    } else { return null }
  }

  const changeInput = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ): void => {
    dispatch(changeTourInfo({ fieldName: name, value: e.target.value }));
    onChange(e);
  }

  const changeSelect = (
    name: string,
    e: ISelectOption,
    onChange: (e: ISelectOption) => void
  ): void => {
    dispatch(changeTourInfo({ fieldName: name, value: e.value || null }));
    onChange(e);
  }

  const handlerSaveTour = () => {
    if (
      nameInput.isValid && nameInput.value &&
      startDateInput.isValid && startDateInput.value &&
      endDateInput.isValid && endDateInput.value
    ) {
      return paramsId ? editTour() : addTour();
    }

    if (nameInput.isValid && !nameInput.value) {
      nameInput.onCheckError();
    }

    if (startDateInput.isValid && !startDateInput.value) {
      startDateInput.onCheckError();
    }

    if (endDateInput.isValid && !endDateInput.value) {
      endDateInput.onCheckError();
    }
  }

  const addTour = (): void => {
    const db = database;
    const newRef = doc(collection(db, 'tours'));
    setDoc(newRef, {
      ...tour,
      id: newRef.id,
    }).then(() => {
      setNotify({ type: 'success', text: 'Tour added successfully!' });
    })
      .catch((error) => {
        setNotify({ type: 'error', text: 'Something went wrong. Please try again later.' });
      });
  }

  const editTour = (): void => {
    const db = database;
    updateDoc(doc(db, 'tours', id), {
      ...tour
    })
      .then(() => {
        setNotify({ type: 'success', text: 'Tour changed successfully!' });
      })
      .catch((error) => {
        setNotify({ type: 'error', text: 'Something went wrong. Please try again later.' });
      });
  }

  const downloadFile = () => {

  }

  return (
    <div className={styles['tour-info']}>
      <PageHeader align={'between'}>
        <div className={styles['block-title']}>Tour Info</div>
        <div className={styles['buttons-box']}>
          <CustomButton
            onClick={downloadFile}
            buttonText={'Download PDF file'}
            type={'confirm'}
            icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" fill="#FFFFFF" />
            </svg>}
          />
          <CustomButton
            onClick={handlerSaveTour}
            buttonText={'Save tour'}
            type={'confirm'}
            icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
              <path d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" fill="#FFFFFF" />
            </svg>}
          />
        </div>
      </PageHeader>
      <div className={styles['form']}>
        <div className={styles['row']}>
          <CustomInput
            type="text"
            value={nameInput.value}
            onChange={(e) => changeInput('name', e, nameInput.onChange)}
            onBlur={nameInput.onBlur}
            placeholder={nameInput.name}
            textError={nameInput.textError}
          />
        </div>
        <div className={styles['row']}>
          <CustomInput
            type="text"
            value={descriptionInput.value}
            onChange={(e) => changeInput('description', e, descriptionInput.onChange)}
            placeholder={descriptionInput.name}
            onBlur={descriptionInput.onBlur}
            textError={descriptionInput.textError}
          />
        </div>
        <div className={styles['column']}>
          <div className={styles['row']}>
            <CustomInput
              type="text"
              value={startDateInput.value}
              onChange={(e) => changeInput('startDate', e, startDateInput.onChange)}
              onBlur={startDateInput.onBlur}
              placeholder={startDateInput.name}
              textError={startDateInput.textError}
            />
          </div>
          <div className={styles['row']}>
            <CustomInput
              type="text"
              value={endDateInput.value}
              onChange={(e) => changeInput('endDate', e, endDateInput.onChange)}
              onBlur={endDateInput.onBlur}
              placeholder={endDateInput.name}
              textError={endDateInput.textError}
            />
          </div>
        </div>
        <div className={styles['column']}>
          <div className={styles['row']}>
            <CustomInput
              type="text"
              value={locationInput.value}
              onChange={(e) => changeInput('location', e, locationInput.onChange)}
              onBlur={locationInput.onBlur}
              placeholder={locationInput.name}
              textError={locationInput.textError}
            />
          </div>
          <div className={styles['row']}>
            <CustomInput
              type="number"
              value={costInput.value}
              onChange={(e) => changeInput('cost', e, costInput.onChange)}
              onBlur={costInput.onBlur}
              placeholder={costInput.name}
              textError={costInput.textError}
            />
          </div>
        </div>
        <div className={styles['column']}>
          <div className={styles['row']}>
            <CustomSelect
              placeholder={managerSelect.name}
              selectValue={getManagerValue()}
              selectOptions={getManagerOptions()}
              onChange={(e) => changeSelect('managerId', e, managerSelect.onChange)}
            />
          </div>
          <div className={styles['row']}>
            <CustomSelect
              placeholder={insuranceSelect.name}
              selectValue={useGetSelectOption(insurance, insuranceOptions)}
              selectOptions={insuranceOptions}
              onChange={(e) => changeSelect('insurance', e, managerSelect.onChange)}
            />
          </div>
        </div>
      </div>
      {
        notify && notify.text ?
          <Notification
            type={notify.type}
            message={notify.text}
            afterHide={() => setNotify({ type: '', text: '' })}
          /> : null
      }
    </div>
  )
};

export { TourInfo };