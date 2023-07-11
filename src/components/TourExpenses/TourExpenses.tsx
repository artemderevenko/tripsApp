import React, { useState } from 'react';

import styles from './TourExpenses.module.sass';
import { PageHeader } from '../PageHeader';
import { CustomButton } from '../CustomButton';
import { NoResults } from '../NoResults';
import { useAppDispatch, useAppdSelector } from '../../hooks/reduxHook';
import { changeTourInfo } from '../../store/slices/tourSlice';
import { ExpensesRow } from '../ExpensesRow';
import { useGenerateId } from '../../hooks/useGenerateId';
import { ITourExpenses } from '../../types/tourExpenses';
import { CustomModal } from '../CustomModal';
import { useNotify } from '../../hooks/useNotify';

const TourExpenses: React.FC = () => {
  const [deletExpensesId, setDeleteExpensesId] = useState<string>('');

  const dispatch = useAppDispatch();
  const { expenses } = useAppdSelector(state => state.tour);
  const { generateId } = useGenerateId();
  const { setNotify } = useNotify();

  const addExpenses = () => {
    dispatch(changeTourInfo({
      fieldName: 'expenses',
      value: [
        ...expenses,
        { id: generateId(), type: '', label: '', amount: '' }
      ]
    }));
  }

  const changeExpenses = (data: ITourExpenses) => {
    const expensesList = expenses.map(item => {
      if (item.id === data.id) {
        return {
          ...item,
          ...data
        }
      }
      return item;
    });

    dispatch(changeTourInfo({
      fieldName: 'expenses',
      value: expensesList
    }));
  }

  const deleteExpensesRow = () => {
    dispatch(changeTourInfo({
      fieldName: 'expenses',
      value: expenses.filter(item => item.id !== deletExpensesId)
    }));

    setDeleteExpensesId('');
    setNotify({ isActive: true, message: 'Expenses deleted successfully!', type: 'success' });
  }

  return (
    <div className={styles['tour-expenses']}>
      <PageHeader align={'between'}>
        <div className={styles['block-title']}>Tour Expenses</div>
        <CustomButton
          onClick={() => addExpenses()}
          buttonText={'Add expenses'}
          type={'confirm'}
          icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>}
          id="tour-expenses-hide-in-pdf"
        />
      </PageHeader>
      {
        !expenses || !expenses.length ?

          <NoResults text={'You haven`t added any expenses yet.'} /> :

          expenses.map((item)=> (
            <ExpensesRow
              key={item.id}
              {...item}
              onChangeRow={changeExpenses}
              deleteRow={() => setDeleteExpensesId(item.id)}
            />
          ))
      }
      {
        deletExpensesId ?
          <CustomModal
            title={'Delete expenses'}
            onClose={() => setDeleteExpensesId('')}
            buttonsList={[
              {
                onButtonClick: () => setDeleteExpensesId(''),
                buttonText: 'Cancel',
                type: 'cancel',
              },
              {
                onButtonClick: deleteExpensesRow,
                buttonText: 'Delete',
                type: 'delete',
              }
            ]}
          >
            <div>
              Are you sure you want to delete this expenses?
            </div>
          </CustomModal> : null
      }
    </div>
  )
};

export { TourExpenses };