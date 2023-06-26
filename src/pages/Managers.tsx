import { useState, useEffect } from 'react';
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc, DocumentData } from "firebase/firestore";

import { PageHeader } from '../components/PageHeader';
import { CustomSearchField } from '../components/CustomSearchField';
import { MANAGERS_TABLE_FIELDS as tableFields } from '../constants/managersTableFields';
import { IPerson } from '../types/person';
import { IManager } from '../types/manager';
import { CustomButton } from '../components/CustomButton';
import { AddManagerModal } from '../components/AddManagerModal';
import { Notification } from '../components/Notification';
import { useAppDispatch, useAppdSelector } from '../hooks/reduxHook';
import { setManagers } from '../store/slices/managersSlice';
import { CustomModal } from '../components/CustomModal';
import { database } from '../firebase';
import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { useFilteredList } from '../hooks/useFilteredList';
import { Table } from '../components/Table';

const Managers: React.FC = () => {
  const dispatch = useAppDispatch();
  const managers = useAppdSelector(state => state.managers.list);

  const [showAddManagerModal, setShowAddManagerModal] = useState<boolean>(false);
  const [deleteManagerId, setDeleteManagerId] = useState<string>('');
  const [editManagerData, setEditManagerData] = useState<IManager | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [notify, setNotify] = useState<string>('');
  const [notifyType, setNotifyType] = useState<string>('');
  const [activeSearchValue, setActiveSearchValue] = useState<string>('');
  const filteredManagers = useFilteredList(managers, activeSearchValue, ['firstName', 'lastName', 'passport']);

  useEffect(() => {
    getManagerList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onSearch = (value: string): void => {
    setActiveSearchValue(value)
  }

  const afterHideNotify = () => {
    setNotify('');
    setNotifyType('');
  }

  const textNoSearch = activeSearchValue ?
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
                disable={isFetching || ((!filteredManagers || !filteredManagers.length) && !activeSearchValue)}
                onSearch={onSearch}
              />
            </>
          </PageHeader>
          <Table
            tableFields={tableFields}
            isFetching={isFetching}
            textNoSearch={textNoSearch}
            data={filteredManagers}
            className={'managers'}
            optionsList={(option) => ([
              {
                label: 'Edit',
                onClick: () => setEditManagerData(option),
              },
              {
                label: 'Delete',
                className: "delete",
                onClick: () => setDeleteManagerId(option && option.id ? option.id : ''),
              }
            ])}
          />
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