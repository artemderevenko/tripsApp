import { ReactNode, useState, useEffect } from 'react';
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc, DocumentData } from "firebase/firestore";

import { PageHeader } from '../components/PageHeader';
import { CustomSearchField } from '../components/CustomSearchField';
// import { MANAGERS_TABLE_FIELDS as tableFields } from '../constants/toursTableFields';
import { ITour } from '../types/tour';
// import { TableHeader } from '../components/TableHeader';
// import { TableRow } from '../components/TableRow';
// import headerStyles from '../components/TableHeader/TableHeader.module.sass';
// import rowStyles from '../components/TableRow/TableRow.module.sass';
import { CustomButton } from '../components/CustomButton';
import { NoResults } from '../components/NoResults';
import { Notification } from '../components/Notification';
import { useAppDispatch, useAppdSelector } from '../hooks/reduxHook';
// import { setTours } from '../store/slices/toursSlice';
import { PageLoader } from '../components/PageLoader';
import { CustomModal } from '../components/CustomModal';
import { database } from '../firebase';
import { ROUTES } from '../constants/routes';
import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { INotify } from '../types/notify';

const Tours: React.FC = () => {
  const [deleteTourId, setDeleteTourId] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [notify, setNotify] = useState<INotify>({type: '', text: ''});
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredTours, setFilteredTours] = useState<ITour[]>([]);

  const dispatch = useAppDispatch();
  const tours: any = [];

  useEffect(() => {
    // нужно будет удалить это
    setIsFetching(false)
    // getTourList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (!searchValue) {
  //     setFilteredTours(tours)
  //   } else {
  //     filteredTourList(searchValue, tours)
  //   }
  // }, [searchValue, tours]);

  // const getTourList = async () => {
  //   setIsFetching(true);
  //   const db = database;
  //   try {
  //     const querySnapshot = await getDocs(collection(db, 'tours'));
  //     const tourList: DocumentData[] = querySnapshot.docs.map((doc) => doc.data());
  //     const typedTourList: ITour[] = tourList as ITour[];
  //     if (tourList && tourList.length) {
  //       dispatch(setTours(typedTourList));
  //     } else {
  //       dispatch(setTours([]));
  //     }
  //   } catch (error) {
  //     dispatch(setTours([]));
  //   }
  //   setIsFetching(false);
  // }

  // const addTour = (tour: IPerson): void => {
  //   const db = database;
  //   const newRef = doc(collection(db, 'tours'));
  //   setDoc(newRef, {
  //     ...tour,
  //     id: newRef.id,
  //   }).then(() => {
  //     setNotify('Tour added successfully!');
  //     setNotifyType('success');
  //     getTourList();
  //   })
  //     .catch((error) => {
  //       setNotify('Something went wrong. Please try again later');
  //       setNotifyType('error')
  //     });
  // }

  // const editTour = (tour: IPerson): void => {
  //   const db = database;
  //   updateDoc(doc(db, 'tours', tour.id), {
  //     ...tour
  //   })
  //     .then(() => {
  //       setNotify('Tour changed successfully!');
  //       setNotifyType('success');
  //       getTourList();
  //     })
  //     .catch((error) => {
  //       setNotify('Something went wrong. Please try again later');
  //       setNotifyType('error')
  //     });
  // }

  // const deleteTour = () => {
  //   const db = database;
  //   deleteDoc(doc(db, 'tours', deleteTourId))
  //     .then(() => {
  //       setNotify('Tour deleted successfully!');
  //       setNotifyType('success');
  //       getTourList();
  //     })
  //     .catch((error) => {
  //       setNotify('Something went wrong. Please try again later');
  //       setNotifyType('error')
  //     });
  //   setDeleteTourId('');
  // }

  const searchSubstring = (searchString: string, substring: string): boolean => {
    return searchString.toLowerCase().includes(substring.toLowerCase());
  }

  // const filteredTourList = (value: string, toursList: ITour[]): void => {
  //   const result: ITour[] = [];
  //   if (toursList && toursList.length) {
  //     toursList.forEach((tour: ITour): void => {
  //       if (searchSubstring(tour.firstName, value) || searchSubstring(tour.name, value) || searchSubstring(tour.passport, value)) {
  //         result.push(tour)
  //       }
  //     })
  //   }

  //   setFilteredTours(result);
  // }

  const onSearch = (value: string): void => {
    setSearchValue(value)
  }

  const textNoSearch = searchValue ?
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
                disable={isFetching}
                icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>}
                linkPath={`/${ROUTES.TourNew}`}
              />
              <CustomSearchField
                placeholder={'Search by first name, last name or passport'}
                disable={isFetching || ((!filteredTours || !filteredTours.length) && !searchValue)}
                onSearch={onSearch}
              />
            </>
          </PageHeader>
          {
            isFetching ? <PageLoader /> : null
          }
          {
            !isFetching && (!filteredTours || !filteredTours.length) ? <NoResults text={textNoSearch} /> : null
          }
          {/* {
        !isFetching && filteredTours && filteredTours.length && tableFields && tableFields.length ?
          <>
            <TableHeader>
              {
                tableFields.map(field => (
                  <div
                    key={field.value}
                    className={headerStyles[`tours-${field.value}`]}
                  >
                    {field.label}
                  </div>
                ))
              }
            </TableHeader>
            {
              filteredTours.map((data: ITour): ReactNode => (
                <TableRow
                  key={data.passport}
                  optionsList={[
                    {
                      label: 'Delete',
                      className: 'delete',
                      onClick: () => setDeleteTourId(data.id),
                    }
                  ]}
                >
                  {
                    tableFields.map((field): ReactNode => (
                      <div
                        key={field.value}
                        className={rowStyles[`tours-${field.value}`]}
                      >
                        <div className={rowStyles['field-value']}>{data[field.dataField]}</div>
                      </div>))
                  }
                </TableRow>
              ))
            }
          </> : null
      } */}
          {/* {
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
      {
        notify && notify.text ?
          <Notification
            type={notifyType}
            message={notify}
            afterHide={() => setNotify({ type: '', text: '' })}
          /> : null
      } */}
        </>
      </PageContent>
    </>
  )
};

export default Tours;