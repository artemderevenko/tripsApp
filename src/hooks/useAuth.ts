import { useAppdSelector } from './reduxHook';

import { IUser } from '../types/user';

interface IUseAuth extends IUser {
  isAuth: boolean;
}

export const useAuth = (): IUseAuth => {
  const { email, token, id } = useAppdSelector(state => state.user);

  return {
    isAuth: !!email,
    email,
    token,
    id
  };
}