import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES } from '../constants/routes';
import { PageLoader } from './PageLoader';
import { Layout } from './Layout';

const Clients = lazy(() => import('../pages/Clients'));
const Managers = lazy(() => import('../pages/Managers'));
const Tours = lazy(() => import('../pages/Tours'));
const Schedule = lazy(() => import('../pages/Schedule'));
const Report = lazy(() => import('../pages/Report'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Suspense fallback={<PageLoader />}>
              <Clients />
            </Suspense>
          } />
          <Route path={ROUTES.Clients} element={
            <Suspense fallback={<PageLoader />}>
              <Clients />
            </Suspense>
          } />
          <Route path={ROUTES.Managers} element={
            <Suspense fallback={<PageLoader />}>
              <Managers />
            </Suspense>
          } />
          <Route path={ROUTES.Tours} element={
            <Suspense fallback={<PageLoader />}>
              <Tours />
            </Suspense>
          } />
          <Route path={ROUTES.Schedule} element={
            <Suspense fallback={<PageLoader />}>
              <Schedule />
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
