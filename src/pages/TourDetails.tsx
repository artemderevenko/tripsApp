import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";

import { ITour } from '../types/tour';
import { database } from '../firebase';
import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { TourInfo } from '../components/TourInfo';
import { TourSeatLayout } from '../components/TourSeatLayout';
import { useAppDispatch } from '../hooks/reduxHook';
import { resetToDefault } from '../store/slices/tourSlice';
import { TourClientsList } from '../components/TourClientsList';
import { setTour } from '../store/slices/tourSlice';

const TourDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { paramsId} = useParams();

  useEffect(() => {
    const resetTour = () => {
      dispatch(resetToDefault())
    };

    if (paramsId) {
      getTour();
    }

    return resetTour;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTour = async (): Promise<void> => {
    const db = database;
    try {
      const docRef = doc(db, 'tours', `${paramsId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const tour: ITour = docSnap.data() as ITour;
        dispatch(setTour(tour));
      }
    } 
    catch (error) {}
  }

  return (
    <>
      <PageTitle>{paramsId ? 'Tour Details' : 'Add new tour'}</PageTitle>
      <PageContent>
        <div id='tour-info-pdf'>
          <TourInfo />
          <TourClientsList />
          <TourSeatLayout />
        </div>
      </PageContent>
    </>
  )
};

export default TourDetails;
