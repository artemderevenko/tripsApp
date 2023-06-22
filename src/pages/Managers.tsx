import { ReactNode, useState, useEffect } from 'react';
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc, DocumentData } from "firebase/firestore";

import { PageHeader } from '../components/PageHeader';
import { CustomSearchField } from '../components/CustomSearchField';
import { MANAGERS_TABLE_FIELDS as tableFields } from '../constants/managersTableFields';
import { IPerson } from '../types/person';
import { IManager } from '../types/manager';
import { TableHeader } from '../components/TableHeader';
import { TableRow } from '../components/TableRow';
import headerStyles from '../components/TableHeader/TableHeader.module.sass';
import rowStyles from '../components/TableRow/TableRow.module.sass';
import { CustomButton } from '../components/CustomButton';
import { NoResults } from '../components/NoResults';
import { AddManagerModal } from '../components/AddManagerModal';
import { Notification } from '../components/Notification';
import { useAppDispatch, useAppdSelector } from '../hooks/reduxHook';
import { setManagers } from '../store/slices/managersSlice';
import { PageLoader } from '../components/PageLoader';
import { CustomModal } from '../components/CustomModal';
import { database } from '../firebase';
import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';

const Managers: React.FC = () => {
  const [showAddManagerModal, setShowAddManagerModal] = useState<boolean>(false);
  const [deleteManagerId, setDeleteManagerId] = useState<string>('');
  const [editManagerData, setEditManagerData] = useState<IManager | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [notify, setNotify] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [notifyType, setNotifyType] = useState<string>('');
  const [filteredManagers, setFilteredManagers] = useState<IManager[] | []>([]);

  const dispatch = useAppDispatch();
  const managers = useAppdSelector(state => state.managers.list);

  useEffect(() => {
    getManagerList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!searchValue) {
      setFilteredManagers(managers)
    } else {
      filteredManagerList(searchValue, managers)
    }
  }, [searchValue, managers]);

  const getManagerList = async () => {
    setIsFetching(true);
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
    setIsFetching(false);
  }

  const addManager = (manager: IPerson): void => {
    const db = database;
    const newRef = doc(collection(db, 'managers'));
    setDoc(newRef, {
      ...manager,
      id: newRef.id,
    }).then(() => {
      setNotify('Manager added successfully!');
      setNotifyType('success');
      getManagerList();
    })
      .catch((error) => {
        setNotify('Something went wrong. Please try again later');
        setNotifyType('error')
      });
  }

  const editManager = (manager: IPerson): void => {
    const db = database;
    updateDoc(doc(db, 'managers', manager.id), {
      ...manager
    })
      .then(() => {
        setNotify('Manager changed successfully!');
        setNotifyType('success');
        getManagerList();
      })
      .catch((error) => {
        setNotify('Something went wrong. Please try again later');
        setNotifyType('error')
      });
  }

  const deleteManager = () => {
    const db = database;
    deleteDoc(doc(db, 'managers', deleteManagerId))
      .then(() => {
        setNotify('Manager deleted successfully!');
        setNotifyType('success');
        getManagerList();
      })
      .catch((error) => {
        setNotify('Something went wrong. Please try again later');
        setNotifyType('error')
      });
    setDeleteManagerId('');
  }

  const searchSubstring = (searchString: string, substring: string): boolean => {
    return searchString.toLowerCase().includes(substring.toLowerCase());
  }

  const filteredManagerList = (value: string, managersList: IManager[] | []): void => {
    const result: IManager[] = [];
    if (managersList && managersList.length) {
      managersList.forEach((manager: IManager): void => {
        if (searchSubstring(manager.firstName, value) || searchSubstring(manager.lastName, value) || searchSubstring(manager.passport, value)) {
          result.push(manager)
        }
      })
    }

    setFilteredManagers(result);
  }

  const onSearch = (value: string): void => {
    setSearchValue(value)
  }

  const afterHideNotify = () => {
    setNotify('');
    setNotifyType('');
  }

  const textNoSearch = searchValue ?
    'No managers found. Try another search criteria.' :
    <div>You haven`t created any manager yet. <br /> Start with adding a new manager.</div>;

  return (
    <>
      <PageTitle>Managers</PageTitle>
      <PageContent>
        <>
          <PageHeader align={'between'}>
            <>
              <CustomButton
                onClick={() => setShowAddManagerModal(true)}
                buttonText={'Add new manager'}
                type={'confirm'}
                disable={isFetching}
                icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>}
              />
              <CustomSearchField
                placeholder={'Search by first name, last name or passport'}
                disable={isFetching || ((!filteredManagers || !filteredManagers.length) && !searchValue)}
                onSearch={onSearch}
              />
            </>
          </PageHeader>
          {
            isFetching ? <PageLoader /> : null
          }
          {
            !isFetching && (!filteredManagers || !filteredManagers.length) ? <NoResults text={textNoSearch} /> : null
          }
          {
            !isFetching && filteredManagers && filteredManagers.length && tableFields && tableFields.length ?
              <>
                <TableHeader>
                  {
                    tableFields.map(field => (
                      <div
                        key={field.value}
                        className={headerStyles[`managers-${field.value}`]}
                      >
                        {field.label}
                      </div>
                    ))
                  }
                </TableHeader>
                {
                  filteredManagers.map((data: IManager): ReactNode => (
                    <TableRow
                      key={data.passport}
                      optionsList={[
                        {
                          label: 'Edit',
                          onClick: () => setEditManagerData(data),
                        },
                        {
                          label: 'Delete',
                          className: "delete",
                          onClick: () => setDeleteManagerId(data.id),
                        }
                      ]}
                    >
                      {
                        tableFields.map((field): ReactNode => (
                          <div
                            key={field.value}
                            className={rowStyles[`managers-${field.value}`]}
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
            showAddManagerModal ?
              <AddManagerModal
                onClose={() => setShowAddManagerModal(false)}
                onAddManager={addManager}
              /> : null
          }
          {
            editManagerData ?
              <AddManagerModal
                onClose={() => setEditManagerData(null)}
                onAddManager={editManager}
                data={editManagerData}
              /> : null
          }
          {
            deleteManagerId ?
              <CustomModal
                title={'Delete manager'}
                onClose={() => setDeleteManagerId('')}
                buttonsList={[
                  {
                    onButtonClick: () => setDeleteManagerId(''),
                    buttonText: 'Cancel',
                    type: 'cancel',
                  },
                  {
                    onButtonClick: deleteManager,
                    buttonText: 'Delete',
                    type: 'delete',
                  }
                ]}
              >
                <div>After you delete a manager, it's permanently deleted.</div>
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

export default Managers;