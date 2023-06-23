import React, { useEffect, ReactNode } from 'react';
import { collection, getDocs, DocumentData } from "firebase/firestore";

import styles from './TourClientsList.module.sass';
import { PageHeader } from '../PageHeader';
import { CustomButtonSearchSelect } from '../CustomButtonSearchSelect';
import { useAppDispatch, useAppdSelector } from '../../hooks/reduxHook';
import { setClients } from '../../store/slices/clientsSlice';
import { addTourist } from '../../store/slices/tourSlice';
import { database } from '../../firebase';
import { IClient } from '../../types/client';
import { ITourist } from '../../types/tourist';
import { NoResults } from '../../components/NoResults';
import { TableHeader } from '../../components/TableHeader';
import { TableRow } from '../../components/TableRow';
import { TOURISTS_TABLE_FIELDS as tableFields } from '../../constants/touristsTableFields';
import headerStyles from '../../components/TableHeader/TableHeader.module.sass';
import rowStyles from '../../components/TableRow/TableRow.module.sass';

const TourClientsList: React.FC = ({ }) => {
  const dispatch = useAppDispatch();
  const clients = useAppdSelector(state => state.clients.list);
  const { touristsList } = useAppdSelector(state => state.tour);

  useEffect(() => {
    getClientList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClientList = async () => {
    const db = database;
    try {
      const querySnapshot = await getDocs(collection(db, 'clients'));
      const clientList: DocumentData[] = querySnapshot.docs.map((doc) => doc.data());
      const typedClientList: IClient[] = clientList as IClient[];
      if (clientList && clientList.length) {
        dispatch(setClients(typedClientList));
      } else {
        dispatch(setClients([]));
      }
    } catch (error) {
      dispatch(setClients([]));
    }
  }

  const getClientOptions = () => {
    if (clients && clients.length) {
      const options = clients.map(client => ({
        value: client.id,
        label: `${client.firstName} ${client.lastName} ${client.middleName} (${client.passport})`
      }));

      return options;

    } else { return [] }
  }

  const addTouristToTour = (id: string) => {
    const client = clients.filter(item => item.id === id)[0] || {};
    const tourist = {
      clientId: id,
      paymentAmount: 0,
      seatNumber: null,
      firstName: client.firstName,
      lastName: client.lastName,
      middleName: client.middleName,
      passport: client.passport,
    };

    dispatch(addTourist(tourist));
  }

  return (
    <div className={styles['tour-clients']}>
      <PageHeader align={'between'}>
        <div className={styles['block-title']}>List of tourists</div>
        <CustomButtonSearchSelect
          label={'Add tourist'}
          selectOptions={getClientOptions()}
          onChange={(option) => addTouristToTour(option.value)}
          className={styles['add-client-button']}
          icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>}
        />
      </PageHeader>
      {
        !touristsList || !touristsList.length ?
          <NoResults
            text={<div>You haven`t added any tourist yet. <br /> Start by adding a tourist from your customer list.</div>}
          /> : null
      }
      {
        touristsList && touristsList.length && tableFields && tableFields.length ?
          <>
            <TableHeader>
              {
                tableFields.map(field => (
                  <div
                    key={field.value}
                    className={headerStyles[`tourist-${field.value}`]}
                  >
                    {field.label}
                  </div>
                ))
              }
            </TableHeader>
            {
              touristsList.map((data: ITourist): ReactNode => (
                <TableRow
                  key={data.clientId}
                  optionsList={[
                    {
                      label: 'Delete',
                      className: "delete",
                      onClick: () => null,
                    }
                  ]}
                >
                  {
                    tableFields.map((field): ReactNode => (
                      <div
                        key={field.value}
                        className={rowStyles[`tourist-${field.value}`]}
                      >
                        <div
                          className={rowStyles['field-value']}
                        >
                          {data[field.dataField] || data[field.dataField] === 0 ? data[field.dataField] : '-'}
                        </div>
                      </div>))
                  }
                </TableRow>
              ))
            }
          </> : null
      }
    </div>
  )
};

export { TourClientsList };