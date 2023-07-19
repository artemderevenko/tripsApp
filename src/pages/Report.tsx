import { useEffect, useState } from 'react';

import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { NoResults } from '../components/NoResults';
import { PageHeader } from '../components/PageHeader';
import { CustomButtonSelect } from '../components/CustomButtonSelect';
import { useGetSelectOption } from '../hooks/useGetSelectOption';
import { ITour } from '../types/tour';
import { useAppdSelector } from '../hooks/reduxHook';
import { setTours } from '../store/slices/toursSlice';
import { useListFetching } from '../hooks/useListFetching';
import buttonStyles from '../components/CustomButtonSelect/CustomButtonSelect.module.sass';
import headerStyles from '../components/PageHeader/PageHeader.module.sass';
import { ReportExpensesPieChart } from '../components/ReportExpensesPieChart';
import { PageLoader } from '../components/PageLoader';

const Report: React.FC = () => {
  const [selectedTour, setSelectedTour] = useState<ITour | null>(null);
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(true);

  const tours = useAppdSelector(state => state.tours.list);
  const { fetchData, isFetching } = useListFetching<ITour>(setTours, 'tours');

  useEffect(() => {
    getTourList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedTour === null && tours && tours.length) {
      setSelectedTour(tours[0])
    }
  }, [tours]);

  const getTourList = () => {
    fetchData();
  }

  const getTourOptions = () => {
    if (tours && tours.length) {
      const options = tours.map(tour => ({
        value: tour.id,
        label: tour.name
      }));

      return options;

    } else { return [] }
  }

  const changeTourReport = (id: string) => {
    if (selectedTour && selectedTour.id !== id) {
      setFadeAnimation(true);

      setTimeout(() => {
        setFadeAnimation(false)
      }, 300)
    }

    setSelectedTour(tours.filter(item => item.id === id)[0] || null);
  }

  const tourOptions = getTourOptions();
  const tourValue = useGetSelectOption(selectedTour ? selectedTour.id : '', tourOptions);

  return (
    <>
      <PageTitle>Tour Report</PageTitle>
      <PageContent>
        <>
          <PageHeader align={'between'}>
            {
              !isFetching && tours && tours.length ?

                <div className={`${fadeAnimation ? headerStyles['fade'] : ''} ${headerStyles['title']}`}>
                  {selectedTour && selectedTour.name ? selectedTour.name : ''}
                </div> : null
            }
            {
              !isFetching && tours && tours.length ?
                <CustomButtonSelect
                  selectValue={tourValue}
                  selectOptions={tourOptions}
                  onChange={(option) => changeTourReport(option.value)}
                  className={buttonStyles['long']}
                /> : null
            }
          </PageHeader>
          {
            isFetching ? <PageLoader /> : null
          }
          {
            !isFetching && (!tours || !tours.length) ?
              <NoResults
                text={<div>You haven't added any tours yet. <br /> You will be able to view the report once you add at least one tour.</div>}
              /> : null
          }
          {
            !isFetching && tours && tours.length ?
              <div>
                <ReportExpensesPieChart expenses={selectedTour ? selectedTour.expenses : []} />
              </div> : null
          }
        </>
      </PageContent>
    </>
  )
};

export default Report;
