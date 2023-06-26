import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { TourInfo } from '../components/TourInfo';
import { TourSeatLayout } from '../components/TourSeatLayout';
import { useAppDispatch } from '../hooks/reduxHook';
import { resetToDefault } from '../store/slices/tourSlice';
import { TourClientsList } from '../components/TourClientsList';

const TourDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    const resetTour = () => {
      dispatch(resetToDefault())
    };

    return resetTour;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageTitle>{id ? 'Tour Details' : 'Add new tour'}</PageTitle>
      <PageContent>
        <>
          <TourInfo />
          <TourClientsList />
          <TourSeatLayout />
        </>
      </PageContent>
    </>
  )
};

export default TourDetails;
