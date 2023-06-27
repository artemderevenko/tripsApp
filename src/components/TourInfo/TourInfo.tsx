import React, { useEffect } from 'react';
import moment from 'moment';
import { collection, getDocs, DocumentData } from "firebase/firestore";

import styles from './TourInfo.module.sass';
import { PageHeader } from '../PageHeader';
import { CustomSelect } from '../CustomSelect';
import { CustomInput } from '../CustomInput';
import { useAppDispatch, useAppdSelector } from '../../hooks/reduxHook';
import { changeTourInfo } from '../../store/slices/tourSlice';
import { database } from '../../firebase';
import { IManager } from '../../types/manager';
import { setManagers } from '../../store/slices/managersSlice';
import { INSURANCE_OPTIONS as insuranceOptions } from '../../constants/selectOptions';
import { useGetSelectOption } from '../../hooks/useGetSelectOption';
import { useInput } from '../../hooks/useInput';
import { useSelect } from '../../hooks/useSelect';

const TourInfo: React.FC = ({ }) => {
  const dispatch = useAppDispatch();
  const { name, description, startDate, endDate, location, cost, managerId, insurance } = useAppdSelector(state => state.tour);
  const managers = useAppdSelector(state => state.managers.list);

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
  });

  useEffect(() => {
    getManagerList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getManagerList = async () => {
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

  const changeField = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ): void => {
    dispatch(changeTourInfo({ fieldName: name, value: e.target.value }));
    onChange(e);
  }

  return (
    <div className={styles['tour-info']}>
      <PageHeader align={'left'}>
        <div className={styles['block-title']}>Tour Info</div>
      </PageHeader>
      <div className={styles['form']}>
        <div className={styles['row']}>
          <CustomInput
            type="text"
            value={nameInput.value}
            onChange={(e) => changeField('name', e, nameInput.onChange)}
            onBlur={nameInput.onBlur}
            placeholder={nameInput.name}
            textError={nameInput.textError}
          />
        </div>
        <div className={styles['row']}>
          <CustomInput
            type="text"
            value={descriptionInput.value}
            onChange={(e) => changeField('description', e, descriptionInput.onChange)}
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
              onChange={(e) => changeField('startDate', e, startDateInput.onChange)}
              onBlur={startDateInput.onBlur}
              placeholder={startDateInput.name}
              textError={startDateInput.textError}
            />
          </div>
          <div className={styles['row']}>
            <CustomInput
              type="text"
              value={endDateInput.value}
              onChange={(e) => changeField('endDate', e, endDateInput.onChange)}
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
              onChange={(e) => changeField('location', e, locationInput.onChange)}
              onBlur={locationInput.onBlur}
              placeholder={locationInput.name}
              textError={locationInput.textError}
            />
          </div>
          <div className={styles['row']}>
            <CustomInput
              type="text"
              value={costInput.value}
              onChange={(e) => changeField('cost', e, costInput.onChange)}
              onBlur={costInput.onBlur}
              placeholder={costInput.name}
              textError={costInput.textError}
            />
          </div>
        </div>
        <div className={styles['column']}>
          <div className={styles['row']}>
            <CustomSelect
              placeholder="Manager"
              selectValue={getManagerValue()}
              selectOptions={getManagerOptions()}
              onChange={(e) => dispatch(changeTourInfo({ fieldName: 'managerId', value: e.value || null }))}
            />
          </div>
          <div className={styles['row']}>
            <CustomSelect
              placeholder="Registration of insurance"
              selectValue={useGetSelectOption(insurance, insuranceOptions)}
              selectOptions={insuranceOptions}
              onChange={(e) => dispatch(changeTourInfo({ fieldName: 'insurance', value: e.value }))}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export { TourInfo };