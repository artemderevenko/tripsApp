import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES } from '../constants/routes';
import { PageLoader } from './PageLoader';
import { Layout } from './Layout';


const Events = lazy(() => import('../pages/Events'));
const Report = lazy(() => import('../pages/Report'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Suspense fallback={<PageLoader />}>
              <Events />
            </Suspense>
          } />
          <Route path={ROUTES.Events} element={
            <Suspense fallback={<PageLoader />}>
              <Events />
            </Suspense>
          } />
          <Route path={ROUTES.Report} element={
            <Suspense fallback={<PageLoader />}>
              <Report />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </>
  )
};

export { App };
