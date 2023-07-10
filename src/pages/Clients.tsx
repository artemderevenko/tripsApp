import { useState, useEffect } from 'react';
import { collection, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

import { PageHeader } from '../components/PageHeader';
import { CustomSearchField } from '../components/CustomSearchField';
import { CLIENTS_TABLE_FIELDS as tableFields } from '../constants/clientsTableFields';
import { IPerson } from '../types/person';
import { IClient } from '../types/client';
import { CustomButton } from '../components/CustomButton';
import { AddClientModal } from '../components/AddClientModal';
import { useAppdSelector } from '../hooks/reduxHook';
import { setClients } from '../store/slices/clientsSlice';
import { CustomModal } from '../components/CustomModal';
import { database } from '../firebase';
import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { useFilteredList } from '../hooks/useFilteredList';
import { Table } from '../components/Table';
import { useNotify } from '../hooks/useNotify';
import { useListFetching } from '../hooks/useListFetching';

const Clients: React.FC = () => {

  const clients = useAppdSelector(state => state.clients.list);
  const { setNotify } = useNotify();

  const [showAddClientModal, setShowAddClientModal] = useState<boolean>(false);
  const [deleteClientId, setDeleteClientId] = useState<string>('');
  const [editClientData, setEditClientData] = useState<IClient | null>(null);
  const [activeSearchValue, setActiveSearchValue] = useState<string>('');
  const filteredClients = useFilteredList(clients, activeSearchValue, ['firstName', 'lastName', 'passport']);
  const { fetchData, isFetching } = useListFetching<IClient>(setClients, 'clients');

  useEffect(() => {
    getClientList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClientList = () => {
    fetchData();
  }

  const addClient = (client: IPerson): void => {
    const db = database;
    const newRef = doc(collection(db, 'clients'));
    setDoc(newRef, {
      ...client,
      id: newRef.id,
    }).then(() => {
      setNotify({isActive: true, type: 'success', message: 'Client added successfully!'});
      getClientList();
    })
      .catch((error) => {
        setNotify({isActive: true, type: 'error', message: 'Something went wrong. Please try again later.'});
      });
  }

  const editClient = (client: IPerson): void => {
    const db = database;
    updateDoc(doc(db, 'clients', client.id), {
      ...client
    })
      .then(() => {
        setNotify({isActive: true, type: 'success', message: 'Client changed successfully!'});
        getClientList();
      })
      .catch((error) => {
        setNotify({isActive: true, type: 'error', message: 'Something went wrong. Please try again later.'});
      });
  }

  const deleteClient = () => {
    const db = database;
    deleteDoc(doc(db, 'clients', deleteClientId))
      .then(() => {
        setNotify({isActive: true, type: 'success', message: 'Client deleted successfully!'});        
        getClientList();
      })
      .catch((error) => {
        setNotify({isActive: true, type: 'error', message: 'Something went wrong. Please try again later.'});
      });
    setDeleteClientId('');
  }

  const onSearch = (value: string): void => {
    setActiveSearchValue(value)
  }

  const textNoSearch = activeSearchValue ?
    'No clients found. Try another search criteria.' :
    <div>You haven`t created any client yet. <br /> Start with adding a new client.</div>;

  return (
    <>
      <PageTitle>Clients</PageTitle>
      <PageContent>
        <>
          <PageHeader align={'between'}>
            <>
              <CustomButton
                onClick={() => setShowAddClientModal(true)}
                buttonText={'Add new client'}
                type={'confirm'}
                disable={isFetching}
                icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>}
              />
              <CustomSearchField
                placeholder={'Search by first name, last name or passport'}
                disable={isFetching || ((!filteredClients || !filteredClients.length) && !activeSearchValue)}
                onSearch={onSearch}
              />
            </>
          </PageHeader>
          <Table
            tableFields={tableFields}
            isFetching={isFetching}
            textNoSearch={textNoSearch}
            data={filteredClients}
            className={'clients'}
            optionsList={(option) => ([
              {
                label: 'Edit',
                onClick: () => setEditClientData(option),
              },
              {
                label: 'Delete',
                className: 'delete',
                onClick: () => setDeleteClientId(option && option.id ? option.id : ''),
              }
            ])}
          />
          {
            showAddClientModal ?
              <AddClientModal
                onClose={() => setShowAddClientModal(false)}
                onAddClient={addClient}
              /> : null
          }
          {
            editClientData ?
              <AddClientModal
                onClose={() => setEditClientData(null)}
                onAddClient={editClient}
                data={editClientData}
              /> : null
          }
          {
            deleteClientId ?
              <CustomModal
                title={'Delete client'}
                onClose={() => setDeleteClientId('')}
                buttonsList={[
                  {
                    onButtonClick: () => setDeleteClientId(''),
                    buttonText: 'Cancel',
                    type: 'cancel',
                  },
                  {
                    onButtonClick: deleteClient,
                    buttonText: 'Delete',
                    type: 'delete',
                  }
                ]}
              >
                <div>After you delete a client, it's permanently deleted.</div>
              </CustomModal> : null
          }
        </>
      </PageContent>
    </>
  )
};

export default Clients;