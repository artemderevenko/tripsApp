import { ReactNode, useState, useEffect } from 'react';
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc, DocumentData } from "firebase/firestore";

import { PageHeader } from '../components/PageHeader';
import { CustomSearchField } from '../components/CustomSearchField';
import { CLIENTS_TABLE_FIELDS as tableFields } from '../constants/clientsTableFields';
import { IPerson } from '../types/person';
import { IClient } from '../types/client';
import { TableHeader } from '../components/TableHeader';
import { TableRow } from '../components/TableRow';
import headerStyles from '../components/TableHeader/TableHeader.module.sass';
import rowStyles from '../components/TableRow/TableRow.module.sass';
import { CustomButton } from '../components/CustomButton';
import { NoResults } from '../components/NoResults';
import { AddClientModal } from '../components/AddClientModal';
import { Notification } from '../components/Notification';
import { useAppDispatch, useAppdSelector } from '../hooks/reduxHook';
import { setClients } from '../store/slices/clientsSlice';
import { PageLoader } from '../components/PageLoader';
import { CustomModal } from '../components/CustomModal';
import { database } from '../firebase';
import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';

const Clients: React.FC = () => {
  const [showAddClientModal, setShowAddClientModal] = useState<boolean>(false);
  const [deleteClientId, setDeleteClientId] = useState<string>('');
  const [editClientData, setEditClientData] = useState<IClient | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [notify, setNotify] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [notifyType, setNotifyType] = useState<string>('');
  const [filteredClients, setFilteredClients] = useState<IClient[] | []>([]);

  const dispatch = useAppDispatch();
  const clients = useAppdSelector(state => state.clients.list);

  useEffect(() => {
    getClientList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!searchValue) {
      setFilteredClients(clients)
    } else {
      filteredClientList(searchValue, clients)
    }
  }, [searchValue, clients]);

  const getClientList = async () => {
    setIsFetching(true);
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
    setIsFetching(false);
  }

  const addClient = (client: IPerson): void => {
    const db = database;
    const newRef = doc(collection(db, 'clients'));
    setDoc(newRef, {
      ...client,
      id: newRef.id,
    }).then(() => {
      setNotify('Client added successfully!');
      setNotifyType('success');
      getClientList();
    })
      .catch((error) => {
        setNotify('Something went wrong. Please try again later');
        setNotifyType('error')
      });
  }

  const editClient = (client: IPerson): void => {
    const db = database;
    updateDoc(doc(db, 'clients', client.id), {
      ...client
    })
      .then(() => {
        setNotify('Client changed successfully!');
        setNotifyType('success');
        getClientList();
      })
      .catch((error) => {
        setNotify('Something went wrong. Please try again later');
        setNotifyType('error')
      });
  }

  const deleteClient = () => {
    const db = database;
    deleteDoc(doc(db, 'clients', deleteClientId))
      .then(() => {
        setNotify('Client deleted successfully!');
        setNotifyType('success');
        getClientList();
      })
      .catch((error) => {
        setNotify('Something went wrong. Please try again later');
        setNotifyType('error')
      });
    setDeleteClientId('');
  }

  const searchSubstring = (searchString: string, substring: string): boolean => {
    return searchString.toLowerCase().includes(substring.toLowerCase());
  }

  const filteredClientList = (value: string, clientsList: IClient[] | []): void => {
    const result: IClient[] = [];
    if (clientsList && clientsList.length) {
      clientsList.forEach((client: IClient): void => {
        if (searchSubstring(client.firstName, value) || searchSubstring(client.name, value) || searchSubstring(client.passport, value)) {
          result.push(client)
        }
      })
    }

    setFilteredClients(result);
  }

  const onSearch = (value: string): void => {
    setSearchValue(value)
  }

  const afterHideNotify = () => {
    setNotify('');
    setNotifyType('');
  }

  const textNoSearch = searchValue ?
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
                placeholder={'Search by name, surname or passport'}
                disable={isFetching || ((!filteredClients || !filteredClients.length) && !searchValue)}
                onSearch={onSearch}
              />
            </>
          </PageHeader>
          {
            isFetching ? <PageLoader /> : null
          }
          {
            !isFetching && (!filteredClients || !filteredClients.length) ? <NoResults text={textNoSearch} /> : null
          }
          {
            !isFetching && filteredClients && filteredClients.length && tableFields && tableFields.length ?
              <>
                <TableHeader>
                  {
                    tableFields.map(field => (
                      <div
                        key={field.value}
                        className={headerStyles[`clients-${field.value}`]}
                      >
                        {field.label}
                      </div>
                    ))
                  }
                </TableHeader>
                {
                  filteredClients.map((data: IClient): ReactNode => (
                    <TableRow
                      key={data.passport}
                      optionsList={[
                        {
                          label: 'Edit',
                          onClick: () => setEditClientData(data),
                        },
                        {
                          label: 'Delete',
                          className: "delete",
                          onClick: () => setDeleteClientId(data.id),
                        }
                      ]}
                    >
                      {
                        tableFields.map((field): ReactNode => (
                          <div
                            key={field.value}
                            className={rowStyles[`clients-${field.value}`]}
                          >
                            <div className={rowStyles['field-value']}>{data[field.dataField]}</div>
                          </div>))
                      }
                    </TableRow>
                  ))
                }
              </> : null
          }
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
          {
            notify ?
              <Notification
                type={notifyType}
                message={notify}
                afterHide={afterHideNotify}
              /> : null
          }
        </>
      </PageContent>
    </>
  )
};

export default Clients;