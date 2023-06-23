import React, { useState, useEffect } from 'react';
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

const TourInfo: React.FC = ({ }) => {
  const [nameError, setNameError] = useState<string>('');
  const [startDateError, setStartDateError] = useState<string>('');
  const [endDateError, setEndDateError] = useState<string>('');
  const [locationError, setLocationError] = useState<string>('');
  const [costError, setCostError] = useState<string>('');
  const [managerIdError, setManagerIdError] = useState<string>('');
  const [insuranceError, setInsuranceError] = useState<string>('');

  const dispatch = useAppDispatch();
  const { name, description, startDate, endDate, location, cost, managerId, insurance } = useAppdSelector(state => state.tour);
  const managers = useAppdSelector(state => state.managers.list);

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

  const checkNameError = () => {
    if (!name.trim().length) {
      setNameError('Name required');
      return true;
    }
    setNameError('');
    return false;
  }

  const checkStartDateError = () => {
    const startDateMoment = moment(startDate, 'DD/MM/YYYY', true);
    const isValidFormat = startDateMoment.isValid();
    const isFuture = startDateMoment.isSameOrAfter(moment());

    if (!startDate.trim().length) {
      setStartDateError('Start date is required');
      return true;
    }

    if (!isValidFormat) {
      setStartDateError('Start date must be in DD/MM/YYYY format');
      return true;
    }

    if (!isFuture) {
      setStartDateError('Date must be in the future');
      return true;
    }

    if (endDate && !endDateError && startDateMoment.isSameOrAfter(moment(endDate, 'DD/MM/YYYY', true))) {
      setStartDateError('Start date must be before End date');
      return true;
    }

    setStartDateError('');
    return false;
  }

  const checkEndDateError = () => {
    const endDateMoment = moment(endDate, 'DD/MM/YYYY', true);
    const isValidFormat = endDateMoment.isValid();
    const isFuture = endDateMoment.isSameOrAfter(moment());

    if (!endDate.trim().length) {
      setEndDateError('End date is required');
      return true;
    }

    if (!isValidFormat) {
      setEndDateError('End date must be in DD/MM/YYYY format');
      return true;
    }

    if (!isFuture) {
      setEndDateError('Date must be in the future');
      return true;
    }

    if (startDate && !startDateError && !endDateMoment.isSameOrAfter(moment(startDate, 'DD/MM/YYYY', true))) {
      setEndDateError('End date must be after Start date');
      return true;
    }

    setEndDateError('');
    return false;
  }

  const checkLocationError = () => {
    if (!location.trim().length) {
      setLocationError('Location required');
      return true;
    }
    setLocationError('');
    return false;
  }

  const checkCostError = () => {
    if (!cost.trim().length) {
      setCostError('Cost required');
      return true;
    }
    setCostError('');
    return false;
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

  return (
    <div className={styles['tour-info']}>
      <PageHeader align={'left'}>
        <div className={styles['block-title']}>Tour Info</div>
      </PageHeader>
      <div className={styles['form']}>
        <div className={styles['row']}>
          <CustomInput
            type="text"
            value={name}
            onChange={(e) => dispatch(changeTourInfo({ fieldName: 'name', value: e.target.value }))}
            onBlur={checkNameError}
            placeholder="Tour name"
            textError={nameError}
          />
        </div>
        <div className={styles['row']}>
          <CustomInput
            type="text"
            value={description}
            onChange={(e) => dispatch(changeTourInfo({ fieldName: 'description', value: e.target.value }))}
            placeholder="Tour description"
          />
        </div>
        <div className={styles['column']}>
          <div className={styles['row']}>
            <CustomInput
              type="text"
              value={startDate}
              onChange={(e) => dispatch(changeTourInfo({ fieldName: 'startDate', value: e.target.value }))}
              onBlur={checkStartDateError}
              placeholder="Start date"
              textError={startDateError}
            />
          </div>
          <div className={styles['row']}>
            <CustomInput
              type="text"
              value={endDate}
              onChange={(e) => dispatch(changeTourInfo({ fieldName: 'endDate', value: e.target.value }))}
              onBlur={checkEndDateError}
              placeholder="End date"
              textError={endDateError}
            />
          </div>
        </div>
        <div className={styles['column']}>
          <div className={styles['row']}>
            <CustomInput
              type="text"
              value={location}
              onChange={(e) => dispatch(changeTourInfo({ fieldName: 'location', value: e.target.value }))}
              onBlur={checkLocationError}
              placeholder="Location"
              textError={locationError}
            />
          </div>
          <div className={styles['row']}>
            <CustomInput
              type="text"
              value={cost}
              onChange={(e) => dispatch(changeTourInfo({ fieldName: 'cost', value: e.target.value }))}
              onBlur={checkCostError}
              placeholder="Tour cost"
              textError={costError}
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