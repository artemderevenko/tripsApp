import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { NoResults } from '../components/NoResults';

const Report: React.FC = () => {
  return (
    <>
      <PageTitle>Report</PageTitle>
      <PageContent>
        <NoResults
          text={(<div>
            Coming Soon: This page under development
          </div>)}
        />
      </PageContent>
    </>
  )
};

export default Report;
