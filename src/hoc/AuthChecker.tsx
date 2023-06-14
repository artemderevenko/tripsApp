import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';

// interface IAuthChecker {
//   children: ReactNode
// }

// const AuthChecker: React.FC<IAuthChecker> = ({ children }) => {
//   const location = useLocation();
//   const { isAuth } = useAuth();

//   // if (!isAuth) {
//   //   return <Navigate to={ROUTES.Login} state={{ from: location }} />
//   // }

//   // return <>{children}</>;
//   return <Route
//     element={
//       isAuth ? (
//         children
//       ) : (
//         <Navigate to={ROUTES.Login} replace state={{ from: location }} />
//       )
//     }
//   />
// };

interface PrivateRouteProps {

}

const AuthChecker: React.FC<PrivateRouteProps> = ({

}) => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Outlet />
  } else {
    return <Navigate to={'/login'} replace />
  }
};

export { AuthChecker };