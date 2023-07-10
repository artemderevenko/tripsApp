import { useState, useEffect } from 'react';
import { doc, deleteDoc } from "firebase/firestore";

import { PageHeader } from '../components/PageHeader';
import { CustomSearchField } from '../components/CustomSearchField';
import { TOURS_TABLE_FIELDS as tableFields } from '../constants/toursTableFields';
import { TRANSPORT_TYPE_OPTIONS as transportTypeOptions } from '../constants/selectOptions';
import { ITour } from '../types/tour';
import { IManager } from '../types/manager';
import { CustomButton } from '../components/CustomButton';
import { useAppdSelector } from '../hooks/reduxHook';
import { setTours } from '../store/slices/toursSlice';
import { setManagers } from '../store/slices/managersSlice';
import { CustomModal } from '../components/CustomModal';
import { database } from '../firebase';
import { ROUTES } from '../constants/routes';
import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { useFilteredList } from '../hooks/useFilteredList';
import { Table } from '../components/Table';
import { useNotify } from '../hooks/useNotify';
import { useListFetching } from '../hooks/useListFetching';

const Tours: React.FC = () => {
  const [deleteTourId, setDeleteTourId] = useState<string>('');
  const [activeSearchValue, setActiveSearchValue] = useState<string>('');

  const tours = useAppdSelector(state => state.tours.list);
  const managers = useAppdSelector(state => state.managers.list);
  const filteredTours = useFilteredList(tours, activeSearchValue, ['name', 'location']);
  const { setNotify } = useNotify();
  const fetchManagerList = useListFetching<IManager>(setManagers, 'managers');
  const fetchTourList = useListFetching<ITour>(setTours, 'tours');

  useEffect(() => {
    getTourList();
    getManagerList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getManagerList = () => {
    fetchManagerList.fetchData();
  }

  const getTourList = () => {
    fetchTourList.fetchData();
  }

  const deleteTour = (): void => {
    const db = database;
    deleteDoc(doc(db, 'tours', deleteTourId))
      .then(() => {
        setNotify({ isActive: true, type: 'success', message: 'Tour deleted successfully!' });
        getTourList();
      })
      .catch((error) => {
        setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
      });
    setDeleteTourId('');
  }

  const onSearch = (value: string): void => {
    setActiveSearchValue(value)
  }

  const getTableData = (): ITour[] => {
    const tableData = [...filteredTours].map(tour => {
      let managerName = '';
      let transportName = '';
      let touristsrCount = tour.touristsList?.length;

      if (tour.managerId) {
        const manager = managers.filter((item) => item.id === tour.managerId)[0];
        managerName = manager ? `${manager.firstName} ${manager.lastName} ${manager.middleName}` : '';
      }

      if (tour.transportType) {
        const transportType = transportTypeOptions.filter(item => item.value === tour.transportType)[0];
        transportName = transportType ? transportType.label : '';
      }

      return { ...tour, managerName, transportName, touristsrCount }
    })
    return tableData;
  }

  const textNoSearch = activeSearchValue ?
    'No tours found. Try another search criteria.' :
    <div>You haven`t created any tour yet. <br /> Start with adding a new tour.</div>;

  return (
    <>
      <PageTitle>Tours</PageTitle>
      <PageContent>
        <>
          <PageHeader align={'between'}>
            <>
              <CustomButton
                onClick={() => null}
                buttonText={'Add new tour'}
                type={'confirm'}
                disable={fetchManagerList.isFetching || fetchTourList.isFetching}
                icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>}
                linkPath={`/${ROUTES.TourNew}`}
              />
              <CustomSearchField
                placeholder={'Search by tour name or location'}
                disable={fetchManagerList.isFetching || fetchTourList.isFetching || ((!filteredTours || !filteredTours.length) && !activeSearchValue)}
                onSearch={onSearch}
              />
            </>
          </PageHeader>
          <Table
            tableFields={tableFields}
            isFetching={fetchManagerList.isFetching || fetchTourList.isFetching}
            textNoSearch={textNoSearch}
            data={getTableData()}
            className={'tours'}
            optionsList={(option) => ([
              {
                label: 'Edit',
                linkPath: `/${ROUTES.TourDetails}${option.id}`
              },
              {
                label: 'Delete',
                className: 'delete',
                onClick: () => setDeleteTourId(option && option.id ? option.id : ''),
              }
            ])}
          />
          {
            deleteTourId ?
              <CustomModal
                title={'Delete tour'}
                onClose={() => setDeleteTourId('')}
                buttonsList={[
                  {
                    onButtonClick: () => setDeleteTourId(''),
                    buttonText: 'Cancel',
                    type: 'cancel',
                  },
                  {
                    onButtonClick: deleteTour,
                    buttonText: 'Delete',
                    type: 'delete',
                  }
                ]}
              >
                <div>After you delete a tour, it's permanently deleted.</div>
              </CustomModal> : null
          }
        </>
      </PageContent>
    </>
  )
};

export default Tours;