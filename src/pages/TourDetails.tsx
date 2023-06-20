import { useParams } from 'react-router-dom';

import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { TourInfo } from '../components/TourInfo';
import { TourSeatLayout } from '../components/TourSeatLayout';

const TourDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <>
      <PageTitle>{id ? 'Tour Details' : 'Add new tour'}</PageTitle>
      <PageContent>
        <>
          <TourInfo />
          <TourSeatLayout />
        </>
      </PageContent>
    </>
  )
};

export default TourDetails;
